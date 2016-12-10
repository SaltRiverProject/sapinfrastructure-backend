"use strict";

/**
 * GroupController
 * @description :: Server-side logic for manage groups
 */

module.exports = {
  checkGroupname: (req, res) => {
    Group.count({ name: req.body.name })
    .then(res.ok)
    .catch(res.negotiate)
  }
};
