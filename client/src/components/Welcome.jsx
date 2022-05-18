import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import {Container, Row, Col} from 'reactstrap'

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";
import {Navbar,Footer,Login} from "./"
import { useHistory } from "react-router-dom";


const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="1"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const navigate = useHistory();
  const { currentAccount, connectWallet, handleChange, sendTransaction, SellCoin,formData, isLoading, transactionCount,transAmount,pendingFrom, pendingTo,pendingAmount,isPending,errMsg,isError,AvailableCoins,getAvailableCoinCount,HoldingCoins,getHoldingCoins} = useContext(TransactionContext);

  window.onload = function(){
    getAvailableCoinCount();
    getHoldingCoins();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(currentAccount);
    const { addressTo = "0xD903b0E66e6C87CC887c014e770Ac76C73925791", amount} = formData;
    console.log(formData);

    

    if (!amount){ 
      console.log("Failing inside if condition!");
      return;
    }
    getAvailableCoinCount();
    console.log("Calling SendTransaction!")
    sendTransaction();
    
  };

  // Handles user buy form submit
	const handleBuySubmit = (e) => {
    e.preventDefault();
    console.log(currentAccount);
    const { addressTo = "0xD903b0E66e6C87CC887c014e770Ac76C73925791", amount} = formData;
    console.log(formData);
    if (!amount){ 
      console.log("Failing inside if condition!");
      return;
    }
    getAvailableCoinCount();
    console.log("Calling SendTransaction!")
    sendTransaction();
	};

  const handleSellSubmit = (e) => {
    e.preventDefault();
    console.log(currentAccount);
    const { addressTo = "0xD903b0E66e6C87CC887c014e770Ac76C73925791", amount} = formData;
    console.log(formData);
    if (!amount){ 
      console.log("Failing inside if condition!");
      return;
    }
    getAvailableCoinCount();
    console.log("Calling SendTransaction!")
    SellCoin();
    
  };


  if(localStorage.getItem("isLoggedIn")){
  return (
    <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Walmart CoinX <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Claim Walmart NFT @1 Wei
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  Address : {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-sm">
                  Total Available Coins @Walmart : {AvailableCoins}
                </p>
                <p className="text-white font-semibold text-sm">
                  Coins Balance of Current Account : {HoldingCoins}
                </p>
                <p className="text-white font-semibold text-sm">
                  Ethereum - Connected Acct
                </p>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex w-full justify-center items-center">
            <Row style={{display:"-webkit-inline-box"}}>
              <Col className="p-3">
                <div className="p-5 w-full flex flex-col justify-start items-center blue-glassmorphism">
                <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base  text-center">
                  Buy Walmart Coin @1 Wei
                </p>
                
                <div className="h-[1px] w-full bg-gray-400 my-2" />
                  <Input placeholder="No of Coins" name="amount" type="text" handleChange={handleChange} />

                  {isLoading
                    ? <Loader />
                    : (
                      <button
                        type="button"
                        onClick={handleBuySubmit}
                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                      >
                        Buy Now
                      </button>
                    )}
                </div>
              </Col>
              <Col className="p-3">
                <div className="p-5 w-full flex flex-col justify-start items-center blue-glassmorphism">
                <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base  text-center">
                  Sell WalmartX coin back
                </p>
                
                <div className="h-[1px] w-full bg-gray-400 my-2" />
                  <Input placeholder="No of Coins" name="amount" type="number" handleChange={handleChange} />

                  {isLoading
                    ? <Loader />
                    : (
                      <button
                        type="button"
                        onClick={handleSellSubmit}
                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                      >
                        Sell now
                      </button>
                    )}
                </div>
              </Col>
              {/* <Col className="p-3">
                <div className="p-5 w-full flex flex-col justify-start items-center blue-glassmorphism">
                <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base text-center">
                  Transfer Walmart X Coin!
                </p>
                
                <div className="h-[1px] w-full bg-gray-400 my-2" />
                  <Input placeholder="Associate ID" name="addressTo" type="text" handleChange={handleChange} />
                  <Input placeholder="No of Coins" name="amount" type="number" handleChange={handleChange} />


                  {isLoading
                    ? <Loader />
                    : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                      >
                        Transfer
                      </button>
                    )}
                </div>
              </Col> */}
              {/* <Col className="p-3">
                <div className="p-5 w-full flex flex-col justify-start items-center blue-glassmorphism">
                <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base text-center">
                  Check WalmartX Coin Balance
                </p>
                <div className="h-[1px] w-full bg-gray-400 my-2" />

                  {isLoading
                    ? <Loader />
                    : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                      >
                        Check Balancce
                      </button>
                    )}
                </div>
              </Col> */}
          </Row>
          </div>
    </div>
    <Footer />
    </div>
  );
            }
            else{
              navigate.push("/Login")
            }
};

export default Welcome;
