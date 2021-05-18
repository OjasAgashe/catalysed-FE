import React, { useEffect, useReducer, useRef, useState } from "react";
// @ts-ignore
import TypeForm from "react-typeform";
import { Form } from "react-bootstrap";
import QuestionOne from "./QuestionOne";
import QuestionTwo from "./QuestionTwo";
import QuestionThree from "./QuestionThree";
import QuestionFour from "./QuestionFour";
import QuestionFive from "./QuestionFive";
import QuestionSix from "./QuestionSix";
import QuestionSeven from "./QuestionSeven";
import QuestionEight from "./QuestionEight";
import QuestionNine from "./QuestionNine";
import "./StuProfileBuilderTypeform.css";
import { stuProfileBuilderReducer } from "../../reducers/stuProfileBuilderReducer";
import { StudentProfileBuilderData } from "../../types/StudentProfileBuilder";
import TypeformProgress from "../TypeformProgress/TypeformProgress";

const StuProfileBuilderTypeform = () => {
  const [state, dispatch] = useReducer(stuProfileBuilderReducer, {
    isInvalid: false,
    validated: false,
    showSubmitReviewText: false,
    now: 0,
    radioQuestion: 0,
  });

  const typeformRef = useRef<TypeForm>();

  const [answer, setAnswer] = useState<StudentProfileBuilderData>({
    QuestionOne: "",
    QuestionTwo: "",
    QuestionThree: { country: "", city: "" },
    QuestionFour: "other",
    QuestionFive: "",
    QuestionSix: "no",
    QuestionSeven: "no",
    QuestionEight: { email: "", phone: "" },
    QuestionNine: "computer",
  });

  useEffect(() => {
    let count = 0;
    const totalComparisonValue = 11;

    if (answer.QuestionOne !== "") count++;
    if (answer.QuestionTwo !== "") count++;
    if (answer.QuestionThree.country !== "") count++;
    if (answer.QuestionThree.city !== "") count++;
    if (answer.QuestionFive !== "") count++;
    if (answer.QuestionEight.email !== "") count++;
    if (answer.QuestionEight.phone !== "") count++;

    switch (state.radioQuestion) {
      case 7:
        count += 4;
        break;
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
    answer.QuestionOne,
    answer.QuestionThree.city,
    answer.QuestionThree.country,
    answer.QuestionTwo,
    state.radioQuestion,
  ]);

  const handleStuProfileTypeformSubmit: React.FormEventHandler<HTMLFormElement> =
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
        answer.QuestionSix !== "" &&
        answer.QuestionSeven !== "" &&
        answer.QuestionEight.email !== "" &&
        answer.QuestionEight.phone !== "" &&
        answer.QuestionNine !== ""
      )
        console.log(answer);
    };

  const handleNextBtnOnClick = () => {
    let value = typeformRef.current.state.current;
    if ([2, 4, 5, 7].includes(value) && value > state.radioQuestion) {
      dispatch({ type: "radioQuestion", payload: value });
    }

    if (value === 8) {
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
    <div className="StuProfileQuestionContainer">
      <Form
        noValidate
        validated={state.validated}
        className="StuProfileBuilderForm"
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
          onSubmit={handleStuProfileTypeformSubmit}
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
        </TypeForm>

        <TypeformProgress now={state.now} />
      </Form>
    </div>
  );
};

export default StuProfileBuilderTypeform;
