import React, { useState } from "react";
import { Container } from "react-bootstrap";

import Login from "./components/Login";
import MyForm from "./components/MyForm";

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <Container className="mx-auto mt-5 p-3 bg-light rounded-3">
      <div className="mb-3 d-flex justify-content-end">
        <div className="col-md-3 d-grid">
          <Login setLoginStatus={setLoginStatus} />
        </div>
      </div>
      <MyForm disabled={!loginStatus} />
    </Container>
  );
};

export default App;
