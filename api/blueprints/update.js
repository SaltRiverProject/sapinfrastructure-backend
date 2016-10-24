"use strict";

const _ = require('lodash');
const actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

/**
 * Update One Record
 * PUT /:model/:id
 *
 * An API call to update a model instance with the specified `id`, treating the other unbound parameters as attributes.
 */
module.exports = (req, res) => {
  const Model = actionUtil.parseModel(req);
  const pk = actionUtil.requirePk(req);
  let values = actionUtil.parseValues(req);

  if (Model.autoUpdatedBy === true) {
    sails.log.debug('update() blueprint Override', req.user.id);
    values.updatedBy = req.user.id;
  }

  Model
    .update(pk, _.omit(values, 'id'))
    .then(records => records[0] ? res.ok(records[0]) : res.notFound())
    .catch(res.negotiate);
};
