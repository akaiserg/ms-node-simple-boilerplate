const _ = require('lodash');

const PersonService = function () {
  const persons = [];
  const init = () => {
    persons.push({ id: '11111', name: 'name1', address: 'address 1' });
    persons.push({ id: '22222', name: 'name2', address: 'address 2' });
    persons.push({ id: '33333', name: 'name3', address: 'address 3' });
    persons.push({ id: '44444', name: 'name4', address: 'address 4' });
  };
  this.getPersonById = (id) => {
    return _.filter(persons, (o) => {
      return id === o.id;
    })[0];
  };
  this.validatePerson = (person) => {
    if (_.has(person, 'id') && _.has(person, 'name')
    && _.has(person, 'address') && this.getPersonById(person.id) === undefined) {
      return true;
    }
    return false;
  };
  this.getPersons = () => {
    return persons;
  };
  this.addPerson = (person) => {
    if (this.validatePerson(person)) {
      persons.push(person);
      return true;
    }
    return false;
  };
  // adds 4 persons
  init();
};

module.exports = PersonService;
