import React from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  StudentProfileBuilderActionType,
  StudentProfileBuilderData,
  StudentProfileBuilderState,
} from "../../types/StudentProfileBuilder";

type QuestionSixProps = {
  answer: StudentProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<StudentProfileBuilderData>>;
  state: StudentProfileBuilderState;
  dispatch: React.Dispatch<StudentProfileBuilderActionType>;
};

const QuestionSix = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionSixProps) => {
  const handleQuestionSixChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (state.validated) dispatch({ type: "validated", payload: false });
    const value = event.target.value === "true" ? true : false;

    setAnswer((prevState) => ({
      ...prevState,
      previouslyMentored: value,
    }));
  };

  return (
    <motion.div
      className="StuTypeformQuestion Question"
      initial={{ x: "-100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.6 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          Have you ever been professionally mentored before?
        </Form.Text>
        <Form.Group className="ProfMentorRadioQuestion">
          <Form.Check type="radio" id="prof-mentor-yes">
            <Form.Check.Input
              checked={answer.previouslyMentored === true}
              onChange={handleQuestionSixChange}
              type="radio"
              value="true"
            />
            <Form.Check.Label>yes</Form.Check.Label>
          </Form.Check>
          <Form.Check type="radio" id="prof-mentor-no">
            <Form.Check.Input
              checked={answer.previouslyMentored === false}
              onChange={handleQuestionSixChange}
              type="radio"
              value="false"
            />
            <Form.Check.Label>no</Form.Check.Label>
          </Form.Check>
        </Form.Group>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionSix;
