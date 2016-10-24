"use strict";

/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */

var _ = require('lodash');
module.exports = (req, res, next) => {
  const user = req.user;
  User.findOne({ id: user.id })
  .populate('groups')
  .then((user) => {
    const isAdmin = user.groups.some((g) => (g.accessLevel >= 2));
    if (!isAdmin) {
      // req.user = {};

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
