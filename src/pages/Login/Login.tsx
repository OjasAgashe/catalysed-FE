import React, { useEffect, useReducer } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import LoginForm from "../../components/LoginForm/LoginForm";
import { loginReducer } from "../../reducers/loginReducer";

const Login = () => {
  /*
   * state.error: to show the error, if we get any, after calling
   * the Login API in LoginForm component
   *
   * state.validated: to handle the validated property of form in
   * LoginForm component
   *
   * state.showPassword: to handle the show password functionality in UI
   *
   * state.loading: to show the Loading Progress component, till the
   * time we are calling the Login API
   */

  const [state, dispatch] = useReducer(loginReducer, {
    error: "",
    validated: false,
    showPassword: false,
    loading: false,
  });

  useEffect(() => {
    /*
     * Whenever anyone visit this page first time, the scroll
     * bar position should be on top
     */
    document.documentElement.scrollTop = 0;

    // set the document title
    document.title = "Login | CatalysEd";
  }, []);

  return (
    <div className="LoginPage Page">
      {/*
       * if the state.loading value is true, then show the
       * LoadingProgress component
       */}
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Signing You..."
        />
      )}

      {/* Show LoginForm component */}
      <LoginForm state={state} dispatch={dispatch} />
    </div>
  );
};

export default Login;
