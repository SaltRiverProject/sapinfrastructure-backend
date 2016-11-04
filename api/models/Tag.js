/**
 * Server.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Tag = {
  name: 'Tag',
  autoPK: true,
  autoCreatedBy: true,
  attributes: {
    schema: true,
    name: {
      type: 'string',
      required: true
    },

    isDeleted: {
      type: 'bool',
      defaultsTo: false
    },

    // associations
    servers: {
      collection: 'server',
      via: 'metadata'
    },

    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
};
module.exports = Tag;
