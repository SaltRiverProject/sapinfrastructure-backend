var Role = {
  name: 'Role',
  attributes: {
    name: {
      type: 'text',
      maxLength: 512
    },

    abbreviation: {
      type: 'string'
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    },

    // associations
    servers: {
      collection: 'Server',
      via: 'roles'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  },
};
module.exports = Role;
