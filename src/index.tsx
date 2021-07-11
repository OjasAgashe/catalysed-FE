import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import "./common.css";
import { AuthProvider } from "./context/api_context/AuthContext";
import { CookieProvider } from "./context/cookie_context/CookieContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CookieProvider>
        <App />
      </CookieProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
