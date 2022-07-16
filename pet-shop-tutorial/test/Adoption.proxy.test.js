const { expect } = require('chai');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Adoption = artifacts.require("Adoption");


contract('Adoption (proxy)', function (accounts) {
    let adoption;
    let expectedAdopter;
    const floorPrice = web3.utils.toWei("0.005", "ether");

    before(async function () {
        adoption = await deployProxy(Adoption, [floorPrice], {initializer: 'initialize'});
        await adoption.adopt(8, { from: accounts[0], value: floorPrice });
        expectedAdopter = accounts[0];
    });

    it('プロキシ経由で取得した採用コントラクトにて、ペットIDから所有者のアドレスを取得できることを確認', async function () {
        const adopter = await adoption.adopters(8);
        expect(adopter).to.equal(expectedAdopter);
    });
  });
