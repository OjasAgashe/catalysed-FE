import React, { useEffect, useReducer, useState } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgProfileCommonHeader from "../../components/OrgProfileCommonHeader/OrgProfileCommonHeader";
import OrgProfileEditSectionContainer from "../../components/OrgProfileEditSectionContainer/OrgProfileEditSectionContainer";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { orgProfileEditReducer } from "../../reducers/orgProfileEditReducer";
import { OrgProfileEditData } from "../../types/OrgProfileEdit";
import Error from "../../components/Error/Error";
import "./OrgProfileEdit.css";

const OrgProfileEdit = () => {
  /*
   * state.loading: to show the LoadingProgress till we are getting
   * the Profile, and updating new Profile details
   *
   * state.loadingMessage: to show the message in LoadingProgress
   *
   * state.error: to show an Error, if we do not get any Profile
   *
   * state.putCallError: to show an Error, if we get from put Call
   *
   * state.validated: to handle form validation
   *
   * state.phoneValueIsInvalid, state.socialLinkIsInvalid,
   * state.websiteLinkIsInvalid: these are used to keep UX good
   *
   * state.dataHasChanged, state.showModal, state.leave, state.stay,
   * state.navigateToPath: all these have been used to handle LeavePageModal
   * component,
   * that we will show when user try to navigate to different path without
   * saving the changes
   *
   * state.responseData: to store the profile data, that we got
   *
   * state.phoneValue: to show nice UI for phone Input
   */
  const [state, dispatch] = useReducer(orgProfileEditReducer, {
    loading: true,
    loadingMessage: "",
    error: "",
    putCallError: "",
    validated: false,
    phoneValueIsInvalid: false,
    socialLinkIsInvalid: false,
    websiteLinkIsInvalid: false,
    dataHasChanged: false,
    showModal: false,
    leave: false,
    stay: false,
    navigateToPath: "",
    responseData: null,
    phoneValue: "",
  });

  /*
   * To store new changed profile Data
   */
  const [editedData, setEditedData] = useState<OrgProfileEditData | null>(null);

  const { getOrganisationProfile } = useOrgAPI();

  useEffect(() => {
    /*
     * Whenever anyone visits this page first time,
     * we want the scroll position on Top
     */
    document.documentElement.scrollTop = 0;

    // Set the document title
    document.title = "Org Profile Edit | CatalysEd";

    /*
     * Function to get Organisation Profile
     */
    const getDetails = async () => {
      try {
        /*
         * If we have shown any error before then hide it
         */
        dispatch({ type: "error", payload: "" });

        // get Organisation Profile
        const response = await getOrganisationProfile();

        // store the Organisation Profile in state.responseData
        dispatch({ type: "responseData", payload: response.data });

        // store the phone value from response in state.phoneValue
        dispatch({
          type: "phoneValue",
          payload:
            response.data.organizationDetails.phone.countryCode +
            response.data.organizationDetails.phone.number,
        });

        // intialially the new data would be same as old data
        setEditedData(response.data);
      } catch (error) {
        /*
         * If we get any error while getting Profile Data, then
         * show that error
         */
        dispatch({ type: "error", payload: "Sorry!! No Details Found" });
      } finally {
        /*
         * After getting Data, hide the LoadingProgress
         */
        dispatch({ type: "loading", payload: false });
      }
    };

    getDetails();
  }, [getOrganisationProfile]);

  return (
    <div className="OrgProfileEditPage Page">
      {/*
       * Show the LoadingProgress, if state.loading is true
       * Or state.loadingMessage has any value
       */}
      {(state.loading || state.loadingMessage) && (
        <LoadingProgress
          loading={state.loading || (state.loadingMessage ? true : false)}
          emailSent={false}
          loadingMessage={
            state.loading ? "Getting Details..." : state.loadingMessage
          }
        />
      )}

      {/* Show OrgProfileCommonHeader component */}
      <OrgProfileCommonHeader textToShow="Manage Your Profile" />

      {state.responseData === null ? (
        /*
         * If we do not get any Profile Data then show an Error
         */
        <div className="ErrorDiv">
          <Error message={state.error} />
        </div>
      ) : (
        /*
         * But If we get any Profile Data then show
         * OrgProfileEditSectionContainer component
         */
        <OrgProfileEditSectionContainer
          state={state}
          dispatch={dispatch}
          editedData={editedData}
          setEditedData={setEditedData}
        />
      )}
    </div>
  );
};

export default OrgProfileEdit;
