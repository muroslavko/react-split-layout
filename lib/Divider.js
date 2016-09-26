'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Divider = (function (_React$Component) {
  _inherits(Divider, _React$Component);

  function Divider() {
    _classCallCheck(this, Divider);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Divider).apply(this, arguments));
  }

  _createClass(Divider, [{
    key: 'render',
    value: function render() {
      var direction = this.props.direction;
      var color = this.props.color;
      var style = Object.assign({}, styles.base, styles[direction], { background: styles.base.background + " " + color }, this.props.style);
      return _react2.default.createElement('span', {
        style: style,
        onMouseDown: this.props.onMouseDown
      });
    }
  }]);

  return Divider;
})(_react2.default.Component);

var styles = {
  base: {
    boxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    background: "padding-box",

    opacity: 0.2,
    zIndex: 1,

    WebkitBackgroundClip: "padding-box",
    MozBackgroundClip: "padding-box"
  },

  horizontal: {
    height: 11,
    grow: 0,
    margin: "-5px 0",
    borderTop: "5px solid rgba(255, 255, 255, 0)",
    borderBottom: "5px solid rgba(255, 255, 255, 0)",
    cursor: "row-resize",
    width: "100%"
  },

  vertical: {
    width: 11,
    grow: 0,
    margin: "0 -5px",
    borderLeft: "5px solid rgba(255, 255, 255, 0)",
    borderRight: "5px solid rgba(255, 255, 255, 0)",
    cursor: "col-resize",
    height: "100%"
  }
};

Divider.propTypes = {
  direction: _react2.default.PropTypes.string,
  color: _react2.default.PropTypes.string
};

Divider.defaultProps = {
  direction: 'vertical',
  color: "rgba(128, 128, 128, 1)"
};

exports.default = Divider;