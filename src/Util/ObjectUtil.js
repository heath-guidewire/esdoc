/**
 * Provides common object manipulation utilities.
 */
export default class ObjectUtil
{
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
  static safeAccess(data, accessor, defaultValue = undefined)
  {
    if (typeof data !== 'object') { throw new TypeError(`safeSet Error: 'data' is not an 'object'.`); }
    if (typeof accessor !== 'string') { throw new TypeError(`safeSet Error: 'accessor' is not a 'string'.`); }

    const access = accessor.split('.');

    // Walk through the given object by the accessor indexes.
    for (let cntr = 0; cntr < access.length; cntr++) {
      // If the next level of object access is undefined or null then return the empty string.
      if (typeof data[access[cntr]] === 'undefined' || data[access[cntr]] === null) { return defaultValue; }

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
  static safeSet(data, accessor, value)
  {
    if (typeof data !== 'object') { throw new TypeError(`safeSet Error: 'data' is not an 'object'.`); }
    if (typeof accessor !== 'string') { throw new TypeError(`safeSet Error: 'accessor' is not a 'string'.`); }

    const access = accessor.split('.');

    // Walk through the given object by the accessor indexes.
    for (let cntr = 0; cntr < access.length; cntr++) {

      // If the next level of object access is undefined then create a new object entry.
      if (typeof data[access[cntr]] === 'undefined') { data[access[cntr]] = {}; }

      // Abort if the next level is null or not an object and containing a value.
      if (data[access[cntr]] === null || typeof data[access[cntr]] !== 'object') { return false; }

      if (cntr === access.length - 1) {
        data[access[cntr]] = value;
      }
      else {
        data = data[access[cntr]];
      }
    }

    return true;
  }
}