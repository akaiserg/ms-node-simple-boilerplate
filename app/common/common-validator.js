const _ = require('lodash');

function isObject(value) {
  return _.isObject(value);
}

function isNull(value) {
  return _.isNull(value);
}

function isUndefined(value) {
  return _.isUndefined(value);
}

function isString(value) {
  return _.isString(value);
}

function isInteger(value) {
  return _.isInteger(value);
}

module.exports.isUndefined = isUndefined;
module.exports.isNull = isNull;
module.exports.isObject = isObject;
module.exports.isString = isString;
module.exports.isInteger = isInteger;
