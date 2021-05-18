import React from "react";
import { motion } from "framer-motion";
import { Form } from "react-bootstrap";
import {
  StudentProfileBuilderActionType,
  StudentProfileBuilderData,
  StudentProfileBuilderState,
} from "../../types/StudentProfileBuilder";

type QuestionOneProps = {
  answer: StudentProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<StudentProfileBuilderData>>;
  state: StudentProfileBuilderState;
  dispatch: React.Dispatch<StudentProfileBuilderActionType>;
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
    if (state.validated) dispatch({ type: "validated", payload: false });

    if (event.target.value.length > 2) {
      return;
    }

    setAnswer((prevState) => ({
      ...prevState,
      QuestionOne: event.target.value.toString(),
    }));
  };

  return (
    <motion.div
      className="StuTypeformQuestion Question"
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
          value={answer.QuestionOne}
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
