"use strict";

/**
 * LocationController
 * @description :: Server-side logic for manage locations
 */

module.exports = {
  checkLocationname: (req, res) => {
    Location.count({ name: req.body.name })
    .then(res.ok)
    .catch(res.negotiate)
  }
};
