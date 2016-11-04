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
      type: 'bool',
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
