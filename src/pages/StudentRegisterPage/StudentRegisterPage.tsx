import React, { useEffect } from "react";
import StudentRegister from "../../components/StudentRegister/StudentRegister";
import "./StudentRegisterPage.css";

const StudentRegisterPage = () => {
  useEffect(() => {
    /*
     * Whenever anyone visits this page first time, we want
     * to show scroll bar on Top
     */
    document.documentElement.scrollTop = 0;

    // Set the document title
    document.title = "Student Register | CatalysEd";
  }, []);

  return (
    <div className="StudentRegisterPage Page">
      <div className="StudentRegistrationText">Registration</div>

      {/* Show StudentRegister component */}
      <StudentRegister />
    </div>
  );
};

export default StudentRegisterPage;
