import React, { useCallback, useEffect } from "react";
import "./OrgProfileEditSectionContainer.css";

import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";

import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import LeavePageModal from "../LeavePageModal/LeavePageModal";
import { useHistory, useLocation } from "react-router-dom";
import {
  OrgProfileEditActionType,
  OrgProfileEditData,
  OrgProfileEditState,
} from "../../types/OrgProfileEdit";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";

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
    dispatch({ type: "dataHasChanged", payload: hasDataChange() });

    // @ts-ignore
    const unblock = history.block((tx) => {
      if (state.dataHasChanged === false) return true;

      if (state.leave) return true;

      dispatch({ type: "navigateToPath", payload: tx.pathname });

      if (state.dataHasChanged) dispatch({ type: "showModal", payload: true });
      return false;
    });

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (state.dataHasChanged) {
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
    dispatch,
    hasDataChange,
    history,
    location.pathname,
    state.dataHasChanged,
    state.leave,
  ]);

  const canMakeAPICall = () => {
    return (
      [
        editedData?.firstName ?? "",
        editedData?.lastName ?? "",
        editedData?.organizationDetails?.description,
        editedData?.organizationDetails?.socialMediaLink,
        editedData?.organizationDetails?.website,
        editedData?.organizationDetails?.yearOfInception,
        editedData?.organizationDetails?.primaryLanguage,
        editedData?.organizationDetails?.phone.number,
        editedData?.organizationDetails?.address?.country,
        editedData?.organizationDetails?.address?.region,
      ].includes("") === false
    );
  };

  const handleOrgProfileEditSaveBtn = () => {
    if (state.validated === false)
      dispatch({ type: "validated", payload: true });

    // const validEmail =
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (
      editedData?.organizationDetails.description &&
      editedData?.organizationDetails.description.length < 10
    ) {
      document.documentElement.scrollTop = 100;
      return;
    }

    if (
      editedData?.organizationDetails.yearOfInception &&
      parseInt(editedData?.organizationDetails.yearOfInception) < 1800
    ) {
      return;
    }

    // if (!validEmail.test(editedData?.organizationDetails.contact.email)) {
    //   return;
    // }

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
      let code = "";

      for (let index = 0; index < possibleSocialBaseURL.length; index++) {
        let baseURL = possibleSocialBaseURL[index];

        if (editedData?.organizationDetails.socialMediaLink.includes(baseURL)) {
          switch (index) {
            case 0:
            case 4:
              code = "TWITTER";
              break;

            case 1:
            case 5:
              code = "LINKED_IN";
              break;

            case 2:
            case 6:
              code = "FACEBOOK";
              break;

            case 3:
            case 7:
              code = "INSTAGRAM";
              break;
          }

          baseURLPresent = true;
          break;
        }
      }

      if (baseURLPresent === false) {
        dispatch({ type: "socialLinkIsInvalid", payload: true });
        document.documentElement.scrollTop = 100;
        return;
      } else {
        setEditedData(
          (prevState): OrgProfileEditData =>
            ({
              ...prevState,
              organizationDetails: {
                ...prevState?.organizationDetails,
                socialMediaCode: code,
              },
            } as OrgProfileEditData)
        );
      }
    }

    if (
      editedData?.organizationDetails.website.startsWith("https://") ===
        false &&
      editedData?.organizationDetails.website.startsWith("http://") === false
    ) {
      dispatch({ type: "websiteLinkIsInvalid", payload: true });
      document.documentElement.scrollTop = 100;
      return;
    }

    if ((editedData?.organizationDetails?.phone?.number ?? "").length <= 4) {
      dispatch({ type: "phoneValueIsInvalid", payload: true });
      return;
    }

    if (canMakeAPICall()) {
      console.log("Edited Profile", editedData);
    } else {
      document.documentElement.scrollTop = 100;
    }
  };

  const handleOrgProfileEditDiscardChangesBtn = () => {
    setEditedData(state.responseData);
  };

  const handleLeavePageModalLeaveBtn = () => {
    dispatch({ type: "leave", payload: true });
    history.push(state.navigateToPath);
  };

  const handleLeavePageModalStayBtn = () => {
    dispatch({ type: "stay", payload: true });
    dispatch({ type: "leave", payload: false });
    dispatch({ type: "showModal", payload: false });
    dispatch({ type: "navigateToPath", payload: "" });
  };

  return (
    <div className="OrgProfileEditSectionContainer">
      {state.showModal && (
        <LeavePageModal
          handleLeavePageModalLeaveBtn={handleLeavePageModalLeaveBtn}
          handleLeavePageModalStayBtn={handleLeavePageModalStayBtn}
        />
      )}

      <SectionOne
        editedData={editedData}
        setEditedData={setEditedData}
        state={state}
        dispatch={dispatch}
      />

      <SectionTwo
        editedData={editedData}
        setEditedData={setEditedData}
        state={state}
        dispatch={dispatch}
      />

      <div className="OrgProfileEditBtnContainer">
        <button
          disabled={!state.dataHasChanged}
          className={`OrgProfileEditSaveBtn Btn ${
            state.dataHasChanged ? "" : "EditOrgProfileDetailsDisabledField"
          }`}
          onClick={handleOrgProfileEditSaveBtn}
        >
          Save
          <FaSave className="OrgProfileEditSaveBtnIcon" />
        </button>
        <button
          disabled={!state.dataHasChanged}
          className={`OrgProfileEditDiscardChangesBtn Btn ${
            state.dataHasChanged ? "" : "EditOrgProfileDetailsDisabledField"
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
