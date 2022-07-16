const { expect } = require('chai');
const AdoptionV2 = artifacts.require("AdoptionV2");

contract("AdoptionV2", () => {
    let adoptionV2;
    const floorPrice = web3.utils.toWei("0.005", "ether");

    before(async () => {
        adoptionV2 = await AdoptionV2.new();
        await adoptionV2.initialize(floorPrice);
    });

    describe("AdoptionV2コントラクトの挙動確認テスト", async () => {
        it("フロアプライス2の値確認", async () => {
            const expectedFloorPrice = web3.utils.toWei("0.01", "ether");
            const actualFloorPrice = await adoptionV2.getFloorPrice();
            expect(actualFloorPrice.toString()).to.equal(expectedFloorPrice.toString());
        });
    });
});
