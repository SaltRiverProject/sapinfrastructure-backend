var async = require('async')
var Promise = require('bluebird')

module.exports = {
  _config: {
    pluralize: false
  },
  load: (req, res) => {
    const groupByTier      = 'SELECT count(server.id) as count, tier.name as name, tier.abbreviation as abbreviation FROM server LEFT JOIN tier ON server.tier = tier.id GROUP BY tier';
    const groupByLocation  = 'SELECT count(server.id) as count, location.name as name, location.abbreviation as abbreviation FROM server LEFT JOIN location ON server.location = location.id GROUP BY location';
    const groupByComponent = 'SELECT count(server.id) as count, component.name as name, component.abbreviation as abbreviation FROM server LEFT JOIN component ON server.component = component.id GROUP BY component';
    // const groupByAgent     = 'SELECT server.id as , server.hostname as hostname, agent.id as agentId FROM	server LEFT JOIN agent ON agent.server = server.id'
    const outofSync        = 'SELECT metadata.id as metadataId, metadata.createdAt as metadataCreatedAt, agent.server as agentServerId, agent.id as agentId, agent.enabled as agentEnabled, agent.connected as agentConnected, server.hostname as serverHostname, server.id as serverId FROM metadata INNER JOIN agent_metadata__metadata_agent ON agent_metadata__metadata_agent.metadata_agent = metadata.id INNER JOIN agent ON agent.id = agent_metadata__metadata_agent.agent_metadata INNER JOIN server ON server.id = agent.server WHERE metadata.createdAt <= NOW() - INTERVAL 30 MINUTE'
    const disconAgents     = 'SELECT server.hostname as hostname, server.id as id FROM server LEFT JOIN agent ON agent.server = server.id WHERE agent.connected = 0'
    const connAgents       = 'SELECT server.hostname as hostname, server.id as id FROM server LEFT JOIN agent ON agent.server = server.id WHERE agent.connected = 1'

    var ServerQueryAsync = Promise.promisify(Server.query)
    Promise.all([
      ServerQueryAsync(groupByTier),
      ServerQueryAsync(groupByLocation),
      ServerQueryAsync(groupByComponent),
      // ServerQueryAsync(groupByAgent),
      ServerQueryAsync(outofSync),
      ServerQueryAsync(disconAgents),
      ServerQueryAsync(connAgents)
    ])
    .then(function (results) {
      var groupbytier      = results[0]
      var groupbylocation  = results[1]
      var groupbycomponent = results[2]
      // var groupbyagent     = results[3]
      var outofsync        = results[3]
      var disconagents     = results[4]
      var connagents       = results[5]

      res.ok({
        groupbytier,
        groupbycomponent,
        groupbylocation,
        // groupbyagent,
        outofsync,
        disconagents,
        connagents
      })
    })
    .catch(function handleErrors (err) {
      if (err) {
        sails.log.error(err)
        return res.negotiate(err)
      }
    })
  }
}
