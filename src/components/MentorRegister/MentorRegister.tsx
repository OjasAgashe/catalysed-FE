import React from "react";
import { MentorRegisterIllustration } from "../../assets/Illustrations/Illustrations";
import MentorRegisterForm from "./MentorRegisterForm";
import "./MentorRegister.css";

const MentorRegister = () => {
  return (
    <div className="MentorRegister">
      <div className="ImageContainer">
        <img
          src={MentorRegisterIllustration}
          alt="mentor register illustration"
        />
      </div>

      <MentorRegisterForm />
    </div>
  );
};

export default MentorRegister;
