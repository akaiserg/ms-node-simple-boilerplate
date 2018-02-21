const commonResponse = require('../../common/common-response');
const commonConfig = require('../../config/index');

function TokenMiddleware(req, res, next) {
  if (req.headers['x-access-token'] === commonConfig.config.accessToken) {
    return next();
  }
  return commonResponse.setResponseWithError(res, 401, 'Forbidden');
}

module.exports.TokenMiddleware = TokenMiddleware;
