/* globals sails */
var fnv = require('fnv-plus');
var _ = require('lodash');
var url = require('url');

function sanitizeRequestUrl(req) {
  var requestUrl = url.format({
    protocol: req.protocol,
    host: req.host || sails.getHost(),
    pathname: req.originalUrl || req.url,
    query: req.query
  });

  return requestUrl.replace(/(password=).*?(&|$)/ig, '$1<hidden>$2');
}

/**
 * Audit Policy
 * @description logs requests made to a table,
 * includes information like body content,
 * action, controller, model, url, remoteIp.
 */
module.exports = function (req, res, next) {
  var ipAddress = req.headers['x-forwarded-for'] || (req.connection && req.connection.remoteAddress);
  req.requestId = fnv.hash(new Date().valueOf() + ipAddress, 128).str();

  var requestlog = {
    id: req.requestId,
    ipAddress: ipAddress,
    url: sanitizeRequestUrl(req),
    method: req.method,
    body: _.omit(req.body, 'password'),
    action: req.options.action,
    controller: req.options.controller,
    model: req.options.model,
    user: (req.user || {}).id
  };

  sails.models.audit.create(requestlog).exec(_.identity);
  sails.log.verbose(requestlog);

  // persist RequestLog entry in the background; continue immediately
  next();
};
