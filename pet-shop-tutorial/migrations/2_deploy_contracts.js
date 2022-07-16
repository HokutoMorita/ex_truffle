const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

var Adoption = artifacts.require("Adoption");
var AdoptionV2 = artifacts.require("AdoptionV2");
const floorPrice = web3.utils.toWei("0.005", "ether");

module.exports = async function(deployer) {
    const adoption = await deployProxy(Adoption, [floorPrice], { deployer, initializer: 'initialize' });
    await upgradeProxy(adoption.address, AdoptionV2);
};
