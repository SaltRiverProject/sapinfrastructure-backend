/**
 * Landscape.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Landscape = {
  name: 'Landscape',
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
    tiers: {
      collection: 'tier',
      via: 'landscape'
    },
    createdBy: {
      model: 'user'
    },
    updatedBy: {
      model: 'user'
    }
  }
};
module.exports = Landscape;
