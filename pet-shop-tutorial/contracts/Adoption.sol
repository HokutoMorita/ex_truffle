pragma solidity ^0.5.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";

// 採用コントラクト
contract Adoption is Ownable {
    address[16] public adopters;
    uint256 private totalAmount;
    uint256 private floorPrice = 0.005 ether;
    // uint256 private floorPrice = 5000000000000000;

    // Adoptiong a pet
    function adopt(uint petId) public payable onlyOwner returns (uint) {
        require(petId >= 0 && petId <= 15);
        require(msg.value >= floorPrice);
        adopters[petId] = msg.sender;
        totalAmount += msg.value;
        return petId;
    }

    // Retrieving the adopters
    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }

    function getTotalAmount() public view onlyOwner returns (uint) {
        return totalAmount;
    }
}
