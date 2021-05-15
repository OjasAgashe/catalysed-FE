import React, { useEffect, useState } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Login | CatalysEd";
  });

  return (
    <div className="LoginPage">
      {loading && (
        <LoadingProgress
          loading={loading}
          emailSent={false}
          loadingMessage="Signing You..."
        />
      )}
      <LoginForm setLoading={setLoading} />
    </div>
  );
};

export default Login;
