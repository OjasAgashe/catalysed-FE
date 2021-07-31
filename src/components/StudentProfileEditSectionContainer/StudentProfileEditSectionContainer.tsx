import React, { useEffect, useState } from "react";
import "../OrgProfileEditSectionContainer/OrgProfileEditSectionContainer.css";
import "./StudentProfileEditSectionContainer.css";

import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";

import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import LeavePageModal from "../LeavePageModal/LeavePageModal";
import { useHistory, useLocation } from "react-router-dom";

const StudentProfileEditSectionContainer = () => {
  const [validated, setValidated] = useState<boolean>(false);

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
    profileBuilderDetails: {
      age: "42",
      organisation: "DU",
      address: {
        country: "India",
        region: "Delhi",
      },
      gender: "Male",
      primary_language: "English",
      professional_mentored: "Yes",
      stable_connection: "Yes",
      contact: {
        phone: "1111111111",
        email: "stefan.le@gmail.com",
      },
      device: "Mobile",
    },
  };

  const [fakeData, setFakeData] = useState({
    firstName: "Stefan",
    lastName: "le",
    email: "stefan.le@gmail.com",
    profileBuilderDetails: {
      age: "42",
      organisation: "DU",
      address: {
        country: "India",
        region: "Delhi",
      },
      gender: "Male",
      primary_language: "English",
      professional_mentored: "Yes",
      stable_connection: "Yes",
      contact: {
        phone: "1111111111",
        email: "stefan.le@gmail.com",
      },
      device: "Mobile",
    },
  });

  useEffect(() => {
    const hasDataChange = () => {
      if (
        fakeData.firstName !== responseData.firstName ||
        fakeData.lastName !== responseData.lastName ||
        fakeData.email !== responseData.email ||
        fakeData.profileBuilderDetails.age !==
          responseData.profileBuilderDetails.age ||
        fakeData.profileBuilderDetails.organisation !==
          responseData.profileBuilderDetails.organisation ||
        fakeData.profileBuilderDetails.gender !==
          responseData.profileBuilderDetails.gender ||
        fakeData.profileBuilderDetails.primary_language !==
          responseData.profileBuilderDetails.primary_language ||
        fakeData.profileBuilderDetails.professional_mentored !==
          responseData.profileBuilderDetails.professional_mentored ||
        fakeData.profileBuilderDetails.stable_connection !==
          responseData.profileBuilderDetails.stable_connection ||
        fakeData.profileBuilderDetails.device !==
          responseData.profileBuilderDetails.device ||
        fakeData.profileBuilderDetails.address.country !==
          responseData.profileBuilderDetails.address.country ||
        fakeData.profileBuilderDetails.address.region !==
          responseData.profileBuilderDetails.address.region ||
        fakeData.profileBuilderDetails.contact.phone !==
          responseData.profileBuilderDetails.contact.phone ||
        fakeData.profileBuilderDetails.contact.email !==
          responseData.profileBuilderDetails.contact.email
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
    fakeData.profileBuilderDetails.address.country,
    fakeData.profileBuilderDetails.address.region,
    fakeData.profileBuilderDetails.age,
    fakeData.profileBuilderDetails.contact.email,
    fakeData.profileBuilderDetails.contact.phone,
    fakeData.profileBuilderDetails.device,
    fakeData.profileBuilderDetails.gender,
    fakeData.profileBuilderDetails.organisation,
    fakeData.profileBuilderDetails.primary_language,
    fakeData.profileBuilderDetails.professional_mentored,
    fakeData.profileBuilderDetails.stable_connection,
    history,
    leave,
    location.pathname,
    responseData.email,
    responseData.firstName,
    responseData.lastName,
    responseData.profileBuilderDetails.address.country,
    responseData.profileBuilderDetails.address.region,
    responseData.profileBuilderDetails.age,
    responseData.profileBuilderDetails.contact.email,
    responseData.profileBuilderDetails.contact.phone,
    responseData.profileBuilderDetails.device,
    responseData.profileBuilderDetails.gender,
    responseData.profileBuilderDetails.organisation,
    responseData.profileBuilderDetails.primary_language,
    responseData.profileBuilderDetails.professional_mentored,
    responseData.profileBuilderDetails.stable_connection,
    stay,
  ]);

  const canMakeAPICall = () => {
    return (
      [
        fakeData.firstName,
        fakeData.lastName,
        fakeData.email,
        fakeData.profileBuilderDetails.address.country,
        fakeData.profileBuilderDetails.address.region,
        fakeData.profileBuilderDetails.age,
        fakeData.profileBuilderDetails.contact.email,
        fakeData.profileBuilderDetails.contact.phone,
        fakeData.profileBuilderDetails.device,
        fakeData.profileBuilderDetails.gender,
        fakeData.profileBuilderDetails.organisation,
        fakeData.profileBuilderDetails.primary_language,
        fakeData.profileBuilderDetails.professional_mentored,
        fakeData.profileBuilderDetails.stable_connection,
      ].includes("") === false
    );
  }

  const handleStudentProfileEditSaveBtn = () => {
    if (validated === false) setValidated(true);

    if (canMakeAPICall()) {
      console.log("Edited Profile", fakeData);
    } else {
      document.documentElement.scrollTop = 100;
    }
  }

  const handleStudentProfileEditDiscardChangesBtn = () => {
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

      <SectionOne fakeData={fakeData} />

      <SectionTwo
        fakeData={fakeData}
        setFakeData={setFakeData}
        validated={validated}
        setValidated={setValidated}
      />

      <div className="OrgProfileEditBtnContainer">
        <button
          disabled={!dataHasChanged}
          className={`OrgProfileEditSaveBtn Btn ${
            dataHasChanged ? "" : "EditOrgProfileDetailsDisabledField"
            }`}
          onClick={handleStudentProfileEditSaveBtn}
        >
          Save <FaSave className="OrgProfileEditSaveBtnIcon" />
        </button>
        <button
          disabled={!dataHasChanged}
          className={`OrgProfileEditDiscardChangesBtn Btn ${
            dataHasChanged ? "" : "EditOrgProfileDetailsDisabledField"
          }`}
          onClick={handleStudentProfileEditDiscardChangesBtn}
        >
          Discard Changes{" "}
          <MdCancel className="OrgProfileEditDiscardChangesBtnIcon" />
        </button>
      </div>
    </div>
  );
};

export default StudentProfileEditSectionContainer;
