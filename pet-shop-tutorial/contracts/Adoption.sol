pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

// 採用コントラクト
contract Adoption is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    address[16] public adopters;
    uint256 private _floorPrice;
    
    mapping (address => uint256) private totalAmounts;

    function initialize(uint256 floorPrice) public initializer {
        // UUPSは、実装コントラクト側でアップグレードをおこないます
        // そのため、アップグレードを実行できるのをOwnerに絞り込む必要があります
        __Ownable_init();
        __UUPSUpgradeable_init();
        _floorPrice = floorPrice;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

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
