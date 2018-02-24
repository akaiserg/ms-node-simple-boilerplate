const commonResponse = require('../../common/common-response');
const config = require('../../config/index');

function TokenMiddleware(req, res, next) {
  if (req.headers['x-access-token'] === config.accessToken) {
    return next();
  }
  return commonResponse.setResponseWithError(res, 401, 'Forbidden');
}

module.exports.TokenMiddleware = TokenMiddleware;
