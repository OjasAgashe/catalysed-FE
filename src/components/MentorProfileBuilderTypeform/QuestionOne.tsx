import React from "react";
import { motion } from "framer-motion";
import { Form } from "react-bootstrap";
import {
  MentorProfileBuilderActionType,
  MentorProfileBuilderData,
  MentorProfileBuilderState,
} from "../../types/MentorProfileBuilder";

type QuestionOneProps = {
  answer: MentorProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<MentorProfileBuilderData>>;
  state: MentorProfileBuilderState;
  dispatch: React.Dispatch<MentorProfileBuilderActionType>;
};

const QuestionOne = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionOneProps) => {
  /*
   * This file is much same as QuestionOne of StuProfileBuilderTypeform
   */

  const handleQuestionOneChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (state.validated) dispatch({ type: "validated", payload: false });
    if (state.submitClicked)
      dispatch({ type: "submitClicked", payload: false });

    if (event.target.value.length > 2) {
      return;
    }

    setAnswer((prevState) => ({
      ...prevState,
      birthYear: (
        new Date().getFullYear() - parseInt(event.target.value)
      ).toString(),
    }));
  };

  return (
    <motion.div
      className="MentorTypeformQuestion Question"
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">How old are you?</Form.Text>
        <Form.Control
          required
          className="QuestionFormControl"
          type="number"
          pattern="[0-9]{2}"
          min={18}
          placeholder="YY"
          value={new Date().getFullYear() - parseInt(answer.birthYear)}
          onChange={handleQuestionOneChange}
        />
        <Form.Control.Feedback type="invalid">
          Required field, only valid YY (&gt;= 18).
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionOne;
