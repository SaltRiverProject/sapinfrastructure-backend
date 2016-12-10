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
      sails.log('Activated  : ' + user.activated);
    }
    sails.log('Password     : ' + sails.config.autoAdmin.user.password);
    sails.log('Group        : ' + user.group.name);
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
          group: 'Admins'
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

      var Groups = []

      if (!config.enabled) {
        sails.log.debug('hooks::autoAdmin - skipping initialization of the default admin account.');
        return next();
      }

      sails.after('hook:orm:loaded', function () {
        async.each(config.groups, function (group, cb) {
          //findorcreate group
          Group.findOrCreate({
            name: group.name
          }, group)
          .then(function (group) {
            if(!group) {
              sails.log.error('group not found or created')
              cb('group not found or created')
            }

            sails.log.debug('hooks::autoAdmin - found or created group', group.name);
            Groups.push(group)
            cb();
          })
          .catch(function (err) {
            return cb(err);
          })
        }, function (err) {
          if (err) {
            sails.log.error(err);
            throw err;
          }

          // create users
          var newUser = config.user

          return User.findOne({
            username: config.user.username
          })
          .then(function (user) {
            var newUser = _.merge({}, config.user)
            var groupIndex = _.findIndex(Groups, { name: newUser.group })
            newUser.group = Groups[groupIndex].id

            if (!user) {
              return User
              .create(newUser)
              .then(function (user) {
                sails.log.debug('hooks::autoAdmin - No default admin account exists, so i created it.');
                return user;
              });
            } else {
              sails.log.debug('hooks::autoAdmin - default admin account exists');
              return user;
            }
          })
          .then(function (user) {
            return User.findOne({
              id: user.id
            })
            .populate('group')
            .then(function (user) {
              if (!user) {
                sails.log.error('unable to fetch user');
                return next('unable to fetch user');
              }

              return user;
            })
            .then(function (user) {
              _logUserInfo(user);
              return next();
            })
            .catch(function (err) {
              sails.log.error(err);
            });
          });
        });
      });
    }
  };
};
module.exports = autoAdmin;
