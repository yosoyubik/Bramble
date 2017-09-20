var Manager = artifacts.require("./Manager.sol");

module.exports = function(deployer) {
  deployer.deploy(Manager, web3.eth.accounts[0]);
};
