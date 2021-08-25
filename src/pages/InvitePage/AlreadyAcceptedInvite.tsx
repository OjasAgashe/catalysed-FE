import React from "react";
import { Link } from "react-router-dom";
import { AlreadyAccountExistResponse } from "../../assets/Illustrations/Illustrations";
import { LOGIN } from "../../constants/Routes";
import "./InvitePage.css";

const AlreadyAcceptedInvite = () => {
  return (
    <main className="Page AlreadyAcceptedInvitePage">
      <section>
        <img src={AlreadyAccountExistResponse} alt="joy svg illustration" />
      </section>
      <section>
        <h1>Already accepted</h1>
        <p>
          Hey, It seems like you have already accepted this invite. Please{" "}
          <Link to={LOGIN}>Log-In</Link> now
        </p>
      </section>
    </main>
  );
};

export default AlreadyAcceptedInvite;
