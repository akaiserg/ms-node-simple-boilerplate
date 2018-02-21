const chai   = require('chai');
const expect = chai.expect;

describe('common-validator', () => {

    describe('isObject function', () => {

      it("should return true with {} ", function () {
        const func = require("./common-validator").isObject;
        expect(func({})).to.be.true;
      });

      it("should return true with {a:1} ", function () {
        const func = require("./common-validator").isObject;
        expect(func({a:1})).to.be.true;
      });

      it("should return true with Object ", function () {
        const func = require("./common-validator").isObject;
        expect(func(Object)).to.be.true;
      });

      it("should return false with 111 ", function () {
        const func = require("./common-validator").isObject;
        expect(func(111)).to.be.false;
      });

    });

    describe('isNull function', () => {

      it("should return false with {} ", function () {
        const func = require("./common-validator").isNull;
        expect(func({})).to.be.false;
      });

      it("should return true with null ", function () {
        const func = require("./common-validator").isNull;
        expect(func(null)).to.be.true;
      });

      it("should return false with undefined ", function () {
        const func = require("./common-validator").isNull;
        expect(func(undefined)).to.be.false;
      });

    });

    describe('isUndefined function', () => {

      it("should return false with {} ", function () {
        const func = require("./common-validator").isUndefined;
        expect(func({})).to.be.false;
      });

      it("should return false with null ", function () {
        const func = require("./common-validator").isUndefined;
        expect(func(null)).to.be.false;
      });

      it("should return true with undefined ", function () {
        const func = require("./common-validator").isUndefined;
        expect(func(undefined)).to.be.true;
      });

    });

    describe('isString function', () => {

      it("should return false with null ", function () {
        const func = require("./common-validator").isString;
        expect(func(null)).to.be.false;
      });

      it("should return false with 1111 ", function () {
        const func = require("./common-validator").isString;
        expect(func(1111)).to.be.false;
      });

      it("should return true with a ", function () {
        const func = require("./common-validator").isString;
        expect(func('a')).to.be.true;
      });

    });

    describe('isInteger function', () => {

      it("should return false with null ", function () {
        const func = require("./common-validator").isInteger;
        expect(func(null)).to.be.false;
      });

      it("should return false with 11 1 ", function () {
        const func = require("./common-validator").isInteger;
        expect(func('11 1')).to.be.false;
      });

      it("should return true with 11111 ", function () {
        const func = require("./common-validator").isInteger;
        expect(func(11111)).to.be.true;
      });

    });
});
