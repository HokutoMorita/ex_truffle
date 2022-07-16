const { expect } = require('chai');
const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const Adoption = artifacts.require("Adoption");
const AdoptionV2 = artifacts.require("AdoptionV2");


contract('AdoptionV2 (proxy)', function (accounts) {
    let adoption;
    let adoptionV2;
    const floorPrice = web3.utils.toWei("0.005", "ether");

    before(async function () {
        adoption = await deployProxy(Adoption, [floorPrice], { initializer: 'initialize' });
        adoptionV2 = await upgradeProxy(adoption.address, AdoptionV2);
    });

    it('フロアプライスの価格を確認', async function () {
        // floorPriceは、adoptionから引き継いでいるので0.005ETHのまま
        const expectedFloorPrice = web3.utils.toWei("0.005", "ether");
        const actualFloorPrice = await adoptionV2.getFloorPrice();
        expect(actualFloorPrice.toString()).to.equal(expectedFloorPrice.toString());
    });
  });
