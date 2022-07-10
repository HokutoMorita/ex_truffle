pragma solidity ^0.8.10;

contract SimpleStorage {
    event Odd();
    event Even();
    
    uint myVariable;

    function set(uint x) public {
        myVariable = x;
        if (x % 2 == 1) {
            emit Odd();
        } else {
            emit Even();
        }
    }

    function get() public view returns (uint) {
        return myVariable;
    }
}
