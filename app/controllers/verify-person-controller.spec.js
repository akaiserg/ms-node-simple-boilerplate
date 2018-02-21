const mockery = require('mockery');
const chai    = require('chai');
const expect = chai.expect;

describe('VerifyPersonController', () => {

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

    it('should be an instance of VerifyPersonController', function () {
      const Controller =require('./verify-person-controller');
      const controller = new Controller();
      expect(controller instanceof Controller).to.be.true;
    });

    describe('verify method', () => {

      it('should return a promise without errors', function (done) {
        const ServiceMock = function () {
          this.validatePerson =  function(model) {return true};
        }
        mockery.registerMock('../services/person.service', ServiceMock);
        const Controller =require('./verify-person-controller');
        const controller = new Controller();
        controller.verify(null).then((response) => {
          expect(response).to.be.equal('person can be saved');
          done();
        })
        .catch((error)=>{
          throw new Error('should be in then statement');
        });
      });

      it('should return a promise with errors', function (done) {
        const ServiceMock = function () {
          this.validatePerson =  function(model) {return false};
        }
        mockery.registerMock('../services/person.service', ServiceMock);
        const Controller =require('./verify-person-controller');
        const controller = new Controller();
        controller.verify(null).then((response) => {
          throw new Error('should be in catch statement');
        })
        .catch((error)=>{
          expect(error).to.be.equal('person can not be saved');
          done();
        });
      });

    });

    describe('verifyService method', () => {

      it('should return true when the person is verified', function () {
        const ServiceMock = function () {
          this.validatePerson =  function(model) {return true};
        }
        mockery.registerMock('../services/person.service', ServiceMock);
        const Controller =require('./verify-person-controller');
        const controller = new Controller();
        expect(controller.verifyService(null)).to.be.true;
      });

      it('should return false when the person can not be saved', function () {
        const ServiceMock = function () {
          this.validatePerson =  function(model) {return false};
        }
        mockery.registerMock('../services/person.service', ServiceMock);
        const Controller =require('./verify-person-controller');
        const controller = new Controller();
        expect(controller.verifyService(null)).to.be.false;
      });

    });

});
