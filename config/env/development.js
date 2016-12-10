"use strict";

/**
 * Development environment settings
 * @description :: This section overrides all other config values ONLY in development environment
 */

module.exports = {
  port: 1337,
  host: '0.0.0.0',
  log: {
    level: 'debug'
  },
  connections: {
    mysql: {
      adapter: 'sails-mysql',
      host: 'localhost',
      port: 32770,
      charset: 'utf8'
    },
  },
  models: {
    connection: 'mysql',
    migrate: 'alter'
  }
};
