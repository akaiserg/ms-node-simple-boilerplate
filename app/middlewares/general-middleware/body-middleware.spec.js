const mockery = require('mockery');
const chai    = require('chai');
const expect = chai.expect;

describe('BodyMiddleware', () => {

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

    describe('BodyMiddleware function ', () => {

        it('should call the function  next() when the body is ok', function (done) {
            let request={};
            request.body={};
            request.body.name="name";
            request.body.address="address";
            request.body.id="id";
            let nextCalled= false;
            let nextMock=()=>{
                nextCalled=true;
                expect(nextCalled).to.be.true;
                done();
            }
            let middleware= require("./body-middleware").BodyMiddleware;
            middleware(request,null,nextMock);
        });

        it('should return  401 forbiden when no body is present', function (done) {
            let request={};
            request.body={};
            let commonResponseMock = {
              setResponseWithError:(response, code, msj)=>{
                    expect(msj).to.equal("Forbidden");
                    expect(code).to.equal(401);
                    done();
                }
            };
            mockery.registerMock('../../common/common-response', commonResponseMock);
            let middleware= require("./body-middleware").BodyMiddleware;
            middleware(request,null,null);
        });

        it('should return  401 forbiden when id is present', function (done) {
          let request={};
          request.body={};
          request.body.name="name";
          request.body.address="address";
          let commonResponseMock = {
            setResponseWithError:(response, code, msj)=>{
                  expect(msj).to.equal("Forbidden");
                  expect(code).to.equal(401);
                  done();
              }
          };
          mockery.registerMock('../../common/common-response', commonResponseMock);
          let middleware= require("./body-middleware").BodyMiddleware;
          middleware(request,null,null);
        });

        it('should return  401 forbiden when name is present', function (done) {
          let request={};
          request.body={};
          request.body.id="id";
          request.body.address="address";
          let commonResponseMock = {
            setResponseWithError:(response, code, msj)=>{
                  expect(msj).to.equal("Forbidden");
                  expect(code).to.equal(401);
                  done();
              }
          };
          mockery.registerMock('../../common/common-response', commonResponseMock);
          let middleware= require("./body-middleware").BodyMiddleware;
          middleware(request,null,null);
        });

        it('should return  401 forbiden when address is present', function (done) {
          let request={};
          request.body={};
          request.body.id="id";
          request.body.name="name";
          let commonResponseMock = {
            setResponseWithError:(response, code, msj)=>{
                  expect(msj).to.equal("Forbidden");
                  expect(code).to.equal(401);
                  done();
              }
          };
          mockery.registerMock('../../common/common-response', commonResponseMock);
          let middleware= require("./body-middleware").BodyMiddleware;
          middleware(request,null,null);
        });

    });

});
