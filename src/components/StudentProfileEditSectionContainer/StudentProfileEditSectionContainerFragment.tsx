/*
 * The logic for this file is much like the logic of OrgProfileEditSectionContainerFragment
 * file, the difference is that we are dealing with Student Profile data, in place
 * of Organisation Profile data
 */

import React from "react";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import Error from "../Error/Error";

import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import LeavePageModal from "../LeavePageModal/LeavePageModal";

import {
  StudentProfileEditActionType,
  StudentProfileEditData,
  StudentProfileEditState,
} from "../../types/StudentProfileEdit";

type StudentProfileEditSectionContainerFragmentProps = {
  handleStudentProfileEditSaveBtn: () => void;
  handleStudentProfileEditDiscardChangesBtn: () => void;
  handleLeavePageModalLeaveBtn: () => void;
  handleLeavePageModalStayBtn: () => void;
  state: StudentProfileEditState;
  dispatch: React.Dispatch<StudentProfileEditActionType>;
  editedData: StudentProfileEditData | null;
  setEditedData: React.Dispatch<
    React.SetStateAction<StudentProfileEditData | null>
  >;
};

const StudentProfileEditSectionContainerFragment = ({
  handleStudentProfileEditSaveBtn,
  handleStudentProfileEditDiscardChangesBtn,
  handleLeavePageModalLeaveBtn,
  handleLeavePageModalStayBtn,
  state,
  dispatch,
  editedData,
  setEditedData,
}: StudentProfileEditSectionContainerFragmentProps) => {
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
          onClick={handleStudentProfileEditSaveBtn}
        >
          Save <FaSave className="OrgProfileEditSaveBtnIcon" />
        </button>
        <button
          disabled={!state.dataHasChanged}
          className={`OrgProfileEditDiscardChangesBtn Btn ${
            state.dataHasChanged ? "" : "EditOrgProfileDetailsDisabledField"
          }`}
          onClick={handleStudentProfileEditDiscardChangesBtn}
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

export default StudentProfileEditSectionContainerFragment;
