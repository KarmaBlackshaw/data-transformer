"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isArray = function isArray(hit) {
  return Array.isArray(hit);
};

var isObject = function isObject(hit) {
  return !isArray(hit) && _typeof(hit) === 'object';
};
/**
 * Get all nested keys of an object
 *
 * @param {object|array} data - the data to extract keys from
 */


var extractKeys = function extractKeys(data) {
  var keys = [];

  if (isObject(data)) {
    for (var key in data) {
      var curr = data[key];

      if (isObject(curr)) {
        keys.push.apply(keys, _toConsumableArray(extractKeys(curr)));
      }

      keys.push(key);
    }
  }

  if (isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      var _curr = data[i];

      if (isObject(_curr)) {
        keys.push.apply(keys, _toConsumableArray(extractKeys(_curr)));
      }
    }
  }

  return Array.from(new Set(set));
};
/**
 * Convert word to its  minified version
 *
 * @param {string} word   - the word to minify
 * @param {number} depth  - word minifation depth
 */


var minifyWord = function minifyWord(word, depth) {
  return /_/.test(word) ? word.split('_').map(function (x) {
    return x.substring(0, depth);
  }).join('') : word.substring(0, depth);
};
/**
 * Convert an array of strings to its minified version
 *
 * @param {array} keys - unique keys to be minified
 */


var generateDictionary = function generateDictionary(data) {
  var keys = extractKeys(data);
  var hashContainer = {};
  var dictionary = {};

  for (var i = 0; i < keys.length; i++) {
    var curr = keys[i];
    var hash = void 0;
    var isFound = false;
    var count = 1;

    while (!isFound) {
      hash = minifyWord(curr, count);

      if (!hashContainer[hash]) {
        hashContainer[hash] = curr;
        isFound = true;
      } else {
        count++;
      }
    }

    dictionary[curr] = hash;
  }

  return dictionary;
};
/**
 * Minify keys
 *
 * @param {array|object} data - the data to be minified
 * @param {object} dictionary - the keys dictionary { [word]: minified_word }
 */


var minify = function minify(data, dictionary) {
  if (isObject(data)) {
    var newData = {};

    for (var key in data) {
      var curr = data[key];

      if (isObject(curr) || isArray(curr)) {
        newData[dictionary[key]] = minify(curr, dictionary);
      } else {
        newData[dictionary[key]] = curr;
      }
    }

    return newData;
  }

  if (isArray(data)) {
    var _newData = [];

    for (var i = 0; i < data.length; i++) {
      var _curr2 = data[i];
      console.log(_curr2);

      if (isObject(_curr2) || isArray(_curr2)) {
        _newData[i] = minify(_curr2, dictionary);
      } else {
        _newData[i] = _curr2;
      }
    }

    return _newData;
  }
};
/**
 * Magnify keys
 *
 * @param {array|object} data - the data to be magnified
 * @param {object} dictionary - the keys dictionary { [word]: minified_word }
 */


var magnify = function magnify(data, dictionary) {
  var revertedDictionary = Object.entries(dictionary).reduce(function (acc, curr) {
    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, curr[1], curr[0]));
  }, {});
  return minify(data, revertedDictionary);
};

module.exports = {
  generateDictionary: generateDictionary,
  minify: minify,
  magnify: magnify
};