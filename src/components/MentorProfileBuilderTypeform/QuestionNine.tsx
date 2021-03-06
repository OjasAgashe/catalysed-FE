import React from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  MentorProfileBuilderActionType,
  MentorProfileBuilderData,
  MentorProfileBuilderState,
} from "../../types/MentorProfileBuilder";

type QuestionNineProps = {
  answer: MentorProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<MentorProfileBuilderData>>;
  state: MentorProfileBuilderState;
  dispatch: React.Dispatch<MentorProfileBuilderActionType>;
};

const QuestionNine = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionNineProps) => {
  /*
   * This file is much same as QuestionTwo of StuProfileBuilderTypeform
   */

  const handleQuestionNineChange: React.ChangeEventHandler<HTMLInputElement> = (
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
      qualification: event.target.value,
    }));
  };

  return (
    <motion.div
      className="MentorTypeformQuestion Question"
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.9 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          What is your last academic qualification?
        </Form.Text>
        <Form.Control
          required
          className="QuestionFormControl"
          type="text"
          placeholder="Type..."
          value={answer.qualification}
          onChange={handleQuestionNineChange}
        />
        <Form.Control.Feedback type="invalid">
          Required field, only Alphabets.
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionNine;
