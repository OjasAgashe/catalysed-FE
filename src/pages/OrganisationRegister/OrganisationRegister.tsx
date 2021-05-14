import React, { useEffect, useState } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgRegisterDetails from "../../components/OrgRegisterDetails/OrgRegisterDetails";
import OrgRegisterProgress from "../../components/OrgRegisterProgress/OrgRegisterProgress";
import OrgRegisterUser from "../../components/OrgRegisterUser/OrgRegisterUser";
import { OrgRegisterData } from "../../types/OrganisationRegister";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import "./OrganisationRegister.css";

const OrganisationRegister = () => {
  const [currentOrgRegister, setCurrentOrgRegister] =
    useState<string>("details");
  const [orgRegisterData, setOrgRegisterData] =
    useStateWithCallbackLazy<OrgRegisterData>({
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

  useEffect(() => {
    document.title = "Organisation Register | CatalysEd";
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
