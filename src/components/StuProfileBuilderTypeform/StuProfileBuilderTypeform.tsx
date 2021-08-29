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
import { useProfileBuilder } from "../../context/api_context/ProfileBuilderContext";
import { useHistory } from "react-router-dom";
import { STUDENT_HOME } from "../../constants/Routes";
import { useCookie } from "../../context/cookie_context/CookieContext";

const StuProfileBuilderTypeform = () => {
  /*
   * It has state more like of OrgProfileBuilderTypeform,
   *
   * state.radioQuestion: to store the question number of radio
   * type questions, so that we can maintain the correct
   * value of answered question in now.
   *
   * As if we are currently on a radio question, which is 7th
   * question, then two radio questions has already been passed,
   * and now should have minimum value 2.
   */
  const [state, dispatch] = useReducer(stuProfileBuilderReducer, {
    isInvalid: false,
    validated: false,
    showSubmitReviewText: false,
    now: 0,
    radioQuestion: 0,
    submitClicked: false,
    phoneValue: "",
  });

  /*
   * This file is much same as OrgProfileBuilderTypeform file of
   * OrgProfileBuilderTypeform
   */

  const typeformRef = useRef<TypeForm>();
  const { postProfileCall } = useProfileBuilder();
  const history = useHistory();
  const { setCatalysedCreatedCookie } = useCookie();

  const [answer, setAnswer] = useState<StudentProfileBuilderData>({
    birthYear: "",
    organization: "",
    location: { country: "", region: "" },
    gender: "OTHER",
    primaryLanguage: "",
    previouslyMentored: false,
    stableConnection: false,
    contactDetails: {
      email: "",
      phone: { countryName: "", countryCode: "", number: "" },
    },
    primaryDevice: "COMPUTER",
  });

  useEffect(() => {
    let count = 0;
    const totalComparisonValue = 11;

    if (answer.birthYear !== "") count++;
    if (answer.organization !== "") count++;
    if (answer.location.country !== "") count++;
    if (answer.location.region !== "") count++;
    if (answer.primaryLanguage !== "") count++;
    if (answer.contactDetails.email !== "") count++;
    if (answer.contactDetails.phone.number !== "") count++;

    switch (state.radioQuestion) {
      case 7:
        /*
         * If radio question has value 7, it means user has seen
         * 4 radio questions and state.now should have minimum value of 4
         */
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
    answer.contactDetails.email,
    answer.contactDetails.phone.number,
    answer.primaryLanguage,
    answer.birthYear,
    answer.location.region,
    answer.location.country,
    answer.organization,
    state.radioQuestion,
  ]);

  const sendData = async (data: StudentProfileBuilderData) => {
    try {
      await postProfileCall("student", data);
      setCatalysedCreatedCookie(true);
      history.push(STUDENT_HOME);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStuProfileTypeformSubmit: React.FormEventHandler<HTMLFormElement> =
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
        answer.birthYear !== "" &&
        answer.organization !== "" &&
        answer.location.country !== "" &&
        answer.location.region !== "" &&
        answer.primaryLanguage !== "" &&
        answer.contactDetails.email !== "" &&
        answer.contactDetails.phone.number !== ""
      ) {
        sendData(answer);
      }
    };

  const handleNextBtnOnClick = () => {
    let value = typeformRef.current.state.current;

    /*
     * On click of next button, we are checking if this is a
     * radio question or not
     */
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
