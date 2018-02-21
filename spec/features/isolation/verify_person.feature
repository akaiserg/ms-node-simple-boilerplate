Feature: Allow to verify if the person's information can be saved
  In order to save a person's information
  As a developer
  I want to validatethe their information before saving

Background: set up
  Given I start the API with ISO configuration
  And   Clean the variables

Scenario: Calling the wrong endpoint
  Given The API endpoint is listening in "http://localhost:3017/api/fif_common/v1/verify"
  Given I set up the headers
  |  header             |   value                         |
  |  Content-Type       |   application/json              |
  Given I set up the request body
  |  name     |   value       |
  |  name     |   the name    |
  |  address  |   the address |
  |  id       |   22222       |
  When I call the endpoint
  Then I expect a response with the following status
  | statusCode  | statusMessage  |
  | 404         | Not Found   |
  And I expect the response body is
  |body                 |
  |"404: Page not Found"|

Scenario: The endpoint is call  without access token headers
  Given The API endpoint is listening in "http://localhost:3017/api/fif_common/v1/verify_person/ "
  Given I set up the headers
  |  header             |   value                         |
  |  Content-Type       |   application/json              |
  Given I set up the request body
  |  name     |   value       |
  |  name     |   the name    |
  |  address  |   the address |
  |  id       |   22222       |
  When I call the endpoint
  Then I expect a response with the following status
  | statusCode  | statusMessage  |
  | 401         | Unauthorized   |
  And I expect the response body is
  |body                                   |
  |{"code":"error","message":"Forbidden"} |

Scenario: The endpoint is call  with the wrong  access token
  Given The API endpoint is listening in "http://localhost:3017/api/fif_common/v1/verify_person/ "
  Given I set up the headers
  |  header             |   value                         |
  |  Content-Type       |   application/json              |
  |  x-access-token     |   p23t74PEX9S7gDe3Y4cqBnyET1    |
  Given I set up the request body
  |  name     |   value       |
  |  name     |   the name    |
  |  address  |   the address |
  |  id       |   22222       |
  When I call the endpoint
  Then I expect a response with the following status
  | statusCode  | statusMessage  |
  | 401         | Unauthorized   |
  And I expect the response body is
  |body                                   |
  |{"code":"error","message":"Forbidden"} |


Scenario: The endpoint is call  with the correct  access token but incomple  body
  Given The API endpoint is listening in "http://localhost:3017/api/fif_common/v1/verify_person/ "
  Given I set up the headers
  |  header             |   value                         |
  |  Content-Type       |   application/json              |
  |  x-access-token     |   p23t74PEX9S7gDe3Y4cqBnyET1X06 |
  Given I set up the request body
  |  name     |   value       |
  |  name     |   the name    |
  |  address  |   the address |
  When I call the endpoint
  Then I expect a response with the following status
  | statusCode  | statusMessage  |
  | 401         | Unauthorized   |
  And I expect the response body is
  |body                                   |
  |{"code":"error","message":"Forbidden"} |

Scenario: The endpoint is call  with the correct  access token  and body but the address is largen  than 30
  Given The API endpoint is listening in "http://localhost:3017/api/fif_common/v1/verify_person/ "
  Given I set up the headers
  |  header             |   value                         |
  |  Content-Type       |   application/json              |
  |  x-access-token     |   p23t74PEX9S7gDe3Y4cqBnyET1X06 |
  Given I set up the request body
  |  name     |   value                                                                                |
  |  name     |   the name                                                                             |
  |  address  |   the address the address the address the address the address the address the address  |
  |  id       |   11111                                                                                |
  When I call the endpoint
  Then I expect a response with the following status
  | statusCode  | statusMessage  |
  | 403         | Forbidden   |
  And I expect the response body is
  |body                                            |
  |{"code":"error","message":"Invalid parameters"} |

Scenario: The endpoint is call  with the correct  access token  and body but the id already exist
  Given The API endpoint is listening in "http://localhost:3017/api/fif_common/v1/verify_person/ "
  Given I set up the headers
  |  header             |   value                         |
  |  Content-Type       |   application/json              |
  |  x-access-token     |   p23t74PEX9S7gDe3Y4cqBnyET1X06 |
  Given I set up the request body
  |  name     |   value      |
  |  name     |   the name   |
  |  address  |   the address|
  |  id       |   11111      |
  When I call the endpoint
  Then I expect a response with the following status
  | statusCode  | statusMessage  |
  | 403         | Forbidden      |
  And I expect the response body is
  |body                                            |
  |{"code":"error","message":"person can not be saved"}   |


Scenario: The endpoint is call  with the correct  access token  and the person can be saved
  Given The API endpoint is listening in "http://localhost:3017/api/fif_common/v1/verify_person/ "
  Given I set up the headers
  |  header             |   value                         |
  |  Content-Type       |   application/json              |
  |  x-access-token     |   p23t74PEX9S7gDe3Y4cqBnyET1X06 |
  Given I set up the request body
  |  name     |   value      |
  |  name     |   the name   |
  |  address  |   the address|
  |  id       |   77777      |
  When I call the endpoint
  Then I expect a response with the following status
  | statusCode  | statusMessage  |
  | 200         | OK             |
  And I expect the response body is
  |body                                            |
  |{"code":"ok","message":"person can be saved"}   |
