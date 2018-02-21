const env = process.env.NODE_ENV || 'local';
const cfg = require(`./config.${env}`); // eslint-disable-line import/no-dynamic-require
const commonCfg = require('./config.common');

const commonConfig = {};
// resources
commonConfig.resources = {};
// general configs
commonConfig.config = {};
commonConfig.resources.baseResource = commonCfg.baseResource;
commonConfig.resources.version = commonCfg.version;

commonConfig.config.accessToken = cfg.apiAccess.accessToken;
commonConfig.config.timeOut = cfg.timeOut.timeOutService;
commonConfig.config.port = commonCfg.appPort;

module.exports = Object.freeze(commonConfig);
