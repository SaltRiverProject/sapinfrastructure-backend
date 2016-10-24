"use strict";

/**
 * Passport configuration file where you should configure all your strategies
 * @description :: Configuration file where you configure your passport authentication
 */

const _ = require('lodash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LdapStrategy = require('passport-ldapauth');


/**
 * Configuration object for LDAP Stratgery
 * @type {Object}
 * @private
 */
const LDAP_STRATEGY_CONFIG = {
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
  server: {
    url: 'ldap://phxlp-pdc02.devita.co:389',
    searchBase: 'OU=Production,OU=DEVITA,DC=devita,DC=co',
    bindDn: 'CN=Administrator,OU=Users,OU=ADMIN,OU=Production,OU=DEVITA,DC=devita,DC=co',
    bindCredentials: 'GxgzE5vA',
    domain: 'devita.co',
    searchFilter: '(uid={{username}})'
  }
};

/**
 * Configuration object for local strategy
 * @type {Object}
 * @private
 */
const LOCAL_STRATEGY_CONFIG = {
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
};

/**
 * Configuration object for JWT strategy
 * @type {Object}
 * @private
 */
const JWT_STRATEGY_CONFIG = {
  secretOrKey: '2546dd38b356dafb9ea2f6ed75586f883f3c3f1a55f1edc630b3d7eb3689d54e',
  jwtFromRequest: ExtractJwt.versionOneCompatibility({
    authScheme: 'Bearer',
    tokenBodyField: 'access_token'
  }),
  tokenQueryParameterName: 'access_token',
  authScheme: 'Bearer',
  session: false,
  passReqToCallback: true
};


/**
 * Triggers when user authenticates via ldap strategy
 * @param {Object} req Request object
 * @param {String} username Username from body field in request
 * @param {String} password Password from body field in request
 * @param {Function} next Callback
 * @private
 */
const _onLdapStrategyAuth = (req, user, next) => {
  let model = {
    username: user.uid,
    email: user.userPrincipalName,
    firstName: user.givenName,
    accountType: 'ldap',
    lastName: user.sn,
    groups: [ 2 ]
  };

  User
    .findOne({ username: user.uid })
    .populate('groups')
    .then((user) => {
      if (!user) {
        return User
        .create(model)
        .then((user) => {
          return user;
        })
        .catch(next)
      }
      return user;
    })
    .then((user) => {
      User.findOne({ id: user.id })
      .populate('groups')
      .then((user) => {
        return next(null, user)
      })
    })
    .catch(next);
};

/**
 * Triggers when user authenticates via local strategy
 * @param {Object} req Request object
 * @param {String} username Username from body field in request
 * @param {String} password Password from body field in request
 * @param {Function} next Callback
 * @private
 */
const _onLocalStrategyAuth = (req, username, password, next) => {
  User
    .findOne({[LOCAL_STRATEGY_CONFIG.usernameField]: username})
    .populate('groups')
    .then(user => {
      if (!user) return next(null, null, sails.config.errors.USER_NOT_FOUND);
      if (!HashService.bcrypt.compareSync(password, user.password)) return next(null, null, sails.config.errors.USER_NOT_FOUND);
      return next(null, user, {});
    })
    .catch(next);
};

/**
 * Triggers when user authenticates via JWT strategy
 * @param {Object} req Request object
 * @param {Object} payload Decoded payload from JWT
 * @param {Function} next Callback
 * @private
 */
const _onJwtStrategyAuth = (req, payload, next) => {
  User
    .findOne({id: payload.id})
    .then(user => {
      if (!user) return next(null, null, sails.config.errors.USER_NOT_FOUND);
      return next(null, user, {});
    })
    .catch(next);
};

module.exports = {
  passport: {
    /**
     * Triggers when all Passport steps is done and user profile is parsed
     * @param {Object} req Request object
     * @param {Object} res Response object
     * @param {Object} error Object with error info
     * @param {Object} user User object
     * @param {Object} info Information object
     * @returns {*}
     * @private
     */
    onPassportAuth(req, res, error, user, info) {
      if (error || !user) return res.negotiate(error || info);

      return res.ok({
        token: CipherService.jwt.encodeSync({id: user.id}),
        user: user
      });
    }
  }
};

passport.use(new LdapStrategy(_.assign({}, LDAP_STRATEGY_CONFIG), _onLdapStrategyAuth));
passport.use(new LocalStrategy(_.assign({}, LOCAL_STRATEGY_CONFIG), _onLocalStrategyAuth));
passport.use(new JwtStrategy(_.assign({}, JWT_STRATEGY_CONFIG), _onJwtStrategyAuth));
