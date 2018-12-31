const puppeteer = require('puppeteer');
const genericPool = require('generic-pool');

const DEFAULTS = {
  min: 2,
  max: 10,
  testOnBorrow: true,
  puppeteerLaunchArgs: [{ headless: true }],
  validate: () => Promise.resolve(true),
};

/**
 *
 * @param puppeteerLaunchArgs
 * @param validate
 */
function createFactory({ puppeteerLaunchArgs, validate }) {
  const factory = {};

  factory.create = function createFn() {
    return puppeteer.launch(...puppeteerLaunchArgs);
  };

  factory.destroy = function destroyFn(browserInstance) {
    return browserInstance.close();
  };

  if (validate && typeof validate === 'function') {
    factory.validate = validate;
  }

  return factory;
}

/**
 *
 * @returns {*}
 * @param poolConfig
 */
function createPool(poolConfig) {
  const config = Object.assign({}, DEFAULTS, poolConfig);
  const factory = createFactory(Object.assign({}, config));

  delete config.validate;
  delete config.puppeteerLaunchArgs;
  return genericPool.createPool(factory, config);
}

module.exports = createPool;
