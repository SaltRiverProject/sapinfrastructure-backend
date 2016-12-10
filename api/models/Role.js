var Role = {
  name: 'Role',
  schema: true,
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
      collection: 'server',
      via: 'roles'
    },
    createdBy: {
      model: 'user'
    },
    updatedBy: {
      model: 'user'
    }
  },
};
module.exports = Role;
