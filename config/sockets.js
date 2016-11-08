module.exports.sockets = {
  adapter: 'sails-redis',
  host: '127.0.0.1',
  port: 6379,
  db: 'sapinfrastructure-sockets',
  afterDisconnect: function(session, socket, cb) {
    sails.log.debug(socket)
    Agent.unsubscribe(socket)
    return cb();
  }
};
