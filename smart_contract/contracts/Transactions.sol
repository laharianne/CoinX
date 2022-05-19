// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Transactions is ERC20 {
   address public owner;
    uint256 maxMiningCount;
    uint maxOwnedByOneAddress;
    
    constructor() ERC20("WalmartX", "WMX") {
        owner = msg.sender;
        maxMiningCount = 10000;
        maxOwnedByOneAddress = 5;
    }

    event TransactionComplete (
        address indexed transactionBy,
        uint currentBalance,
        uint mintableLeft,
        uint transactionDate
    );

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function mint() external payable {
        uint256 minEth = 1;
        require(msg.value>=minEth,"Enough ETH not sent!");
        require(totalSupply()<=maxMiningCount,"No More WalmartX coins can be mined!");

        if(balanceOf(msg.sender)+msg.value>maxOwnedByOneAddress){
            address payable recipient = payable(msg.sender);
            recipient.transfer(msg.value);
            require(false,"You cannot add these many coins to you wallet! Eth is returned to your account!");
        }

        _mint(msg.sender,msg.value);

        emit TransactionComplete(msg.sender,balanceOf(msg.sender),countOfMintableCoins(),block.timestamp);
    }

    function sellBack(uint256 amountToSellBack) public {
        require(balanceOf(msg.sender)>=amountToSellBack,"Insufficient balance of WMX to sell back!");
        _burn(msg.sender,amountToSellBack);
        address payable recipient = payable(msg.sender);
        recipient.transfer(amountToSellBack);

        emit TransactionComplete(msg.sender,balanceOf(msg.sender),countOfMintableCoins(),block.timestamp);
    }

    function returnBalance() public view returns(uint256){
        require(msg.sender==owner,"Only owner can access this function!");
        return address(this).balance;
    }

    function transferFrom(address from, address to, uint256 amount) public view override returns(bool) {
        require(false,"This function of ERC20 has been disabled via override!");
        return false;
    }

    function countOfMintableCoins() public view returns(uint256){
        return maxMiningCount - totalSupply();
    }
}