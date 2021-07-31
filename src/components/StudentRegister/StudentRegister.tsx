import React from "react";
import StudentRegisterForm from "./StudentRegisterForm";
import "./StudentRegister.css";
import { StudentRegisterIllustration } from "../../assets/Illustrations/Illustrations";

const StudentRegister = () => {
  return (
    <div className="StudentRegister">
      <div className="ImageContainer">
        <img
          src={StudentRegisterIllustration}
          alt="student register illustration"
        />
      </div>

      <StudentRegisterForm />
    </div>
  );
};

export default StudentRegister;
