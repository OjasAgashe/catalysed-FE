import React, { useEffect, useReducer } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import LoginForm from "../../components/LoginForm/LoginForm";
import { loginReducer } from "../../reducers/loginReducer";

const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, {
    error: "",
    validated: false,
    showPassword: false,
    loading: false,
  });

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Login | CatalysEd";
  }, []);

  return (
    <div className="LoginPage">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Signing You..."
        />
      )}
      <LoginForm state={state} dispatch={dispatch} />
    </div>
  );
};

export default Login;
