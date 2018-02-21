const chai    = require('chai');
const expect = chai.expect;
const PersonService = require('./person.service');

describe('PersonService', () => {
    let personService = null;
    beforeEach(function () {
      personService = new PersonService();
    });

    afterEach(function () {
      personService = null;
    });

    it('should be an instance of PersonService', function () {
      expect(personService instanceof PersonService).to.be.true;
    });

    describe('getPersonById method', () => {

      it('should find the person with id 11111', function () {
        const id = '11111';
        const person = personService.getPersonById(id);
        expect(person.id).to.be.equal(id);
      });

      it('should return undefined when the person is not found', function () {
        const id = 00000;
        const person = personService.getPersonById(id);
        expect(person).to.be.undefined;
      });

    });

    describe('validatePerson method', () => {

      it('should return true when the person is valid', function () {
        const newPerson = { id: 77777, name: 'name7', address: 'address 7' };
        expect(personService.validatePerson(newPerson)).to.be.true;
      });

      it('should return false when the person id  exists', function () {
        const newPerson = { id: '11111', name: 'name1', address: 'address 1' };
        expect(personService.validatePerson(newPerson)).to.be.false;
      });

      it('should return false when the person id is not  present', function () {
        const newPerson = { id_: 11111, name: 'name1', address: 'address 1' };
        expect(personService.validatePerson(newPerson)).to.be.false;
      });

      it('should return false when the person name is not  present', function () {
        const newPerson = { id: 11111, name_: 'name1', address: 'address 1' };
        expect(personService.validatePerson(newPerson)).to.be.false;
      });

      it('should return false when the person address is not  present', function () {
        const newPerson = { id: 11111, name: 'name1', address_: 'address 1' };
        expect(personService.validatePerson(newPerson)).to.be.false;
      });

      it('should return false when the person is null', function () {
        const newPerson = null;
        expect(personService.validatePerson(newPerson)).to.be.false;
      });

    });

    describe('getPersons method', () => {

      it('should be 4 person', function () {
        expect(personService.getPersons().length).to.be.equal(4);
      });

    });

    describe('addPerson method', () => {

      it('should return true  when a new person is added correctly', function () {
        const newPerson = { id: 77777, name: 'name7', address: 'address 7' };
        expect(personService.addPerson(newPerson)).to.be.true;
      });

      it('should return false  when a new person wants to be added with errors', function () {
        const newPerson = { id_: 77777, name: 'name7', address: 'address 7' };
        expect(personService.addPerson(newPerson)).to.be.false;
      });

      it('the person added should be able to be gotten', function () {
        const newPerson = { id: 77777, name: 'name7', address: 'address 7' };
        personService.addPerson(newPerson);
        expect(personService.getPersonById(newPerson.id)).to.be.equal(newPerson);
      });

    });

});
