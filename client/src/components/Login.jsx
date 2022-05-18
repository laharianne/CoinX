import React, { useState } from "react";
import ReactDOM from "react-dom";
import {Navbar,Footer} from "./";
import { useHistory } from "react-router-dom";
import {Welcome} from "./"

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Login = () =>{
    const navigate = useHistory();
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
        <div className="error" style={{color:"white"}}>{errorMessages.message}</div>
    );

    // User Login info
    const database = [
        {
        username: "user1",
        password: "pass1"
        },
        {
        username: "user2",
        password: "pass2"
        }
    ];

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = (event) => {
        localStorage.setItem('isLoggedIn',false)
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.username === uname.value);

        // Compare user info
        if (userData) {
        if (userData.password !== pass.value) {
            // Invalid password
            setErrorMessages({ name: "pass", message: errors.pass });
        } else {
            setIsSubmitted(true);
            localStorage.setItem('username',userData.username)
            localStorage.setItem('isLoggedIn',true)
            // alert(localStorage.getItem('isLoggedIn'))
            navigate.push("/Welcome")
        }
        } else {
        // Username not found
        setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    const renderForm = (
        <div className="form">
        <form onSubmit={handleSubmit}>
        <div>
            <input  placeholder="UserName" className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" type="text" name="uname" required />
            {renderErrorMessage("uname")}
            <input  placeholder="Password" className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" type="password" name="pass" required />
            {renderErrorMessage("pass")}
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            <input className="text-white w-full mt-2 border-[1px] bg-transparent p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer" type="submit" />
            </div>
        </form>
    </div>
    );

    return (
        <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
        <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
            <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
              Walmart CoinX <br /> across the world
            </h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              Claim Walmart NFT @ 0.02 ETH
            </p>
            <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div>
          <p className="text-left mt-5 text-white font-light text-base">
          Login to Buy/Reward NFT
          </p>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <div><h4 className="text-2xl sm:text-3xl text-white py-1">Sign In</h4></div>
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        </div>
        </div>
      </div>
    </div>
    </div>
    <Footer />
    </div>
    );
};

 export default Login;