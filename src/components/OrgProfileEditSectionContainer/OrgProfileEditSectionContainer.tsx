import React, { useEffect, useState } from "react";
import "./OrgProfileEditSectionContainer.css";

import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";

import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import LeavePageModal from "../LeavePageModal/LeavePageModal";
import { useHistory, useLocation } from "react-router-dom";

const OrgProfileEditSectionContainer = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [socialLinkIsInvalid, setSocialLinkIsInvalid] =
    useState<boolean>(false);
  const [websiteLinkIsInvalid, setWebsiteLinkIsInvalid] =
    useState<boolean>(false);

  const [dataHasChanged, setDataHasChanged] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [leave, setLeave] = useState<boolean>(false);
  const [stay, setStay] = useState<boolean>(false);
  const [navigateToPath, setNavigateToPath] = useState<string>("");
  const history = useHistory();
  const location = useLocation();

  const responseData = {
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
  };

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

  useEffect(() => {
    const hasDataChange = () => {
      if (
        fakeData.firstName !== responseData.firstName ||
        fakeData.lastName !== responseData.lastName ||
        fakeData.email !== responseData.email ||
        fakeData.organisation.description !==
          responseData.organisation.description ||
        fakeData.organisation.social_link !==
          responseData.organisation.social_link ||
        fakeData.organisation.website_link !==
          responseData.organisation.website_link ||
        fakeData.organisation.year_of_inception !==
          responseData.organisation.year_of_inception ||
        fakeData.organisation.primary_language !==
          responseData.organisation.primary_language ||
        fakeData.organisation.contact.phone !==
          responseData.organisation.contact.phone ||
        fakeData.organisation.contact.email !==
          responseData.organisation.contact.email ||
        fakeData.organisation.address.country !==
          responseData.organisation.address.country ||
        fakeData.organisation.address.region !==
          responseData.organisation.address.region
      ) {
        return true;
      }

      return false;
    };

    setDataHasChanged(hasDataChange);

    // @ts-ignore
    const unblock = history.block((tx) => {
      if (dataHasChanged === false) return true;

      if (leave) return true;

      setNavigateToPath(tx.pathname);

      if (dataHasChanged) setShowModal(true);

      return false;
    });

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (dataHasChanged) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      unblock();
    };
  }, [
    dataHasChanged,
    fakeData.email,
    fakeData.firstName,
    fakeData.lastName,
    fakeData.organisation.address.country,
    fakeData.organisation.address.region,
    fakeData.organisation.contact.email,
    fakeData.organisation.contact.phone,
    fakeData.organisation.description,
    fakeData.organisation.primary_language,
    fakeData.organisation.social_link,
    fakeData.organisation.website_link,
    fakeData.organisation.year_of_inception,
    history,
    leave,
    location.pathname,
    responseData.email,
    responseData.firstName,
    responseData.lastName,
    responseData.organisation.address.country,
    responseData.organisation.address.region,
    responseData.organisation.contact.email,
    responseData.organisation.contact.phone,
    responseData.organisation.description,
    responseData.organisation.primary_language,
    responseData.organisation.social_link,
    responseData.organisation.website_link,
    responseData.organisation.year_of_inception,
    stay,
  ]);

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

  const handleOrgProfileEditDiscardChangesBtn = () => {
    setFakeData(responseData);
  };

  const handleLeavePageModalLeaveBtn = () => {
    setLeave(true);
    history.push(navigateToPath);
  };

  const handleLeavePageModalStayBtn = () => {
    setStay(true);
    setLeave(false);
    setShowModal(false);
    setNavigateToPath("");
  };

  return (
    <div className="OrgProfileEditSectionContainer">
      {showModal && (
        <LeavePageModal
          handleLeavePageModalLeaveBtn={handleLeavePageModalLeaveBtn}
          handleLeavePageModalStayBtn={handleLeavePageModalStayBtn}
        />
      )}

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

      <div className="OrgProfileEditBtnContainer">
        <button
          disabled={!dataHasChanged}
          className={`OrgProfileEditSaveBtn Btn ${
            dataHasChanged ? "" : "EditOrgProfileDetailsDisabledField"
          }`}
          onClick={handleOrgProfileEditSaveBtn}
        >
          Save
          <FaSave className="OrgProfileEditSaveBtnIcon" />
        </button>
        <button
          disabled={!dataHasChanged}
          className={`OrgProfileEditDiscardChangesBtn Btn ${
            dataHasChanged ? "" : "EditOrgProfileDetailsDisabledField"
          }`}
          onClick={handleOrgProfileEditDiscardChangesBtn}
        >
          Discard Changes
          <MdCancel className="OrgProfileEditDiscardChangesBtnIcon" />
        </button>
      </div>
    </div>
  );
};

export default OrgProfileEditSectionContainer;
