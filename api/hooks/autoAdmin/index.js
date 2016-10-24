var _ = require('lodash');
var async = require('async');

var autoAdmin;
autoAdmin = function (sails) {
  function _logUserInfo(user) {
    sails.log.blank();
    sails.log('-------------------------------------------------------'.grey);
    sails.log(':: Default Admin Information'.grey);
    sails.log.blank();
    sails.log('Username     : ' + user.username);
    sails.log('FirstName    : ' + user.firstName);
    sails.log('LastName     : ' + user.lastName);
    sails.log('Email        : ' + user.email);

    if (sails.config.autoAdmin.enableActivation){
      sails.log('Activated    : ' + user.activated);
    }
    sails.log('Password     : ' + sails.config.autoAdmin.user.password);
    sails.log('Groups       : [ ' + user.getGroupNames(user).join(', ') + ' ]');
  }

  return {
    defaults: {
      autoAdmin: {
        enabled: false,
        user: {
          username: 'admin',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@admin.com',
          password: '12345',
          groups: [1]
        },
        groups: [
          {
            name: 'Admins',
            description: 'Default Admin Group',
            accessLevel: 3
          }
        ]
      }
    },

    initialize: function (next) {
      var config = sails.config.autoAdmin;
      sails.log.verbose(config);

      if (!config.enabled) {
        sails.log.debug('hooks::autoAdmin - skipping initialization of the default admin account.');
        return next();
      }

      sails.after('hook:orm:loaded', function () {
        async.each(config.groups, (group, cb) => {
          //findorcreate group
          Group.findOrCreate({
            name: group.name
          }, group)
          .then(function (group) {
            sails.log.debug('hooks::autoAdmin - created group', group.name);
            cb();
          })
          .catch((err) => {
            return cb(err);
          })
        }, (err) => {
          if (err) {
            sails.log.error(err);
            throw err;
          }
          // create users
          var newUser = _.merge(config.user);

          return User.findOne({
            username: config.user.username
          })
          .then(function (user) {
            if (!user) {
              return User.create(newUser)
              .then((user) => {
                sails.log.debug('hooks::autoAdmin - No default admin account exists, so i created it.');
                return user;
              });
            } else {
              sails.log.debug('hooks::autoAdmin - default admin account exists');
              return user;
            }
          })
          .then((user) => {
            return User.findOne({
              id: user.id
            })
            .populate('groups')
            .then((user) => {
              return user;
            })
            .then((user) => {
              _logUserInfo(user);
              return next();
            })
            .catch((err) => {
              sails.log.error(err);
            });
          });
        });
      });
    }
  };
};
module.exports = autoAdmin;
