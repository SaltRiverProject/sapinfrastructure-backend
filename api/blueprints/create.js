"use strict";

const _ = require('lodash');
const actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

/**
 * Create Record
 * POST /:model
 *
 * An API call to create and return a single model instance using the specified parameters.
 */
module.exports = (req, res) => {
  const Model = actionUtil.parseModel(req);
  let values = actionUtil.parseValues(req);

  if (Model.autoCreatedBy === true) {
    sails.log.debug('create() blueprint Override', req.user.id);
    values.createdBy = req.user.id;
  }

  Model
    .create(_.omit(values, 'id'))
    .then(res.created)
    .catch(res.negotiate);
};
