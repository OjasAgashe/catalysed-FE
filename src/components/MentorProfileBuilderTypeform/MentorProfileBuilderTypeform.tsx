import React, { useEffect, useReducer, useRef, useState } from "react";
// @ts-ignore
import TypeForm from "react-typeform";
import QuestionOne from "./QuestionOne";
import { Form } from "react-bootstrap";
import QuestionTwo from "./QuestionTwo";
import QuestionThree from "./QuestionThree";
import QuestionFour from "./QuestionFour";
import QuestionFive from "./QuestionFive";
import QuestionSix from "./QuestionSix";
import QuestionSeven from "./QuestionSeven";
import QuestionEight from "./QuestionEight";
import QuestionNine from "./QuestionNine";
import QuestionTen from "./QuestionTen";
import "./MentorProfileBuilderTypeform.css";
import { mentorProfileBuilderReducer } from "../../reducers/mentorProfileBuilderReducer";
import { MentorProfileBuilderData } from "../../types/MentorProfileBuilder";
import TypeformProgress from "../TypeformProgress/TypeformProgress";

const MentorProfileBuilderTypeform = () => {
  const [state, dispatch] = useReducer(mentorProfileBuilderReducer, {
    isInvalid: false,
    validated: false,
    showSubmitReviewText: false,
    isProfMentorYes: false,
    now: 0,
    radioQuestion: 0,
  });

  const typeformRef = useRef<TypeForm>();

  const [answer, setAnswer] = useState<MentorProfileBuilderData>({
    QuestionOne: "",
    QuestionTwo: "",
    QuestionThree: { country: "", city: "" },
    QuestionFour: "other",
    QuestionFive: "",
    QuestionSix: { yes_no: "no", yoe: "" },
    QuestionSeven: "no",
    QuestionEight: { email: "", phone: "" },
    QuestionNine: "",
    QuestionTen: "",
  });

  useEffect(() => {
    let count = 0;
    const totalComparisonValue = 12;

    if (answer.QuestionOne !== "") count++;
    if (answer.QuestionTwo !== "") count++;
    if (answer.QuestionThree.country !== "") count++;
    if (answer.QuestionThree.city !== "") count++;
    if (answer.QuestionFive !== "") count++;
    if (answer.QuestionEight.email !== "") count++;
    if (answer.QuestionEight.phone !== "") count++;
    if (answer.QuestionNine !== "") count++;
    if (answer.QuestionTen !== "") count++;

    switch (state.radioQuestion) {
      case 5:
        count += 3;
        break;
      case 4:
        count += 2;
        break;
      case 2:
        count += 1;
        break;
    }

    dispatch({ type: "now", payload: (count * 100) / totalComparisonValue });
  }, [
    answer.QuestionEight.email,
    answer.QuestionEight.phone,
    answer.QuestionFive,
    answer.QuestionNine,
    answer.QuestionOne,
    answer.QuestionTen,
    answer.QuestionThree.city,
    answer.QuestionThree.country,
    answer.QuestionTwo,
    state.radioQuestion,
  ]);

  const handleMentorProfileTypeformSubmit: React.FormEventHandler<HTMLFormElement> =
    (event) => {
      event.preventDefault();

      dispatch({ type: "validated", payload: true });

      if (answer.QuestionEight.phone.length <= 4) {
        dispatch({ type: "isInvalid", payload: true });
        return;
      }

      if (
        answer.QuestionOne !== "" &&
        answer.QuestionTwo !== "" &&
        answer.QuestionThree.country !== "" &&
        answer.QuestionThree.city !== "" &&
        answer.QuestionFour !== "" &&
        answer.QuestionFive !== "" &&
        answer.QuestionSeven !== "" &&
        answer.QuestionEight.email !== "" &&
        answer.QuestionEight.phone !== "" &&
        answer.QuestionNine !== "" &&
        answer.QuestionTen !== ""
      ) {
        let canProceed = false;
        if (state.isProfMentorYes && answer.QuestionSix.yoe !== "")
          canProceed = true;

        if (state.isProfMentorYes === false) canProceed = true;

        if (canProceed) console.log(answer);
      }
    };

  const handleNextBtnOnClick = () => {
    let value = typeformRef.current.state.current;
    if ([2, 4, 5].includes(value) && value > state.radioQuestion) {
      dispatch({ type: "radioQuestion", payload: value });
    }

    if (value === 9) {
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
    <div className="MentorProfileQuestionContainer">
      <Form
        noValidate
        validated={state.validated}
        className="MentorProfileBuilderForm"
        onSubmit={(event) => event.preventDefault()}
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
          onSubmit={handleMentorProfileTypeformSubmit}
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
            key="QuestionFour"
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
          <QuestionSix
            key="QuestionSix"
            answer={answer}
            setAnswer={setAnswer}
            state={state}
            dispatch={dispatch}
          />
          <QuestionSeven
            key="QuestionSeven"
            answer={answer}
            setAnswer={setAnswer}
            state={state}
            dispatch={dispatch}
          />
          <QuestionEight
            key="QuestionEight"
            answer={answer}
            setAnswer={setAnswer}
            state={state}
            dispatch={dispatch}
          />
          <QuestionNine
            key="QuestionNine"
            answer={answer}
            setAnswer={setAnswer}
            state={state}
            dispatch={dispatch}
          />
          <QuestionTen
            key="QuestionTen"
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

export default MentorProfileBuilderTypeform;
