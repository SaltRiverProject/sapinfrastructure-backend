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
      'role',
      'location',
      'component',
      'server',
      'group',
      'user'
    ], (err) => {
      if (err) {
        sails.log.error(err);
        return done(err);
      }
      done();
    });
  });
});

after(done => Sails.lower(done));
