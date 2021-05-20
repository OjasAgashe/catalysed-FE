import React from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  StudentProfileBuilderActionType,
  StudentProfileBuilderData,
  StudentProfileBuilderState,
} from "../../types/StudentProfileBuilder";

type QuestionFourProps = {
  answer: StudentProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<StudentProfileBuilderData>>;
  state: StudentProfileBuilderState;
  dispatch: React.Dispatch<StudentProfileBuilderActionType>;
};

const QuestionFour = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionFourProps) => {
  const handleQuestionFourChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (state.validated) dispatch({ type: "validated", payload: false });
    if (state.submitClicked)
      dispatch({ type: "submitClicked", payload: false });

    setAnswer((prevState) => ({
      ...prevState,
      gender: event.target.value,
    }));
  };

  return (
    <motion.div
      className="StuTypeformQuestion Question"
      initial={{ x: "-100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.4 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          Which gender do you belong to?
        </Form.Text>
        <Form.Group className="GenderRadioQuestion">
          <Form.Check type="radio" id="gender-male">
            <Form.Check.Input
              checked={answer.gender === "MALE"}
              onChange={handleQuestionFourChange}
              type="radio"
              name="gender"
              value="MALE"
            />
            <Form.Check.Label>male</Form.Check.Label>
          </Form.Check>
          <Form.Check type="radio" id="gender-female">
            <Form.Check.Input
              checked={answer.gender === "FEMALE"}
              onChange={handleQuestionFourChange}
              type="radio"
              name="gender"
              value="FEMALE"
            />
            <Form.Check.Label>female</Form.Check.Label>
          </Form.Check>
          <Form.Check type="radio" id="gender-other">
            <Form.Check.Input
              checked={answer.gender === "OTHER"}
              onChange={handleQuestionFourChange}
              type="radio"
              name="gender"
              value="OTHER"
            />
            <Form.Check.Label>other</Form.Check.Label>
          </Form.Check>
        </Form.Group>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionFour;
