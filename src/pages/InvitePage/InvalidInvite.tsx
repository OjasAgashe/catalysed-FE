/*
 * This page we will show when the user tries to access an invalid
 * Invite
 */

import React from "react";
import { InvalidInviteResponse } from "../../assets/Illustrations/Illustrations";
import "./InvitePage.css";

const InvalidInvite = () => {
  return (
    <main className="Page InvalidInvitePage">
      <section>
        <img
          src={InvalidInviteResponse}
          alt="a man staring a black circle svg illustration"
        />
      </section>
      <section>
        <h1>We’re Sorry!</h1>
        <p>
          This invite seems like an invalid-invite. If you feel you've reached
          this message in error, please talk with the Organisation and ask them
          to reinvite you
        </p>
      </section>
    </main>
  );
};

export default InvalidInvite;
