import React, { useEffect } from "react";
import StudentRegister from "../../components/StudentRegister/StudentRegister";
import "./StudentRegisterPage.css";

const StudentRegisterPage = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Student Register | CatalysEd";
  }, []);

  return (
    <div className="StudentRegisterPage Page">
      <div className="StudentRegistrationText">Registration</div>

      <StudentRegister />
    </div>
  );
};

export default StudentRegisterPage;
