var mockery = require('mockery');
const chai    = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
describe('VerifyPersonMiddleware', () => {

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

    describe('VerifyPersonMiddleware function ', () => {

        it('should response with  an ok message', function (done) {
          let response = {};
          response.locals = {};
          response.locals.personModel = {};
          let commonResponseMock = {
              setResponseWithOk:(response, code, msj)=>{
                expect(msj).to.equal("ok");
                expect(code).to.equal(200);
                done();
              }
          };
          mockery.registerMock('../../common/common-response', commonResponseMock);

          let controllerMock = function() {
            this.verify=function(model){
              return new Promise((resolve,reject)=>{resolve('ok')});
            }
          };
          mockery.registerMock('../../controllers/verify-person-controller', controllerMock);

          let middleware= require("./verify-person-middleware").VerifyPersonMiddleware;
          middleware(null,response);
        });

        it('should response with  an error when  something went wrong', function (done) {
          let response = {};
          response.locals = {};
          response.locals.personModel = {};
          let commonResponseMock = {
              setResponseWithError:(response, code, msj)=>{
                expect(msj).to.equal("error");
                expect(code).to.equal(403);
                done();
              }
          };
          mockery.registerMock('../../common/common-response', commonResponseMock);

          let controllerMock = function() {
            this.verify=function(model){
              return new Promise((resolve,reject)=>{reject('error')});
            }
          };
          mockery.registerMock('../../controllers/verify-person-controller', controllerMock);

          let middleware= require("./verify-person-middleware").VerifyPersonMiddleware;
          middleware(null,response);
        });

    });

});
