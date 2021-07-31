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

/*
 * CreateProgramForm : component accepts two props, state and
 */
const CreateProgramForm = ({ state, dispatch }: CreateProgramFormProps) => {
  /*
   * state to manage all the form data that the Org will input (or give),
   * we will send this data in API call
   */
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

  /*
   * postCreateProgramCall : API to post all the form data, so that on
   * successful call a new program can be created
   */
  const { postCreateProgramCall } = useOrgAPI();

  /*
   * When the API call will be successful, we will push the Org to View and Search
   * page
   */
  const history = useHistory();

  /*
   * Before calling the PUBLISH API, to check that the Org has given all the required
   * data or not
   */
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

  /*
   * makeAPICall: (status: string, message: string) => Promise<void>
   *
   * function to call post API, accepting status and message as parameter.
   *
   * status : can have value of PUBLISH, or SAVED_TO_DRAFT
   * message : can have value according to PUBLISH or SAVED_TO_DRAFT,
   * which message we want to show
   */
  const makeAPICall = async (status: string, message: string) => {
    try {
      /*
       * As we will show Loading Progress component, when we are making API
       * call. So change position of scroll bar to top
       */
      document.documentElement.scrollTop = 0;

      // storing message, to show on Loading Progress component, in state.loadingMessage
      dispatch({ type: "loadingMessage", payload: message });

      /*
       * If we have shown any error message, then before calling to
       * API we are hiding that error message. So set error to ""
       */
      dispatch({ type: "error", payload: "" });

      // calling API with correct API required data format
      await postCreateProgramCall({
        ...answer,
        id: "",
        status,
      });

      /*
       * After successful API call, hide the Loading Progress component,
       * and push the Org to View and Search Page
       */
      dispatch({ type: "loadingMessage", payload: "" });
      history.push(`${ORGANISATION_PROGRAM_VIEW_SEARCH}/all`);
    } catch (error) {
      /*
       * If API call is not successful (that means we get some error), then
       * change the scroll bar position to bottom of the page. As we will show
       * error below the PUBLISH and SAVED_TO_DRAFT button
       */
      document.documentElement.scrollTop =
        document.documentElement.scrollHeight;

      /*
       * Hide the Loading Progress component, and store the error message
       * in state.error
       */
      dispatch({ type: "loadingMessage", payload: "" });
      dispatch({ type: "error", payload: error.response?.data?.message ?? "" });
    }
  };

  /*
   * function handling flow when PUBLISH button gets clicked
   */
  const handlePublishBtnClick = () => {
    /*
     * set the value of state.validated to true, so that if Org has not
     * entered and required field data we can show it a feedback message
     */
    dispatch({ type: "validated", payload: true });

    /*
     * If Org has entered every required field, then check we have got
     * any language input or not.
     *
     * It is also a required field
     */
    if (Boolean(state.selectedLanguages.length) === false) {
      dispatch({ type: "isLanguageSelected", payload: true });
      return;
    }

    /*
     * check Org has entered correct phone number or not. As the maximum
     * code length is 4, so the length of the phone number should not be
     * less than equal to 4
     */
    if (answer.coordinator.contact.number.length <= 4) {
      dispatch({ type: "isInvalid", payload: true });
      return;
    }

    /*
     * If all the above test has passed, then before calling the API we are
     * confirming that we have every required field value data or not via calling
     * canMakeAPICall()
     */
    if (canMakeAPICall()) {
      /*
       * If we can make API call, then send status as "PUBLISHED", and message
       * as "Publishing program"
       */
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
