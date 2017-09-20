pragma solidity ^0.4.11;

import "./ManagerEnabled.sol";
import "./Manager.sol";
import "./ContractProvider.sol";

// Base class for contracts that only allow the fundmanager to call them.
// Note that it inherits from ManagerEnabled
contract RegistryManagerEnabled is ManagerEnabled {

    // Makes it easier to check that fundmanager is the caller.
    function isRegistryManager() constant returns (bool) {
        if(MANAGER != 0x0){
            address fm = ContractProvider(MANAGER).contracts("registrymanager");
            return msg.sender == fm;
        }
        return false;
    }
}
