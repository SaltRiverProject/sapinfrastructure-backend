"use strict";

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    accessLevel: {
      type: 'integer',
      defaultsTo: 1
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    },

    // associations
    users: {
      collection: 'user',
      via: 'groups'
    }
  }
}
