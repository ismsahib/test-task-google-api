import React, { useState } from "react";
import { Container } from "react-bootstrap";

import Login from "./components/Login";
import MyForm from "./components/MyForm";

const App = () => {
  const [accessToken, setAccessToken] = useState("");

  return (
    <Container className="mx-auto mt-5 p-3 bg-light rounded-3">
      <div className="mb-3 d-flex justify-content-end">
        <div className="col-md-3 d-grid">
          <Login setAccessToken={setAccessToken} />
        </div>
      </div>
      <MyForm disabled={!accessToken.length} accessToken={accessToken} />
    </Container>
  );
};

export default App;
