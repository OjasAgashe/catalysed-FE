import React from "react";
import { Form } from "react-bootstrap";
import { OrgProfileBuilderData } from "../../types/OrganisationProfileBuilder";
import { motion } from "framer-motion";

type QuestionFiveProps = {
  answer: OrgProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<OrgProfileBuilderData>>;
  validated: boolean;
  setValidated: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuestionFive = ({
  answer,
  setAnswer,
  validated,
  setValidated,
}: QuestionFiveProps) => {
  const handleQuestionFiveChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (validated) setValidated(false);

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
          Required filed
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionFive;
