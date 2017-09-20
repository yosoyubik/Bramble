pragma solidity ^0.4.11;

import "./RegistryManagerEnabled.sol";
import "./SampleDb.sol";
import "./Manager.sol";
import "./ContractProvider.sol";

// The bank
contract Sample is RegistryManagerEnabled {
  
  function register(bytes32 hash,
                    uint hashFunc,
                    uint length,
                    address addr) returns (bool res) {
    require(isRegistryManager());
    address sampledb = ContractProvider(MANAGER).contracts("sampledb");
    require(sampledb != 0x0);

    // Use the interface to call on the bank contract. We pass msg.value along as well.
    bool success = SampleDb(sampledb).register(hash, hashFunc, length, addr);
    return success;
  }
  
  /*function numberOfSamples(address addr) constant returns (uint) {
    require(isRegistryManager());
    address sampledb = ContractProvider(MANAGER).contracts("sampledb");
    require(sampledb != 0x0);
    return SampleDb(sampledb).numberOfSamples(addr);
  }*/
  
  function access(address userAddr, uint sampleOff) constant returns(bytes32, uint, uint){ 
    require(isRegistryManager());
    address sampledb = ContractProvider(MANAGER).contracts("sampledb");
    require(sampledb != 0x0);

    // Use the interface to call on the bank contract.
    return SampleDb(sampledb).access(userAddr, sampleOff);
  }
}
