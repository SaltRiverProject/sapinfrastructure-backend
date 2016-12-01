/**
 * Metadata.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Metadata = {
  name: 'Metadata',
  autoPK: true,
  autoCreatedBy: true,
  schema: true,
  attributes: {
    via: {
      type: 'string',
      defaultsTo: 'agent'
    },

    data: {
      type: 'json',
      required: true
    },

    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    },

    // associations
    agent: {
      collection: 'Agent',
      via: 'metadata'
    },
    createdBy: {
      model: 'user'
    },
    updatedBy: {
      model: 'user'
    }
  }
};
module.exports = Metadata;
