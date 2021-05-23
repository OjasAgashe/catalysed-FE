import React, { useEffect, useReducer, useRef, useState } from "react";
// @ts-ignore
import TypeForm from "react-typeform";
import QuestionFive from "./QuestionFive";
import QuestionFour from "./QuestionFour";
import QuestionOne from "./QuestionOne";
import QuestionThree from "./QuestionThree";
import QuestionTwo from "./QuestionTwo";
import "./OrgProfileBuilderTypeform.css";
import { OrgProfileBuilderData } from "../../types/OrganisationProfileBuilder";
import { Form } from "react-bootstrap";
import { orgProfileBuilderReducer } from "../../reducers/orgProfileBuilderReducer";
import TypeformProgress from "../TypeformProgress/TypeformProgress";
import { useProfileBuilder } from "../../api_context/ProfileBuilderContext";
import { useHistory } from "react-router-dom";
import { ORGANISATION_HOME } from "../../constants/Routes";

const OrgProfileBuilderTypeform = () => {
  const [state, dispatch] = useReducer(orgProfileBuilderReducer, {
    isInvalid: false,
    validated: false,
    showSubmitReviewText: false,
    now: 0,
    submitClicked: false,
    phoneValue: "",
  });

  const typeformRef = useRef<TypeForm>();
  const { postProfileCall } = useProfileBuilder();
  const history = useHistory();

  const [answer, setAnswer] = useState<OrgProfileBuilderData>({
    workDescription: "",
    contactDetails: {
      email: "",
      phone: { countryName: "", countryCode: "", number: "" },
    },
    yearOfInception: "",
    location: { country: "", region: "" },
    primaryLanguage: "",
  });

  useEffect(() => {
    let count = 0;
    const totalComparisonValue = 7;

    if (answer.workDescription !== "") count++;
    if (answer.contactDetails.email !== "") count++;
    if (answer.contactDetails.phone.number !== "") count++;
    if (answer.yearOfInception !== "") count++;
    if (answer.location.country !== "") count++;
    if (answer.location.region !== "") count++;
    if (answer.primaryLanguage !== "") count++;

    dispatch({ type: "now", payload: (count * 100) / totalComparisonValue });
  }, [
    answer.workDescription,
    answer.contactDetails.email,
    answer.contactDetails.phone.number,
    answer.yearOfInception,
    answer.location.region,
    answer.location.country,
    answer.primaryLanguage,
  ]);

  const sendData = async (data: OrgProfileBuilderData) => {
    try {
      await postProfileCall("organization", data);
      document.cookie = "catalysedCreated=true;secure";
      history.push(ORGANISATION_HOME);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrgProfileTypeformSubmit: React.FormEventHandler<HTMLFormElement> =
    (event) => {
      event.preventDefault();

      dispatch({ type: "validated", payload: true });

      if ([answer.location.country, answer.location.region].includes(""))
        dispatch({ type: "submitClicked", payload: true });

      if (answer.contactDetails.phone.number.length <= 4) {
        dispatch({ type: "isInvalid", payload: true });
        return;
      }

      if (
        answer.workDescription !== "" &&
        answer.contactDetails.email !== "" &&
        answer.contactDetails.phone.number !== "" &&
        answer.yearOfInception !== "" &&
        answer.location.country !== "" &&
        answer.location.region !== "" &&
        answer.primaryLanguage !== ""
      ) {
        sendData(answer);
      }
    };

  const handleNextBtnOnClick = () => {
    if (typeformRef.current.state.current === 4) {
      dispatch({ type: "showSubmitReviewText", payload: true });
    } else {
      if (state.showSubmitReviewText) {
        dispatch({ type: "showSubmitReviewText", payload: false });
      }
    }
  };

  const handleBackBtnOnClick = () => {
    if (state.showSubmitReviewText) {
      dispatch({ type: "showSubmitReviewText", payload: false });
    }
  };

  return (
    <div className="OrgProfileQuestionContainer">
      <Form
        noValidate
        validated={state.validated}
        className="OrgProfileBuilderForm"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        {state.showSubmitReviewText && (
          <div className="SubmitReviewText">
            <h4 className="h4">Summary</h4>
            <h5 className="h5">
              Please review and submit details at bottom of the page
            </h5>
          </div>
        )}

        <TypeForm
          ref={typeformRef}
          nextBtnClass="TypeFormNextBtn"
          backBtnClass={
            state.showSubmitReviewText
              ? "DisplayNoneBackBtn"
              : "TypeFormBackBtn"
          }
          submitBtnClass="TypeFormSubmitBtn"
          submitBtnText="Submit"
          backBtnText="Previous"
          nextBtnOnClick={handleNextBtnOnClick}
          backBtnOnClick={handleBackBtnOnClick}
          onSubmit={handleOrgProfileTypeformSubmit}
        >
          <QuestionOne
            key="QuestionOne"
            answer={answer}
            setAnswer={setAnswer}
            state={state}
            dispatch={dispatch}
          />
          <QuestionTwo
            key="QuestionTwo"
            answer={answer}
            setAnswer={setAnswer}
            state={state}
            dispatch={dispatch}
          />
          <QuestionThree
            key="QuestionThree"
            answer={answer}
            setAnswer={setAnswer}
            state={state}
            dispatch={dispatch}
          />
          <QuestionFour
            key="QusetionFour"
            answer={answer}
            setAnswer={setAnswer}
            state={state}
            dispatch={dispatch}
          />
          <QuestionFive
            key="QuestionFive"
            answer={answer}
            setAnswer={setAnswer}
            state={state}
            dispatch={dispatch}
          />
        </TypeForm>

        <TypeformProgress now={state.now} />
      </Form>
    </div>
  );
};

export default OrgProfileBuilderTypeform;
