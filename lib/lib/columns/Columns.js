"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _moment = _interopRequireDefault(require("moment"));
var _calendar = require("../utility/calendar");
var _generic = require("../utility/generic");
var _TimelineStateContext = require("../timeline/TimelineStateContext");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var passThroughPropTypes = {
  canvasTimeStart: _propTypes["default"].number.isRequired,
  canvasTimeEnd: _propTypes["default"].number.isRequired,
  canvasWidth: _propTypes["default"].number.isRequired,
  lineCount: _propTypes["default"].number.isRequired,
  minUnit: _propTypes["default"].string.isRequired,
  timeSteps: _propTypes["default"].object.isRequired,
  height: _propTypes["default"].number.isRequired,
  verticalLineClassNamesForTime: _propTypes["default"].func
};
var Columns = /*#__PURE__*/function (_Component) {
  _inherits(Columns, _Component);
  function Columns() {
    _classCallCheck(this, Columns);
    return _callSuper(this, Columns, arguments);
  }
  _createClass(Columns, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !(nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineCount === this.props.lineCount && nextProps.minUnit === this.props.minUnit && nextProps.timeSteps === this.props.timeSteps && nextProps.height === this.props.height && nextProps.verticalLineClassNamesForTime === this.props.verticalLineClassNamesForTime && (0, _generic.arraysEqual)(nextProps.items, this.props.items) && (0, _generic.arraysEqual)(nextProps.groups, this.props.groups) && nextProps.keys === this.props.keys && (0, _generic.arraysEqual)(nextProps.dimensionItems, this.props.dimensionItems) && (0, _generic.arraysEqual)(nextProps.groupHeights, this.props.groupHeights) && (0, _generic.arraysEqual)(nextProps.groupTops, this.props.groupTops) && nextProps.emptyCellLabelRenderer === this.props.emptyCellLabelRenderer && nextProps.endingItemShrinkFraction === this.props.endingItemShrinkFraction && nextProps.lineHeight === this.props.lineHeight);
    }
  }, {
    key: "isTimeRangeEmpty",
    value: function isTimeRangeEmpty(groupId, timeStart, timeEnd) {
      return this.getCellOccupancy(groupId, timeStart, timeEnd) === 'EMPTY';
    }

    // Classify a cell against a group's items:
    //   'EMPTY'          - no item overlaps the cell
    //   'PARTIALLY_FREE' - an item ends inside the cell and nothing covers the
    //                      trailing part -> the trailing space is free
    //   'OCCUPIED'       - an item spans through the cell end
    // Uses the cell END as the primitive (not the midpoint) so it is robust to
    // the intra-cell position of item ends across timezones.
  }, {
    key: "getCellOccupancy",
    value: function getCellOccupancy(groupId, timeStart, timeEnd) {
      var _this$props = this.props,
        items = _this$props.items,
        keys = _this$props.keys;
      if (!keys) {
        return 'OCCUPIED';
      }
      if (!items || (0, _generic._length)(items) === 0) {
        return 'EMPTY';
      }
      var itemGroupKey = keys.itemGroupKey,
        itemTimeStartKey = keys.itemTimeStartKey,
        itemTimeEndKey = keys.itemTimeEndKey;
      var groupItems = items.filter(function (item) {
        return (0, _generic._get)(item, itemGroupKey) === groupId;
      });
      var hasOverlap = false;
      var coversEnd = false;
      var endsInside = false;
      groupItems.forEach(function (item) {
        var itemStart = (0, _generic._get)(item, itemTimeStartKey);
        var itemEnd = (0, _generic._get)(item, itemTimeEndKey);
        if (!(itemStart < timeEnd && itemEnd > timeStart)) {
          return;
        }
        hasOverlap = true;
        if (itemEnd >= timeEnd) {
          coversEnd = true;
        }
        if (itemStart <= timeStart && itemEnd > timeStart && itemEnd < timeEnd) {
          endsInside = true;
        }
      });
      if (!hasOverlap) {
        return 'EMPTY';
      }
      if (!coversEnd && endsInside) {
        return 'PARTIALLY_FREE';
      }
      return 'OCCUPIED';
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props2 = this.props,
        canvasTimeStart = _this$props2.canvasTimeStart,
        canvasTimeEnd = _this$props2.canvasTimeEnd,
        canvasWidth = _this$props2.canvasWidth,
        minUnit = _this$props2.minUnit,
        timeSteps = _this$props2.timeSteps,
        height = _this$props2.height,
        verticalLineClassNamesForTime = _this$props2.verticalLineClassNamesForTime,
        getLeftOffsetFromDate = _this$props2.getLeftOffsetFromDate,
        groups = _this$props2.groups,
        groupHeights = _this$props2.groupHeights,
        groupTops = _this$props2.groupTops,
        emptyCellLabelRenderer = _this$props2.emptyCellLabelRenderer,
        endingItemShrinkFraction = _this$props2.endingItemShrinkFraction,
        lineHeight = _this$props2.lineHeight;
      var ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);
      var lines = [];
      var emptyCellLabels = [];
      var groupOrders = emptyCellLabelRenderer && groups && this.props.keys ? (0, _calendar.getGroupOrders)(groups, this.props.keys) : null;
      (0, _calendar.iterateTimes)(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, function (time, nextTime) {
        var minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit);
        var firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0);
        var classNamesForTime = [];
        if (verticalLineClassNamesForTime) {
          classNamesForTime = verticalLineClassNamesForTime(time.unix() * 1000,
          // turn into ms, which is what verticalLineClassNamesForTime expects
          nextTime.unix() * 1000 - 1);
        }

        // TODO: rename or remove class that has reference to vertical-line
        var classNames = 'rct-vl' + (firstOfType ? ' rct-vl-first' : '') + (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute' ? " rct-day-".concat(time.day(), " ") : ' ') + classNamesForTime.join(' ');
        var left = getLeftOffsetFromDate(time.valueOf());
        var right = getLeftOffsetFromDate(nextTime.valueOf());
        lines.push( /*#__PURE__*/_react["default"].createElement("div", {
          key: "line-".concat(time.valueOf()),
          className: classNames,
          style: {
            pointerEvents: 'none',
            top: '0px',
            left: "".concat(left, "px"),
            width: "".concat(right - left, "px"),
            height: "".concat(height, "px")
          }
        }));

        // Check for empty cells and render labels if renderer is provided
        if (emptyCellLabelRenderer && groups && groupHeights && groupTops && groupOrders) {
          var timeStartMs = time.valueOf();
          var timeEndMs = nextTime.valueOf();
          var cellWidth = right - left;
          var LABEL_GAP = 2;
          groups.forEach(function (group) {
            var groupId = (0, _generic._get)(group, _this.props.keys.groupIdKey);
            var groupOrderData = groupOrders[groupId];
            if (!groupOrderData) {
              return;
            }
            var occupancy = _this.getCellOccupancy(groupId, timeStartMs, timeEndMs);
            var isPartialCell = occupancy === 'PARTIALLY_FREE';
            // Partial cells only get a label when items are shrunk, otherwise
            // the item still fills the trailing space and would overlap it.
            if (occupancy === 'OCCUPIED' || isPartialCell && endingItemShrinkFraction == null) {
              return;
            }
            var groupOrder = groupOrderData.index;
            var groupTop = groupTops[groupOrder] || 0;
            var groupHeight = groupHeights[groupOrder];
            if (!groupHeight) {
              groupHeight = group.height || lineHeight;
            }
            var label = emptyCellLabelRenderer({
              time: (0, _moment["default"])(timeStartMs),
              timeEnd: (0, _moment["default"])(timeEndMs),
              group: group,
              groupOrder: groupOrder,
              isPartialCell: isPartialCell
            });
            if (label) {
              // In partial cells the label goes in the free space after the
              // shrunk item, which occupies endingItemShrinkFraction of the cell.
              var labelLeft = left;
              var labelWidth = cellWidth;
              if (isPartialCell) {
                labelLeft = left + cellWidth * endingItemShrinkFraction + LABEL_GAP;
                labelWidth = Math.max(0, right - labelLeft);
              }
              emptyCellLabels.push( /*#__PURE__*/_react["default"].createElement("div", {
                key: "empty-cell-".concat(groupOrder, "-").concat(timeStartMs),
                className: 'rct-empty-cell-label' + (isPartialCell ? ' rct-empty-cell-label-partial' : ''),
                style: {
                  position: 'absolute',
                  top: "".concat(groupTop, "px"),
                  left: "".concat(labelLeft, "px"),
                  width: "".concat(labelWidth, "px"),
                  height: "".concat(groupHeight, "px"),
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1
                }
              }, label));
            }
          });
        }
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rct-vertical-lines"
      }, lines, emptyCellLabels);
    }
  }]);
  return Columns;
}(_react.Component);
_defineProperty(Columns, "propTypes", _objectSpread(_objectSpread({}, passThroughPropTypes), {}, {
  getLeftOffsetFromDate: _propTypes["default"].func.isRequired,
  items: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]),
  groups: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]),
  keys: _propTypes["default"].object,
  dimensionItems: _propTypes["default"].array,
  groupHeights: _propTypes["default"].array,
  groupTops: _propTypes["default"].array,
  emptyCellLabelRenderer: _propTypes["default"].func,
  endingItemShrinkFraction: _propTypes["default"].number,
  lineHeight: _propTypes["default"].number
}));
var ColumnsWrapper = function ColumnsWrapper(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/_react["default"].createElement(_TimelineStateContext.TimelineStateConsumer, null, function (_ref2) {
    var getLeftOffsetFromDate = _ref2.getLeftOffsetFromDate;
    return /*#__PURE__*/_react["default"].createElement(Columns, _extends({
      getLeftOffsetFromDate: getLeftOffsetFromDate
    }, props));
  });
};
ColumnsWrapper.defaultProps = _objectSpread({}, passThroughPropTypes);
var _default = exports["default"] = ColumnsWrapper;
