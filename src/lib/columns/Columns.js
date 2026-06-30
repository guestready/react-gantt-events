import PropTypes from 'prop-types'
import React, { Component } from 'react'
import moment from 'moment'

import { iterateTimes, getGroupOrders } from '../utility/calendar'
import { _get, _length, arraysEqual } from '../utility/generic'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'

const passThroughPropTypes = {
  canvasTimeStart: PropTypes.number.isRequired,
  canvasTimeEnd: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  lineCount: PropTypes.number.isRequired,
  minUnit: PropTypes.string.isRequired,
  timeSteps: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  verticalLineClassNamesForTime: PropTypes.func
}

class Columns extends Component {
  static propTypes = {
    ...passThroughPropTypes,
    getLeftOffsetFromDate: PropTypes.func.isRequired,
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    keys: PropTypes.object,
    dimensionItems: PropTypes.array,
    groupHeights: PropTypes.array,
    groupTops: PropTypes.array,
    emptyCellLabelRenderer: PropTypes.func,
    endingItemShrinkFraction: PropTypes.number,
    lineHeight: PropTypes.number
  }

  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.canvasTimeStart === this.props.canvasTimeStart &&
      nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.lineCount === this.props.lineCount &&
      nextProps.minUnit === this.props.minUnit &&
      nextProps.timeSteps === this.props.timeSteps &&
      nextProps.height === this.props.height &&
      nextProps.verticalLineClassNamesForTime ===
        this.props.verticalLineClassNamesForTime &&
      arraysEqual(nextProps.items, this.props.items) &&
      arraysEqual(nextProps.groups, this.props.groups) &&
      nextProps.keys === this.props.keys &&
      arraysEqual(nextProps.dimensionItems, this.props.dimensionItems) &&
      arraysEqual(nextProps.groupHeights, this.props.groupHeights) &&
      arraysEqual(nextProps.groupTops, this.props.groupTops) &&
      nextProps.emptyCellLabelRenderer === this.props.emptyCellLabelRenderer &&
      nextProps.endingItemShrinkFraction === this.props.endingItemShrinkFraction &&
      nextProps.lineHeight === this.props.lineHeight
    )
  }

  isTimeRangeEmpty(groupId, timeStart, timeEnd) {
    return this.getCellOccupancy(groupId, timeStart, timeEnd) === 'EMPTY'
  }

  // Classify a cell against a group's items:
  //   'EMPTY'          - no item overlaps the cell
  //   'PARTIALLY_FREE' - an item ends inside the cell and nothing covers the
  //                      trailing part -> the trailing space is free
  //   'OCCUPIED'       - an item spans through the cell end
  // Uses the cell END as the primitive (not the midpoint) so it is robust to
  // the intra-cell position of item ends across timezones.
  getCellOccupancy(groupId, timeStart, timeEnd) {
    const { items, keys } = this.props

    if (!keys) {
      return 'OCCUPIED'
    }
    if (!items || _length(items) === 0) {
      return 'EMPTY'
    }

    const { itemGroupKey, itemTimeStartKey, itemTimeEndKey } = keys
    const groupItems = items.filter(item => _get(item, itemGroupKey) === groupId)

    let hasOverlap = false
    let coversEnd = false
    let endsInside = false

    groupItems.forEach(item => {
      const itemStart = _get(item, itemTimeStartKey)
      const itemEnd = _get(item, itemTimeEndKey)

      if (!(itemStart < timeEnd && itemEnd > timeStart)) {
        return
      }
      hasOverlap = true

      if (itemEnd >= timeEnd) {
        coversEnd = true
      }
      if (itemStart <= timeStart && itemEnd > timeStart && itemEnd < timeEnd) {
        endsInside = true
      }
    })

    if (!hasOverlap) {
      return 'EMPTY'
    }
    if (!coversEnd && endsInside) {
      return 'PARTIALLY_FREE'
    }
    return 'OCCUPIED'
  }

  render() {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      minUnit,
      timeSteps,
      height,
      verticalLineClassNamesForTime,
      getLeftOffsetFromDate,
      groups,
      groupHeights,
      groupTops,
      emptyCellLabelRenderer,
      endingItemShrinkFraction,
      lineHeight
    } = this.props
    const ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)

    let lines = []
    let emptyCellLabels = []

    const groupOrders = emptyCellLabelRenderer && groups && this.props.keys
      ? getGroupOrders(groups, this.props.keys)
      : null

    iterateTimes(
      canvasTimeStart,
      canvasTimeEnd,
      minUnit,
      timeSteps,
      (time, nextTime) => {
        const minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit)
        const firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0)

        let classNamesForTime = []
        if (verticalLineClassNamesForTime) {
          classNamesForTime = verticalLineClassNamesForTime(
            time.unix() * 1000, // turn into ms, which is what verticalLineClassNamesForTime expects
            nextTime.unix() * 1000 - 1
          )
        }

        // TODO: rename or remove class that has reference to vertical-line
        const classNames =
          'rct-vl' +
          (firstOfType ? ' rct-vl-first' : '') +
          (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute'
            ? ` rct-day-${time.day()} `
            : ' ') +
          classNamesForTime.join(' ')

        const left = getLeftOffsetFromDate(time.valueOf())
        const right = getLeftOffsetFromDate(nextTime.valueOf())
        lines.push(
          <div
            key={`line-${time.valueOf()}`}
            className={classNames}
            style={{
              pointerEvents: 'none',
              top: '0px',
              left: `${left}px`,
              width: `${right - left}px`,
              height: `${height}px`
            }}
          />
        )

        // Check for empty cells and render labels if renderer is provided
        if (emptyCellLabelRenderer && groups && groupHeights && groupTops && groupOrders) {
          const timeStartMs = time.valueOf()
          const timeEndMs = nextTime.valueOf()
          const cellWidth = right - left
          const LABEL_GAP = 2

          groups.forEach((group) => {
            const groupId = _get(group, this.props.keys.groupIdKey)
            const groupOrderData = groupOrders[groupId]

            if (!groupOrderData) {
              return
            }

            const occupancy = this.getCellOccupancy(groupId, timeStartMs, timeEndMs)
            const isPartialCell = occupancy === 'PARTIALLY_FREE'
            // Partial cells only get a label when items are shrunk, otherwise
            // the item still fills the trailing space and would overlap it.
            if (occupancy === 'OCCUPIED' || (isPartialCell && endingItemShrinkFraction == null)) {
              return
            }

            const groupOrder = groupOrderData.index
            const groupTop = groupTops[groupOrder] || 0

            let groupHeight = groupHeights[groupOrder]
            if (!groupHeight) {
              groupHeight = group.height || lineHeight
            }

            const label = emptyCellLabelRenderer({
              time: moment(timeStartMs),
              timeEnd: moment(timeEndMs),
              group: group,
              groupOrder: groupOrder,
              isPartialCell: isPartialCell
            })

            if (label) {
              // In partial cells the label goes in the free space after the
              // shrunk item, which occupies endingItemShrinkFraction of the cell.
              let labelLeft = left
              let labelWidth = cellWidth
              if (isPartialCell) {
                labelLeft = left + cellWidth * endingItemShrinkFraction + LABEL_GAP
                labelWidth = Math.max(0, right - labelLeft)
              }

              emptyCellLabels.push(
                <div
                  key={`empty-cell-${groupOrder}-${timeStartMs}`}
                  className={
                    'rct-empty-cell-label' +
                    (isPartialCell ? ' rct-empty-cell-label-partial' : '')
                  }
                  style={{
                    position: 'absolute',
                    top: `${groupTop}px`,
                    left: `${labelLeft}px`,
                    width: `${labelWidth}px`,
                    height: `${groupHeight}px`,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1
                  }}
                >
                  {label}
                </div>
              )
            }
          })
        }
      }
    )

    return (
      <div className="rct-vertical-lines">
        {lines}
        {emptyCellLabels}
      </div>
    )
  }
}

const ColumnsWrapper = ({ ...props }) => {
  return (
    <TimelineStateConsumer>
      {({ getLeftOffsetFromDate }) => (
        <Columns getLeftOffsetFromDate={getLeftOffsetFromDate} {...props} />
      )}
    </TimelineStateConsumer>
  )
}

ColumnsWrapper.defaultProps = {
  ...passThroughPropTypes
}

export default ColumnsWrapper
