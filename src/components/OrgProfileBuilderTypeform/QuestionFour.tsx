import React from "react";
import { Form } from "react-bootstrap";
import {
  OrgProfileBuilderActionType,
  OrgProfileBuilderData,
} from "../../types/OrganisationProfileBuilder";
import { motion } from "framer-motion";

type QuestionFourProps = {
  answer: OrgProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<OrgProfileBuilderData>>;
  validated: boolean;
  dispatch: React.Dispatch<OrgProfileBuilderActionType>;
};

const QuestionFour = ({
  answer,
  setAnswer,
  validated,
  dispatch,
}: QuestionFourProps) => {
  const handleQuestionFourChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (validated) dispatch({ type: "validated", payload: false });

    const onlyAlphabets = /^[a-zA-Z]*$/;

    if (onlyAlphabets.test(event.target.value) === false) {
      return;
    }

    setAnswer((prevState) => ({
      ...prevState,
      QuestionFour: event.target.value,
    }));
  };

  return (
    <motion.div
      className="OrgTypeformQuestion Question"
      initial={{ x: "-100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.4 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">Where are you based?</Form.Text>
        <Form.Control
          required
          className="QuestionFormControl"
          type="text"
          placeholder="Type..."
          value={answer.QuestionFour}
          onChange={handleQuestionFourChange}
        />
        <Form.Control.Feedback type="invalid">
          Required field, only Alphabets.
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionFour;
