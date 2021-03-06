import React from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  StudentProfileBuilderActionType,
  StudentProfileBuilderData,
  StudentProfileBuilderState,
} from "../../types/StudentProfileBuilder";

type QuestionTwoProps = {
  answer: StudentProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<StudentProfileBuilderData>>;
  state: StudentProfileBuilderState;
  dispatch: React.Dispatch<StudentProfileBuilderActionType>;
};

const QuestionTwo = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionTwoProps) => {
  /*
   * This file has logic much same as QuestionOne of OrgProfileBuilderTypeform
   */

  const handleQuestionTwoChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (state.validated) dispatch({ type: "validated", payload: false });
    if (state.submitClicked)
      dispatch({ type: "submitClicked", payload: false });

    const onlyAlphabets = /^[a-zA-Z][a-zA-z ]*$/;

    if (
      event.target.value !== "" &&
      onlyAlphabets.test(event.target.value) === false
    ) {
      return;
    }

    setAnswer((prevState) => ({
      ...prevState,
      organization: event.target.value,
    }));
  };

  return (
    <motion.div
      className="StuTypeformQuestion Question"
      initial={{ x: "-100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.2 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          To which school or organisation do you belong?
        </Form.Text>
        <Form.Control
          required
          className="QuestionFormControl"
          type="text"
          placeholder="Type your organisation/school..."
          value={answer.organization}
          onChange={handleQuestionTwoChange}
        />
        <Form.Control.Feedback type="invalid">
          Required field, only Alphabets.
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionTwo;
