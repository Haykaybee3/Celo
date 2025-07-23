// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Storage} from "../src/Storage.sol";

contract DeployStorage is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        Storage storage = new Storage();
        console.log("Storage deployed to:", address(storage));
        vm.stopBroadcast();
    }
} 