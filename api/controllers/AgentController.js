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
    var preppedInfo = []
    _.each(info.osinfo, function (value, key) {
      preppedInfo.push({
        key: key,
        value: value,
        via: 'agent',
        agent: agent.id,
        type: 'osinfo'
      })
    })

    _.each(info.cpu, function (value, key) {
      preppedInfo.push({
        key: key,
        value: value,
        via: 'agent',
        agent: agent.id,
        type: 'cpuinfo'
      })
    })

    _.each(info.memory, function (value, key) {
      preppedInfo.push({
        key: key,
        value: value,
        via: 'agent',
        agent: agent.id,
        type: 'memory'
      })
    })

    _.each(info.swap, function (value, key) {
      preppedInfo.push({
        key: key,
        value: value,
        via: 'agent',
        agent: agent.id,
        type: 'swap'
      })
    })

    // sails.log.debug(JSON.stringify(preppedInfo, null, 2))
    Metadata
    .create(preppedInfo)
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
    const hostname = req.body.hostname
    const osinfo = req.body.osinfo
    const ipv4 = req.body.ipv4
    const ipv6 = req.body.ipv6

    Server.findOne({
      hostname: hostname
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
          hostname: 'SRPLEC00',
          ipv4: ipv4,
          ipv6: ipv6
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
        throw { code: 'E_AGENT_ALREADY_REGISTERED', status: 500, message: 'Trying to register an already registerd agent.'}
      }
    })
    .then((agent) => {
      res.ok(agent)
    })
    .catch((err) => {
      return res.negotiate(err)
    })
  }
};
