pragma solidity ^0.4.11;

import "./ManagerEnabled.sol";
import "./Manager.sol";
import "./ContractProvider.sol";

// The bank database
contract SampleDb is ManagerEnabled {

  // TODO: What if size is bigger than 32
  // Inspired by: https://www.reddit.com/r/ethdev/comments/6lbmhy/a_practical_guide_to_cheap_ipfs_hash_storage_in/
  struct MultiHashIPFS {
    bytes32 ipfsHash; // TODO: Proof-saved for hashes bigger than 32 bytes.
    uint hashFunc;
    uint length;
  }
  mapping (address => MultiHashIPFS[]) private userSamples;
  mapping (address => MultiHashIPFS[]) private samples;
  
  uint public nSamples;

  event NewSample(
    address _from, 
    bytes32 _ipfshash, 
    uint _hashFunc, 
    uint _length
  );
  
  event NewAccess(
    address _from, 
    uint _offset
  );
  
  // Register a new sample
  function register(bytes32 ipfshash, uint hashFunc, uint length, address addr) returns (bool res) {
    if(MANAGER != 0x0) {
      address sample = ContractProvider(MANAGER).contracts("sample");
      if (msg.sender == sample) {
        MultiHashIPFS memory multiHashIPFS;
        multiHashIPFS.ipfsHash = ipfshash;
        multiHashIPFS.hashFunc = hashFunc;
        multiHashIPFS.length = length;
        userSamples[addr].push(multiHashIPFS);
        nSamples++;
        NewSample(addr, ipfshash, hashFunc, length);
        return true;
      }
    }
    return false;
  }
  
  function numberOfSamples(address addr) constant returns (uint) {
    require(MANAGER != 0x0);
    address sample = ContractProvider(MANAGER).contracts("sample");
    require(msg.sender == sample);
    return userSamples[addr].length;
  }
  
  // Requesting access to sample
  function access(address addr, uint sampleOff) constant returns (bytes32, uint, uint) {
    /*require(MANAGER != 0x0);*/
    if(MANAGER != 0x0) {
      address sample = ContractProvider(MANAGER).contracts("sample");
      if (msg.sender == sample) {
        NewAccess(addr, sampleOff);
        return (samples[addr][sampleOff - 1].ipfsHash, samples[addr][sampleOff - 1].hashFunc, samples[addr][sampleOff - 1].length);
      }
    }
    return ('', 0, 0);
  }

}
