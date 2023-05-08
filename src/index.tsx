import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <GoogleOAuthProvider clientId="715747292685-v59lli78477ushlfvlehpui1q0mvtpt2.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
