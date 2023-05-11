import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import MyForm from "./components/MyForm";
import { generateJWT } from "./utils/generateJwt";

const App = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const getAccessToken = async () => {
      const JWT = await generateJWT();

      const response = await axios.post(
        "https://oauth2.googleapis.com/token",
        {
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion: JWT,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setAccessToken(response.data.access_token);
    };
    getAccessToken();
    const getAccessTokenID = setInterval(() => getAccessToken(), 3600000);
    return () => {
      clearInterval(getAccessTokenID);
    };
  }, []);
  return (
    <Container className="mx-auto mt-5 p-3 bg-light rounded-3">
      <MyForm accessToken={accessToken} />
    </Container>
  );
};

export default App;
