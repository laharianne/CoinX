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
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [pendingFrom, setPendingFrom] = useState('0x00');
	const [pendingTo, setPendingTo] = useState('0x00');
	const [pendingAmount, setPendingAmount] = useState('0');
	const [isPending, setIsPending] = useState(false);
  const [errMsg, setErrMsg] = useState("Transaction failed!");
	const [isError, setIsError] = useState(false);
  const [transAmount, setTransAmount] = useState('0');
  const [AvailableCoins, setAvailableCoins] = useState('0');

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  // const getAllTransactions = async () => {
  //   try {
  //     if (ethereum) {
  //       const transactionsContract = createEthereumContract();

  //       const availableTransactions = await transactionsContract.getAllTransactions();

  //       const structuredTransactions = availableTransactions.map((transaction) => ({
  //         addressTo: transaction.receiver,
  //         addressFrom: transaction.sender,
  //         timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
  //         amount: parseInt(transaction.amount._hex) / (10 ** 18)
  //       }));

  //       console.log(structuredTransactions);

  //       setTransactions(structuredTransactions);
  //     } else {
  //       console.log("Ethereum is not present");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log(accounts[0]);

        // getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const checkIfTransactionsExists = async () => {
  //   try {
  //     if (ethereum) {
  //       const transactionsContract = createEthereumContract();
  //       const currentTransactionCount = await transactionsContract.getTransactionCount();

  //       window.localStorage.setItem("transactionCount", currentTransactionCount);
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     throw new Error("No ethereum object");
  //   }
  // };

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

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount} = formData;
        const transactionsContract = createEthereumContract();
        console.log(transactionsContract);
        console.log(formData);
        const parsedAmount = ethers.utils.parseEther((amount).toString());
        
        // await ethereum.request({
        //   method: "eth_sendTransaction",
        //   params: [{
        //     from: currentAccount,
        //     to: "0xD903b0E66e6C87CC887c014e770Ac76C73925791",
        //     gas: "0x5208",
        //     value: parsedAmount._hex,
        //   }],
        // });

        // const transactionHash = await transactionsContract.mint(addressTo, parsedAmount);

        // setIsLoading(true);
        // console.log(`Loading - ${transactionHash.hash}`);
        // await transactionHash.wait();
        // console.log(`Success - ${transactionHash.hash}`);
        // setIsLoading(false);

        // const transactionsCount = await transactionsContract.getTransactionCount();

        // setTransactionCount(transactionsCount.toNumber());
        // console.log(transactionCount)

        try{
          transactionsContract.mint({value:1});

          setIsLoading(true);
          await transactionContract.on((from, to, amount) => {
            setPendingFrom(from.toString());
            setPendingTo(to.toString());
            setPendingAmount(amount.toString());
            setIsPending(true);
          })
          console.log(transactionHash);
          setIsLoading(false);

        }
        catch(err){
          console.log(err);
          if(typeof err.data !== 'undefined') {
            setErrMsg("Error: "+ err.data.message);
          } 
          setIsError(true);
        }

        window.location.reload();
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
          transactionsContract.sellBack(1);

          setIsLoading(true);
          await transactionContract.on((from, to, amount) => {
            setPendingFrom(from.toString());
            setPendingTo(to.toString());
            setPendingAmount(amount.toString());
            setIsPending(true);
          })
          console.log(transactionHash);
          setIsLoading(false);

        }
        catch(err){
          console.log(err);
          if(typeof err.data !== 'undefined') {
            setErrMsg("Error: "+ err.data.message);
          } 
          setIsError(true);
        }

        // window.location.reload();
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
    // checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        getAvailableCoinCount,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        SellCoin,
        formData,transAmount,pendingFrom, pendingTo,pendingAmount,isPending,errMsg,isError,AvailableCoins
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
