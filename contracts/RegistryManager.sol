pragma solidity ^0.4.11;

import "./Manager.sol";
import "./Sample.sol";
import "./ContractProvider.sol";


contract RegistryManager is ManagerEnabled {
  
  // We still want an owner.
  address owner;

  // Constructor
  function RegistryManager(){
    owner = msg.sender;
  }

  // Attempt to register a sample
  function submitSample(bytes32 ipfshash, uint hashFunc, uint length) returns (bool res) {
    // FIXME: Check for empty strings!
    /*if (storedData.length == 0){
        return false;
    }*/
    address sample = ContractProvider(MANAGER).contracts("sample");
    /*if ( sample == 0x0 || permsdb == 0x0 || PermissionsDb(permsdb).perms(msg.sender) < 1) {*/
    require(sample != 0x0);

    // Use the interface to call on the sample contract
    bool success = Sample(sample).register(ipfshash, hashFunc, length, msg.sender);
    return success;
  }
  
  /*function numberOfSamples() constant returns (uint) {
    address sample = ContractProvider(MANAGER).contracts("sample");
    require(sample != 0x0);
    return Sample(sample).numberOfSamples(msg.sender);
  }*/

  // Attempt to register a sample
  function extractSample(uint sampleOff) constant returns (bytes32, uint, uint) {
    address sample = ContractProvider(MANAGER).contracts("sample");
    /*address permsdb = ContractProvider(MANAGER).contracts("permsdb");*/
    require(sample != 0x0);
    /*if ( sample == 0x0 || permsdb == 0x0 || PermissionsDb(permsdb).perms(msg.sender) < 1) {*/
    // Use the interface to call on the sample contract.
    return Sample(sample).access(msg.sender, sampleOff);
  }
}
