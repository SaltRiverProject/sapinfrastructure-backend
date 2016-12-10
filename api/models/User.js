"use strict";
var _ = require('lodash');
/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
  autoCreatedBy: true,
  schema: true,
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true
    },

    password: {
      type: 'string'
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    firstName: {
      type: 'string',
      defaultsTo: ''
    },

    lastName: {
      type: 'string',
      defaultsTo: ''
    },

    photo: {
      type: 'string',
      defaultsTo: '',
      url: true
    },

    accountType: {
      type: 'string',
      defaultsTo: 'local'
    },
    lastLogin: {
      type: 'date'
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    },

    // associations
    group: {
      model: 'group'
    },
    createdBy: {
      model: 'user'
    },
    updatedBy: {
      model: 'user'
    },
    toJSON() {
      let obj = this.toObject();

      delete obj.password;
      delete obj.socialProfiles;

      return obj;
    }
  },

  beforeUpdate(values, next) {
    if (false === values.hasOwnProperty('password')) return next();
    if (/^\$2[aby]\$[0-9]{2}\$.{53}$/.test(values.password)) return next();

    return HashService.bcrypt.hash(values.password)
      .then(hash => {
        values.password = hash;
        next();
      })
      .catch(next);
  },

  beforeCreate(values, next) {
    if (false === values.hasOwnProperty('password')) return next();

    return HashService.bcrypt.hash(values.password)
      .then(hash => {
        values.password = hash;
        next();
      })
      .catch(next);
  }
};
