'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pane = (function (_React$Component) {
  _inherits(Pane, _React$Component);

  function Pane(props, context) {
    _classCallCheck(this, Pane);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Pane).call(this, props, context));

    _this.state = { size: _this.props.initialSize };
    return _this;
  }

  _createClass(Pane, [{
    key: 'onChange',
    value: function onChange(size) {
      this.setSize({ size: size });
    }
  }, {
    key: 'render',
    value: function render() {
      var style = this.getCurrentStyle();
      return _react2.default.createElement(
        'div',
        { style: style },
        this.props.children
      );
    }
  }, {
    key: 'getCurrentStyle',
    value: function getCurrentStyle() {
      var direction = this.props.direction;
      var grow = this.props.grow;
      var size = this.state.size;
      var style = {
        flex: 1,
        position: 'relative',
        outline: 'none',
        flexGrow: grow
      };
      if (this.state.size) {
        if (direction === 'vertical') {
          style = Object.assign(style, { width: size, display: 'flex', flex: "none", flexGrow: 0 }, this.props.style);
        } else {
          style = Object.assign(style, { height: size, display: 'flex', flex: "none", flexGrow: 0 }, this.props.style);
        }
      } else {
        style = Object.assign(style, { flexGrow: 1 }, this.props.style);
      }
      return style;
    }
  }]);

  return Pane;
})(_react2.default.Component);

exports.default = Pane;
;

Pane.propTypes = {
  direction: _react2.default.PropTypes.string,
  grow: _react2.default.PropTypes.number,
  initialSize: _react2.default.PropTypes.number
};
Pane.defaultProps = {
  direction: 'vertical',
  grow: 1,
  initialSize: null
};