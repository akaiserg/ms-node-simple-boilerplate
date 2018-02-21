const commonResponse = require('../../common/common-response');

function BodyMiddleware(request, response, next) {
  if (request.body.name && request.body.address && request.body.id) {
    return next();
  }
  return commonResponse.setResponseWithError(response, 401, 'Forbidden');
}

module.exports.BodyMiddleware = BodyMiddleware;
