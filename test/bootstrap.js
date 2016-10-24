const Sails = require('sails');
const config = require('../config/env/test');
var Barrels = require('barrels')

before((done) => {
  Sails.lift(config, (error, server) => {
    if (error) return done(error);
    sails = server;
    var barrels = new Barrels();
    fixtures = barrels.data;

    barrels.populate([
      'role'
    ], (err) => {
      if (err) {
        sails.log.debug(err);
        return done(err);
      }
      done();
    });
  });
});

after(done => Sails.lower(done));
