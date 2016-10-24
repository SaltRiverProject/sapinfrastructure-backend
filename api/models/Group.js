"use strict";

module.exports = {
  schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    accessLevel: {
      type: 'integer',
      defaultsTo: 1
    },
    users: {
      collection: 'user',
      via: 'groups'
    }
  }
}
