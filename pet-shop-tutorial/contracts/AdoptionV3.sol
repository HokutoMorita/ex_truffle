pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

// 採用コントラクト
contract AdoptionV3 is Initializable {
    address[16] public adopters;
    uint256 private _floorPrice;
    mapping (address => uint256) private totalAmounts;
    uint256 private _floorPrice2;

    function initialize(uint256 floorPrice2) public initializer {
        _floorPrice2 = floorPrice2 * 2;
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

    function getFloorPrice() public view returns (uint) {
        return _floorPrice;
    }

    function setFloorPrice2(uint256 floorPrice2) public {
        _floorPrice2 = floorPrice2 * 2;
    }

    function getFloorPrice2() public view returns (uint) {
        return _floorPrice2;
    }
}
