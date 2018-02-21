const mockery = require('mockery');
const chai    = require('chai');
const expect = chai.expect;

describe('HeaderMiddleware', () => {

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

    describe('HeaderMiddleware function ', () => {

      it('should call the function  next() when the body is ok', function (done) {
          let request={};
          request.headers={};
          request.headers['x-access-token']="token";
          let nextCalled= false;
          let nextMock=()=>{
              nextCalled=true;
              expect(nextCalled).to.be.true;
              done();
          }
          let middleware= require("./header-middleware").HeaderMiddleware;
          middleware(request,null,nextMock);
      });

      it('should return  401 when the token  is not present', function (done) {
          let request={};
          request.headers={};
          let commonResponseMock = {
              setResponseWithError:(response, code, msj)=>{
                  expect(msj).to.equal("Forbidden");
                  expect(code).to.equal(401);
                  done();
              }
          };
          mockery.registerMock('../../common/common-response', commonResponseMock);
          let middleware= require("./header-middleware").HeaderMiddleware;
          let nextMock=()=>{};
          middleware(request,null,nextMock);
      });

      it('should return  401 when the token  is undefined', function (done) {
        let request={};
        request.headers={};
        request.headers['x-access-token']=undefined;
        let commonResponseMock = {
            setResponseWithError:(response, code, msj)=>{
                expect(msj).to.equal("Forbidden");
                expect(code).to.equal(401);
                done();
            }
        };
        mockery.registerMock('../../common/common-response', commonResponseMock);
        let middleware= require("./header-middleware").HeaderMiddleware;
        let nextMock=()=>{};
        middleware(request,null,nextMock);
      });

      it('should return  401 when the token  is null', function (done) {
        let request={};
        request.headers={};
        request.headers['x-access-token']=null;
        let commonResponseMock = {
            setResponseWithError:(response, code, msj)=>{
                expect(msj).to.equal("Forbidden");
                expect(code).to.equal(401);
                done();
            }
        };
        mockery.registerMock('../../common/common-response', commonResponseMock);
        let middleware= require("./header-middleware").HeaderMiddleware;
        let nextMock=()=>{};
        middleware(request,null,nextMock);
      });

      it('should return  401 when the token  is not a string', function (done) {
        let request={};
        request.headers={};
        request.headers['x-access-token']=211212;
        let commonResponseMock = {
            setResponseWithError:(response, code, msj)=>{
                expect(msj).to.equal("Forbidden");
                expect(code).to.equal(401);
                done();
            }
        };
        mockery.registerMock('../../common/common-response', commonResponseMock);
        let middleware= require("./header-middleware").HeaderMiddleware;
        let nextMock=()=>{};
        middleware(request,null,nextMock);
      });

    });

});
