import React from "react";
import { Form } from "react-bootstrap";
import {
  OrgProfileBuilderActionType,
  OrgProfileBuilderData,
  OrgProfileBuilderState,
} from "../../types/OrganisationProfileBuilder";
import { motion } from "framer-motion";

type QuestionOneProps = {
  answer: OrgProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<OrgProfileBuilderData>>;
  state: OrgProfileBuilderState;
  dispatch: React.Dispatch<OrgProfileBuilderActionType>;
};

const QuestionOne = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionOneProps) => {
  const handleQuestionOneChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    /*
     * If previously, we have started validation of form then stop it
     */
    if (state.validated) dispatch({ type: "validated", payload: false });

    // Stop showing any error
    if (state.submitClicked)
      dispatch({ type: "submitClicked", payload: false });

    /*
     * If user is entering anything other than alphabets and space,
     * then does not allow it
     */
    const onlyAlphabets = /^[a-zA-Z][a-zA-z ]*$/;

    if (
      event.target.value !== "" &&
      onlyAlphabets.test(event.target.value) === false
    ) {
      return;
    }

    // If it has entered accepted characters, then store it
    setAnswer((prevState) => ({
      ...prevState,
      workDescription: event.target.value,
    }));
  };

  return (
    <motion.div
      className="OrgTypeformQuestion Question"
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          Which area do you work in?
        </Form.Text>
        <Form.Control
          required
          className="QuestionFormControl"
          type="text"
          placeholder="Type of Work..."
          value={answer.workDescription}
          onChange={handleQuestionOneChange}
        />
        <Form.Control.Feedback type="invalid">
          Required field, only Alphabets.
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionOne;
