"use strict";

var should = require('chai').should();

const newRole = {
  name: 'Test Role'
};

describe.only('models:Role', () => {
  it('Should create new role', (done) =>{
    Role
    .create(newRole)
    .then((role) => {
      role.should.contain.keys(
        'name'
      );
      done();
    })
    .catch(done);
  });


  it('Should remove a role', (done) => {
    before((done) => {
      Role
      .create(newRole)
      .then((role) => {
        newRole = role;
        role.should.contain.keys(
          'name'
        );
        done();
      })
      .catch(done);
    });

    Role
    .destroy(newRole.id)
    .then((roles) => {
      roles[0].should.contain.keys(
        'name',
        'createdAt',
        'updatedAt',
        'id'
      );
      done();
    })
    .catch(done);
  });


  it('Should find a list of roles', (done) => {
    Role.find()
    .then((roles) => {
      console.log(roles);
      roles.length.should.be.above(0);
      done();
    })
  });


  it('Should find a single role',(done) => {
    Role.findOne({ name: fixtures.role[1].name })
    .then((role) => {
      role.name.should.eql(fixtures.role[1].name);
      done();
    })
  });
});
