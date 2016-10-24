/**
 * Server.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Server = {
  name: 'Server',
  autoPK: true,
  autoCreatedBy: true,
  attributes: {
    schema: true,
    hostname: {
      type: 'string',
      required: true,
      unique: true
    },

    cpu: {
      type: 'integer',
      required: true
    },

    ram: {
      type: 'float',
      required: true
    },

    swap: {
      type: 'float',
      required: true
    },
    dns: {
      type: 'json'
    },

    sid: {
      type: 'string',
      required: true
    },

    // associations
    roles: {
      collection: 'role',
      via: 'servers'
    },

    component: {
      model: 'component'
    },

    location: {
      model: 'location'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
};
module.exports = Server;
