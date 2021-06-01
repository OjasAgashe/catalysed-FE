import React, { useEffect } from "react";
import StudentHome from "../../components/StudentHome/StudentHome";

const StudentHomePage = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Student Home | CatalysEd";
  }, []);

  return (
    <div>
      <StudentHome />
    </div>
  );
};

export default StudentHomePage;
