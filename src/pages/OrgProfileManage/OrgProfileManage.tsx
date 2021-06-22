import React, { useEffect } from "react";
import OrgProfileCommonHeader from "../../components/OrgProfileCommonHeader/OrgProfileCommonHeader";
import OrgProfileManageSectionContainer from "../../components/OrgProfileManageSectionContainer/OrgProfileManageSectionContainer";

const OrgProfileManage = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Org Profile Manage | CatalysEd";
  });

  return (
    <div className="OrgProfileManagePage">
      <OrgProfileCommonHeader textToShow="Manage Your Profile" />

      <OrgProfileManageSectionContainer />
    </div>
  );
};

export default OrgProfileManage;
