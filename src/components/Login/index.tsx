import { useGoogleLogin } from "@react-oauth/google";
import React, { Dispatch, FC, useState } from "react";
import { Alert, Button } from "react-bootstrap";

interface LoginProps {
  setAccessToken: Dispatch<React.SetStateAction<string>>;
}
const Login: FC<LoginProps> = ({ setAccessToken }) => {
  const [error, setError] = useState("");
  const [buttonValue, setButtonValue] = useState("Получить токен доступа");

  // логин через гугл аккаунт для получения токена доступа
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setAccessToken(tokenResponse.access_token);
      setButtonValue("Токен доступа получен");
    },
    onError: () => {
      setError("Токен доступа не получен!");
    },
    scope: "https://www.googleapis.com/auth/documents.readonly https://www.googleapis.com/auth/spreadsheets.readonly",
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
