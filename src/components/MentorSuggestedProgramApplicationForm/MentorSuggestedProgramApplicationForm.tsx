import React, { useState } from "react";
import { GrSend } from "react-icons/gr";
import "../StuSuggestedProgramApplicationForm/StuSuggestedProgramApplicationForm.css";
import ApplicationForm from "../StuSuggestedProgramApplicationForm/ApplicationForm";
import Error from "../Error/Error";
import {
  StuSuggestedProgramApplicationActionType,
  StuSuggestedProgramApplicationData,
  StuSuggestedProgramApplicationState,
} from "../../types/StuSuggestedProgramApplication";
import { MENTOR } from "../../constants/Entities";
import { useMentorAPI } from "../../context/api_context/MentorAPIContext";
import { useHistory } from "react-router-dom";
import { MENTOR_UPDATES_DETAILS_APPLICATION } from "../../constants/Routes";

type MentorSuggestedProgramApplicationFormProps = {
  state: StuSuggestedProgramApplicationState;
  dispatch: React.Dispatch<StuSuggestedProgramApplicationActionType>;
  programId: number;
};

const MentorSuggestedProgramApplicationForm = ({
  state,
  dispatch,
  programId,
}: MentorSuggestedProgramApplicationFormProps) => {
  const [answer, setAnswer] = useState<string>("");

  const { postCreateApplication } = useMentorAPI();
  const history = useHistory();

  const makeAPICall = async (data: StuSuggestedProgramApplicationData) => {
    try {
      document.documentElement.scrollTop = 0;

      dispatch({ type: "loading", payload: true });
      dispatch({ type: "error", payload: "" });

      const response = await postCreateApplication(data, programId);

      dispatch({ type: "loading", payload: false });
      history.push(
        `${MENTOR_UPDATES_DETAILS_APPLICATION}/${response.data.id}/details`
      );
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
        applicantType: MENTOR,
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

export default MentorSuggestedProgramApplicationForm;
