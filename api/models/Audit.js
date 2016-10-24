var RequestLog = {
  name: 'RequestLog',
  autoPK: false,
  autoCreatedBy: false,
  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    ipAddress: {
      type: 'string'
    },
    method: {
      type: 'string'
    },
    url: {
      type: 'string',
      url: true
    },
    body: {
      type: 'json'
    },
    user: {
      model: 'User'
    },
    action: {
      type: 'string'
    },
    controller: {
      type: 'string'
    },
    model: {
      type: 'string'
    }
  }
};
module.exports = RequestLog;
