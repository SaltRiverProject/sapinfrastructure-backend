"use strict";

/**
 * Connections API Configuration
 *
 * Connections are like "saved settings" for your adapters.
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 *
 * NOTE: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 */

module.exports = {
  connections: {
    /**
     * MySQL configuration
     * @type {Object}
     */
    mysql: {
      adapter: 'sails-mysql',
      host: 'localhost',
      port: 32771,
      user: 'root',
      database: 'sapinfrastructure_dev',
      charset: 'utf8_unicode_ci'
    },
    /**
     * FileMaker configuration
     * @type {Object}
     */
    filemaker: {
      adapter: 'sails-filemaker',
      host: 'localhost',
      database: 'sails-rest-api',
      userName: 'root',
      password: '12345'
    },

    /**
     * Memory configuration
     * ONLY FOR DEVELOPMENT
     * @type {Object}
     */
    memory: {
      adapter: 'sails-memory'
    },

    /**
     * Disk configuration
     * ONLY FOR DEVELOPMENT
     * @type {Object}
     */
    disk: {
      adapter: 'sails-disk'
    }
  }
};
