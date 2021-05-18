import React, { useReducer, useRef, useState } from "react";
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

const OrgProfileBuilderTypeform = () => {
  const [state, dispatch] = useReducer(orgProfileBuilderReducer, {
    isInvalid: false,
    validated: false,
    showSubmitReviewText: false,
    now: 0,
  });

  const typeformRef = useRef<TypeForm>();

  const [answer, setAnswer] = useState<OrgProfileBuilderData>({
    QuestionOne: "",
    QuestionTwo: { email: "", phone: "" },
    QuestionThree: "",
    QuestionFour: "",
    QuestionFive: "",
  });

  const handleOrgProfileTypeformSubmit: React.FormEventHandler<HTMLFormElement> =
    (event) => {
      event.preventDefault();

      dispatch({ type: "validated", payload: true });

      if (answer.QuestionTwo.phone.length <= 4) {
        dispatch({ type: "isInvalid", payload: true });
        return;
      }

      if (
        answer.QuestionOne !== "" &&
        answer.QuestionTwo.email !== "" &&
        answer.QuestionTwo.phone !== "" &&
        answer.QuestionThree !== "" &&
        answer.QuestionFour !== "" &&
        answer.QuestionFive !== ""
      )
        console.log(answer);
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
          backBtnClass="TypeFormBackBtn"
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
            validated={state.validated}
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
            validated={state.validated}
            dispatch={dispatch}
          />
          <QuestionFour
            key="QusetionFour"
            answer={answer}
            setAnswer={setAnswer}
            validated={state.validated}
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
