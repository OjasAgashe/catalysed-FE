import React from "react";
import { Form } from "react-bootstrap";
import {
  OrgProfileBuilderActionType,
  OrgProfileBuilderData,
  OrgProfileBuilderState,
} from "../../types/OrganisationProfileBuilder";
import { motion } from "framer-motion";

type QuestionFiveProps = {
  answer: OrgProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<OrgProfileBuilderData>>;
  state: OrgProfileBuilderState;
  dispatch: React.Dispatch<OrgProfileBuilderActionType>;
};

const QuestionFive = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionFiveProps) => {
  const handleQuestionFiveChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (state.validated) dispatch({ type: "validated", payload: false });

    const onlyAlphabets = /^[a-zA-Z]*$/;

    if (onlyAlphabets.test(event.target.value) === false) {
      return;
    }

    setAnswer((prevState) => ({
      ...prevState,
      QuestionFive: event.target.value,
    }));
  };

  return (
    <motion.div
      className="OrgTypeformQuestion Question"
      initial={{ x: "-100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.5 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          Primary language the org operates in ...
        </Form.Text>
        <Form.Control
          required
          className="QuestionFormControl"
          type="text"
          placeholder="Type..."
          value={answer.QuestionFive}
          onChange={handleQuestionFiveChange}
        />
        <Form.Control.Feedback type="invalid">
          Required field, only Alphabets.
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionFive;
