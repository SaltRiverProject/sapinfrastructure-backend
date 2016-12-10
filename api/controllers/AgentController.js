"use strict";
var _ = require('lodash')
/**
 * AgentController
 * @description :: Server-side logic for manage Components
 */

module.exports = {
  _config: {
    pluralize: false
  },
  report: (req, res) => {
    var info = req.body
    var agent = req.agent

    Metadata
    .create({
      via: 'agent',
      agent: agent.id,
      data: info
    })
    .then((metadata) => {
      res.ok(metadata)
    })
    .catch((error) => {
      sails.log.error(error)
      res.negotiate(error)
    })
  },
  connect: (req, res) => {
    if (req.isSocket) {
      sails.log.debug('Updating Agent model with connected: true, socketId:', req.socket.id)
      Agent.update({
        id: req.agent.id
      },
      {
        connected: true,
        socketId: req.socket.id
      })
      .then((agent) => {
        agent = agent[0]
        sails.sockets.join(req, ['agents', 'agent-' + agent.id])
        sails.log.debug('Agent id:', agent.id, 'socketId:', agent.socketId, 'subscribed to rooms [\'agent-' + agent.id, '\', \'agents\']')
        return res.ok(agent)
      })
    }
  },
  register: (req, res) => {
    if (!req.body.hostname) {
      const err = { code: 'E_INVALID_PAYLOAD', status: 404, message: 'Looks like the hostname wasn\t provided.'}
      return res.negotiate(err)
    }

    Server.findOrCreate({
      hostname: req.body.hostname
    })
    .then((server) => {
      if (!server) {
        throw { code: 'E_NO_SERVER_FOUND', status: 404, message: 'Looks like we can\'t find a server by that hostname'}
      }
      return server
    })
    .then((server) => {
      return Agent.findOne({
        server: server.id
      })
      .then((agent) => {
        return { server, agent }
      })
    })
    .then(({server, agent}) => {
      if (!agent) {
        return Server
        .update({ id: server.id }, {
          hostname: server.hostname,
          ipv4: req.body.ipv4,
          ipv6: req.body.ipv6
        })
        .then((server) => {
          server = server[0]
          return Agent
          .create({
            server: server.id
          })
          .then((agent) => {
            return agent
          })
        })
      } else {
        throw { code: 'E_AGENT_ALREADY_REGISTERED', status: 500, message: 'Trying to register an already registered agent.'}
      }
    })
    .then((agent) => {
      return Server.update({
        hostname: req.body.hostname
      }, {
        agent: agent.id
      })
      .then((server) => {
        res.ok(agent)
      })
    })
    .catch((err) => {
      return res.negotiate(err)
    })
  }
};
