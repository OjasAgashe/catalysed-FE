import React from "react";
import StudentRegisterForm from "./StudentRegisterForm";
import "./StudentRegister.css";
import { StudentRegisterIllustration } from "../../assets/Illustrations/Illustrations";

/*
 * This file has no validation, at the time of
 * API Integration also validate the input fields.
 *
 * This file will have validation much similar like
 * OrgRegisterUser component, and also confirms once
 * before validating
 */

const StudentRegister = () => {
  return (
    <div className="StudentRegister">
      <div className="ImageContainer">
        <img
          src={StudentRegisterIllustration}
          alt="student register illustration"
        />
      </div>

      {/* Show StudentRegisterForm component */}
      <StudentRegisterForm />
    </div>
  );
};

export default StudentRegister;
