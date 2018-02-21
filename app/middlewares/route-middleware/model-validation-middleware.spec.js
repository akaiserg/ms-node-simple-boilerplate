var mockery = require('mockery');
const chai    = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
describe('ModelValidationMiddleware', () => {

    beforeEach(function () {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });
    });

    afterEach(function () {
        mockery.disable();
        mockery.deregisterAll();
    });

    describe('ModelValidationMiddleware function ', () => {

        it('should call the function  next() when the body is correct', function (done) {
            let request={};
            request.body={};
            request.body.id=11111;
            request.body.name="name";
            request.body.address="address";
            let response={};
            response.locals={};
            let nextCalled= false;
            let nextMock=()=>{
              expect(response.locals.personModel.id).to.be.equal(11111);
              expect(response.locals.personModel.name).to.be.equal('name');
              expect(response.locals.personModel.address).to.be.equal('address');
              done();
            }
            let middleware= require("./person-model-validation-middleware").PersonModelValidationMiddleware;
            middleware(request,response,nextMock);
        });

        it('should return  an error when the body is incorrect', function (done) {
          let request={};
          request.body={};
          request.body.id="11111";
          let commonResponseMock = {
                setResponseWithError:(response, code, msj)=>{
                  expect(msj).to.equal("Invalid parameters");
                  expect(code).to.equal(403);
                  done();
                }
            };
            mockery.registerMock('../../common/common-response', commonResponseMock);
            let middleware= require("./person-model-validation-middleware").PersonModelValidationMiddleware;
            let response=middleware(request,null,null);
        });

    });

});
