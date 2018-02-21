process.env.NODE_ENV = "iso";
const config = require('../../../../app/config/config.iso');
const assert = require('cucumber-assert');
const RestClient= require('node-rest-client').Client;
const isBuffer = require('is-buffer');

const isoStepDefinitions = function () {

  let __headers = {};
  let __endPoint = null;
  let __bodyRequest = {};
  let __bodyResponse = {};
  let __statusCodeResponse = null;
  let __statusMessageResponse = null;

  this.Given(/^I start the API with ISO configuration$/, function(callback) {
    require("../../../../bin/www");
    callback(null, 'done');
  });

  this.Given(/^The API endpoint is listening in "([^"]*)"$/, function (url, callback){
    __endPoint = url;
      callback(null, 'done');
  });

  this.Given(/^Clean the variables$/, function (callback){
    __headers = {};
    __bodyRequest = {};
    __bodyResponse = {};
    __statusCodeResponse = null;
    __statusMessageResponse = null;
    callback(null, 'done');
  });

  this.Given(/^I set up the headers$/, function (dataTable, callback) {
    dataTable.hashes().forEach((value)=>{
      __headers[value.header] = value.value;
    });
    callback(null, 'done');
  });

  this.Given(/^I set up the request body$/, function(dataTable, callback) {
    dataTable.hashes().forEach((value)=>{
      //console.info("__"+value.value+"__")
      __bodyRequest[value.name] = value.value;
    });
    //console.info(__bodyRequest);
    callback(null, 'done');
  });

  this.Given(/^I set up the complete request body$/, function(dataTable, callback) {
    const givenBody = dataTable.hashes()[0];
    //console.info("---->",givenBody.request);
    const body = givenBody.request;
    __bodyRequest = {body:JSON.stringify({body})}
    callback(null, 'done');
  });

  this.When(/^I call the endpoint$/, function(callback) {
    const rc = new RestClient();
    const args = {
      headers: __headers,
      data: __bodyRequest
    };
    rc.post(__endPoint,args, function (data, response) {
      // parsed response body as js object
      if(isBuffer(data)){
        __bodyResponse = data.toString('utf8');
      } else {
        __bodyResponse = data;
      }
      __statusCodeResponse = response.statusCode;
      __statusMessageResponse = response.statusMessage;
      callback(null, 'done');
    });
  });

  this.Then(/^I expect a response with the following status$/, function(dataTable, callback) {
    let promises = [];
    const expectedApiResponse = dataTable.hashes()[0];
    //console.info(__statusCodeResponse, expectedApiResponse.statusCode);
    //console.info(__statusMessageResponse, expectedApiResponse.statusMessage);
    promises.push(assert.equal(__statusCodeResponse, expectedApiResponse.statusCode, 'Expected the status code should be ' + expectedApiResponse.statusCode));
    promises.push(assert.equal(__statusMessageResponse, expectedApiResponse.statusMessage, 'Expected the status message should be ' + expectedApiResponse.statusMessage));
    if (promises.length == 0){
          throw 'There is no coincidence with the expected data';
    }
    assert.all(promises).then(callback, callback);
  });

  this.Then(/^I expect the response body is$/, function (dataTable,callback) {
    let promises = [];
    const expectedApiBodyResponse = dataTable.hashes()[0];
    const stringBodyResponse = JSON.stringify(__bodyResponse);
    //console.info(stringBodyResponse,expectedApiBodyResponse.body);
    promises.push(assert.equal(stringBodyResponse,expectedApiBodyResponse.body, 'Expected body   should be '+ expectedApiBodyResponse.body));
    assert.all(promises).then(callback, callback);
  });

};

module.exports = isoStepDefinitions;
