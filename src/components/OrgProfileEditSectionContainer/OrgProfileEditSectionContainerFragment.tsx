import React from "react";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import Error from "../Error/Error";

import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import LeavePageModal from "../LeavePageModal/LeavePageModal";

import {
  OrgProfileEditActionType,
  OrgProfileEditData,
  OrgProfileEditState,
} from "../../types/OrgProfileEdit";

type OrgProfileEditSectionContainerFragmentProps = {
  handleOrgProfileEditSaveBtn: () => void;
  handleOrgProfileEditDiscardChangesBtn: () => void;
  handleLeavePageModalLeaveBtn: () => void;
  handleLeavePageModalStayBtn: () => void;
  state: OrgProfileEditState;
  dispatch: React.Dispatch<OrgProfileEditActionType>;
  editedData: OrgProfileEditData | null;
  setEditedData: React.Dispatch<
    React.SetStateAction<OrgProfileEditData | null>
  >;
  possibleSocialBaseURL: string[];
};

const OrgProfileEditSectionContainerFragment = ({
  handleOrgProfileEditSaveBtn,
  handleOrgProfileEditDiscardChangesBtn,
  handleLeavePageModalLeaveBtn,
  handleLeavePageModalStayBtn,
  state,
  dispatch,
  editedData,
  setEditedData,
  possibleSocialBaseURL,
}: OrgProfileEditSectionContainerFragmentProps) => {
  return (
    <>
      {/*
       * If state.showModal has true value, then show the LeavePageModal
       * component
       */}
      {state.showModal && (
        <LeavePageModal
          handleLeavePageModalLeaveBtn={handleLeavePageModalLeaveBtn}
          handleLeavePageModalStayBtn={handleLeavePageModalStayBtn}
        />
      )}

      {/* Show SectionOne */}
      <SectionOne
        editedData={editedData}
        setEditedData={setEditedData}
        state={state}
        dispatch={dispatch}
      />

      {/* Show SectionTwo */}
      <SectionTwo
        editedData={editedData}
        setEditedData={setEditedData}
        state={state}
        dispatch={dispatch}
        possibleSocialBaseURL={possibleSocialBaseURL}
      />

      {/*
       * Show Save and Discard Changes button
       */}
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

      {/*
       * If we have any error in putCallError, then show it
       */}
      {state.putCallError && (
        <Error message={state.putCallError} className="ErrorMessage" />
      )}
    </>
  );
};

export default OrgProfileEditSectionContainerFragment;
