import React, { useEffect } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  useEffect(() => {
    document.title = "Login | CatalysEd";
  });

  return (
    <div className="LoginPage">
      <LoginForm />
    </div>
  );
};

export default Login;
