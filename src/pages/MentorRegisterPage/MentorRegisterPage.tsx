import React, { useEffect } from "react";
import MentorRegister from "../../components/MentorRegister/MentorRegister";
import "./MentorRegisterPage.css";

const MentorRegisterPage = () => {
  useEffect(() => {
    /*
     * Whenever anyone visits this page first time, we want
     * to show scroll bar on Top
     */
    document.documentElement.scrollTop = 0;

    // Set the document title
    document.title = "Mentor Register | CatalysEd";
  }, []);

  return (
    <div className="MentorRegisterPage Page">
      <div className="MentorRegistrationText">Registration</div>

      {/* Show MentorRegister component */}
      <MentorRegister />
    </div>
  );
};

export default MentorRegisterPage;
