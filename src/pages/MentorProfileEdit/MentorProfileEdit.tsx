import React, { useEffect } from "react";
import OrgProfileCommonHeader from "../../components/OrgProfileCommonHeader/OrgProfileCommonHeader";

const MentorProfileEdit = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Mentor Profile Edit | CatalysEd";
  }, []);

  return (
    <div className="MentorProfileEditPage Page">
      <OrgProfileCommonHeader textToShow="Manage Your Profile" />
    </div>
  );
};

export default MentorProfileEdit;
