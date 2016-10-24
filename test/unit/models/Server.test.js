var should = require('chai').should();

const newServer = {
  hostname: 'srptestsrvr',
  cpu: 1,
  ram: 16,
  swap: 20,
  dns: [
    'saptestserver'
  ],
  sid: 'TST',
  component: 1,
  location: 1
};

describe('models:Server', () => {
  it('Should create new server', (done) => {
    Server
    .create(newServer)
    .then((server) => {
      server.should.contain.keys(
        'hostname',
        'cpu',
        'ram',
        'swap',
        'dns',
        'sid',
        'roles',
        'component',
        'location'
      );
      done();
    }).catch(done);
  });


  it('Should remove a server', (done) => {
    before((done) => {
      Server
      .create(newServer)
      .then((server) => {
        newServer = server;
        server.should.contain.keys(
          'hostname',
          'cpu',
          'ram',
          'swap',
          'dns',
          'sid',
          'component',
          'location'
        );
        done();
      }).catch(done);
    })


    Server
    .destroy({
      hostname: newServer.hostname
    })
    .then((servers) => {
      servers[0].should.contain.keys(
        'hostname',
        'cpu',
        'ram',
        'swap',
        'dns',
        'sid',
        'component',
        'createdAt',
        'updatedAt',
        'id',
        'location'
      );
      done();
    })
    .catch(done);
  });


  it('Should find a list of servers', (done) => {
    Server.find()
    .then((servers) => {
      servers.length.should.eql(fixtures.server.length);
      done();
    })
    .catch(done);
  });


  it('Should find a single server', (done) => {
    Server.findOne({
      hostname: fixtures.server[1].hostname
    })
    .then((server) => {
      server.should.contain.keys(
        'hostname',
        'cpu',
        'ram',
        'swap',
        'dns',
        'sid',
        'roles',
        'component',
        'location'
      );
      done();
    })
    .catch(done);
  });
});
