simple-boilerplate
---------------------

Running the service
---------------------
NODE_ENV=<environment-name> npm start

NODE_ENV=<environment-name> pm2 start bin/www

npm run auto-start   // to restart when  a file changed
 
Unit testing
---------------------
* npm run unit-test  // to see  all  the unit tests
* npm run unit-test-w  // with nyan cat and   restart when a file  changed
* npm run unit-test-n  // just nyan cat


Functional testing
---------------------
* npm run iso-test // to run  the tests with cucumber

All test
---------------------
* npm run test // to run   unit and functional

Linter
---------------------
* npm run eslint // to run  eslint  with  airbnb configuration

Reports
---------------------
* npm run zip-unit-test-report // to  generate a zip with the unit test report
* npm run zip-coverage-report // to  generate a zip with the coverage report
* npm run zip-iso-cucumber-report // to  generate a zip with the cucumber report

Check updates
---------------------
* npm run check-updates
* npm run check-libraries
* npm run outdated

Swagger Api documentation
---------------------
* http://localhost:3017/api-docs/


End points
---------------------
* http://localhost:3017/api/test/v1/health/
* http://localhost:3017/api/test/v1/verify_person/


