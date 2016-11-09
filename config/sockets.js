module.exports.sockets = {
  adapter: 'socket.io-redis',
  host: '127.0.0.1',
  port: 6379,
  db: 'sapinfrastructure-sockets',
  afterDisconnect: function(session, socket, cb) {
    sails.log.debug('Agent disconnect socketId:', socket.id)
    Agent.update({ socketId: socket.id }, { connected: false })
     .then(function(agent) {
       var _agent = agent[0]
       sails.log.debug('Agent id:', _agent.id, 'socketId:', socket.id, 'disconnected', socket.id);
       sails.sockets.leave(socket, ['agents', 'agent-' + _agent.id])
       return cb();
     });
  }
};
