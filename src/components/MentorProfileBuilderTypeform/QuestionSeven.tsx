import React from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  MentorProfileBuilderActionType,
  MentorProfileBuilderData,
  MentorProfileBuilderState,
} from "../../types/MentorProfileBuilder";

type QuestionSevenProps = {
  answer: MentorProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<MentorProfileBuilderData>>;
  state: MentorProfileBuilderState;
  dispatch: React.Dispatch<MentorProfileBuilderActionType>;
};

const QuestionSeven = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionSevenProps) => {
  const handleQuestionSevenChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.submitClicked)
        dispatch({ type: "submitClicked", payload: false });

      const value = event.target.value === "true" ? true : false;

      setAnswer((prevState) => ({
        ...prevState,
        stableConnection: value,
      }));
    };

  return (
    <motion.div
      className="MentorTypeformQuestion Question"
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.7 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          Do you have a stable internet connection?
        </Form.Text>
        <Form.Group className="InternetRadioQuestion">
          <Form.Check type="radio" id="internet-yes">
            <Form.Check.Input
              checked={answer.stableConnection === true}
              onChange={handleQuestionSevenChange}
              type="radio"
              name="internet"
              value="true"
            />
            <Form.Check.Label>yes</Form.Check.Label>
          </Form.Check>
          <Form.Check type="radio" checked id="internet-no">
            <Form.Check.Input
              checked={answer.stableConnection === false}
              onChange={handleQuestionSevenChange}
              type="radio"
              name="internet"
              value="false"
            />
            <Form.Check.Label>no</Form.Check.Label>
          </Form.Check>
        </Form.Group>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionSeven;
