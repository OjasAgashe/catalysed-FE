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
import { useProfileBuilder } from "../../context/api_context/ProfileBuilderContext";
import { useHistory } from "react-router-dom";
import { ORGANISATION_HOME } from "../../constants/Routes";
import { useCookie } from "../../context/cookie_context/CookieContext";

const OrgProfileBuilderTypeform = () => {
  /*
   * state.isInvalid: to show Error for input fields, for which
   * we cannot use feedback provided by Bootstrap
   *
   * state.validated: to validate form
   *
   * state.showSubmitReviewText: to show review text only on last
   * summary page
   *
   * state.now: to store the count of answered questions so far
   *
   * state.submitClicked: to show Error for some input fields, when
   * submit button gets clicked and they have empty value
   *
   * state.phoneValue: to store the entered value of phone, this has
   * been used to make UX nice
   */
  const [state, dispatch] = useReducer(orgProfileBuilderReducer, {
    isInvalid: false,
    validated: false,
    showSubmitReviewText: false,
    now: 0,
    submitClicked: false,
    phoneValue: "",
  });

  // To store the reference of typeform
  const typeformRef = useRef<TypeForm>();

  const { postProfileCall } = useProfileBuilder();
  const history = useHistory();
  const { setCatalysedCreatedCookie } = useCookie();

  // To store the answers of profile questions
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
    /*
     * Each time when user do anything with input fields,
     * We check the number of answers question. So that accordingly
     * we can show a progress of form
     */

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

  /*
   * Function to make API call, to create Profile
   */
  const sendData = async (data: OrgProfileBuilderData) => {
    try {
      // make API call
      await postProfileCall("organization", data);

      /*
       * On successful API call, set cookie of Profile
       * created to true
       */
      setCatalysedCreatedCookie(true);

      // And then push to Home of Organisation
      history.push(ORGANISATION_HOME);
    } catch (error) {
      /*
       * Consoling the error, If we get any while calling API
       *
       * You can show it above the progress bar (below the buttons),
       * If it will need
       */
      console.log(error);
    }
  };

  // Function to handle click on Submit button
  const handleOrgProfileTypeformSubmit: React.FormEventHandler<HTMLFormElement> =
    (event) => {
      event.preventDefault();

      // Set the validation of form to true
      dispatch({ type: "validated", payload: true });

      /*
       * If country or region has empty value then set submitClicked to true.
       * So that we can show error below these fields.
       */
      if ([answer.location.country, answer.location.region].includes(""))
        dispatch({ type: "submitClicked", payload: true });

      /*
       * If phone number has less than 5 characters then show an Error
       */
      if (answer.contactDetails.phone.number.length <= 4) {
        dispatch({ type: "isInvalid", payload: true });
        return;
      }

      // If everyfield has data, then call the API
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

  // Function to handle click on Next button
  const handleNextBtnOnClick = () => {
    /*
     * As the submit review text should be visible only on last summary
     * page, page after last question, so we are checking on which
     * question the user currently is. And if it is on last then
     * we are showing review text
     */

    if (typeformRef.current.state.current === 4) {
      dispatch({ type: "showSubmitReviewText", payload: true });
    } else {
      if (state.showSubmitReviewText) {
        dispatch({ type: "showSubmitReviewText", payload: false });
      }
    }
  };

  // Function to handle click on Previous button
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
