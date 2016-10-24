var should = require('chai').should();
var _ = require('lodash');

describe.skip('hooks:autoAdmin', () => {
  it('should create an admin and user group', (done) => {
    Group.find()
    .then((groups) => {
      console.log('autoAdmin', groups)
      const adminGroupIndex = _.findIndex(groups, ((group) => {
        return group.name === 'Admins'
      }))
      const userGroupIndex = _.findIndex(groups, ((group) => {
        return group.name === 'Users'
      }))

      done();
    })
  })
});
