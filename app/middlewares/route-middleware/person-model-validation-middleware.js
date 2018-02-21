const commonResponse = require('../../common/common-response');
const PersonModel = require('../../model/peson-model');

function PersonModelValidationMiddleware(request, response, next) {
  const personModel = new PersonModel(request.body.id, request.body.name,
    request.body.address);
  if (!personModel.isValid()) {
    return commonResponse.setResponseWithError(response, 403, 'Invalid parameters');
  }
  // get the frozen person model
  response.locals.personModel = personModel.getPersonModel();
  next();
}

module.exports.PersonModelValidationMiddleware = PersonModelValidationMiddleware;
