const commonResponse = require('../../common/common-response');
const isUndefined = require('../../common/common-validator').isUndefined;
const isNull = require('../../common/common-validator').isNull;
const isString = require('../../common/common-validator').isString;

function HeaderMiddleware(request, response, next) {
  const token = request.headers['x-access-token'];
  if (token && !isUndefined(token) && !isNull(token) && isString(token)) {
    return next();
  }
  return commonResponse.setResponseWithError(response, 401, 'Forbidden');
}

module.exports.HeaderMiddleware = HeaderMiddleware;
