//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721URIStorage,Ownable {

    
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    address private nftcontractAddress;
    uint256 private royaltyFee;
    address private royaltyrecipient;

    constructor(string memory _name,string memory _symbol,address _nftaddress,uint256 _royaltyFee,address _royaltyrecipient) ERC721(_name,_symbol){
       nftcontractAddress = _nftaddress;
       royaltyFee = _royaltyFee; 
       royaltyrecipient = _royaltyrecipient;
    }

    function createToken(string memory _tokenURI) public returns(uint256) {
        _tokenIds.increment();
        uint256 newtokenId = _tokenIds.current();

        _safeMint(msg.sender, newtokenId); 
        _setTokenURI(newtokenId, _tokenURI); 
        setApprovalForAll(nftcontractAddress, true);
        return newtokenId;

    }

    function updateRoyaltyFee(uint256 _royaltyFee) public onlyOwner{
         require(_royaltyFee > 0,"royaltyFee must be greater than zero");
         royaltyFee = _royaltyFee;
    }

    function getRoyaltyFee() public view returns(uint256) {
        return royaltyFee;
    }
    
    function getRoyaltyRecipient() public view returns(address) {
        return royaltyrecipient;
    }
}