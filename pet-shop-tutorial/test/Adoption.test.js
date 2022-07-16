const { expect } = require('chai');
const Adoption = artifacts.require("Adoption");

contract("Adoption", (accounts) => {
    let adoption;
    let expectedAdopter;
    const floorPrice = web3.utils.toWei("0.005", "ether");

    before(async () => {
        adoption = await Adoption.new();
        await adoption.initialize(floorPrice);
    });

    describe("Adoptionコントラクトの挙動確認テスト", async () => {
        before("adopt a pet using accounts[0]", async () => {
            await adoption.adopt(8, { from: accounts[0], value: web3.utils.toWei("0.005", "ether") });
            expectedAdopter = accounts[0];
        });

        it("ペットIDから所有者のアドレスを取得できることを確認", async () => {
            const adopter = await adoption.adopters(8);
            expect(adopter).to.equal(expectedAdopter);
        });

        it("ペットを採用したオーナーアドレスの確認", async () => {
            const adopters = await adoption.getAdopters();
            expect(adopters[8]).to.equal(expectedAdopter);
        });

        it("ペットの採用にかかった総額の確認", async () => {
            const expectedTotalAmount =  web3.utils.toWei("0.005", "ether"); 
            const totalAmount = await adoption.getTotalAmount({ from: expectedAdopter });
            expect(totalAmount.toString()).to.equal(expectedTotalAmount.toString());
        });
    });
});
