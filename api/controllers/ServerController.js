"use strict";

/**
 * ServerController
 * @description :: Server-side logic for manage servers
 */

module.exports = {
  checkHostname: (req, res) => {
    Server.count(req.body)
    .then(res.ok)
    .catch(res.negotiate)
  }
};
