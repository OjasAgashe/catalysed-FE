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
import { useHistory } from "react-router-dom";
import { STUDENT_UPDATES_DETAILS_APPLICATION } from "../../constants/Routes";

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
  // To store the application answer
  const [answer, setAnswer] = useState<string>("");

  const { postCreateApplication } = useStudentAPI();
  const history = useHistory();

  // Function to make API call
  const makeAPICall = async (data: StuSuggestedProgramApplicationData) => {
    try {
      /*
       * Before calling API, scroll on Top of the page
       */
      document.documentElement.scrollTop = 0;

      //  Show LoadingProgress component
      dispatch({ type: "loading", payload: true });

      // Previously If we have shown any error, then hide it
      dispatch({ type: "error", payload: "" });

      // Call the API to send Application
      const response = await postCreateApplication(data, programId);

      // After successful API call, hide the LoadingProgress component
      dispatch({ type: "loading", payload: false });

      // And then push updates application details page
      history.push(
        `${STUDENT_UPDATES_DETAILS_APPLICATION}/${response.data.id}/details`
      );
    } catch (error) {
      /*
       * If we got any error, while calling API, then scroll to
       * the bottom of the page
       */
      document.documentElement.scrollTop =
        document.documentElement.scrollHeight;

      // Hide the LoadingProgress component
      dispatch({ type: "loading", payload: false });

      // And show the Error
      dispatch({ type: "error", payload: error.response.data.message });
    }
  };

  /*
   * Function to handle click on Apply button
   */
  const handleApplyBtnClick = () => {
    // Set the form to validate
    dispatch({ type: "validated", payload: true });

    /*
     * If we have answer and number of characters in answer
     * is more than or equal to 10
     */
    if (answer !== "" && answer.length >= 10) {
      /*
       * Then format the data in the form accepted by API
       */
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

      // And call the API
      makeAPICall(data);
    }
  };

  return (
    <div className="StuSuggestedProgramApplicationComp">
      {/* Show ApplicationForm component */}
      <ApplicationForm
        state={state}
        dispatch={dispatch}
        answer={answer}
        setAnswer={setAnswer}
      />

      {/* Show Apply button */}
      <div className="ApplyBtnContainer">
        <button className="ApplyBtn" onClick={handleApplyBtnClick}>
          Apply&nbsp;
          <GrSend className="GrIcon" />
        </button>
      </div>

      {/* If we got any error, then show Error component */}
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
