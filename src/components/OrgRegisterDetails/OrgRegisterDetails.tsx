import React, { useEffect, useReducer } from "react";
import "./OrgRegisterDetails.css";
import {
  OrgRegisterActionType,
  OrgRegisterData,
} from "../../types/OrganisationRegister";
import OrgRegisterDetailsForm from "./OrgRegisterDetailsForm";
import { orgRegisterDetailsReducer } from "../../reducers/orgRegisterDetailsReducer";
import { useAuth } from "../../context/api_context/AuthContext";

type OrgRegisterDetailsProps = {
  orgRegisterData: OrgRegisterData;
  setOrgRegisterData: any;
  orgRegisterDispatch: React.Dispatch<OrgRegisterActionType>;
};

/*
 * OrgRegisterDetails: component accepts three props.
 *
 * 1. orgRegisterData: to show the Organisation Registration Data in
 * inputs
 *
 * 2. setOrgRegisterData: to change the Organisation Registration Data on
 * new input
 *
 * 3. orgRegisterDispatch: to change the reducer state values of OrganisationRegister
 */
const OrgRegisterDetails = ({
  orgRegisterData,
  setOrgRegisterData,
  orgRegisterDispatch,
}: OrgRegisterDetailsProps) => {
  /*
   * state.dropdownSelected: to store the value of the selected dropdown
   *
   * state.validated: to handle the form validation
   *
   * state.orgNameFeedback, state.orgNameIsInvalid, state.socialMediaFeedback,
   * state.socailMediaLinkIsInvalid: all these states to make the UX nice
   *
   * state.socialMediaLink: to store the value of social media link
   *
   * state.error: to store the error message
   */
  const [state, dispatch] = useReducer(orgRegisterDetailsReducer, {
    dropdownSelected: "",
    validated: false,
    orgNameFeedback: "",
    orgNameIsInvalid: false,
    socialMediaLink: "",
    socialMediaFeedback: "",
    socialMediaLinkIsInvalid: false,
    error: "",
  });

  /*
   * Array of all valid social media handles accepted by our app
   */
  const possibleSocialMedia: string[] = [
    "twitter",
    "linkedIn",
    "facebook",
    "instagram",
  ];

  /*
   * Array to store all the base URLs of valid social handles
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
   * postRegisterCall: API to call for Registration
   */
  const { postRegisterCall } = useAuth();

  useEffect(() => {
    /*
     * After this component gets render, set the currentOrgRegister value to "details"
     */
    orgRegisterDispatch({ type: "currentOrgRegister", payload: "details" });
  }, [orgRegisterDispatch]);

  /*
   * Function to handle input changes on details step of registration of
   * Organisation
   */
  const handleOrgRegisterDetailsChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      /*
       * If we have set state.validated to true, set it to false
       */
      if (state.validated) dispatch({ type: "validated", payload: false });

      /*
       * If we have set state.socialMediaLinkIsInvalid to true, set it to false
       */
      if (state.socialMediaLinkIsInvalid)
        dispatch({ type: "socialMediaLinkIsInvalid", payload: false });

      /*
       * If we have set state.orgNameIsInvalid to true, set it to false
       */
      if (state.orgNameIsInvalid)
        dispatch({ type: "orgNameIsInvalid", payload: false });

      /*
       * If the target name is not "socialMedia", then directly stores the
       * target value to registration data
       */
      if (event.target.name !== "socialMedia") {
        setOrgRegisterData((prevState: OrgRegisterData) => ({
          ...prevState,
          orgDetails: {
            ...prevState.orgDetails,
            [event.target.name]: event.target.value,
          },
        }));
      }

      /*
       * If the target name is "socialMedia"
       */
      if (event.target.name === "socialMedia") {
        // Stores the socialMedia value in targetValue
        const targetValue = event.target.value;
        let baseURLPresent = false;

        // Stores the socialMedia value socailMediaLink state
        dispatch({ type: "socialMediaLink", payload: targetValue });

        if (targetValue) {
          /*
           * Now check that the given socialMedia value is in our valid social
           * media handles or not
           *
           * And if it is in valid handles, then set the value of dropdownSelected
           * accordingly, and store the value (other then the base URL) in
           * socialMediaLink state
           */
          for (let index = 0; index < possibleSocialBaseURL.length; index++) {
            let baseURL = possibleSocialBaseURL[index];

            if (targetValue.includes(baseURL)) {
              switch (index) {
                case 0:
                case 4:
                  dispatch({ type: "dropdownSelected", payload: "twitter" });
                  break;

                case 1:
                case 5:
                  dispatch({ type: "dropdownSelected", payload: "linkedIn" });
                  break;

                case 2:
                case 6:
                  dispatch({ type: "dropdownSelected", payload: "facebook" });
                  break;

                case 3:
                case 7:
                  dispatch({ type: "dropdownSelected", payload: "instagram" });
                  break;
              }

              baseURLPresent = true;
              dispatch({
                type: "socialMediaLink",
                payload: targetValue.replace(baseURL, ""),
              });
              break;
            }
          }
        }

        /*
         * If the given socialMediaLink value is not in our valid social handles,
         * then simply store nothing in dropdownSelected state
         */
        if (targetValue === "" || baseURLPresent === false)
          dispatch({ type: "dropdownSelected", payload: "" });
      }
    };

  /*
   * Function to handle the dropdown select of socail media
   */
  const handleSocialDropdownSelect: (selected: string | null) => void = (
    selected
  ) => {
    /*
     * If user has selected anything only then process forward
     */
    if (selected !== null) {
      /*
       * If we have set state.validated to true, set it to false
       */
      if (state.validated) dispatch({ type: "validated", payload: false });

      /*
       * If we have set state.socailMediaLinkIsInvalid to true,
       * set it to false
       */
      if (state.socialMediaLinkIsInvalid)
        dispatch({ type: "socialMediaLinkIsInvalid", payload: false });

      /*
       * If we have set state.orgNameIsInvalid to true, set it to false
       */
      if (state.orgNameIsInvalid)
        dispatch({ type: "orgNameIsInvalid", payload: false });

      /*
       * Store the value of selected dropdown in dropdownSelected state
       */
      dispatch({ type: "dropdownSelected", payload: selected });
    }
  };

  /*
   * Function to handle form submit for "details" step of registration
   */
  const handleOrgRegisterDetailsFormSubmit: React.FormEventHandler<HTMLFormElement> =
    (event) => {
      event.preventDefault();

      // set the value of validated to true
      dispatch({ type: "validated", payload: true });

      // regex for only alphabets
      const onlyAlphabets = /^[a-zA-Z][a-zA-z ]*$/;

      /*
       * If user has entered name, but the name contains characters
       * other than alphabets than give a feedback to user, and tell to
       * change name
       */
      if (
        orgRegisterData.orgDetails.name &&
        !onlyAlphabets.test(orgRegisterData.orgDetails.name)
      ) {
        dispatch({
          type: "orgNameFeedback",
          payload: "Name must contain only Alphabet",
        });

        dispatch({ type: "orgNameIsInvalid", payload: true });

        return;
      }

      /*
       * If user has entered socialMediaLink value, then check it comes in
       * our valid social handles or not
       */
      if (state.socialMediaLink) {
        let isInValidLink = false;

        const startsWith = /^(https|http|www).*/;

        /*
         * If state.dropdownSelected has nothing, and socialMediaLink starts
         * with characters that are found in a valid URL only then proceed
         */
        if (
          state.dropdownSelected !== "" &&
          startsWith.test(state.socialMediaLink)
        ) {
          let validLink = false;

          /*
           * If base URL of acceptable social handles is present in
           * socialMediaLink then it is valid link and does not do anything
           * But it does not contain base URL then show an error message to the
           * user
           */
          for (let index = 0; index < possibleSocialBaseURL.length; index++) {
            let baseURL = possibleSocialBaseURL[index];

            if (state.socialMediaLink.includes(baseURL)) {
              validLink = true;
              break;
            }
          }
          if (!validLink) isInValidLink = true;
        }

        if (state.dropdownSelected === "" || isInValidLink) {
          dispatch({
            type: "socialMediaFeedback",
            payload: "Only dropdown options are acceptable",
          });

          dispatch({ type: "socialMediaLinkIsInvalid", payload: true });

          return;
        }
      }

      /*
       * If form passes every validation, then find the code of entered socialMediaLink
       * and after that call the registration API
       */
      if (event.currentTarget.checkValidity() === true) {
        let code: string = "";
        let link: string = "";

        // finding the code of entered socialMediaLink
        for (let index = 0; index < possibleSocialMedia.length; index++) {
          let social = possibleSocialMedia[index];

          if (social === state.dropdownSelected) {
            switch (index) {
              case 0:
                code = "TWITTER";
                break;
              case 1:
                code = "LINKED_IN";
                break;
              case 2:
                code = "FACEBOOK";
                break;
              case 3:
                code = "INSTAGRAM";
                break;
            }
            link = possibleSocialBaseURL[index] + state.socialMediaLink;
            break;
          }
        }

        /*
         * Creating the socialMedia object in the format that is required
         * for registration API call
         */
        const socialMedia: { code: string; link: string } = { code, link };

        /*
         * Storing the socailMedia object in org register data, and in its
         * callback we are calling the registration API
         */
        setOrgRegisterData(
          (prevState: OrgRegisterData) => ({
            ...prevState,
            orgDetails: {
              ...prevState.orgDetails,
              socialMedia,
            },
          }),
          async (orgRegisterData: OrgRegisterData) => {
            try {
              // set the processing and loading value to true
              orgRegisterDispatch({ type: "processing", payload: true });
              orgRegisterDispatch({ type: "loading", payload: true });

              /*
               * If we have shown any error before calling the API then
               * hide it
               */
              dispatch({ type: "error", payload: "" });

              // call the API
              await postRegisterCall(orgRegisterData);

              // set the loading value to false
              orgRegisterDispatch({ type: "loading", payload: false });

              // set the emailSent value to true, to show the emailSent message
              orgRegisterDispatch({ type: "emailSent", payload: true });
            } catch (error) {
              /*
               * if we get any error, then set the processing value to false
               * to hide the LoadingProgress component
               */
              orgRegisterDispatch({ type: "processing", payload: false });

              // set the Error message
              dispatch({
                type: "error",
                payload: error.response?.data?.message ?? "",
              });
            }
          }
        );
      }
    };

  return (
    <div className="OrgRegisterDetails">
      {/* Show OrgRegisterDetialsForm Component */}
      <OrgRegisterDetailsForm
        handleOrgRegisterDetailsFormSubmit={handleOrgRegisterDetailsFormSubmit}
        orgRegisterData={orgRegisterData}
        handleOrgRegisterDetailsChange={handleOrgRegisterDetailsChange}
        handleSocialDropdownSelect={handleSocialDropdownSelect}
        state={state}
      />
    </div>
  );
};

export default OrgRegisterDetails;
