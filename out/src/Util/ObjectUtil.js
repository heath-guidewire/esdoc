'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides common object manipulation utilities.
 */
var ObjectUtil = function () {
  function ObjectUtil() {
    _classCallCheck(this, ObjectUtil);
  }

  _createClass(ObjectUtil, null, [{
    key: 'safeAccess',

    /**
     * Provides a way to safely access an objects data / entries given an accessor string which describes the
     * entries to walk. To access deeper entries into the object format the accessor string with `.` between entries
     * to walk.
     *
     * @param {object}   data - An object to access entry data.
     * @param {string}   accessor - A string describing the entries to access.
     * @param {*}        defaultValue - (Optional) A default value to return if an entry for accessor is not found.
     *
     * @returns {*}
     */
    value: function safeAccess(data, accessor) {
      var defaultValue = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
        throw new TypeError('safeSet Error: \'data\' is not an \'object\'.');
      }
      if (typeof accessor !== 'string') {
        throw new TypeError('safeSet Error: \'accessor\' is not a \'string\'.');
      }

      var access = accessor.split('.');

      // Walk through the given object by the accessor indexes.
      for (var cntr = 0; cntr < access.length; cntr++) {
        // If the next level of object access is undefined or null then return the empty string.
        if (typeof data[access[cntr]] === 'undefined' || data[access[cntr]] === null) {
          return defaultValue;
        }

        data = data[access[cntr]];
      }

      return data;
    }

    /**
     * Provides a way to safely set an objects data / entries given an accessor string which describes the
     * entries to walk. To access deeper entries into the object format the accessor string with `.` between entries
     * to walk.
     *
     * @param {object}   data - An object to access entry data.
     * @param {string}   accessor - A string describing the entries to access.
     * @param {*}        value - A new value to set if an entry for accessor is found.
     *
     * @returns {boolean} True if successful.
     */

  }, {
    key: 'safeSet',
    value: function safeSet(data, accessor, value) {
      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
        throw new TypeError('safeSet Error: \'data\' is not an \'object\'.');
      }
      if (typeof accessor !== 'string') {
        throw new TypeError('safeSet Error: \'accessor\' is not a \'string\'.');
      }

      var access = accessor.split('.');

      // Walk through the given object by the accessor indexes.
      for (var cntr = 0; cntr < access.length; cntr++) {

        // If the next level of object access is undefined then create a new object entry.
        if (typeof data[access[cntr]] === 'undefined') {
          data[access[cntr]] = {};
        }

        // Abort if the next level is null or not an object and containing a value.
        if (data[access[cntr]] === null || _typeof(data[access[cntr]]) !== 'object') {
          return false;
        }

        if (cntr === access.length - 1) {
          data[access[cntr]] = value;
        } else {
          data = data[access[cntr]];
        }
      }

      return true;
    }
  }]);

  return ObjectUtil;
}();

exports.default = ObjectUtil;
module.exports = exports['default'];