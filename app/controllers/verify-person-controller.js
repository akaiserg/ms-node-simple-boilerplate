const PersonService = require('../services/person.service');

const VerifyPersonController = function () {
  this.verify = (personModel) => {
    return new Promise((resolve, reject) => {
      if (this.verifyService(personModel)) {
        resolve('person can be saved');
      }
      reject('person can not be saved');
    });
  };
  this.verifyService = (personModel) => {
    const personService = new PersonService();
    return personService.validatePerson(personModel);
  };
};

module.exports = VerifyPersonController;
