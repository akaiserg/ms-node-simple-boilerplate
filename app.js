const express = require('express');
const bodyParser = require('body-parser');
const config = require('./app/config/index');
const helmet = require('helmet');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDef = require('./swagger.json');
const HeaderMiddleware = require('./app/middlewares/general-middleware/header-middleware').HeaderMiddleware;
const BodyMiddleware = require('./app/middlewares/general-middleware/body-middleware').BodyMiddleware;
const TokenMiddleware = require('./app/middlewares/general-middleware/token-middleware').TokenMiddleware;
const VerifyPersonRoute = require('./app/routes/verify-person-route');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.status(200).end();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
  next();
});


// swagger configuration
swaggerDef.basePath = `${config.resources.baseResource}${config.resources.version}/`;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(
  swaggerJSDoc({
    swaggerDefinition: swaggerDef,
    apis: ['./app/routes/*.js']
  })));

// health check MS
app.get(`${config.resources.baseResource}${config.resources.version}health/`, (req, res) => {
  res.send('fif-common-nodejs-boilerplate up and running');
});


app.use(`${config.resources.baseResource}${config.resources.version}verify_person`,
  [HeaderMiddleware, BodyMiddleware, TokenMiddleware, VerifyPersonRoute]);

// handle  not found  uris
app.use((req, res) => {
  res.status(404).send('404: Page not Found');
});


// handle  any extra error
app.use((error, req, res) => {
  res.status(500).send('500: Internal Server Error');
});

module.exports = app;
