import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../api_context/AuthContext";
import { HOME } from "../../constants/Routes";

const OrgHome = () => {
  const history = useHistory();
  const { setCurrentUser } = useAuth();

  const handleSignOut = () => {
    const date = new Date(0).toUTCString();
    document.cookie = `catalysedCreated=;${date}`;
    document.cookie = `catalysedToken=;${date}`;
    document.cookie = `catalysedType=;${date}`;

    setCurrentUser({
      catalysedCreated: false,
      catalysedToken: "",
      catalysedType: "",
    });

    history.push(HOME);
  };

  return (
    <div>
      <h1>OrgHome</h1>
      <button type="button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default OrgHome;
