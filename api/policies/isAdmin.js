"use strict";

/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */

var _ = require('lodash');
module.exports = (req, res, next) => {
  const user = req.user;
  User.findOne({ id: user.id })
  .populate('group')
  .then((user) => {
    if (user.group.accessLeevel < 2) {
      return res.negotiate({
        code: 'E_INSUFFICIENT_AUTH',
        status: 401
      })
    }

    next();
  })
  .catch((err) => {
    sails.log.error(err);
    return next(err);
  })


};
