function setResponseWithError(res, status, error) {
  return res.status(status).send({ code: 'error', message: error });
}

function setResponseWithOk(res, status, data) {
  return res.status(status).send({ code: 'ok', message: data });
}

module.exports.setResponseWithError = setResponseWithError;
module.exports.setResponseWithOk = setResponseWithOk;

