const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

var Adoption = artifacts.require("Adoption");
var AdoptionV2 = artifacts.require("AdoptionV2");
var AdoptionV3 = artifacts.require("AdoptionV3");
const floorPrice = web3.utils.toWei("0.005", "ether");

module.exports = async function(deployer) {
    const adoption = await deployProxy(Adoption, [floorPrice], { deployer, kind: 'uups', initializer: 'initialize' });
    const adoption2 = await upgradeProxy(adoption.address, AdoptionV2);
    const callInitialize = { call: { fn: 'setFloorPrice2', args: [floorPrice] } }
    await upgradeProxy(adoption2.address, AdoptionV3, callInitialize);
};
