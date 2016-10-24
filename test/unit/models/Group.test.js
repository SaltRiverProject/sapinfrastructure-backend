"use strict";

var should = require('chai').should();

const newGroup = {
  name: 'Test Group',
  description: 'Test Group',
  accessLevel: 1
};

describe('models:Group', () => {
  it('Should create new group', (done) => {
    Group
      .create(newGroup)
      .then((group) => {
        group.should.contain.keys(
          'name',
          'accessLevel',
          'createdAt',
          'updatedAt',
          'users',
          'id'
        )
        done();
      })
      .catch(done);
  });

  it('Should remove a group', (done) => {
    Group
      .destroy({name: newGroup.name})
      .then((groups) => {
        // @TODO add asssertions
        done();
      })
      .catch(done);
  });
});
