"use strict";

/**
 * ServerController
 * @description :: Server-side logic for manage servers
 */

module.exports = {
  checkHostname: (req, res) => {
    Server.count({ hostname: req.body.hostname })
    .then(res.ok)
    .catch(res.negotiate)
  },
  import: (req, res) => {
    let file = req.file('json').upload({
      maxBytes: 100000 // 10mb max
    }, (err, uploadeFiles) => {
      if (err) {
        return res.negotiate(err)
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0){
        return res.badRequest('No file was uploaded');
      }

      return res.ok()
    })
  }
};
