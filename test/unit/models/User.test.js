"use strict";

const assert = require('chai').assert;

const newUser = {
  username: 'modelTest',
  password: 'password',
  email: 'modelTest@gmail.com'
};

describe('models:User', () => {
  it('Should create new user', done => {
    User
      .create(newUser)
      .then(user => {
        assert.equal(user.username, newUser.username);
        done();
      })
      .catch(done);
  });

  it('Should remove user', done => {
    User
      .destroy({username: newUser.username})
      .then(users => {
        assert.equal(users[0].username, newUser.username);
        done();
      })
      .catch(done);
  });

  it('Should assign a user to a group', (done) => {
    User
      .update({ id: fixtures.user[0].id }, { groups: [1,2] })
      .then((user) => {
        User
          .findOne({ id: user[0].id })
          .populate('groups')
          .then((user) => {
            user.groups[0].name.should.eql('Admins')
            user.groups[1].name.should.eql('Users')

            done();
          });
      })
      .catch(done);
  });
  it('Should removee a user from a group', (done) => {
    User
      .update({ id: fixtures.user[0].id }, { groups: [2] })
      .then((user) => {
        User
          .findOne({ id: user[0].id })
          .populate('groups')
          .then((user) => {
            user.groups[0].name.should.not.eql('Admins')
            done();
          });
      })
      .catch(done);
  });
});
