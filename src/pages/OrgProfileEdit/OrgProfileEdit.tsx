import React, { useEffect } from "react";
import OrgProfileCommonHeader from "../../components/OrgProfileCommonHeader/OrgProfileCommonHeader";
import OrgProfileEditSectionContainer from "../../components/OrgProfileEditSectionContainer/OrgProfileEditSectionContainer";

const OrgProfileEdit = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Org Profile Edit | CatalysEd";
  });

  return (
    <div className="OrgProfileEditPage">
      <OrgProfileCommonHeader textToShow="Edit Your Profile" />

      <OrgProfileEditSectionContainer />
    </div>
  );
};

export default OrgProfileEdit;
