import React, { useEffect, useReducer } from "react";
import CreateProgramForm from "../../components/CreateProgramForm/CreateProgramForm";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import { orgCreateProgramReducer } from "../../reducers/orgCreateProgramReducer";
import "./CreateProgram.css";

const CreateProgram = () => {
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
    document.title = "Create Program Org | CatalysEd";
  }, []);

  return (
    <div className="OrgCreateProgramPage">
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

      <CreateProgramForm state={state} dispatch={dispatch} />
    </div>
  );
};

export default CreateProgram;
