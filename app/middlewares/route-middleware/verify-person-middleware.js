const commonResponse = require('../../common/common-response');
const VerifyPersonController = require('../../controllers/verify-person-controller');

function VerifyPersonMiddleware(request, response) {
  const controler = new VerifyPersonController();
  // model passed by the other middleware
  controler.verify(response.locals.personModel).then((responseStorage) => {
    return commonResponse.setResponseWithOk(response, 200, responseStorage);
  })
  .catch((error) => {
    return commonResponse.setResponseWithError(response, 403, error);
  });
}
module.exports.VerifyPersonMiddleware = VerifyPersonMiddleware;
