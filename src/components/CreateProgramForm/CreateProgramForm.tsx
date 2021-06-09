import React, { useState } from "react";
import GeneralDetailsForm from "./GeneralDetailsForm";
import "./CreateProgramForm.css";
import CoordinatorDetailsForm from "./CoordinatorDetailsForm";
import MentorDetailsForm from "./MentorDetailsForm";
import StudentDetailsForm from "./StudentDetailsForm";
import { Button } from "react-bootstrap";
import { GiStamper } from "react-icons/gi";
import { RiDraftLine } from "react-icons/ri";
import { CreateProgramIllustration } from "../../assets/Illustrations/Illustrations";
import {
  CreateProgramActionType,
  CreateProgramData,
  CreateProgramState,
} from "../../types/CreateProgram";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { useHistory } from "react-router-dom";
import { ORGANISATION_PROGRAM_VIEW_SEARCH } from "../../constants/Routes";
import Error from "../Error/Error";

type CreateProgramFormProps = {
  state: CreateProgramState;
  dispatch: React.Dispatch<CreateProgramActionType>;
};

const CreateProgramForm = ({ state, dispatch }: CreateProgramFormProps) => {
  const [answer, setAnswer] = useState<CreateProgramData>({
    id: "",
    status: "",
    title: "",
    description: "",
    tentativeStartDate: "",
    durationInMonths: "",
    mode: "Virtual",
    languageRequirements: "",
    ageLimit: { from: "", to: "" },
    programLink: "",
    coordinator: {
      name: "",
      email: "",
      contact: { countryName: "", countryCode: "", number: "" },
    },
    studentFields: {
      subjectRequirements: "",
      openings: "",
      applyBy: "",
      isPaid: false,
      programFees: "0",
      generalInstructions: "",
    },
    mentorFields: {
      subjectRequirements: "",
      openings: "",
      applyBy: "",
      generalInstructions: "",
    },
  });

  const { postCreateProgramCall } = useOrgAPI();
  const history = useHistory();

  const canMakeAPICall = () => {
    return (
      [
        answer.title,
        answer.description,
        answer.tentativeStartDate,
        answer.durationInMonths,
        answer.languageRequirements,
        answer.ageLimit.from,
        answer.ageLimit.to,
        answer.programLink,
        answer.coordinator.name,
        answer.coordinator.email,
        answer.coordinator.contact.number,
        answer.mentorFields.applyBy,
        answer.mentorFields.generalInstructions,
        answer.mentorFields.openings,
        answer.mentorFields.subjectRequirements,
        answer.studentFields.applyBy,
        answer.studentFields.generalInstructions,
        answer.studentFields.openings,
        answer.studentFields.subjectRequirements,
      ].includes("") === false
    );
  };

  const makeAPICall = async (status: string, message: string) => {
    try {
      document.documentElement.scrollTop = 0;

      dispatch({ type: "loadingMessage", payload: message });
      dispatch({ type: "error", payload: "" });

      await postCreateProgramCall({
        ...answer,
        id: "",
        status,
      });

      dispatch({ type: "loadingMessage", payload: "" });
      history.push(`${ORGANISATION_PROGRAM_VIEW_SEARCH}/all`);
    } catch (error) {
      document.documentElement.scrollTop =
        document.documentElement.scrollHeight;

      dispatch({ type: "loadingMessage", payload: "" });
      dispatch({ type: "error", payload: error.response?.data?.message ?? "" });
    }
  };

  const handlePublishBtnClick = () => {
    dispatch({ type: "validated", payload: true });

    if (Boolean(state.selectedLanguages.length) === false) {
      dispatch({ type: "isLanguageSelected", payload: true });
      return;
    }

    if (answer.coordinator.contact.number.length <= 4) {
      dispatch({ type: "isInvalid", payload: true });
      return;
    }

    if (canMakeAPICall()) {
      makeAPICall("PUBLISHED", "Publishing program...");
    }
  };

  const handleDraftBtnClick = () => {
    dispatch({ type: "error", payload: "" });

    if (answer.title === "") {
      dispatch({
        type: "error",
        payload: 'To "save to draft", atleast fill the title.',
      });
      return;
    }

    makeAPICall("SAVED_TO_DRAFT", "Saving to draft...");
  };

  return (
    <section className="CreateProgramFormContainer">
      <div className="CreateProgramFirstSection">
        <GeneralDetailsForm
          answer={answer}
          setAnswer={setAnswer}
          state={state}
          dispatch={dispatch}
        />
        <div className="CreateProgramFirstSubSection">
          <img
            src={CreateProgramIllustration}
            alt="create program illustration"
            className="CreateProgramIllustration"
          />
          <CoordinatorDetailsForm
            answer={answer}
            setAnswer={setAnswer}
            state={state}
            dispatch={dispatch}
          />
        </div>
      </div>
      <div className="CreateProgramSecondSection">
        <MentorDetailsForm
          answer={answer}
          setAnswer={setAnswer}
          state={state}
          dispatch={dispatch}
        />
        <StudentDetailsForm
          answer={answer}
          setAnswer={setAnswer}
          state={state}
          dispatch={dispatch}
        />
      </div>
      <div className="CreateProgramButtonContainer">
        <Button className="CreateProgramDraftBtn" onClick={handleDraftBtnClick}>
          Save to Draft&nbsp;
          <RiDraftLine />
        </Button>
        <Button
          className="CreateProgramPublishBtn"
          onClick={handlePublishBtnClick}
        >
          Publish <GiStamper />
        </Button>
      </div>
      {state.error && (
        <Error message={state.error} className="CreateProgramErrorMessage" />
      )}
    </section>
  );
};

export default CreateProgramForm;
