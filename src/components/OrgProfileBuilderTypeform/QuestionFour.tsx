import React from "react";
import { Form } from "react-bootstrap";
import { OrgProfileBuilderData } from "../../types/OrganisationProfileBuilder";
import { motion } from "framer-motion";

type QuestionFourProps = {
  answer: OrgProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<OrgProfileBuilderData>>;
  validated: boolean;
  setValidated: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuestionFour = ({
  answer,
  setAnswer,
  validated,
  setValidated,
}: QuestionFourProps) => {
  const handleQuestionFourChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (validated) setValidated(false);
    setAnswer((prevState) => ({
      ...prevState,
      QuestionFour: event.target.value,
    }));
  };

  return (
    <motion.div
      className="OrgTypeformQuestionFour"
      initial={{ x: "-100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.4 }}
    >
      <Form.Group className="QuestionFourFormGroup">
        <Form.Text className="QuestionFourFormText">
          Where are you based?
        </Form.Text>
        <Form.Control
          required
          className="QuestionFourFormControl"
          type="text"
          placeholder="Type..."
          value={answer.QuestionFour}
          onChange={handleQuestionFourChange}
        />
        <Form.Control.Feedback type="invalid">
          Required field
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionFour;
