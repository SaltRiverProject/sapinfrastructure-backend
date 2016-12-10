/**
 * Location.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Location = {
  name: 'Location',
  autoCreatedBy: true,
  schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },

    abbreviation: {
      type: 'string',
      required: true,
      unique: true
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    },

    // associations
    servers: {
      collection: 'server',
      via: 'component'
    },
    createdBy: {
      model: 'user'
    },
    updatedBy: {
      model: 'user'
    }
  }
};
module.exports = Location;
