const mockery = require('mockery');
const chai    = require('chai');
const expect = chai.expect;

describe('verify-person-route', () => {

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

    describe('checking route  callings', () => {

        it('should call  the routes correctly', function (done) {

            let expressMock= {
                Router:function(){
                    return {
                        post:function(path,middlewares){
                            expect(path).to.equal("/");
                            expect(middlewares[0]()).to.equal("PersonModelValidationMiddleware");
                            expect(middlewares[1]()).to.equal("VerifyPersonMiddleware");
                            done();
                        }
                    }
                }
            }
            mockery.registerMock('express',expressMock);

            let PersonModelValidationMiddlewareMock ={
              PersonModelValidationMiddleware:function(){
                    return 'PersonModelValidationMiddleware';
                }
            };
            mockery.registerMock('../middlewares/route-middleware/person-model-validation-middleware', PersonModelValidationMiddlewareMock);

            let VerifyPersonMiddlewareMock ={
              VerifyPersonMiddleware:function(){
                    return 'VerifyPersonMiddleware';
                }
            };
            mockery.registerMock('../middlewares/route-middleware/verify-person-middleware', VerifyPersonMiddlewareMock);

            const route = require("./verify-person-route");
        });

    });

});
