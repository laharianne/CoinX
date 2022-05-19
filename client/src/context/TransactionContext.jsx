import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  console.log(signer)
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: ""});
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [AvailableCoins, setAvailableCoins] = useState('0');
  const [HoldingCoins, setHoldingCoins] = useState('0');

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log(accounts[0]);

      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      getAvailableCoinCount();
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const getAvailableCoinCount = async() =>{
    if(ethereum){
      const transactionsContract = createEthereumContract();
        const AvailableCoinCount = await transactionsContract.countOfMintableCoins();
        setAvailableCoins(AvailableCoinCount.toString());
        console.log(AvailableCoins.toString());
    }
    else{
      console.log("No ethereum Object");
    }
  };

  const getHoldingCoins = async() =>{
    if(ethereum){
      const transactionsContract = createEthereumContract();
      console.log(currentAccount);
      const HoldingCoinCount = await transactionsContract.balanceOf(currentAccount.toString());
      setHoldingCoins(HoldingCoinCount.toString());
      console.log(HoldingCoins.toString());
    }
    else{
      setHoldingCoins("NA");
      console.log("No ethereum Object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount} = formData;
        const transactionsContract = createEthereumContract();
        console.log(transactionsContract);
        console.log(formData);
        const parsedAmount = ethers.utils.parseEther((amount).toString());

        try{
          const transactionHash = await transactionsContract.mint({value:amount});

          setIsLoading(true);
          console.log(`Loading - ${transactionHash.hash}`);
          await transactionHash.wait();
          console.log(`Success - ${transactionHash.hash}`);
          setIsLoading(false);
        }
        catch(err){
          console.log(err);
        }

        window.location.reload();
        getHoldingCoins();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const TransferCoin = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount} = formData;
        const transactionsContract = createEthereumContract();
        console.log(transactionsContract);
        console.log(formData);
        const parsedAmount = ethers.utils.parseEther((amount).toString());

        try{
          const transactionHash = await transactionsContract.transfer(addressTo,amount);

          setIsLoading(true);
          console.log(`Loading - ${transactionHash.hash}`);
          await transactionHash.wait();
          console.log(`Success - ${transactionHash.hash}`);
          setIsLoading(false);
        }
        catch(err){
          console.log(err);
        }

        window.location.reload();
        getHoldingCoins();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const SellCoin = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount} = formData;
        const transactionsContract = createEthereumContract();
        console.log(transactionsContract);
        console.log(formData);
        const parsedAmount = ethers.utils.parseEther((amount).toString());

        try{
          const transactionHash = await transactionsContract.sellBack(amount);

          setIsLoading(true);
          console.log(`Loading - ${transactionHash.hash}`);
          await transactionHash.wait();
          console.log(`Success - ${transactionHash.hash}`);
          setIsLoading(false);

        }
        catch(err){
          console.log(err);
        }

        window.location.reload();
        getHoldingCoins();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    getHoldingCoins();
  }, );

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        getAvailableCoinCount,
        getHoldingCoins,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        SellCoin,
        TransferCoin,
        formData,AvailableCoins,HoldingCoins,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
