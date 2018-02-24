const env = process.env.NODE_ENV || 'local';
const cfg = require(`./config.${env}`); // eslint-disable-line import/no-dynamic-require
const commonCfg = require('./config.common');

const commonConfig = {};

commonConfig.baseResource = commonCfg.baseResource;
commonConfig.version = commonCfg.version;

commonConfig.accessToken = cfg.apiAccess.accessToken;
commonConfig.backend = cfg.backendConfig;
commonConfig.port = commonCfg.appPort;

module.exports = Object.freeze(commonConfig);
