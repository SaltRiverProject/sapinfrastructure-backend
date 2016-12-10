"use strict";

/**
 * Policy Mappings
 *
 * Policies are simple functions which run before your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 */

module.exports = {
  policies: {
    '*': ['isAuthenticated'],

    AuthController: {
      '*': true
    },

    AgentController: {
      '*': ['isAuthenticated', 'isAdmin'],
      register: true,
      connect: ['AgentPolicy'],
      report: ['AgentPolicy']
    },

    CommentController: {
      '*': ['isAuthenticated', 'isAdmin'],
    },

    MetadataController: {
      '*': ['isAuthenticated', 'isAdmin'],
    },

    UserController: {
      '*': ['isAuthenticated', 'isAdmin'],
      'create': ['isAuthenticated', 'isAdmin', 'AuditPolicy'],
      'update': ['isAuthenticated', 'isAdmin', 'AuditPolicy'],
      'destroy': ['isAuthenticated', 'isAdmin', 'AuditPolicy']
    },

    ComponentController: {
      '*': ['isAuthenticated'],
      'create': ['isAuthenticated', 'AuditPolicy'],
      'update': ['isAuthenticated', 'AuditPolicy'],
      'destroy': ['isAuthenticated', 'AuditPolicy']
    },

    LocationController: {
      '*': ['isAuthenticated'],
      'create': ['isAuthenticated', 'AuditPolicy'],
      'update': ['isAuthenticated', 'AuditPolicy'],
      'destroy': ['isAuthenticated', 'AuditPolicy']
    },

    RoleController: {
      '*': ['isAuthenticated'],
      'create': ['isAuthenticated', 'AuditPolicy'],
      'update': ['isAuthenticated', 'AuditPolicy'],
      'destroy': ['isAuthenticated', 'AuditPolicy']
    },

    ServerController: {
      '*': ['isAuthenticated'],
      'create': ['isAuthenticated', 'AuditPolicy'],
      'update': ['isAuthenticated', 'AuditPolicy'],
      'destroy': ['isAuthenticated', 'AuditPolicy']
    },


    GroupController: {
      '*': ['isAuthenticated', 'isAdmin'],
      'create': ['isAuthenticated', 'isAdmin', 'AuditPolicy'],
      'update': ['isAuthenticated', 'isAdmin', 'AuditPolicy'],
      'destroy': ['isAuthenticated', 'isAdmin', 'AuditPolicy']
    }
  }
};
