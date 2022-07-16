const { expect } = require('chai');
const AdoptionV2 = artifacts.require("AdoptionV2");

contract("AdoptionV2", (accounts) => {
    let adoptionV2;
    let expectedAdopter;
    const floorPrice = web3.utils.toWei("0.005", "ether");

    before(async () => {
        adoptionV2 = await AdoptionV2.new();
        adoptionV2.initialize(floorPrice);
    });

    describe("AdoptionV2コントラクトの挙動確認テスト", async () => {
        before("adopt a pet using accounts[0]", async () => {
            await adoptionV2.adopt(8, { from: accounts[0], value: web3.utils.toWei("0.01", "ether") });
            expectedAdopter = accounts[0];
        });

        it("ペットIDから所有者のアドレスを取得できることを確認", async () => {
            const adopter = await adoptionV2.adopters(8);
            expect(adopter).to.equal(expectedAdopter);
        });

        it("ペットを採用したオーナーアドレスの確認", async () => {
            const adopters = await adoptionV2.getAdopters();
            expect(adopters[8]).to.equal(expectedAdopter);
        });

        it("ペットの採用にかかった総額の確認", async () => {
            const expectedTotalAmount =  web3.utils.toWei("0.01", "ether"); 
            const totalAmount = await adoptionV2.getTotalAmount({ from: expectedAdopter });
            expect(totalAmount.toString()).to.equal(expectedTotalAmount.toString());
        });
    });
});
