var _ = require('lodash')
var each = require('async/each')
var fs = require('fs')
function _matchTier (tier) {
  switch (tier) {
    case 'PROD':
      return 'PROD'
      break;
    case 'QA':
      return 'QA'
      break;
    case 'TEST':
      return 'TEST'
      break;
    case 'DEV':
      return 'DEV'
      break;
    default:
      return 'OTH'
      break;
  }
}

function _matchRole (role) {
  switch (role) {
    case 'ORADB':
      return 'DB'
      break;
    case 'DG':
      return 'DG'
      breek;
    case 'OTHER':
      return 'OTH'
      break;
    case 'SAPDB':
      return 'DB'
      break;
    case 'ASCS':
      return 'SAPMS'
      break;
    case 'DVEBMGS':
      return 'SAPDI'
      break;
    case 'D00':
      return 'SAPDI'
      break;
    case 'APP':
      return 'APP'
      break;
    default:
      return 'OTH'
      break;
  }
}
function _matchComponent (component) {
  switch (component) {
    case 'BUSINESS OBJECTS':
      return 'BOBJ'
      break;
    case 'BW':
      return 'BW'
      break;
    case 'ECC':
      return 'ECC'
      break;
    case 'ENTERPRISE PORTAL':
      return 'PT'
      break;
    case 'GRC':
      return 'GRC'
      break;
    case 'OPEN TEXT - ARCHIVE SERVER':
      return 'OT'
      break;
    case 'PROCESS INTEGRATION':
      return 'PI'
      break;
    case 'PI-DAE':
      return 'AE'
      break;
    case 'PRODUCTIVITY PACK':
      return 'PP'
      break;
    case 'SLD':
      return 'SLD'
      break;
    case 'SRM':
      return 'SRM'
      break;
    case 'VERTEX':
      return 'VX'
      break;
    case 'WILY':
      return 'WY'
      break;
    case 'DATA SERVICES':
      return 'DS'
      break;
    default:
      return 'OTH'
      break;
  }
}

var Servers = []
var Tiers = []
var Components = []
var Roles = []
var Locations = []

module.exports = {
  setup: function () {
    Tier.find().then(function (tiers) {
      Tiers = tiers
    })
    .catch(function (err) {
      sails.log.error(err)
    })
    Component.find().then(function (components) {
      Components = components
    })
    .catch(function (err) {
      sails.log.error(err)
    })
    Role.find().then(function (roles) {
      Roles = roles
    })
    .catch(function (err) {
      sails.log.error(err)
    })
    Location.find().then(function (locations) {
      Locations = locations
    })
    .catch(function (err) {
      sails.log.error(err)
    })
  },
  import: function (json) {
    each(json.d.results, function (row, cb) {
      var componentIndex = _.findIndex(Components, { abbreviation: _matchComponent(row.Component.trim().toUpperCase()) })
      var tierIndex = _.findIndex(Tiers, { abbreviation: _matchTier(row.Tier.trim().toUpperCase()) })

      var roles = []
      row.Roles.results.map(function (role, index) {
        var roleIndex = _.findIndex(Roles, { abbreviation: _matchRole(role) })
        roles.push(Roles[roleIndex].id)
      })

      let newServer = {
        hostname: row.Title.trim().toUpperCase(),
        component: Components[componentIndex].id,
        sid: row.SID || 'NULL',
        dns: row.Alias.trim().split(/[\s,]+/),
        cpu: row.CPU || 99,
        ram: row.RAM || 99,
        swap: row.Swap || 99,
        stg: row.Stg || 99,
        roles: roles,
        tier: Tiers[tierIndex].id
      }

      Servers.push(newServer)
      cb()
    }, function (err) {
      if (err) {
        sails.log.error(err)
      }
      Server.create(Servers)
      .then(function (servers) {
        fs.writeFile('./laser_infrastructure_11062016_parsed_2.json', JSON.stringify(servers, null, 2), function (err, data) {
          if (err) {
            return sails.log.error(err);
          }
        });
      })
      .catch(function (err) {
        sails.log.error(err)
      })
    })
  }
};
