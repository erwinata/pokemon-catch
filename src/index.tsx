import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import client from "./api/client";
import App from "./pages/App";
import "./styles/globals.css";
import "./styles/reset.css";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
