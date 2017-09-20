var Manager = artifacts.require("Manager.sol");

// Removes all contracts from Manager
module.exports = function (callback) {
  var manager = Manager.at(Manager.address);
  manager.remove();
  return callback();
}
