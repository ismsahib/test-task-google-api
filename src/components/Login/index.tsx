// import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { Button } from "react-bootstrap";

const Login = () => {
  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     console.log(tokenResponse);
  //   },
  //   onError: (errorResponse) => console.log(errorResponse),
  //onClick={() => googleLogin()}
  // });
  return (
    <Button variant="primary" className="mr-1">
      Login
    </Button>
  );
};

export default Login;
