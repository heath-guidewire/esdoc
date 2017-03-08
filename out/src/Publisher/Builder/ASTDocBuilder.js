'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DocBuilder2 = require('./DocBuilder.js');

var _DocBuilder3 = _interopRequireDefault(_DocBuilder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * AST Output Builder class.
 */
var ASTDocBuilder = function (_DocBuilder) {
  _inherits(ASTDocBuilder, _DocBuilder);

  /**
   * create instance.
   * @param {Taffy} data - doc comment database.
   * @param {AST[]} asts - all source code ASTs.
   * @param {ESDocConfig} config - ESDoc config object.
   */
  function ASTDocBuilder(data, asts, config) {
    _classCallCheck(this, ASTDocBuilder);

    var _this = _possibleConstructorReturn(this, (ASTDocBuilder.__proto__ || Object.getPrototypeOf(ASTDocBuilder)).call(this, data, config));

    _this._asts = asts;
    return _this;
  }

  /**
   * execute building output.
   * @param {function(ast: string, filePath: string)} callback - is called each asts.
   */


  _createClass(ASTDocBuilder, [{
    key: 'exec',
    value: function exec(callback) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._asts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var ast = _step.value;

          var json = JSON.stringify(ast.ast, null, 2);
          var filePath = 'ast/' + ast.filePath + '.json';
          callback(json, filePath);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return ASTDocBuilder;
}(_DocBuilder3.default);

exports.default = ASTDocBuilder;
module.exports = exports['default'];