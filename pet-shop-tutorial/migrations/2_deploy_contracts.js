const { deployProxy } = require('@openzeppelin/truffle-upgrades');

var Adoption = artifacts.require("Adoption");
const floorPrice = web3.utils.toWei("0.005", "ether");

module.exports = async function(deployer) {
    deployer.deploy(Adoption);
    await deployProxy(Adoption, [floorPrice], { deployer, initializer: 'initialize' });
};
