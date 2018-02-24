const unirest = require('unirest');
const config = require('../config/index');

const PersonService = function () {
  this.validatePerson = (person) => {
    return this.connectBackend(person);
  };
  this.connectBackend = (person) => {
    return new Promise((resolve) => {
      unirest.post(config.backend.url)
      .headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
      .send(person)
      .end((response) => {
        console.info(response);
        resolve(response);
      });
    });
  };
};

module.exports = PersonService;
