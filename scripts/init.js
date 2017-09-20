var Manager = artifacts.require("Manager.sol");
var ManagerEnabled = artifacts.require("ManagerEnabled.sol");
var RegistryManager = artifacts.require("RegistryManager.sol");
var RegistryManagerEnabled = artifacts.require("RegistryManagerEnabled.sol");
var Sample = artifacts.require("Sample.sol");
var SampleDb = artifacts.require("SampleDb.sol");

// Contracts are created through the manager contract.
module.exports = function (callback) {
  var manager = Manager.at(Manager.address);

  var contracts = [
    [Sample.address, "sample"],
    [SampleDb.address, "sampledb"],
    [RegistryManager.address, "registrymanager"],
    [RegistryManagerEnabled.address, "registrymanagerenabled"],
    [ManagerEnabled.address, "managerenabled"]
  ];

  for (var i = 0; i < contracts.length; i++) {
    manager.addContract(contracts[i][1], contracts[i][0]);
  }
  return callback();
}
