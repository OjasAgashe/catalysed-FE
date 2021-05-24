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
import { useProfileBuilder } from "../../api_context/ProfileBuilderContext";
import { useHistory } from "react-router-dom";
import { MENTOR_HOME } from "../../constants/Routes";

const MentorProfileBuilderTypeform = () => {
  const [state, dispatch] = useReducer(mentorProfileBuilderReducer, {
    isInvalid: false,
    validated: false,
    showSubmitReviewText: false,
    isProfMentorYes: false,
    now: 0,
    radioQuestion: 0,
    submitClicked: false,
    phoneValue: "",
  });

  const typeformRef = useRef<TypeForm>();
  const { postProfileCall } = useProfileBuilder();
    const history = useHistory();

  const [answer, setAnswer] = useState<MentorProfileBuilderData>({
    birthYear: "",
    organization: "",
    location: { country: "", region: "" },
    gender: "OTHER",
    primaryLanguage: "",
    previouslyMentored: { yes_no: false, yoe: 0 },
    stableConnection: false,
    contactDetails: {
      email: "",
      phone: { countryName: "", countryCode: "", number: "" },
    },
    qualification: "",
    profession: "",
  });

  useEffect(() => {
    let count = 0;
    const totalComparisonValue = 12;

    if (answer.birthYear !== "") count++;
    if (answer.organization !== "") count++;
    if (answer.location.country !== "") count++;
    if (answer.location.region !== "") count++;
    if (answer.primaryLanguage !== "") count++;
    if (answer.contactDetails.email !== "") count++;
    if (answer.contactDetails.phone.number !== "") count++;
    if (answer.qualification !== "") count++;
    if (answer.profession !== "") count++;

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
    answer.contactDetails.email,
    answer.contactDetails.phone.number,
    answer.primaryLanguage,
    answer.qualification,
    answer.birthYear,
    answer.profession,
    answer.location.region,
    answer.location.country,
    answer.organization,
    state.radioQuestion,
  ]);

  const sendData = async (data: any) => {
    try {
      await postProfileCall("mentor", data);
      document.cookie = "catalysedCreated=true;secure";
      history.push(MENTOR_HOME);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMentorProfileTypeformSubmit: React.FormEventHandler<HTMLFormElement> =
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
        answer.contactDetails.phone.number !== "" &&
        answer.qualification !== "" &&
        answer.profession !== ""
      ) {
        // let canProceed = false;
        // if (state.isProfMentorYes && answer.previouslyMentored.yoe !== "")
        //   canProceed = true;

        // if (state.isProfMentorYes === false) canProceed = true;

        // if (canProceed)
        // console.log({
        //   ...answer,
        //   previouslyMentored: answer.previouslyMentored.yes_no,
        //   experience: answer.previouslyMentored.yoe,
        // });

        const object = {
          ...answer,
          previouslyMentored: answer.previouslyMentored.yes_no,
          experience: answer.previouslyMentored.yoe,
        };
        sendData(object);
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
