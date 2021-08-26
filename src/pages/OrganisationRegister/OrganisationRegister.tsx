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
  /*
   * state.currentOrgRegister: stores the value of current step in registration. As the
   * registration is a two step process, it stores the current step. Its initail value is
   * "user"
   *
   * state.loading: to make visible the loading bouncer in LoadingProgress
   * component
   *
   * state.emailSent: to show the emailSent message once the API call is successful
   *
   * state.processing: to show loading bar, when we are making API call
   */
  const [state, dispatch] = useReducer(orgRegisterReducer, {
    currentOrgRegister: "user",
    loading: false,
    emailSent: false,
    processing: false,
  });

  /*
   * State to manage all the registration data
   */
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
    /*
     * Whenever anyone visits the page first time, we want the
     * scroll bar position on the top
     */
    document.documentElement.scrollTop = 0;

    // set the document title
    document.title = "Organisation Register | CatalysEd";
  }, []);

  return (
    <div className="OrgRegisterPage Page">
      <div className="OrgRegisterProgressContainer">
        <div className="OrgRegistrationText">Registration</div>

        {/* Show OrgRegisterProgress Component */}
        <OrgRegisterProgress currentOrgRegister={state.currentOrgRegister} />
      </div>

      {/* Show LoadingProgress Component */}
      {state.processing && (
        <LoadingProgress
          loading={state.loading}
          emailSent={state.emailSent}
          loadingMessage="Registering You..."
        />
      )}

      {/* Show OrgRegisterUser Component */}
      {state.currentOrgRegister === "user" && (
        <OrgRegisterUser
          orgRegisterData={orgRegisterData}
          setOrgRegisterData={setOrgRegisterData}
          orgRegisterDispatch={dispatch}
        />
      )}

      {/* Show OrgRegisterDetails Component */}
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
