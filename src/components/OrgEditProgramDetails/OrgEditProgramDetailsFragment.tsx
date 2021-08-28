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
      <div className="CreateProgramFirstSection">
        {/* Show EditGeneralDetailsForm component */}
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

          {/* Show EditCoordinatorDetailsForm component */}
          <EditCoordinatorDetailsForm
            state={state}
            dispatch={dispatch}
            editedData={editedData}
            setEditedData={setEditedData}
          />
        </div>
      </div>
      <div className="CreateProgramSecondSection">
        {/* Show EditMentorDetailsForm component */}
        <EditMentorDetailsForm
          state={state}
          dispatch={dispatch}
          editedData={editedData}
          setEditedData={setEditedData}
        />

        {/* Show EditStudentDetailsForm component */}
        <EditStudentDetailsForm
          state={state}
          dispatch={dispatch}
          editedData={editedData}
          setEditedData={setEditedData}
        />
      </div>

      {/* Show Publish and Save to Draft button */}
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

      {/* If validationError has value, then show it below the buttons */}
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
