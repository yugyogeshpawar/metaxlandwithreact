//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./ArtNotionNFT.sol";

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds; 
    Counters.Counter private _itemsSold; 
    Counters.Counter private _tokenIds;

    address payable owner; 
    uint256 private platformFee;
    address private feeRecipient;
    uint256 private artnotionnfts;
    struct MarketItem {
        uint256 itemId;
        address nftaddress;
        uint256 tokenId;
        address seller; 
        address owner; 
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) public marketitemslist;
    mapping(address=>address[]) public artnotionnftslist;
    mapping(address=>bool) public ArtNotionNFTvalidator;

    constructor(uint256 _platformfee,address _feerecipient) {
        owner = payable(msg.sender);
        platformFee=_platformfee;
        feeRecipient=_feerecipient;
    }
    
    modifier onlyOwner() {
        require(msg.sender==owner,"Not an Authorized User");
        _;
    }

    event MarketItemCreated(uint256 indexed itemId,address indexed nftaddress,uint256 indexed tokenId,address seller,address  owner,uint256 price,bool sold);
    event BoughtMarketItem(uint256 indexed itemId,address indexed nftaddress,address seller,address indexed buyer,uint256 price);
    event createdNFTAddress(address indexed creator,address nftcontract);
    
    function createNFT(string calldata _name,string calldata _symbol,uint256 _royaltyfee,address _recepient) public returns(address){
        ArtNotionNFT artnotionnft=new ArtNotionNFT(_name,_symbol,address(this),_royaltyfee,_recepient);
        address temp = address(artnotionnft);
        ArtNotionNFTvalidator[temp] = true;
        artnotionnftslist[msg.sender].push(temp); 
        emit createdNFTAddress(msg.sender,temp);
        return temp;
    } 
    
    function isArtNotionNFT(address _nftaddress) public view returns(bool) {
        return  ArtNotionNFTvalidator[_nftaddress];
    } 

    function createMarketItem(address nftaddress,uint256 tokenId,uint256 price) public payable nonReentrant{
         require(price > 0, "Price must be above zero");
         require(nftaddress!=address(0),"Entered zero address");  
        _itemIds.increment(); 
         uint256 itemId = _itemIds.current();
         marketitemslist[itemId] = MarketItem(itemId,nftaddress,tokenId,payable(msg.sender),payable(address(this)),price,false);
            IERC721(nftaddress).transferFrom(msg.sender, address(this), tokenId);

            emit MarketItemCreated(itemId,nftaddress,tokenId,msg.sender,address(this),price,false);

    }

    function buyMarketItem(address _nftaddress,uint256 _itemId) public payable nonReentrant{
                require(_nftaddress!=address(0),"Entered zero address");
                require(_itemId > 0,"not a valid itemId");
                uint256 price = marketitemslist[_itemId].price;
                uint256 tokenId = marketitemslist[_itemId].tokenId;
                uint256 platformFeeTotal = calculatePlatformFee(price);
                
                require(msg.value == price, "Price not Matching with mentioned price");
              
                (bool sent,)=marketitemslist[_itemId].seller.call{value:msg.value}("");
                require(sent,"NFT Transaction Failed");

                (bool success,)=payable(feeRecipient).call{value:platformFeeTotal}("");
                require(success,"Fee Payment Transaction Failed");
                
                if(isArtNotionNFT(_nftaddress)){
                uint256 royaltyFee = ArtNotionNFT(_nftaddress).getRoyaltyFee();
                address royaltyRecipient = ArtNotionNFT(_nftaddress).getRoyaltyRecipient();
                uint256 royaltyFeeTotal = calculateRoyaltyFee(royaltyFee,price);
                require(royaltyFee>0);
                (bool send,)=payable(royaltyRecipient).call{value:royaltyFeeTotal}("");
                require(send,"Fee Payment Transaction Failed"); 
                }
            IERC721(_nftaddress).transferFrom(address(this), msg.sender, tokenId);

            marketitemslist[_itemId].owner = payable(msg.sender); 
            marketitemslist[_itemId].sold = true; 
            _itemsSold.increment();

            emit BoughtMarketItem(_itemId,_nftaddress,marketitemslist[_itemId].seller,msg.sender,price); 
        }


        
        function getMarketItems() public view returns (MarketItem[] memory){
            uint256 itemCount = _itemIds.current();
            uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
            uint256 currentIndex = 0;

            MarketItem[] memory items=new MarketItem[](unsoldItemCount);

            for(uint256 i = 0; i < itemCount;){

                if(marketitemslist[i+1].owner == address(0)){

                    uint256 currentId = marketitemslist[i + 1].itemId;
                    MarketItem storage currentItem = marketitemslist[currentId];
                    items[currentIndex] = currentItem;
                    currentIndex += 1;

                }

                unchecked { i+=1; }
            }

            return items; 
        }

        
        function getMyNFTs() public view returns (MarketItem[] memory){
            
            uint256 totalItemCount = _itemIds.current();

            uint256 itemCount = 0;
            uint256 currentIndex = 0;


            for(uint256 i = 0; i < totalItemCount;){
                if(marketitemslist[i+1].owner == msg.sender){
                    itemCount += 1; 
                }
                unchecked { i+=1; }
            }

            MarketItem[] memory items = new MarketItem[](itemCount);
            for(uint i = 0; i < totalItemCount;){
               if(marketitemslist[i+1].owner == msg.sender){
                   uint currentId = marketitemslist[i+1].itemId;
                   MarketItem storage currentItem = marketitemslist[currentId];
                   items[currentIndex] = currentItem;
                   currentIndex += 1;
               }
               unchecked { i+=1; }
            }
            return items;

        }


        
        function getItemsCreated() public view returns (MarketItem[] memory){
            
            uint totalItemCount = _itemIds.current();

            uint itemCount = 0;
            uint currentIndex = 0;


            for(uint i = 0; i < totalItemCount;){
                
                if(marketitemslist[i+1].seller == msg.sender){
                    itemCount += 1; 
                }
                unchecked { i+=1; }
            }

            MarketItem[] memory items = new MarketItem[](itemCount);
            for(uint i = 0; i < totalItemCount; i++){
               if(marketitemslist[i+1].seller == msg.sender){
                   uint currentId = marketitemslist[i+1].itemId;
                   MarketItem storage currentItem = marketitemslist[currentId];
                   items[currentIndex] = currentItem;
                   currentIndex += 1;
               }
            }
            return items;

        }
      
    function calculatePlatformFee(uint256 _price) internal view returns(uint256){
        uint256 fee = (_price * platformFee) / 3000 ;
        return fee; 
    }     
     
         function calculateRoyaltyFee(uint256 _royaltyFee,uint256 _price) internal pure returns(uint256){
        uint256 fee = (_price * _royaltyFee) / 3000 ;
        return fee; 
    }     

    function updateFee(uint256 _platformfee) public onlyOwner{
        require(_platformfee > 0 ,"Fee must be greater than zero");
        platformFee = _platformfee;
    }

    function getPlatformFee() public view returns(uint256){
        return platformFee;
    }

   

}