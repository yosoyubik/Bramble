pragma solidity ^0.4.11;

import "./ManagerEnabled.sol";

contract Manager {

  address public owner;

  // This is where we keep all the contracts.
  mapping (bytes32 => address) public contracts;
  uint public nContracts;
  modifier onlyOwner { //a modifier to reduce code replication
    if (msg.sender == owner){ // this ensures that only the owner can access the function
      _;
    }
  }
  // Constructor
  function Manager(){
    owner = msg.sender;
    nContracts = 0;
  }

   // Add a new contract to Manager. This will overwrite an existing contract.
  function addContract(bytes32 name, address addr) onlyOwner returns (bool result) {
    // addr would be the msg.sender in ManagerEnabled
    ManagerEnabled de = ManagerEnabled(addr);
    // Don't add the contract if this does not work.
    if(!de.setManagerAddress(address(this))) {
      return false;
    }
    contracts[name] = addr;
    nContracts++;
    return true;
  }

  // Remove a contract from Manager. We could also selfdestruct if we want to.
  /*function removeContract(bytes32 name) onlyOwner returns (bool result) {*/
  function removeContract(bytes32 name) onlyOwner returns (bool result) {
    if (contracts[name] == 0x0){
      return false;
    }
    contracts[name] = 0x0;
    nContracts--;
    return true;
  }

  function remove() onlyOwner {
    address sm = contracts["surveillancemanager"];
    address sample = contracts["sample"];
    address sampledb = contracts["sampledb"];
    address sme = contracts["surveillancemanagerenabled"];
    address me = contracts["managerenabled"];
    // Remove everything.
    if(sm != 0x0){ ManagerEnabled(sm).remove(); }
    if(sample != 0x0){ ManagerEnabled(sample).remove(); }
    if(sampledb != 0x0){ ManagerEnabled(sampledb).remove(); }
    if(sme != 0x0){ ManagerEnabled(sme).remove(); }
    if(me != 0x0){ ManagerEnabled(me).remove(); }

    // Finally, remove Manager. Manager will now have all the funds of the other contracts,
    // and when suiciding it will all go to the owner.
    selfdestruct(owner);
  }
}
