/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Comment = {
  name: 'Comment',
  autoPK: true,
  schema: true,
  autoCreatedBy: true,
  attributes: {
    message: {
      type: 'string'
    },

    isDeleted: {
      type: 'bool',
      defaultsTo: false
    },

    // associations
    server: {
      collection: 'server',
      via: 'comments'
    },

    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
};
module.exports = Comment;
