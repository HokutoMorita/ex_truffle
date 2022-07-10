var SimpleStorage = artifacts.require("SimpleStorage");
var Fibonacci = artifacts.require("Fibonacci");

module.exports = function (deployer) {
    deployer.deploy(SimpleStorage);
    deployer.deploy(Fibonacci);
};
