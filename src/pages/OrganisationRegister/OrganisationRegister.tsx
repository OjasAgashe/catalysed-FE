import React, { useState } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgRegisterDetails from "../../components/OrgRegisterDetails/OrgRegisterDetails";
import OrgRegisterProgress from "../../components/OrgRegisterProgress/OrgRegisterProgress";
import OrgRegisterUser from "../../components/OrgRegisterUser/OrgRegisterUser";
import { OrgRegisterData } from "../../types/OrganisationRegister";
import "./OrganisationRegister.css";

const OrganisationRegister = () => {
  const [currentOrgRegister, setCurrentOrgRegister] = useState<string>("user");
  const [orgRegisterData, setOrgRegisterData] = useState<OrgRegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    orgDetails: {
      name: "",
      description: "",
      orgWebsite: "",
      socialMedia: {
        code: "",
        link: "",
      },
    },
  });

  return (
    <div className="OrgRegisterPage">
      <div className="OrgRegisterProgressContainer">
        <div className="OrgRegistrationText">Registration</div>
        <OrgRegisterProgress currentOrgRegister={currentOrgRegister} />
      </div>

      {/* <LoadingProgress /> */}

      {currentOrgRegister === "user" && (
        <OrgRegisterUser
          orgRegisterData={orgRegisterData}
          setOrgRegisterData={setOrgRegisterData}
          setCurrentOrgRegister={setCurrentOrgRegister}
        />
      )}
      {currentOrgRegister === "details" && (
        <OrgRegisterDetails
          orgRegisterData={orgRegisterData}
          setOrgRegisterData={setOrgRegisterData}
          setCurrentOrgRegister={setCurrentOrgRegister}
        />
      )}
    </div>
  );
};

export default OrganisationRegister;
