"use strict";

/**
 * Development environment settings
 * @description :: This section overrides all other config values ONLY in development environment
 */

module.exports = {
  port: 1337,
  log: {
    level: 'debug'
  },
  models: {
    connection: 'disk',
    migrate: 'alter'
  }
};
