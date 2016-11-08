"use strict";

/**
 * AgentController
 * @description :: Server-side logic for manage Components
 */

module.exports = {
  _config: {
    pluralize: false
  },
  report: (req, res) => {
    sails.log.debug(req.server, req.agent)
    Metadata.create({
      key: 'key',
      value: 'value',
      agent: req.agent.id,
      via: 'agent'
    })
    .then((metadata) => {
      res.ok(metadata)
    })
  },
  connect: (req, res) => {
    if (req.isSocket) {
      sails.log.debug(req.body)
      Agent.update({
        id: req.agent.id
      },
      {
        connected: true
      })
      .then((agent) => {
        agent = agent[0]
        Agent.subscribe(req, 'agents-room-' + agent.id)
        sails.log.debug('Agent subscribed to room agents-room-' + agent.id)
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
      hostname: 'SRPLEC00'
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
