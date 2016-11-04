"use strict";

/**
 * Test environment settings
 * @description :: This section overrides all other config values ONLY in test environment
 */

module.exports = {
  log: {
    level: 'debug'
  },
  models: {
    connection: 'memory',
    migrate: 'drop'
  },
  policies: {
    '*': true
  },
  autoAdmin: {
    enabled: false
  },
  hooks: {
    csrf: false,
    grunt: false,
    i18n: false,
    pubsub: false,
    session: false,
    sockets: false,
    views: false
  }
};
