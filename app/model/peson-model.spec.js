const PersonModel = require("./peson-model");
const chai    = require('chai');
const expect = chai.expect;

describe("PersonModel", function () {

    let model = null;

    beforeEach(function () {

    });

    afterEach(function () {
      model = null;
    });

    it("should be an instance of PersonModel ", function () {
        model = new PersonModel(null, null, null);
        expect(model instanceof PersonModel).to.be.true;
    });

    it("should be 6 methods  only", function () {
      model = new PersonModel(null, null, null);
      let size = 0;
      for (key in model) {
          if (model.hasOwnProperty(key)) size++;
      }
      expect(size).to.equal(6);
    });

    it("should be 6 methods with their correct names", function () {
      model = new PersonModel(null, null, null);
      expect(model.hasOwnProperty("isNullOrUndefined")).to.be.true;
      expect(model.hasOwnProperty("isValidId")).to.be.true;
      expect(model.hasOwnProperty("isValidName")).to.be.true;
      expect(model.hasOwnProperty("isValidAddress")).to.be.true;
      expect(model.hasOwnProperty("isValid")).to.be.true;
      expect(model.hasOwnProperty("getPersonModel")).to.be.true;
    });

    describe("isNullOrUndefined method", function () {

      it("should return true when the  value is null", function () {
        model = new PersonModel(null, null, null);
        expect(model.isNullOrUndefined(null)).to.be.true;
      });

      it("should return true when the  value is undefined", function () {
        model = new PersonModel(null, null, null);
        expect(model.isNullOrUndefined(undefined)).to.be.true;
      });

      it("should return false when the  value is text", function () {
        model = new PersonModel(null, null, null);
        expect(model.isNullOrUndefined('text')).to.be.false;
      });

    });

    describe("isValidId method", function () {

      it("should return true when the  value is 11111", function () {
        model = new PersonModel(null, null, null);
        expect(model.isValidId(11111)).to.be.true;
      });

      it("should return false when the  value is undefined", function () {
        model = new PersonModel(null, null, null);
        expect(model.isValid(undefined)).to.be.false;
      });

      it("should return false when the  value is text", function () {
        model = new PersonModel(null, null, null);
        expect(model.isValid('text')).to.be.false;
      });

    });

    describe("isValidName method", function () {

      it("should return true when the  value is name", function () {
        model = new PersonModel(null, null, null);
        expect(model.isValidName('name')).to.be.true;
      });

      it("should return false when the  value is undefined", function () {
        model = new PersonModel(null, null, null);
        expect(model.isValidName(undefined)).to.be.false;
      });

      it("should return false when the  value is 12211", function () {
        model = new PersonModel(null, null, null);
        expect(model.isValidName(12211)).to.be.false;
      });

      it("should return false when the   length is more than 20", function () {
        model = new PersonModel(null, null, null);
        expect(model.isValidName('aaaaaaaaaaaaaaaaaaaaa')).to.be.false;
      });

    });

    describe("isValidAddress method", function () {

      it("should return true when the  value is address 11", function () {
        model = new PersonModel(null, null, null);
        expect(model.isValidAddress('address 11')).to.be.true;
      });

      it("should return false when the  value is undefined", function () {
        model = new PersonModel(null, null, null);
        expect(model.isValidAddress(undefined)).to.be.false;
      });

      it("should return false when the  value is 12211", function () {
        model = new PersonModel(null, null, null);
        expect(model.isValidAddress(12211)).to.be.false;
      });

      it("should return false when the   length is more than 30", function () {
        model = new PersonModel(null, null, null);
        expect(model.isValidAddress('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).to.be.false;
      });

    });

    describe("isValid method", function () {

      it("should return true when the  value with all  arguments are ok", function () {
        model = new PersonModel(11111,'name','address');
        expect(model.isValid()).to.be.true;
      });

      it("should return false when the  id is not correct", function () {
        model = new PersonModel(null,'name','address');
        expect(model.isValid()).to.be.false;
      });

      it("should return false when the  name is not correct", function () {
        model = new PersonModel(11111,null,'address');
        expect(model.isValid()).to.be.false;
      });

      it("should return false when the  address is not correct", function () {
        model = new PersonModel(11111,'name',1111);
        expect(model.isValid()).to.be.false;
      });

    });

    describe("getPersonModel method", function () {

      it("should return the model data", function () {
        model = new PersonModel(11111,'name','address');
        const data = model.getPersonModel();
        expect(data.id).to.be.equal(11111);
        expect(data.name).to.be.equal('name');
        expect(data.address).to.be.equal('address');
      });

      it("should return the model that can not be changed", function () {
        model = new PersonModel(11111,'name','address');
        let data = model.getPersonModel();
        data.id = null;
        data.name = null;
        data.address = null;
        expect(data.id).to.be.equal(11111);
        expect(data.name).to.be.equal('name');
        expect(data.address).to.be.equal('address');
      });

    });

});
