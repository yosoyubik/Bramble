var Manager = artifacts.require("./Manager.sol");
var ManagerEnabled = artifacts.require("./ManagerEnabled.sol");
var RegistryManager = artifacts.require("./RegistryManager.sol");
var RegistryManagerEnabled = artifacts.require("./RegistryManagerEnabled.sol");
var Sample = artifacts.require("./Sample.sol");
var SampleDb = artifacts.require("./SampleDb.sol");
var ContractProvider = artifacts.require("./ContractProvider.sol");

// var User = artifacts.require("./User.sol");
// var UserDb = artifacts.require("./UserDb.sol");
// var UserManager = artifacts.require("./UserManager.sol");
// var UserManagerEnabled = artifacts.require("./UserManagerEnabled.sol");
// var Permissions = artifacts.require("./Permissions.sol");
// var PermissionsDb = artifacts.require("./PermissionsDb.sol");

module.exports = function(deployer) {
  // deployer.deploy(ContractProvider);
  deployer.deploy(Manager);
  deployer.deploy(ManagerEnabled);
  deployer.link(Manager, ManagerEnabled);
  deployer.deploy(Sample);
  deployer.deploy(RegistryManager);
  deployer.deploy(RegistryManagerEnabled);
  deployer.deploy(SampleDb);
  deployer.link(Sample, RegistryManagerEnabled);
  // deployer.deploy(User);
  // deployer.deploy(UserDb);
  // deployer.deploy(UserManager);
  // deployer.deploy(UserManagerEnabled);
  // deployer.deploy(Permissions);
  // deployer.deploy(PermissionsDb);
};
