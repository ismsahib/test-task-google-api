import { useGoogleLogin } from "@react-oauth/google";
import React, { Dispatch, FC, useState } from "react";
import { Alert, Button } from "react-bootstrap";

interface LoginProps {
  setLoginStatus: Dispatch<React.SetStateAction<boolean>>;
}
const Login: FC<LoginProps> = ({ setLoginStatus }) => {
  const [error, setError] = useState("");
  const [buttonValue, setButtonValue] = useState("Получить токен доступа");

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (tokenResponse.scope.split(" ").includes("https://www.googleapis.com/auth/documents.readonly")) {
        setLoginStatus(true);
        setButtonValue("Токен доступа получен");
      } else setError("Токен доступа не получен!");
    },
  });

  return (
    <>
      <Button variant="primary" className="mr-1 mb-3" onClick={() => googleLogin()}>
        {buttonValue}
      </Button>
      {!!error.length && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}
    </>
  );
};

export default Login;
