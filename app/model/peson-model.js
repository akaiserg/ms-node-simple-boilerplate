const isUndefined = require('../common/common-validator').isUndefined;
const isNull = require('../common/common-validator').isNull;
const isString = require('../common/common-validator').isString;
const isInteger = require('../common/common-validator').isInteger;


function PersonModel(idPerson, namePerson, addressPerson) {
  this.isNullOrUndefined = (value) => {
    if (isNull(value) || isUndefined(value)) {
      return true;
    }
    return false;
  };
  this.isValidId = (id) => {
    const idInt = parseInt(id, 10);
    if (this.isNullOrUndefined(idInt) || !isInteger(idInt)) {
      return false;
    }
    return true;
  };
  this.isValidName = (name) => {
    if (this.isNullOrUndefined(name) || !isString(name) || name.length > 20) {
      return false;
    }
    return true;
  };
  this.isValidAddress = (address) => {
    if (this.isNullOrUndefined(address) || !isString(address) || address.length > 30) {
      return false;
    }
    return true;
  };
  this.isValid = () => {
    if (this.isValidId(idPerson) && this.isValidName(namePerson)
      && this.isValidAddress(addressPerson)) {
      return true;
    }
    return false;
  };
  this.getPersonModel = () => {
    return Object.freeze({
      id: idPerson,
      name: namePerson,
      address: addressPerson
    });
  };
}

module.exports = PersonModel;
