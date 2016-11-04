"use strict";

/**
 * UserController
 * @description :: Server-side logic for manage users
 */

module.exports = {
  checkUsername: (req, res) => {
    User.count({ username: req.body.username })
    .then(res.ok)
    .catch(res.negotiate)
  },
  delete: (req, res) => {
    sails.log.debug(req.params.id)
    User.update(req.params.id, { isDeleted: true })
    .then(res.ok)
    .catch(res.negotiate)
  }
};
