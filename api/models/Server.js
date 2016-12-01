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
  schema: true,
  attributes: {
    hostname: {
      type: 'string',
      required: true,
      unique: true
    },

    cpu: {
      type: 'integer'
    },

    ram: {
      type: 'float'
    },

    swap: {
      type: 'float'
    },

    dns: {
      type: 'json'
    },

    sid: {
      type: 'string'
    },

    ipv4: {
      type: 'string',
      'ip': true
    },

    ipv6: {
      type: 'string',
      'ip': true
    },

    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    },

    // associations
    roles: {
      collection: 'role',
      via: 'servers'
    },

    tags: {
      model: 'tag'
    },

    tier: {
      model: 'tier'
    },

    agent: {
      model: 'agent'
    },

    component: {
      model: 'component'
    },

    comments: {
      collection: 'comment',
      via: 'server'
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
