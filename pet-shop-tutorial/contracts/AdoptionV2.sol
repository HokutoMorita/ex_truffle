pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

// 採用コントラクト
contract AdoptionV2 is Initializable {
    address[16] public adopters;
    uint256 private _floorPrice;
    
    mapping (address => uint256) private totalAmounts;

    function initialize(uint256 floorPrice) public initializer {
        _floorPrice = floorPrice * 2;
    }

    // Adoptiong a pet
    function adopt(uint petId) public payable returns (uint) {
        require(petId >= 0 && petId <= 15);
        require(msg.value >= _floorPrice);
        adopters[petId] = msg.sender;
        totalAmounts[msg.sender] += msg.value;
        return petId;
    }

    // Retrieving the adopters
    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }

    function getTotalAmount() public view returns (uint) {
        return totalAmounts[msg.sender];
    }
}
