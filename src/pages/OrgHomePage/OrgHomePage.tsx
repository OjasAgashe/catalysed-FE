import React, { useEffect } from "react";
import OrgHome from "../../components/OrgHome/OrgHome";

const OrgHomePage = () => {
  useEffect(() => {
    document.title = "Org Home | CatalysEd";
  }, []);

  return (
    <div>
      <OrgHome />
    </div>
  );
};

export default OrgHomePage;
