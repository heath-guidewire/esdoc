'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _iceCap = require('ice-cap');

var _iceCap2 = _interopRequireDefault(_iceCap);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _DocBuilder2 = require('./DocBuilder.js');

var _DocBuilder3 = _interopRequireDefault(_DocBuilder2);

var _util = require('./util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Manual Output Builder class.
 */
var ManualDocBuilder = function (_DocBuilder) {
  _inherits(ManualDocBuilder, _DocBuilder);

  function ManualDocBuilder() {
    _classCallCheck(this, ManualDocBuilder);

    return _possibleConstructorReturn(this, (ManualDocBuilder.__proto__ || Object.getPrototypeOf(ManualDocBuilder)).apply(this, arguments));
  }

  _createClass(ManualDocBuilder, [{
    key: 'exec',

    /**
     * execute building output.
     * @param {function(html: string, filePath: string)} callback - is called each manual.
     * @param {function(src: string, dest: string)} callbackForCopy - is called asset.
     */
    value: function exec(callback, callbackForCopy) {
      if (!this._config.manual) return;

      var manualConfig = this._getManualConfig();
      var ice = this._buildLayoutDoc();
      ice.autoDrop = false;
      ice.attr('rootContainer', 'class', ' manual-root');

      {
        var fileName = 'manual/index.html';
        var baseUrl = this._getBaseUrl(fileName);
        this._buildManualIndex(manualConfig);
        ice.load('content', this._buildManualCardIndex(manualConfig), _iceCap2.default.MODE_WRITE);
        ice.load('nav', this._buildManualNav(manualConfig), _iceCap2.default.MODE_WRITE);
        ice.text('title', 'Manual', _iceCap2.default.MODE_WRITE);
        ice.attr('baseUrl', 'href', baseUrl, _iceCap2.default.MODE_WRITE);
        ice.attr('rootContainer', 'class', ' manual-index');
        callback(ice.html, fileName, fileName);

        if (this._config.manual.globalIndex) {
          ice.attr('baseUrl', 'href', './', _iceCap2.default.MODE_WRITE);
          callback(ice.html, 'index.html');
        }

        ice.attr('rootContainer', 'class', ' manual-index', _iceCap2.default.MODE_REMOVE);
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = manualConfig[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (!item.paths) continue;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = item.paths[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var filePath = _step2.value;

              var _fileName = this._getManualOutputFileName(item, filePath);
              var _baseUrl = this._getBaseUrl(_fileName);
              ice.load('content', this._buildManual(item, filePath), _iceCap2.default.MODE_WRITE);
              ice.load('nav', this._buildManualNav(manualConfig), _iceCap2.default.MODE_WRITE);
              ice.text('title', item.label, _iceCap2.default.MODE_WRITE);
              ice.attr('baseUrl', 'href', _baseUrl, _iceCap2.default.MODE_WRITE);
              callback(ice.html, _fileName, filePath);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
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

      if (this._config.manual.asset) {
        callbackForCopy(this._config.manual.asset, 'manual/asset');
      }
    }

    /**
     * get manual config based on ``config.manual``.
     * @returns {ManualConfigItem[]} built manual config.
     * @private
     */

  }, {
    key: '_getManualConfig',
    value: function _getManualConfig() {
      var m = this._config.manual;
      var manualConfig = [];
      if (m.overview) manualConfig.push({ label: 'Overview', paths: m.overview, type: 'overview' });
      if (m.design) manualConfig.push({ label: 'Design', paths: m.design, type: 'design' });
      if (m.installation) manualConfig.push({ label: 'Installation', paths: m.installation, type: 'installation' });
      if (m.tutorial) manualConfig.push({ label: 'Tutorial', paths: m.tutorial, type: 'tutorial' });
      if (m.usage) manualConfig.push({ label: 'Usage', paths: m.usage, type: 'usage' });
      if (m.configuration) manualConfig.push({ label: 'Configuration', paths: m.configuration, type: 'configuration' });
      if (m.advanced) manualConfig.push({ label: 'Advanced', paths: m.advanced, type: 'advanced' });
      if (m.example) manualConfig.push({ label: 'Example', paths: m.example, type: 'example' });
      manualConfig.push({ label: 'Reference', fileName: 'identifiers.html', references: true, type: 'reference' });
      if (m.faq) manualConfig.push({ label: 'FAQ', paths: m.faq, type: 'faq' });
      if (m.changelog) manualConfig.push({ label: 'Changelog', paths: m.changelog, type: 'changelog' });
      if (Array.isArray(m.customPages)) this._addCustomPages(manualConfig, m.customPages);
      return manualConfig;
    }
  }, {
    key: '_validateCustomPageConfig',
    value: function _validateCustomPageConfig(existingTypes, customPage) {
      if (typeof customPage.label !== 'string') {
        console.log('Custom manual page config "label" is not a string, skipping: ', customPage);
        return { isValid: false };
      }
      if (!Array.isArray(customPage.paths)) {
        console.log('Custom manual page config "paths" is not an array, skipping: ', customPage);
        return { isValid: false };
      }
      var invalidLabelCharacters = /[^\w ]+/g;
      var badCharacters = customPage.label.match(invalidLabelCharacters);
      if (badCharacters) {
        console.log('Custom manual page config "label" contains invalid characters "' + badCharacters + '", skipping:', customPage);
        return { isValid: false };
      }
      var type = customPage.label.replace(/ /g, '_').toLowerCase();
      if (existingTypes.indexOf(type) >= 0) {
        console.log('Custom manual page config "label" duplicates existing label, skipping: ', customPage);
        return { isValid: false };
      }
      return { isValid: true, type: type };
    }
  }, {
    key: '_addCustomPages',
    value: function _addCustomPages(manualConfigs, customPageList) {
      var existingTypes = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = manualConfigs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var manualConfig = _step3.value;

          existingTypes.push(manualConfig.type);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = customPageList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var customPage = _step4.value;

          var validationInfo = this._validateCustomPageConfig(existingTypes, customPage);
          if (validationInfo.isValid) {
            customPage.type = validationInfo.type;
            customPage.isCustom = true;
            existingTypes.push(validationInfo.type);
            manualConfigs.push(customPage);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }

    /**
     * build manual navigation.
     * @param {ManualConfigItem[]} manualConfig - target manual config.
     * @return {IceCap} built navigation
     * @private
     */

  }, {
    key: '_buildManualNav',
    value: function _buildManualNav(manualConfig) {
      var ice = this._buildManualIndex(manualConfig);
      var $root = _cheerio2.default.load(ice.html).root();
      $root.find('.github-markdown').removeClass('github-markdown');
      return $root.html();
    }

    /**
     * build manual.
     * @param {ManualConfigItem} item - target manual config item.
     * @param {string} filePath - target manual file path.
     * @return {IceCap} built manual.
     * @private
     */

  }, {
    key: '_buildManual',
    value: function _buildManual(item, filePath) {
      var html = this._convertMDToHTML(filePath);
      var ice = new _iceCap2.default(this._readTemplate('manual.html'));
      ice.text('title', item.label);
      ice.text('manualPath', filePath);
      ice.load('content', html);

      // convert relative src to base url relative src.
      var $root = _cheerio2.default.load(ice.html).root();
      $root.find('img').each(function (i, el) {
        var $el = (0, _cheerio2.default)(el);
        var src = $el.attr('src');
        if (!src) return;
        if (src.match(/^http[s]?:/)) return;
        if (src.charAt(0) === '/') return;
        $el.attr('src', './manual/' + src);
      });
      $root.find('a').each(function (i, el) {
        var $el = (0, _cheerio2.default)(el);
        var href = $el.attr('href');
        if (!href) return;
        if (href.match(/^http[s]?:/)) return;
        if (href.charAt(0) === '/') return;
        if (href.charAt(0) === '#') return;
        $el.attr('href', './manual/' + href);
      });

      return $root.html();
    }

    /**
     * built manual card style index.
     * @param {ManualConfigItem[]} manualConfig - target manual config.
     * @return {IceCap} built index.
     * @private
     */

  }, {
    key: '_buildManualCardIndex',
    value: function _buildManualCardIndex(manualConfig) {
      var _this2 = this;

      var cards = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = manualConfig[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var manualItem = _step5.value;

          if (manualItem.references) {
            var filePath = _path2.default.resolve(this._config.destination, 'identifiers.html');
            var html = _fsExtra2.default.readFileSync(filePath).toString();
            var $ = _cheerio2.default.load(html);
            var card = $('.content').html();
            var identifiers = this._findAllIdentifiersKindGrouping();
            var sectionCount = identifiers.class.length + identifiers.interface.length + identifiers.function.length + identifiers.typedef.length + identifiers.external.length;

            cards.push({ label: 'References', link: 'identifiers.html', card: card, type: 'reference', sectionCount: sectionCount });
            continue;
          }

          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            var _loop = function _loop() {
              var filePath = _step6.value;

              var type = manualItem.type;
              var fileName = _this2._getManualOutputFileName(manualItem, filePath);
              var html = _this2._buildManual(manualItem, filePath);
              var $root = _cheerio2.default.load(html).root();
              var h1Count = $root.find('h1').length;
              var sectionCount = $root.find('h1,h2,h3,h4,h5').length;

              $root.find('h1').each(function (i, el) {
                var $el = (0, _cheerio2.default)(el);
                var label = $el.text();
                var link = h1Count === 1 ? fileName : fileName + '#' + $el.attr('id');
                var card = '<h1>' + label + '</h1>';
                var nextAll = $el.nextAll();

                for (var _i = 0; _i < nextAll.length; _i++) {
                  var next = nextAll.get(_i);
                  var tagName = next.tagName.toLowerCase();
                  if (tagName === 'h1') return;
                  var $next = (0, _cheerio2.default)(next);
                  card += '<' + tagName + '>' + $next.html() + '</' + tagName + '>';
                }

                cards.push({ label: label, link: link, card: card, type: type, sectionCount: sectionCount });
              });
            };

            for (var _iterator6 = manualItem.paths[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              _loop();
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      var ice = new _iceCap2.default(this._readTemplate('manualCardIndex.html'));
      ice.loop('cards', cards, function (i, card, ice) {
        ice.text('label-inner', card.label);
        ice.attr('label', 'class', 'manual-color manual-color-' + card.type);

        var sectionCount = Math.min(card.sectionCount / 5 + 1, 5);
        ice.attr('label', 'data-section-count', '■'.repeat(sectionCount));

        ice.attr('link', 'href', card.link);
        ice.load('card', card.card);
      });

      if (this._config.manual.index) {
        var userIndex = this._convertMDToHTML(this._config.manual.index);
        ice.load('manualUserIndex', userIndex);
      } else {
        ice.drop('manualUserIndex', true);
      }

      ice.drop('manualBadge', !this._config.manual.coverage);

      return ice;
    }

    /**
     * built manual index.
     * @param {ManualConfigItem[]} manualConfig - target manual config.
     * @return {IceCap} built index.
     * @private
     */

  }, {
    key: '_buildManualIndex',
    value: function _buildManualIndex(manualConfig) {
      var _this3 = this;

      var ice = new _iceCap2.default(this._readTemplate('manualIndex.html'));
      var _manualConfig = manualConfig.filter(function (item) {
        return item.paths && item.paths.length || item.references;
      });

      ice.loop('manual', _manualConfig, function (i, item, ice) {
        var toc = [];
        if (item.references) {
          var identifiers = _this3._findAllIdentifiersKindGrouping();
          toc.push({ label: 'Reference', link: 'identifiers.html', indent: 'indent-h1' });
          if (identifiers.class.length) toc.push({ label: 'Class', link: 'identifiers.html#class', indent: 'indent-h2' });
          if (identifiers.interface.length) toc.push({ label: 'Interface', link: 'identifiers.html#interface', indent: 'indent-h2' });
          if (identifiers.function.length) toc.push({ label: 'Function', link: 'identifiers.html#function', indent: 'indent-h2' });
          if (identifiers.variable.length) toc.push({ label: 'Variable', link: 'identifiers.html#variable', indent: 'indent-h2' });
          if (identifiers.typedef.length) toc.push({ label: 'Typedef', link: 'identifiers.html#typedef', indent: 'indent-h2' });
          if (identifiers.external.length) toc.push({ label: 'External', link: 'identifiers.html#external', indent: 'indent-h2' });

          toc[0].sectionCount = identifiers.class.length + identifiers.interface.length + identifiers.function.length + identifiers.typedef.length + identifiers.external.length;
        } else {
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            var _loop2 = function _loop2() {
              var filePath = _step7.value;

              var fileName = _this3._getManualOutputFileName(item, filePath);
              var html = _this3._convertMDToHTML(filePath);
              var $root = _cheerio2.default.load(html).root();
              var h1Count = $root.find('h1').length;
              var sectionCount = $root.find('h1,h2,h3,h4,h5').length;

              $root.find('h1,h2,h3,h4,h5').each(function (i, el) {
                var $el = (0, _cheerio2.default)(el);
                var label = $el.text();
                var indent = 'indent-' + el.tagName.toLowerCase();

                var link = fileName + '#' + $el.attr('id');
                if (el.tagName.toLowerCase() === 'h1' && h1Count === 1) link = fileName;

                toc.push({ label: label, link: link, indent: indent, sectionCount: sectionCount });
              });
            };

            for (var _iterator7 = item.paths[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              _loop2();
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        }

        ice.attr('manual', 'data-toc-name', item.type);
        ice.loop('manualNav', toc, function (i, tocItem, ice) {
          if (tocItem.indent === 'indent-h1') {
            var manualType = item.isCustom ? 'custom' : item.type;
            ice.attr('manualNav', 'class', tocItem.indent + ' manual-color manual-color-' + manualType);
            var _sectionCount = Math.min(tocItem.sectionCount / 5 + 1, 5);
            ice.attr('manualNav', 'data-section-count', '■'.repeat(_sectionCount));
          } else {
            ice.attr('manualNav', 'class', tocItem.indent);
          }

          ice.attr('manualNav', 'data-link', tocItem.link.split('#')[0]);
          ice.text('link', tocItem.label);
          ice.attr('link', 'href', tocItem.link);
        });
      });

      return ice;
    }

    /**
     * get manual file name.
     * @param {ManualConfigItem} item - target manual config item.
     * @param {string} filePath - target manual markdown file path.
     * @returns {string} file name.
     * @private
     */

  }, {
    key: '_getManualOutputFileName',
    value: function _getManualOutputFileName(item, filePath) {
      if (item.fileName) return item.fileName;

      var fileName = _path2.default.parse(filePath).name;
      return 'manual/' + item.type + '/' + fileName + '.html';
    }

    /**
     * convert markdown to html.
     * if markdown has only one ``h1`` and it's text is ``item.label``, remove the ``h1``.
     * because duplication ``h1`` in output html.
     * @param {string} filePath - target.
     * @returns {string} converted html.
     * @private
     */

  }, {
    key: '_convertMDToHTML',
    value: function _convertMDToHTML(filePath) {
      var content = _fsExtra2.default.readFileSync(filePath).toString();
      var html = (0, _util.markdown)(content);
      var $root = _cheerio2.default.load(html).root();
      return $root.html();
    }
  }]);

  return ManualDocBuilder;
}(_DocBuilder3.default);

exports.default = ManualDocBuilder;
module.exports = exports['default'];