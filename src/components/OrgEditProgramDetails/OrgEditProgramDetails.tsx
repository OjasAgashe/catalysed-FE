import React from "react";
import { OrgEditProgramDetailsIllustration } from "../../assets/Illustrations/Illustrations";
import {
  OrgEditProgramDetailsActionType,
  OrgEditProgramDetailsState,
} from "../../types/OrgEditProgramDetails";
import Error from "../Error/Error";
import EditGeneralDetailsForm from "./EditGeneralDetailsForm";
import "./OrgEditProgramDetails.css";
import "../CreateProgramForm/CreateProgramForm.css";
import EditCoordinatorDetailsForm from "./EditCoordinatorDetailsForm";
import EditMentorDetailsForm from "./EditMentorDetailsForm";
import EditStudentDetailsForm from "./EditStudentDetailsForm";
import { CreateProgramData } from "../../types/CreateProgram";
import { Button } from "react-bootstrap";
import { GiStamper } from "react-icons/gi";
import { RiDraftLine } from "react-icons/ri";

type OrgEditProgramDetailsProps = {
  state: OrgEditProgramDetailsState;
  dispatch: React.Dispatch<OrgEditProgramDetailsActionType>;
  editedData: CreateProgramData | null;
  setEditedData: React.Dispatch<React.SetStateAction<CreateProgramData | null>>;
};

const OrgEditProgramDetails = ({
  state,
  dispatch,
  editedData,
  setEditedData,
}: OrgEditProgramDetailsProps) => {
  // console.log(state.originalData)
  return (
    <section className="CreateProgramFormContainer">
      {state.error ? (
        <Error message={state.error} className="OrgDetailsNotFound" />
      ) : (
        <>
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
                // onClick={handleDraftBtnClick}
              >
                Save to Draft&nbsp;
                <RiDraftLine />
              </Button>
            )}
            <Button
              className="CreateProgramPublishBtn"
              // onClick={handlePublishBtnClick}
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
      )}
    </section>
  );
};

export default OrgEditProgramDetails;
