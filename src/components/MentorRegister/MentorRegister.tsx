import React from "react";
import { MentorRegisterIllustration } from "../../assets/Illustrations/Illustrations";
import MentorRegisterForm from "./MentorRegisterForm";
import "./MentorRegister.css";

/*
 * This file has no validation, at the time of
 * API Integration also validate the input fields.
 *
 * This file will have validation much similar like
 * OrgRegisterUser component, and also confirms once
 * before validating
 */

const MentorRegister = () => {
  return (
    <div className="MentorRegister">
      <div className="ImageContainer">
        <img
          src={MentorRegisterIllustration}
          alt="mentor register illustration"
        />
      </div>

      {/* Show MentorRegisterForm component */}
      <MentorRegisterForm />
    </div>
  );
};

export default MentorRegister;
