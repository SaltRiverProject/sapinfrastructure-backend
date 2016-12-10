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

    case 'SB-FUNCTIONAL':
      return 'FSBX';
      break;
    case 'SB-TECH':
      return 'TSBX';
      break;

    case 'TRAINING':
      return 'TRAIN';
      break;

    case 'SANDBOX+1':
      return 'N1SBX';
      break;

    case 'DEV+1':
      return 'N1DEV';
      break;

    case 'TEST+1':
      return 'N1TST';
      break;

    case 'QA+1':
      return 'N1QA';
      break;

    case 'OTHER':
    default:
      return 'OTH'
      break;
  }
}
function _matchRole (role) {
  switch (role) {
    case 'ORADB':
      return 'ORADB'
      break;
    case 'DG':
      return 'DG'
      break;
    case 'SAPDB':
      return 'SAPDB'
      break;

    case 'ASCS':
      return 'SAPMS'
      break;

    case 'DVEBMGS':
    case 'D00':
      return 'SAPDI'
      break;

    case 'APP':
      return 'APP'
      break;

    case 'OTHDB':
    case 'OTHER':
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
    case 'SOLUTION MANAGER':
      return 'SOLMAN'
      break;
    case 'BASIS UTILITY':
      return 'BUS'
      break;
    case 'FIORI GATEWAY':
      return 'GW'
      break;
    case 'SALT':
      return 'SALT';
      break;
    case 'GWS':
      return 'GWS';
      break;
    case 'WINSHUTTLE':
      return 'WINSHUTTLE';
      break;
    case 'KNOA':
      return 'KNOA';
      break;
    default:
      return 'OTH'
      break;
  }
}
function _matchLocation (location) {
  switch (location) {
    case 'IBB':
    case 'IS' :
    case 'ISB':
      return 'ISB'
      break;

    case 'Ev':
    case 'EV':
    case 'EVS':
      return 'EVS'
      break;

    case 'DMZ':
      return 'DMZ'
      break;

    case 'ANY':
    case 'NULL':
    default:
      return 'OTH'
    break;
  }
}
module.exports = {
  roles: function (json) {

  },

  // ImportService.servers(require('./data/laser_infrastructure_11062016.json'))
  servers: function (json) {
    return Promise.all([
      Tier.find(),
      Role.find(),
      Component.find(),
      Location.find()
    ]).then(function (args) {
      var tiers = args[0]
      var roles = args[1]
      var components = args[2]
      var locations = args[3]

      var Servers = []

      if (!args[0] || !args[1] || !args[2] || !args[3]) {
        sails.log.error('Error parsing the provided import list')
        cb('Error parsing the provided import list')
      } else {
        each(json.d.results, function (row, cb) {

          var component = (row.Component) ? row.Component.trim().toUpperCase() : 'OTH'
          var location = (row.Loc) ? row.Loc.trim().toUpperCase() : 'OTH'
          var tier = (row.Tier) ? row.Tier.trim().toUpperCase() : 'OTH'

          var componentIndex = _.findIndex(components, { abbreviation: _matchComponent(component) })
          var tierIndex = _.findIndex(tiers, { abbreviation: _matchTier(tier) })
          var locationIndex = _.findIndex(locations, { abbreviation: _matchLocation(location) })


          var roles = []
          row.Roles.results.map(function (role, index) {
            if (typeof role === Array) {
              _.each(role, function (r, i) {
                var roleIndex = _.findIndex(roles, { abbreviation: _matchRole(r) })
                if (roleIndex > -1) {
                  roles.push(roles[roleIndex].id)
                } else {
                  roles.push(2)
                }
              })
            } else {
              var roleIndex = _.findIndex(roles, { abbreviation: _matchRole(role) })
              if (roleIndex > -1) {
                roles.push(roles[roleIndex].id)
              } else {
                roles.push(2) // push as OTHER
              }
            }
          })

          console.log(row.Alias)
          let newServer = {
            hostname: row.Title.trim().toUpperCase(),
            component: components[componentIndex].id,
            sid: row.SID || 'NULL',
            dns: (row.Alias) ? row.Alias.trim().split(/[\s,]+/) : null,
            cpu: row.CPU || 999,
            ram: row.RAM || 999,
            swap: row.Swap || 999,
            stg: row.Stg || 999,
            roles: roles,
            location: locations[locationIndex].id,
            tier: tiers[tierIndex].id,
            createdBy: 1,
            updatedBy: 1
          }

          Servers.push(newServer)
          cb();
        }, function (err) {
          if (err) {
            sails.log.error(err)
            throw err;
          }
          return Server.create(Servers)
          .then(function (servers) {
            fs.writeFile('./laser_infrastructure_11062016_parsed_2.json', JSON.stringify(servers, null, 2), function (err, data) {
              if (err) {
                sails.log.error(err);
              }
              return servers
            })
          })
          .then(function (servers) {
            return servers
          })
          .catch(function (err) {
            sails.log.error(err)
            throw err
          })
        });
      }
    })
    .catch(function (err) {
      sails.log.error(err);
      throw err
    })
  }
};
