"use strict";

/**
 * Generic Error Handler
 *
 * Calls the appropriate custom response for a given error
 */

const _ = require('lodash');

module.exports = function (error) {
  const res = this.res;
  const code = _.get(error, 'code');
  const message = _.get(error, 'reason') || _.get(error, 'message');
  const root = _.get(error, 'root');
  const data = _.get(error, 'invalidAttributes') || _.omit(error, ['name', 'code', 'reason', 'message', 'root', 'status', 'oauthError']);
  const statusCode = _.get(error, 'status') || _.get(error, 'oauthError') || 500;
  const config = {code, message, root};

  if (statusCode === 401) {
    sails.log.error(data, config)
    return res.unauthorized(data, config)
  }

  if (statusCode === 403 && code === 'E_INSUFFICIENT_AUTH') {
    sails.log.error(data, config)
    return res.insufficientAuth(data, config);
  }

  if (statusCode === 403) return res.forbidden(data, config);
  if (statusCode === 404) return res.notFound(data, config);
  if (statusCode >= 400 && statusCode < 500) {
    sails.log.error(data, config)
    return res.badRequest(data, config);
  }

  sails.log.error(data, config)
  return res.serverError(data, config);
};
