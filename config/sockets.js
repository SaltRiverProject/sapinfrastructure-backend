module.exports.sockets = {
  // adapter: 'socket.io-redis',
  // host: '127.0.0.1',
  // port: 6379,
  // db: 'sapinfrastructure-sockets',
  afterDisconnect: function(session, socket, cb) {
    sails.log.debug('socket id:', socket.id, 'disconnected.')
    Agent.update({ socketId: socket.id }, { connected: false })
     .then(function(agent) {
       if (agent.length > 0) {
         var _agent = agent[0]
         sails.log.debug('Agent id:', _agent.id, 'socketId:', socket.id, 'disconnected', socket.id);
         sails.sockets.leave(socket, ['agents', 'agent-' + _agent.id])
       }
       return cb();
     });
  }
};
