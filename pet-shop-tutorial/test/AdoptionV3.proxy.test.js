const { expect } = require('chai');
const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const Adoption = artifacts.require("Adoption");
const AdoptionV2 = artifacts.require("AdoptionV2");
const AdoptionV3 = artifacts.require("AdoptionV3");


contract('AdoptionV3 (proxy)', function () {
    let adoption;
    let adoptionV2;
    let adoptionV3;
    const floorPrice = web3.utils.toWei("0.005", "ether");

    before(async function () {
        adoption = await deployProxy(Adoption, [floorPrice], { initializer: 'initialize' });
        adoptionV2 = await upgradeProxy(adoption.address, AdoptionV2);
        adoptionV3 = await upgradeProxy(adoptionV2.address, AdoptionV3, { call: { fn: 'setFloorPrice2', args: [floorPrice] } });
    });

    it('フロアプライス2の価格を確認', async function () {
        const expectedFloorPrice2 = web3.utils.toWei("0.01", "ether");
        const actualFloorPrice2 = await adoptionV3.getFloorPrice2();
        expect(actualFloorPrice2.toString()).to.equal(expectedFloorPrice2.toString());
    });
  });
