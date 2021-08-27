import React, { useCallback, useEffect } from "react";
import "./OrgProfileEditSectionContainer.css";

import { useHistory, useLocation } from "react-router-dom";
import {
  OrgProfileEditActionType,
  OrgProfileEditData,
  OrgProfileEditState,
} from "../../types/OrgProfileEdit";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import OrgProfileEditSectionContainerFragment from "./OrgProfileEditSectionContainerFragment";

type OrgProfileEditSectionContainerProps = {
  state: OrgProfileEditState;
  dispatch: React.Dispatch<OrgProfileEditActionType>;
  editedData: OrgProfileEditData | null;
  setEditedData: React.Dispatch<
    React.SetStateAction<OrgProfileEditData | null>
  >;
};

const OrgProfileEditSectionContainer = ({
  state,
  dispatch,
  editedData,
  setEditedData,
}: OrgProfileEditSectionContainerProps) => {
  const { putOrganisationProfile } = useOrgAPI();
  const history = useHistory();
  const location = useLocation();

  /*
   * array of base URLs of social handles, acceptable by our app
   */
  const possibleSocialBaseURL: string[] = [
    "https://www.twitter.com",
    "https://www.linkedin.com",
    "https://www.facebook.com",
    "https://www.instagram.com",
    "https://twitter.com",
    "https://linkedin.com",
    "https://facebook.com",
    "https://instagram.com",
  ];

  /*
   * Function to know that user has changed something or not,
   * If he has changed something then we will get boolean value
   * true, else we will get boolean value false
   *
   * In this function, we are comparing each editable field that
   * we got from API call (stored in state.responseData) and editable
   * field presents in editedData
   */
  const hasDataChange = useCallback(() => {
    const responseDataTemp = { ...state.responseData } as OrgProfileEditData;
    const editedDataTemp = { ...editedData } as OrgProfileEditData;

    if (
      editedDataTemp?.firstName !== responseDataTemp?.firstName ||
      editedDataTemp?.lastName !== responseDataTemp?.lastName ||
      editedDataTemp?.organizationDetails?.description !==
        responseDataTemp?.organizationDetails?.description ||
      editedDataTemp?.organizationDetails?.socialMediaCode !==
        responseDataTemp?.organizationDetails?.socialMediaCode ||
      editedDataTemp?.organizationDetails?.socialMediaLink !==
        responseDataTemp?.organizationDetails?.socialMediaLink ||
      editedDataTemp?.organizationDetails?.website !==
        responseDataTemp?.organizationDetails?.website ||
      editedDataTemp?.organizationDetails?.yearOfInception !==
        responseDataTemp?.organizationDetails?.yearOfInception ||
      editedDataTemp?.organizationDetails?.primaryLanguage !==
        responseDataTemp?.organizationDetails?.primaryLanguage ||
      editedDataTemp?.organizationDetails?.phone.number !==
        responseDataTemp?.organizationDetails?.phone.number ||
      editedDataTemp?.organizationDetails?.phone.countryCode !==
        responseDataTemp?.organizationDetails?.phone.countryCode ||
      editedDataTemp?.organizationDetails?.address.country !==
        responseDataTemp?.organizationDetails?.address.country ||
      editedDataTemp?.organizationDetails?.address.region !==
        responseDataTemp?.organizationDetails?.address.region
    ) {
      return true;
    }

    return false;
  }, [editedData, state.responseData]);

  useEffect(() => {
    /*
     * Each time whenever any editable value gets changed, we will
     * check that data has changed or not
     *
     * As accordingly, we will show the buttons
     */
    dispatch({ type: "dataHasChanged", payload: hasDataChange() });

    /*
     * This function is to block the navigation, if user has changed
     * something but not saved the changes done
     */
    // @ts-ignore
    const unblock = history.block((tx) => {
      // if no data has been changed then don't block
      if (state.dataHasChanged === false) return true;

      /*
       * if user clicked on leaved button on the blocking modal, then let
       * him leave
       */
      if (state.leave) return true;

      /*
       * If above two options are not true, then store the navigating
       * path
       */
      dispatch({ type: "navigateToPath", payload: tx.pathname });

      /*
       * If data has changed, then show the Modal in which we are giving
       * buttons of Leave and Stay
       */
      if (state.dataHasChanged) dispatch({ type: "showModal", payload: true });

      // Block the Page
      return false;
    });

    /*
     * Don't let the user to reload or leave the page, if he has changed
     * something but didn't save those changes
     */
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (state.dataHasChanged) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    // attach the event to current window
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      unblock();
    };
  }, [
    dispatch,
    hasDataChange,
    history,
    location.pathname,
    state.dataHasChanged,
    state.leave,
  ]);

  /*
   * Function to check that we can make an API call or not,
   * as to make an API call all the required fields should have
   * some value, and not empty string
   */
  const canMakeAPICall = () => {
    return (
      [
        editedData?.firstName ?? "",
        editedData?.lastName ?? "",
        editedData?.organizationDetails?.description ?? "",
        editedData?.organizationDetails?.socialMediaLink ?? "",
        editedData?.organizationDetails?.website ?? "",
        editedData?.organizationDetails?.yearOfInception ?? "",
        editedData?.organizationDetails?.primaryLanguage ?? "",
        editedData?.organizationDetails?.phone.number ?? "",
        editedData?.organizationDetails?.address?.country ?? "",
        editedData?.organizationDetails?.address?.region ?? "",
      ].includes("") === false
    );
  };

  /*
   * Function making API call
   */
  const makeAPICall = async (data: OrgProfileEditData) => {
    try {
      /*
       * Before calling API, scroll on Top of the page
       */
      document.documentElement.scrollTop = 0;

      // Show LoadingProgress component
      dispatch({ type: "loadingMessage", payload: "Saving Changes Done..." });

      // Previously If we have shown any putCallError, then hide it
      dispatch({ type: "putCallError", payload: "" });

      // make the call with new Data
      await putOrganisationProfile(data);

      // On Succesfull call, hide the LoadingProgress component
      dispatch({ type: "loadingMessage", payload: "" });

      // set the value of state.dataHasChanged to false
      dispatch({ type: "dataHasChanged", payload: false });

      /*
       * make responseData same as editedData, As editedData
       * is what with which we have make the above call.
       * And now, after successful call, it becomes the Original Data
       */
      dispatch({ type: "responseData", payload: editedData });
      document.documentElement.scrollTop = 200;
    } catch (error) {
      /*
       * If we got any error, while calling API, then scroll to
       * the bottom of the page
       */
      document.documentElement.scrollTop =
        document.documentElement.scrollHeight;

      /*
       * Hide the LoadingProgress component
       */
      dispatch({ type: "loadingMessage", payload: "" });

      // Show the Error below the buttons
      dispatch({
        type: "putCallError",
        payload: error.response?.data?.message ?? "",
      });
    }
  };

  /*
   * Function to handle click on the Save button
   */
  const handleOrgProfileEditSaveBtn = () => {
    /*
     * If previously state.validated is false, then set it to
     * true
     *
     * This is to validate form
     */
    if (state.validated === false)
      dispatch({ type: "validated", payload: true });

    // const validEmail =
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    /*
     * If length of characters in description is less than 10, then
     * scroll on top and show an error
     */
    if (
      editedData?.organizationDetails.description &&
      editedData?.organizationDetails.description.length < 10
    ) {
      document.documentElement.scrollTop = 100;
      return;
    }

    /*
     * If entered value for yearOfInception field is less than 1800,
     * then simply do not allow to make API call
     */
    if (
      editedData?.organizationDetails.yearOfInception &&
      parseInt(editedData?.organizationDetails.yearOfInception) < 1800
    ) {
      return;
    }

    // if (!validEmail.test(editedData?.organizationDetails.contact.email)) {
    //   return;
    // }

    /*
     * Checking entered new socialMediaLink is a valid link or not,
     *
     * And if it is a valid link, then it contains the valid base URLs or
     * Not
     */
    if (
      editedData?.organizationDetails.socialMediaLink.startsWith("https://") ===
        false &&
      editedData?.organizationDetails.socialMediaLink.startsWith("http://") ===
        false
    ) {
      dispatch({ type: "socialLinkIsInvalid", payload: true });
      document.documentElement.scrollTop = 100;
      return;
    } else {
      let baseURLPresent = false;

      for (let index = 0; index < possibleSocialBaseURL.length; index++) {
        let baseURL = possibleSocialBaseURL[index];
        if (editedData?.organizationDetails.socialMediaLink.includes(baseURL)) {
          baseURLPresent = true;
          break;
        }
      }

      if (baseURLPresent === false) {
        dispatch({ type: "socialLinkIsInvalid", payload: true });
        document.documentElement.scrollTop = 100;
        return;
      }
    }

    /*
     * Checking the entered new value of website link is a valid
     * value or not
     */
    if (
      editedData?.organizationDetails.website.startsWith("https://") ===
        false &&
      editedData?.organizationDetails.website.startsWith("http://") === false
    ) {
      dispatch({ type: "websiteLinkIsInvalid", payload: true });
      document.documentElement.scrollTop = 100;
      return;
    }

    /*
     * Entered value of phone number has minimum 5 characters or not,
     *
     * as maximum length of a country code is 4, so the entered number should
     * has minimum length 5
     */
    if ((editedData?.organizationDetails?.phone?.number ?? "").length <= 4) {
      dispatch({ type: "phoneValueIsInvalid", payload: true });
      return;
    }

    /*
     * If all the above mentioned validation are false, then check we
     * can make an API call or Not
     *
     * And If we can, then make an API call
     */
    if (canMakeAPICall()) {
      makeAPICall(editedData as OrgProfileEditData);
    } else {
      document.documentElement.scrollTop = 100;
    }
  };

  /*
   * Function to handle click on the Discard Changes button,
   * simply set the editedData as state.resposneData (original
   * data that we had got from get Profile API call)
   */
  const handleOrgProfileEditDiscardChangesBtn = () => {
    setEditedData(state.responseData);
  };

  /*
   * Function to handle click on Leave button, that has been
   * shown on LeavePageModal
   *
   * Simply set the value of leave to true, and push the user to
   * its desired path
   */
  const handleLeavePageModalLeaveBtn = () => {
    dispatch({ type: "leave", payload: true });
    history.push(state.navigateToPath);
  };

  /*
   * Function to handle click on Stay button, that has been
   * shown on LeavePageModal
   */
  const handleLeavePageModalStayBtn = () => {
    dispatch({ type: "stay", payload: true });
    dispatch({ type: "leave", payload: false });
    dispatch({ type: "showModal", payload: false });
    dispatch({ type: "navigateToPath", payload: "" });
  };

  return (
    <div className="OrgProfileEditSectionContainer">
      {/* Show OrgProfileEditSectionContainerFragment */}
      <OrgProfileEditSectionContainerFragment
        handleOrgProfileEditSaveBtn={handleOrgProfileEditSaveBtn}
        handleOrgProfileEditDiscardChangesBtn={
          handleOrgProfileEditDiscardChangesBtn
        }
        handleLeavePageModalLeaveBtn={handleLeavePageModalLeaveBtn}
        handleLeavePageModalStayBtn={handleLeavePageModalStayBtn}
        state={state}
        dispatch={dispatch}
        editedData={editedData}
        setEditedData={setEditedData}
        possibleSocialBaseURL={possibleSocialBaseURL}
      />
    </div>
  );
};

export default OrgProfileEditSectionContainer;
