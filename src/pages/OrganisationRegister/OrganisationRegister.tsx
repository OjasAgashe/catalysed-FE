import React, { useState } from "react";
import OrgRegisterDetails from "../../components/OrgRegisterDetails/OrgRegisterDetails";
import OrgRegisterProgress from "../../components/OrgRegisterProgress/OrgRegisterProgress";
import OrgRegisterUser from "../../components/OrgRegisterUser/OrgRegisterUser";
import "./OrganisationRegister.css";

const OrganisationRegister = () => {
  const [currentOrgRegister, setCurrentOrgRegister] = useState<string>("user");

  return (
    <div className="OrgRegisterPage">
      <div className="OrgRegisterProgressContainer">
        <div className="OrgRegistrationText">Registration</div>
        <OrgRegisterProgress currentOrgRegister={currentOrgRegister} />
      </div>

      {currentOrgRegister === "user" && (
        <OrgRegisterUser setCurrentOrgRegister={setCurrentOrgRegister} />
      )}
      {currentOrgRegister === "details" && (
        <OrgRegisterDetails setCurrentOrgRegister={setCurrentOrgRegister} />
      )}
    </div>
  );
};

export default OrganisationRegister;
