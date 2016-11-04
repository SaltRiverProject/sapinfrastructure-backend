/**
 * Component.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Component = {
  name: 'Component',
  autoPK: true,
  schema: true,
  autoCreatedBy: true,
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    abbreviation: {
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
      via: 'component'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
};
module.export = Component;
