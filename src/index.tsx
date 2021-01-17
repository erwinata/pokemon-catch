import { ApolloProvider } from "@apollo/client";
import { AppProvider } from "context/context";
import React from "react";
import ReactDOM from "react-dom";
import client from "./api/client";
import App from "./App";
import "./styles/globals.css";
import "./styles/reset.css";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppProvider>
        <App />
      </AppProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
