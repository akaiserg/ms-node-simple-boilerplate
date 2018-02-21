var mockery = require('mockery');
const chai    = require('chai');
const expect = chai.expect;

describe('token middleware', () => {

    beforeEach(function () {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });
        mockery.registerMock('../../config/index', {
          config:{
            accessToken:'token'
          }
        });
    });

    afterEach(function () {
        mockery.disable();
        mockery.deregisterAll();
    });

    describe('TokenMiddleware function ', () => {

      it('should call the function  next() when the token is valid', (done) => {
          let request={};
          request.headers={};
          request.headers['x-access-token']="token";
          let nextCalled= false;
          let nextMock=()=>{
              nextCalled=true;
              expect(nextCalled).to.be.true;
              done();
          }
          let middleware= require("./token-middleware").TokenMiddleware;
          middleware(request,null,nextMock);
      });

      it('should return  401 forbiden when the token is not valid', function (done) {
        let request={};
        request.headers={};
        request.headers['x-access-token']="tokenNoOK";
        let commonResponseMock = {
            setResponseWithError:(response, code, msj)=>{
                expect(msj).to.equal("Forbidden");
                expect(code).to.equal(401);
                done();
            }
        };
        mockery.registerMock('../../common/common-response', commonResponseMock);
        let middleware= require("./token-middleware").TokenMiddleware;
        middleware(request,null,null);
    });

  });

});
