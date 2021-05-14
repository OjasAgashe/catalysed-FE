import React, { useEffect, useState } from "react";
import "./OrgRegisterDetails.css";
import { OrgRegisterData } from "../../types/OrganisationRegister";
import OrgRegisterDetailsForm from "./OrgRegisterDetailsForm";

type OrgRegisterDetailsProps = {
  orgRegisterData: OrgRegisterData;
  setOrgRegisterData: any;
  setCurrentOrgRegister: React.Dispatch<React.SetStateAction<string>>;
};

const OrgRegisterDetails = ({
  orgRegisterData,
  setOrgRegisterData,
  setCurrentOrgRegister,
}: OrgRegisterDetailsProps) => {
  const [dropdownSelected, setDropdownSelected] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);

  const [orgNameFeedback, setOrgNameFeedback] = useState<string>("");
  const [orgNameIsInvalid, setOrgNameIsInvalid] = useState<boolean>(false);

  const [socialMediaLink, setSocialMediaLink] = useState<string>("");
  const [socialMediaFeedback, setSocialMediaFeedback] = useState<string>("");
  const [socialMediaLinkIsInvalid, setSocialMediaLinkIsInvalid] =
    useState<boolean>(false);

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

  useEffect(() => {
    setCurrentOrgRegister("details");
  });

  const handleOrgRegisterDetailsChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (validated) setValidated(false);

      if (socialMediaLinkIsInvalid) setSocialMediaLinkIsInvalid(false);

      if (orgNameIsInvalid) setOrgNameIsInvalid(false);

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

        setSocialMediaLink(targetValue);

        if (targetValue) {
          for (let index = 0; index < possibleSocialBaseURL.length; index++) {
            let baseURL = possibleSocialBaseURL[index];

            if (targetValue.includes(baseURL)) {
              switch (index) {
                case 0:
                case 4:
                  setDropdownSelected("twitter");
                  break;
                case 1:
                case 5:
                  setDropdownSelected("linkedIn");
                  break;
                case 2:
                case 6:
                  setDropdownSelected("facebook");
                  break;
                case 3:
                case 7:
                  setDropdownSelected("instagram");
                  break;
              }
              baseURLPresent = true;
              setSocialMediaLink(targetValue.replace(baseURL, ""));
              break;
            }
          }
        }

        if (targetValue === "" || baseURLPresent === false)
          setDropdownSelected("");
      }
    };

  const handleSocialDropdownSelect: (selected: string | null) => void = (
    selected
  ) => {
    if (selected !== null) {
      if (validated) setValidated(false);

      if (socialMediaLinkIsInvalid) setSocialMediaLinkIsInvalid(false);

      if (orgNameIsInvalid) setOrgNameIsInvalid(false);

      setDropdownSelected(selected);
    }
  };

  const handleOrgRegisterDetailsFormSubmit: React.FormEventHandler<HTMLFormElement> =
    (event) => {
      event.preventDefault();

      setValidated(true);

      const onlyAlphabets = /^[a-zA-Z]*$/;

      if (
        orgRegisterData.orgDetails.name &&
        !onlyAlphabets.test(orgRegisterData.orgDetails.name)
      ) {
        setOrgNameFeedback("Name must contain only Alphabet");
        setOrgNameIsInvalid(true);
        return;
      }

      if (socialMediaLink) {
        let isInValidLink = false;

        const startsWith = /^(https|http|www).*/;

        if (dropdownSelected !== "" && startsWith.test(socialMediaLink)) {
          let validLink = false;
          for (let index = 0; index < possibleSocialBaseURL.length; index++) {
            let baseURL = possibleSocialBaseURL[index];

            if (socialMediaLink.includes(baseURL)) {
              validLink = true;
              break;
            }
          }
          if (!validLink) isInValidLink = true;
        }

        if (dropdownSelected === "" || isInValidLink) {
          setSocialMediaFeedback("Only dropdown options are acceptable");
          setSocialMediaLinkIsInvalid(true);
          return;
        }
      }

      if (event.currentTarget.checkValidity() === true) {
        let code: string = "";
        let link: string = "";

        for (let index = 0; index < possibleSocialMedia.length; index++) {
          let social = possibleSocialMedia[index];

          if (social === dropdownSelected) {
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
            link = possibleSocialBaseURL[index] + socialMediaLink;
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
          (orgRegisterData: OrgRegisterData) => console.log(orgRegisterData)
        );
      }
    };

  return (
    <div className="OrgRegisterDetails">
      <OrgRegisterDetailsForm
        validated={validated}
        handleOrgRegisterDetailsFormSubmit={handleOrgRegisterDetailsFormSubmit}
        orgRegisterData={orgRegisterData}
        handleOrgRegisterDetailsChange={handleOrgRegisterDetailsChange}
        dropdownSelected={dropdownSelected}
        handleSocialDropdownSelect={handleSocialDropdownSelect}
        socialMediaLink={socialMediaLink}
        socialMediaLinkIsInvalid={socialMediaLinkIsInvalid}
        socialMediaFeedback={socialMediaFeedback}
        orgNameFeedback={orgNameFeedback}
        orgNameIsInvalid={orgNameIsInvalid}
      />
    </div>
  );
};

export default OrgRegisterDetails;
