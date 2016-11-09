/**
 * Component.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Tier = {
  name: 'Tier',
  autoPK: true,
  autoCreatedBy: true,
  attributes: {
    name: {
      type: 'string',
      required: true
    },

    abbreviation: {
      type: 'string',
      required: true
    },

    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    },

    // associations
    servers: {
      collection: 'server',
      via: 'tier'
    },
    createdBy: {
      model: 'user'
    },
    updatedBy: {
      model: 'user'
    }
  }
};
module.exports = Tier;
