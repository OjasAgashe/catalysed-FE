import React, { useState } from "react";
import OrgRegisterDetails from "../components/OrgRegisterDetails/OrgRegisterDetails";
import OrgRegisterUser from "../components/OrgRegisterUser/OrgRegisterUser";

const OrganisationRegister = () => {
  const [currentOrgRegister, setCurrentOrgRegister] = useState<String>("user");

  return (
    <div>
      {currentOrgRegister === "user" ? (
        <OrgRegisterUser
          currentOrgRegister={currentOrgRegister}
          setCurrentOrgRegister={setCurrentOrgRegister}
        />
      ) : (
        <OrgRegisterDetails
          currentOrgRegister={currentOrgRegister}
          setCurrentOrgRegister={setCurrentOrgRegister}
        />
      )}
    </div>
  );
};

export default OrganisationRegister;
