import React from "react";
import {
  OrgEditProgramDetailsActionType,
  OrgEditProgramDetailsState,
} from "../../types/OrgEditProgramDetails";

import { CreateProgramData } from "../../types/CreateProgram";
import Error from "../Error/Error";

import { OrgEditProgramDetailsIllustration } from "../../assets/Illustrations/Illustrations";
import LeavePageModal from "../LeavePageModal/LeavePageModal";

import EditGeneralDetailsForm from "./EditGeneralDetailsForm";
import EditCoordinatorDetailsForm from "./EditCoordinatorDetailsForm";
import EditMentorDetailsForm from "./EditMentorDetailsForm";
import EditStudentDetailsForm from "./EditStudentDetailsForm";

import { Button } from "react-bootstrap";
import { GiStamper } from "react-icons/gi";
import { RiDraftLine } from "react-icons/ri";

type OrgEditProgramDetailsFragmentProps = {
  handleLeavePageModalLeaveBtn: () => void;
  handleLeavePageModalStayBtn: () => void;
  state: OrgEditProgramDetailsState;
  dispatch: React.Dispatch<OrgEditProgramDetailsActionType>;
  editedData: CreateProgramData | null;
  setEditedData: React.Dispatch<React.SetStateAction<CreateProgramData | null>>;
  handleDraftBtnClick: () => void;
  handlePublishBtnClick: () => void;
};

const OrgEditProgramDetailsFragment = ({
  handleLeavePageModalLeaveBtn,
  handleLeavePageModalStayBtn,
  state,
  dispatch,
  editedData,
  setEditedData,
  handleDraftBtnClick,
  handlePublishBtnClick,
}: OrgEditProgramDetailsFragmentProps) => {
  return (
    <>
      {state.showModal && (
        <LeavePageModal
          handleLeavePageModalLeaveBtn={handleLeavePageModalLeaveBtn}
          handleLeavePageModalStayBtn={handleLeavePageModalStayBtn}
        />
      )}
      <div className="CreateProgramFirstSection">
        <EditGeneralDetailsForm
          state={state}
          dispatch={dispatch}
          editedData={editedData}
          setEditedData={setEditedData}
        />
        <div className="CreateProgramFirstSubSection">
          <img
            src={OrgEditProgramDetailsIllustration}
            alt="edit program details illustration"
            className="CreateProgramIllustration"
          />
          <EditCoordinatorDetailsForm
            state={state}
            dispatch={dispatch}
            editedData={editedData}
            setEditedData={setEditedData}
          />
        </div>
      </div>
      <div className="CreateProgramSecondSection">
        <EditMentorDetailsForm
          state={state}
          dispatch={dispatch}
          editedData={editedData}
          setEditedData={setEditedData}
        />
        <EditStudentDetailsForm
          state={state}
          dispatch={dispatch}
          editedData={editedData}
          setEditedData={setEditedData}
        />
      </div>
      <div className="EditProgramDetails CreateProgramButtonContainer">
        {state.originalData?.status !== "PUBLISHED" && (
          <Button
            className="CreateProgramDraftBtn"
            onClick={handleDraftBtnClick}
          >
            Save to Draft&nbsp;
            <RiDraftLine />
          </Button>
        )}
        <Button
          className="CreateProgramPublishBtn"
          onClick={handlePublishBtnClick}
        >
          Publish <GiStamper />
        </Button>
      </div>
      {state.validationError && (
        <Error
          message={state.validationError}
          className="CreateProgramErrorMessage"
        />
      )}
    </>
  );
};

export default OrgEditProgramDetailsFragment;
