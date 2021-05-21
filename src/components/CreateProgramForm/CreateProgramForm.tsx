import React, { useReducer } from "react";
import GeneralDetailsForm from "./GeneralDetailsForm";
import "./CreateProgramForm.css";
import { orgCreateProgramReducer } from "../../reducers/orgCreateProgramReducer";
import CoordinatorDetailsForm from "./CoordinatorDetailsForm";
import MentorDetailsForm from "./MentorDetailsForm";
import StudentDetailsForm from "./StudentDetailsForm";
import { Button } from "react-bootstrap";
import { GiStamper } from "react-icons/gi";
import { RiDraftLine } from "react-icons/ri";

const CreateProgramForm = () => {
  const [state, dispatch] = useReducer(orgCreateProgramReducer, {
    selectedDate: null,
    selectedLanguages: [],
  });

  return (
    <section className="CreateProgramFormContainer">
      <div className="CreateProgramFirstSection">
        <GeneralDetailsForm state={state} dispatch={dispatch} />
        <div className="CreateProgramFirstSubSection">
          <CoordinatorDetailsForm />
          <MentorDetailsForm state={state} dispatch={dispatch} />
        </div>
      </div>
      <StudentDetailsForm state={state} dispatch={dispatch} />
      <div className="CreateProgramButtonContainer">
        <Button className="CreateProgramDraftBtn">
          Save to Draft&nbsp;
          <RiDraftLine />
        </Button>
        <Button className="CreateProgramPublishBtn">
          Publish <GiStamper />
        </Button>
      </div>
    </section>
  );
};

export default CreateProgramForm;
