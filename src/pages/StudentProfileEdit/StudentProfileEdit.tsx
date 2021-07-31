import React, { useEffect } from "react";
import OrgProfileCommonHeader from "../../components/OrgProfileCommonHeader/OrgProfileCommonHeader";
import StudentProfileEditSectionContainer from "../../components/StudentProfileEditSectionContainer/StudentProfileEditSectionContainer";

const StudentProfileEdit = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Student Profile Edit | CatalysEd";
  }, []);

  return (
    <div className="StudentProfileEditPage Page">
      <OrgProfileCommonHeader textToShow="Manage Your Profile" />

      <StudentProfileEditSectionContainer />
    </div>
  );
};

export default StudentProfileEdit;
