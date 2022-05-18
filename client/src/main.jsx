import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";

ReactDOM.render(
  <TransactionsProvider>
    <Router>
     <App />
    </Router>
  </TransactionsProvider>,
  document.getElementById("root"),
);