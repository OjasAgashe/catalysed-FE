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

const OrgRegisterDetails = ({
  orgRegisterData,
  setOrgRegisterData,
  orgRegisterDispatch,
}: OrgRegisterDetailsProps) => {
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

  const possibleSocialMedia: string[] = [
    "twitter",
    "linkedIn",
    "facebook",
    "instagram",
  ];

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

  const { postRegisterCall } = useAuth();

  useEffect(() => {
    orgRegisterDispatch({ type: "currentOrgRegister", payload: "details" });
  }, [orgRegisterDispatch]);

  const handleOrgRegisterDetailsChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.validated) dispatch({ type: "validated", payload: false });

      if (state.socialMediaLinkIsInvalid)
        dispatch({ type: "socialMediaLinkIsInvalid", payload: false });

      if (state.orgNameIsInvalid)
        dispatch({ type: "orgNameIsInvalid", payload: false });

      if (event.target.name !== "socialMedia") {
        setOrgRegisterData((prevState: OrgRegisterData) => ({
          ...prevState,
          orgDetails: {
            ...prevState.orgDetails,
            [event.target.name]: event.target.value,
          },
        }));
      }

      if (event.target.name === "socialMedia") {
        const targetValue = event.target.value;
        let baseURLPresent = false;

        dispatch({ type: "socialMediaLink", payload: targetValue });

        if (targetValue) {
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

        if (targetValue === "" || baseURLPresent === false)
          dispatch({ type: "dropdownSelected", payload: "" });
      }
    };

  const handleSocialDropdownSelect: (selected: string | null) => void = (
    selected
  ) => {
    if (selected !== null) {
      if (state.validated) dispatch({ type: "validated", payload: false });

      if (state.socialMediaLinkIsInvalid)
        dispatch({ type: "socialMediaLinkIsInvalid", payload: false });

      if (state.orgNameIsInvalid)
        dispatch({ type: "orgNameIsInvalid", payload: false });

      dispatch({ type: "dropdownSelected", payload: selected });
    }
  };

  const handleOrgRegisterDetailsFormSubmit: React.FormEventHandler<HTMLFormElement> =
    (event) => {
      event.preventDefault();

      dispatch({ type: "validated", payload: true });

      const onlyAlphabets = /^[a-zA-Z][a-zA-z ]*$/;

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

      if (state.socialMediaLink) {
        let isInValidLink = false;

        const startsWith = /^(https|http|www).*/;

        if (
          state.dropdownSelected !== "" &&
          startsWith.test(state.socialMediaLink)
        ) {
          let validLink = false;
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

      if (event.currentTarget.checkValidity() === true) {
        let code: string = "";
        let link: string = "";

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

        const socialMedia: { code: string; link: string } = { code, link };

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
              orgRegisterDispatch({ type: "processing", payload: true });
              orgRegisterDispatch({ type: "loading", payload: true });

              dispatch({ type: "error", payload: "" });

              await postRegisterCall(orgRegisterData);

              orgRegisterDispatch({ type: "loading", payload: false });
              orgRegisterDispatch({ type: "emailSent", payload: true });
            } catch (error) {
              orgRegisterDispatch({ type: "processing", payload: false });

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
