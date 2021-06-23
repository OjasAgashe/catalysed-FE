import React, { useState } from "react";
import "./OrgProfileEditSectionContainer.css";

import "../OrgProfileManageSectionContainer/OrgProfileManageSectionContainer.css";

import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import { useHistory } from "react-router-dom";
import { ORGANISATION_PROFILE_MANAGE } from "../../constants/Routes";

import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const OrgProfileEditSectionContainer = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [socialLinkIsInvalid, setSocialLinkIsInvalid] =
    useState<boolean>(false);
  const [websiteLinkIsInvalid, setWebsiteLinkIsInvalid] =
    useState<boolean>(false);

  const [fakeData, setFakeData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    organisation: {
      name: string;
      description: string;
      social_link: string;
      website_link: string;
      area_of_work: string;
      contact: {
        phone: string;
        email: string;
      };
      year_of_inception: string;
      address: {
        country: string;
        region: string;
      };
      primary_language: string;
    };
  }>({
    firstName: "Stefan",
    lastName: "le",
    email: "stefan.le@gmail.com",
    organisation: {
      name: "catalysed",
      description: "our aim is to help student",
      social_link: "https://twitter.com/foo",
      website_link: "https://catalysed.org",
      area_of_work: "Education",
      contact: {
        phone: "111111111",
        email: "example@gmail.com",
      },
      year_of_inception: "1985",
      address: {
        country: "India",
        region: "Delhi",
      },
      primary_language: "English",
    },
  });

  const history = useHistory();

  const canMakeAPICall = () => {
    return (
      [
        fakeData.firstName,
        fakeData.lastName,
        fakeData.organisation.description,
        fakeData.organisation.social_link,
        fakeData.organisation.website_link,
        fakeData.organisation.year_of_inception,
        fakeData.organisation.primary_language,
        fakeData.organisation.contact.phone,
        fakeData.organisation.contact.email,
        fakeData.organisation.address.country,
        fakeData.organisation.address.region,
      ].includes("") === false
    );
  };

  const handleOrgProfileEditSaveBtn = () => {
    if (validated === false) setValidated(true);

    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (fakeData.organisation.description.length < 10) {
      document.documentElement.scrollTop = 100;
      return;
    }

    if (parseInt(fakeData.organisation.year_of_inception) < 1800) {
      return;
    }

    if (!validEmail.test(fakeData.organisation.contact.email)) {
      return;
    }

    if (
      fakeData.organisation.social_link.startsWith("https://") === false &&
      fakeData.organisation.social_link.startsWith("http://") === false
    ) {
      setSocialLinkIsInvalid(true);
      document.documentElement.scrollTop = 100;
      return;
    }

    if (
      fakeData.organisation.website_link.startsWith("https://") === false &&
      fakeData.organisation.website_link.startsWith("http://") === false
    ) {
      setWebsiteLinkIsInvalid(true);
      document.documentElement.scrollTop = 100;
      return;
    }

    if (canMakeAPICall()) {
      console.log("Edited Profile", fakeData);
    } else {
      document.documentElement.scrollTop = 100;
    }
  };

  const handleOrgProfileEditCancelBtn = () => {
    history.push(ORGANISATION_PROFILE_MANAGE);
  };

  return (
    <div className="OrgProfileManageSectionContainer">
      <SectionOne
        fakeData={fakeData}
        setFakeData={setFakeData}
        validated={validated}
        setValidated={setValidated}
      />

      <SectionTwo
        fakeData={fakeData}
        setFakeData={setFakeData}
        validated={validated}
        setValidated={setValidated}
        socialLinkIsInvalid={socialLinkIsInvalid}
        setSocialLinkIsInvalid={setSocialLinkIsInvalid}
        websiteLinkIsInvalid={websiteLinkIsInvalid}
        setWebsiteLinkIsInvalid={setWebsiteLinkIsInvalid}
      />

      <SectionThree
        fakeData={fakeData}
        setFakeData={setFakeData}
        validated={validated}
        setValidated={setValidated}
      />

      <div className="OrgProfileEditBtnContainer">
        <button
          className="OrgProfileEditSaveBtn Btn"
          onClick={handleOrgProfileEditSaveBtn}
        >
          Save
          <FaSave className="OrgProfileEditSaveBtnIcon" />
        </button>
        <button
          className="OrgProfileEditCancelBtn Btn"
          onClick={handleOrgProfileEditCancelBtn}
        >
          Cancel
          <MdCancel className="OrgProfileEditCancelBtnIcon" />
        </button>
      </div>
    </div>
  );
};

export default OrgProfileEditSectionContainer;
