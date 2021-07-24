import React, { useEffect } from "react";
import MentorRegister from "../../components/MentorRegister/MentorRegister";
import "./MentorRegisterPage.css";

const MentorRegisterPage = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Mentor Register | CatalysEd";
  }, []);

  return (
    <div className="MentorRegisterPage Page">
      <div className="MentorRegistrationText">Registration</div>

      <MentorRegister />
    </div>
  );
};

export default MentorRegisterPage;
