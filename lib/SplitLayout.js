'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Pane = require('./Pane');

var _Pane2 = _interopRequireDefault(_Pane);

var _Divider = require('./Divider');

var _Divider2 = _interopRequireDefault(_Divider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _styles = {
  base: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    outline: 'none',
    overflow: 'hidden',
    userSelect: 'none'
  },
  vertical: {
    flexDirection: 'row',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0
  },
  horizontal: {
    flexDirection: 'column',
    height: '100%',
    minHeight: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%'
  },
  dragging: {
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
    WebKitAppRegion: 'no-drag'
  }
};

var SplitLayout = (function (_React$Component) {
  _inherits(SplitLayout, _React$Component);

  function SplitLayout(props, context) {
    _classCallCheck(this, SplitLayout);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SplitLayout).call(this, props, context));

    _this.state = { active: false, sizes: _this.props.initialSizes };
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    _this.createOnMouseDownWithKey = _this.createOnMouseDownWithKey.bind(_this);
    _this.onMouseMove = _this.onMouseMove.bind(_this);
    return _this;
  }

  _createClass(SplitLayout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('mousemove', this.onMouseMove);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('mousemove', this.onMouseMove);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var direction = this.props.direction;
      var initialSizes = this.props.initialSizes;
      var styles = this.styles();
      var children = [];

      this.props.children.forEach(function (child, index) {
        var paneId = 'pane-' + index;
        var pane = _react2.default.createElement(
          _Pane2.default,
          {
            ref: paneId,
            key: paneId,
            style: _this2.props.paneStyle,
            initialSize: initialSizes[index],
            direction: direction },
          child
        );
        children.push(pane);

        if (index != _this2.props.children.length - 1) {
          var dividerId = 'divider-' + index;
          var divider = _react2.default.createElement(_Divider2.default, {
            key: dividerId,
            color: _this2.props.dividerColor,
            style: _this2.props.dividerStyle,
            direction: direction,
            onMouseDown: _this2.createOnMouseDownWithKey(paneId, index) });
          children.push(divider);
        }
      });

      return _react2.default.createElement(
        'div',
        { style: styles },
        children
      );
    }
  }, {
    key: 'createOnMouseDownWithKey',
    value: function createOnMouseDownWithKey(key, index) {
      var _this3 = this;

      return function (event) {
        var ref = _this3.refs[key];
        var node = _reactDom2.default.findDOMNode(ref);
        var position = _this3.props.direction === 'vertical' ? event.clientX : event.clientY;
        _this3.setState({
          active: true,
          index: index,
          ref: ref,
          node: node,
          position: position
        });
      };
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {
      if (!this.state.active || !this.state.node) {
        return;
      }

      var boundingClientOffset = this.state.node.getBoundingClientRect();
	  var minEdgePosition = this.props.direction === 'vertical' ? boundingClientOffset.left : boundingClientOffset.top;
      var currentPosition = this.props.direction === 'vertical' ? event.clientX : event.clientY;
      var size = currentPosition - minEdgePosition;
      var index = this.state.index;
      var minSize = this.props.minSizes[index];
      var maxSize = this.props.maxSizes[index];
      if (minSize && size < minSize || maxSize && size > maxSize) {
        return;
      }
      this.state.ref.setState({ size: size });

      if (this.props.onChange) {
        var sizes = this.state.sizes ? this.state.sizes.slice(0) : [];
        sizes[index] = size;
        this.props.onChange(sizes);
        this.setState({ sizes: sizes });
      }
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(event) {
      this.setState({
        active: false
      });
    }
  }, {
    key: 'styles',
    value: function styles() {
      var direction = this.props.direction;
      var draggingStyles = this.state.active ? _styles.dragging : {};
      return Object.assign({}, _styles.base, _styles[direction], draggingStyles, this.props.style);
    }
  }]);

  return SplitLayout;
})(_react2.default.Component);

exports.default = SplitLayout;

function validateNullOrNumberArray(props, propName, componentName) {
  var content = props[propName];
  if (content === null) {
    return null;
  }

  if (!Array.isArray(content)) {
    return new Error(componentName + '.' + propName + ' should be null or array of numbers, given: ' + content);
  }
  function IsNumeric(data) {
    return typeof data == "number";
  }
  if (content.some(function (e) {
    return e != null && !IsNumeric(e);
  })) {
    return new Error(componentName + '.' + propName + ' should be null or array of numbers, given: ' + content);
  }
}

SplitLayout.propTypes = {
  direction: _react2.default.PropTypes.string,
  dividerColor: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object,
  paneStyle: _react2.default.PropTypes.object,
  dividerStyle: _react2.default.PropTypes.object,
  initialSizes: validateNullOrNumberArray,
  minSizes: validateNullOrNumberArray,
  maxSizes: validateNullOrNumberArray,
  onChange: _react2.default.PropTypes.func
};

SplitLayout.defaultProps = {
  direction: 'vertical',
  dividerColor: 'rgba(128, 128, 128, 1)',
  initialSizes: [],
  minSizes: [],
  maxSizes: []
};