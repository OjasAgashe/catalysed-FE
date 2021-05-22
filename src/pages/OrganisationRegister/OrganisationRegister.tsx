import React, { useEffect, useReducer } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgRegisterDetails from "../../components/OrgRegisterDetails/OrgRegisterDetails";
import OrgRegisterProgress from "../../components/OrgRegisterProgress/OrgRegisterProgress";
import OrgRegisterUser from "../../components/OrgRegisterUser/OrgRegisterUser";
import { OrgRegisterData } from "../../types/OrganisationRegister";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import "./OrganisationRegister.css";
import { orgRegisterReducer } from "../../reducers/orgRegisterReducer";

const OrganisationRegister = () => {
  const [state, dispatch] = useReducer(orgRegisterReducer, {
    currentOrgRegister: "user",
    loading: false,
    emailSent: false,
    processing: false,
  });

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
  }, []);

  return (
    <div className="OrgRegisterPage">
      <div className="OrgRegisterProgressContainer">
        <div className="OrgRegistrationText">Registration</div>
        <OrgRegisterProgress currentOrgRegister={state.currentOrgRegister} />
      </div>

      {state.processing && (
        <LoadingProgress
          loading={state.loading}
          emailSent={state.emailSent}
          loadingMessage="Registering You..."
        />
      )}

      {state.currentOrgRegister === "user" && (
        <OrgRegisterUser
          orgRegisterData={orgRegisterData}
          setOrgRegisterData={setOrgRegisterData}
          orgRegisterDispatch={dispatch}
        />
      )}
      {state.currentOrgRegister === "details" && (
        <OrgRegisterDetails
          orgRegisterData={orgRegisterData}
          setOrgRegisterData={setOrgRegisterData}
          orgRegisterDispatch={dispatch}
        />
      )}
    </div>
  );
};

export default OrganisationRegister;
