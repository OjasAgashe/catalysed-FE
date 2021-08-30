import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Error from "../../components/Error/Error";
import { INVITE_KEY_VALIDATE } from "../../constants/Routes";
import { useInviteAPI } from "../../context/api_context/InviteAPIContext";

// This page is for development only

const InviteForDevelopment = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { getInvitationKey } = useInviteAPI();
  const history = useHistory();

  const handleValidateBtnClick: React.FormEventHandler<HTMLFormElement> =
    async (event) => {
      event.preventDefault();

      try {
        const response = await getInvitationKey(email);
        history.push(`${INVITE_KEY_VALIDATE}/${response.data}`);
      } catch (error) {
        setError(error.response?.data?.message ?? "");
      }
    };

  return (
    <div className="Page" style={{ textAlign: "center", padding: "3rem" }}>
      <form onSubmit={handleValidateBtnClick}>
        <div>
          <label>Enter email-id&nbsp;:&nbsp;</label>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <button>Validate Email</button>
        {error && (
          <div style={{ width: "fit-content", margin: "2rem auto" }}>
            <Error message={error} />
          </div>
        )}{" "}
      </form>
    </div>
  );
};

export default InviteForDevelopment;
