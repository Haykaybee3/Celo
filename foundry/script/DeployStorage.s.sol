// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Storage} from "../src/Storage.sol";

contract DeployStorage is Script {
    function run() public {
        string memory privateKeyStr = vm.envString("PRIVATE_KEY");
        uint256 deployerPrivateKey;
        
        if (bytes(privateKeyStr).length > 2 && bytes(privateKeyStr)[0] == "0" && bytes(privateKeyStr)[1] == "x") {
            deployerPrivateKey = vm.parseUint(privateKeyStr);
        } else {
            deployerPrivateKey = vm.parseUint(string(abi.encodePacked("0x", privateKeyStr)));
        }
        
        vm.startBroadcast(deployerPrivateKey);
        Storage storageContract = new Storage();
        console.log("Storage deployed to:", address(storageContract));
        vm.stopBroadcast();
    }
} 