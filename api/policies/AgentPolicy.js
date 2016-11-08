"use strict";

/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */


module.exports = (req, res, next) => {
  if (!req.isSocket) {
    return next({code: 400, message: 'Only socket requests are allowed to connect.'})
  }

  var authorization = req.body.headers.authorization.split('Bearer ')
  if (!req.body.headers.authorization) {
    return next({ code: 401, message: 'No Authorization Header provided' })
  }

  Agent.findOne({
    agentKey: authorization[1],
    enabled: true
  })
  .then((agent) => {
    if (!agent) {
      return next({ code: 404, message: 'No Agent found with the provided key, and hostname. Did you register the agent and enable it?'})
    }

    req.agent = agent
    Server.findOne({
      hostname: req.body.headers.host,
      id: agent.server
    })
    .then((server) => {
      if (!server) {
        return next({ code: 404, message: 'No server found with that hostname, and or server id. Is the agentKey right?'})
      }
      req.server = server
      next()
    })
  })
};
