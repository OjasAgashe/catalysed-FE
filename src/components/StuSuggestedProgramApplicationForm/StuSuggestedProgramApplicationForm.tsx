import React, { useState } from "react";
import "./StuSuggestedProgramApplicationForm.css";
import { GrSend } from "react-icons/gr";
import ApplicationForm from "./ApplicationForm";
import {
  StuSuggestedProgramApplicationActionType,
  StuSuggestedProgramApplicationData,
  StuSuggestedProgramApplicationState,
} from "../../types/StuSuggestedProgramApplication";
import Error from "../Error/Error";
import { STUDENT } from "../../constants/Entities";
import { useStudentAPI } from "../../context/api_context/StudentAPIContext";

type StuSuggestedProgramApplicationFormProps = {
  state: StuSuggestedProgramApplicationState;
  dispatch: React.Dispatch<StuSuggestedProgramApplicationActionType>;
  programId: number;
};

const StuSuggestedProgramApplicationForm = ({
  state,
  dispatch,
  programId,
}: StuSuggestedProgramApplicationFormProps) => {
  const [answer, setAnswer] = useState<string>("");

  const { postCreateApplication } = useStudentAPI();

  const makeAPICall = async (data: StuSuggestedProgramApplicationData) => {
    try {
      document.documentElement.scrollTop = 0;

      dispatch({ type: "loading", payload: true });
      dispatch({ type: "error", payload: "" });

      const response = await postCreateApplication(data, programId);

      dispatch({ type: "loading", payload: false });
      console.log(response);
    } catch (error) {
      document.documentElement.scrollTop =
        document.documentElement.scrollHeight;

      dispatch({ type: "loading", payload: false });
      dispatch({ type: "error", payload: error.response.data.message });
    }
  };

  const handleApplyBtnClick = () => {
    dispatch({ type: "validated", payload: true });

    if (answer !== "" && answer.length >= 10) {
      const data = {
        id: null,
        programId,
        applicantType: STUDENT,
        name: null,
        email: null,
        status: "PENDING",
        reapplied: false,
        appliedOn: null,
        viewedByOrg: false,
        applicationResponses: [
          {
            id: 1,
            question: "Why do you want to be part of the program ?",
            answer,
          },
        ],
      };

      makeAPICall(data);
    }
  };

  return (
    <div className="StuSuggestedProgramApplicationComp">
      <ApplicationForm
        state={state}
        dispatch={dispatch}
        answer={answer}
        setAnswer={setAnswer}
      />
      <div className="ApplyBtnContainer">
        <button className="ApplyBtn" onClick={handleApplyBtnClick}>
          Apply&nbsp;
          <GrSend className="GrIcon" />
        </button>
      </div>
      {state.error && (
        <Error
          message={state.error}
          className="StuSuggestedApplicationErrorMessage"
        />
      )}
    </div>
  );
};

export default StuSuggestedProgramApplicationForm;
