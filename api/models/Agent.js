var Agent = {
  name: 'Agent',
  autoPK: false,
  autoCreatedBy: false,
  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    agentKey: {
      type: 'string'
    },
    enabled: {
      type: 'boolean',
      defaultsTo: false
    },
    connected: {
      type: 'boolean',
      defaultsTo: false
    },
    // associations
    server: {
      model: 'server'
    },
    metadata: {
      collection: 'Metadata',
      via: 'agent'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
};
module.exports = Agent;
