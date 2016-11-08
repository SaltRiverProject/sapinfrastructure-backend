const crypto = require('crypto')

var Agent = {
  name: 'Agent',
  autoPK: true,
  autoCreatedBy: false,
  attributes: {
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
  },
  beforeCreate(values, next) {
    var hash = crypto.createHash('sha256').update(new Date().getTime().toString()).digest('hex')
    values.agentKey = hash
    next();
  }
};
module.exports = Agent;
