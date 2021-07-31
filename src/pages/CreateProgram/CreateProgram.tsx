import React, { useEffect, useReducer } from "react";
import CreateProgramForm from "../../components/CreateProgramForm/CreateProgramForm";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import { orgCreateProgramReducer } from "../../reducers/orgCreateProgramReducer";
import "./CreateProgram.css";

const CreateProgram = () => {
  /*
   * state.error : will store the error message that we will get from unsuccessful
   * API call in CreateProgramForm component
   *
   * state.isInvalid : will control the feedback message of form control in form
   * (CreateProgramForm component)
   *
   * state.isLanguageSelected : will control language input (CreateProgramForm component)
   *
   * state.loadingMessage : will store the loading message, as the loading message
   * will be different when the Org will publish the program, and it is different when
   * the Org will save the program as draft
   *
   * state.mentorApplyDate : will control the input of apply date of mentor
   * (CreateProgramForm component)
   *
   * state.phoneValue : will control the phone input (CreateProgramForm component)
   *
   * state.selectedTSDate : will control the tentative start date input
   * (CreateProgramForm component)
   *
   * state.selectedLanguages : will store all the selected language (CreateProgramForm
   *  component)
   *
   * state.studentApplyDate : will control the input of apply date of student
   * (CreateProgramForm component)
   *
   * state.validated : to control the validation of form (CreateProgramForm component)
   *
   * state.urlInput : to control the URL input (CreateProgramForm component)
   *
   * Only loadingMessage has been used in CreateProgram.tsx (this file), everything else
   * has been used in CreateProgramForm.tsx . Just to reduce the number of lines of code in
   * CreateProgramForm.tsx, we are passing state as a props to CreateProgramForm.tsx (as it
   * already has a large number of lines of code)
   */
  const [state, dispatch] = useReducer(orgCreateProgramReducer, {
    error: "",
    isInvalid: false,
    isLanguageSelected: false,
    loadingMessage: "",
    mentorApplyDate: null,
    phoneValue: "",
    selectedTSDate: null,
    selectedLanguages: [],
    studentApplyDate: null,
    validated: false,
    urlInput: "",
  });

  useEffect(() => {
    /*
     * Whenever page renders, we want that the scroll bar should point to top
     */
    document.documentElement.scrollTop = 0;

    // document title
    document.title = "Create Program Org | CatalysEd";
  }, []);

  return (
    <div className="OrgCreateProgramPage Page">
      {/*
       * If the state.loadingMessage has some value, only then show the
       * LoadingProgress component
       */}
      {Boolean(state.loadingMessage) && (
        <LoadingProgress
          loading={Boolean(state.loadingMessage)}
          emailSent={false}
          loadingMessage={state.loadingMessage}
        />
      )}

      <div className="OrgCreateProgramDetailsHeader">
        <span>Fill Details for Create Program</span>
      </div>

      {/* CreateProgramForm component */}
      <CreateProgramForm state={state} dispatch={dispatch} />
    </div>
  );
};

export default CreateProgram;
