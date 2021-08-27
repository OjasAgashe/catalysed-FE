/*
 * The logic for this file is much like the logic of OrgProfileEditSectionContainerFragment
 * file, the difference is that we are dealing with Mentor Profile data, in place
 * of Organisation Profile data
 */

import React from "react";
import {
  MentorProfileEditActionType,
  MentorProfileEditData,
  MentorProfileEditState,
} from "../../types/MentorProfileEdit";
import Error from "../Error/Error";

import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import LeavePageModal from "../LeavePageModal/LeavePageModal";
import SectionOne from "../StudentProfileEditSectionContainer/SectionOne";
import SectionTwo from "./SectionTwo";

type MentorProfileEditSectionContainerFragmentProps = {
  handleMentorProfileEditSaveBtn: () => void;
  handleMentorProfileEditDiscardChangesBtn: () => void;
  handleLeavePageModalLeaveBtn: () => void;
  handleLeavePageModalStayBtn: () => void;
  state: MentorProfileEditState;
  dispatch: React.Dispatch<MentorProfileEditActionType>;
  editedData: MentorProfileEditData | null;
  setEditedData: React.Dispatch<
    React.SetStateAction<MentorProfileEditData | null>
  >;
};

const MentorProfileEditSectionContainerFragment = ({
  handleMentorProfileEditSaveBtn,
  handleMentorProfileEditDiscardChangesBtn,
  handleLeavePageModalLeaveBtn,
  handleLeavePageModalStayBtn,
  state,
  dispatch,
  editedData,
  setEditedData,
}: MentorProfileEditSectionContainerFragmentProps) => {
  return (
    <>
      {state.showModal && (
        <LeavePageModal
          handleLeavePageModalLeaveBtn={handleLeavePageModalLeaveBtn}
          handleLeavePageModalStayBtn={handleLeavePageModalStayBtn}
        />
      )}

      <SectionOne state={state} />

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
          onClick={handleMentorProfileEditSaveBtn}
        >
          Save <FaSave className="OrgProfileEditSaveBtnIcon" />
        </button>
        <button
          disabled={!state.dataHasChanged}
          className={`OrgProfileEditDiscardChangesBtn Btn ${
            state.dataHasChanged ? "" : "EditOrgProfileDetailsDisabledField"
          }`}
          onClick={handleMentorProfileEditDiscardChangesBtn}
        >
          Discard Changes{" "}
          <MdCancel className="OrgProfileEditDiscardChangesBtnIcon" />
        </button>
      </div>
      {state.putCallError && (
        <Error message={state.putCallError} className="ErrorMessage" />
      )}
    </>
  );
};

export default MentorProfileEditSectionContainerFragment;
