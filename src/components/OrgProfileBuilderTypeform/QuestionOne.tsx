import React from "react";
import { Form } from "react-bootstrap";
import { OrgProfileBuilderData } from "../../types/OrganisationProfileBuilder";
import { motion } from "framer-motion";

type QuestionOneProps = {
  answer: OrgProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<OrgProfileBuilderData>>;
  validated: boolean;
  setValidated: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuestionOne = ({
  answer,
  setAnswer,
  validated,
  setValidated,
}: QuestionOneProps) => {
  const handleQuestionOneChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (validated) setValidated(false);

    setAnswer((prevState) => ({
      ...prevState,
      QuestionOne: event.target.value,
    }));
  };

  return (
    <motion.div
      className="OrgTypeformQuestionOne"
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
    >
      <Form.Group className="QuestionOneFormGroup">
        <Form.Text className="QuestionOneFormText">
          Which area do you work in?
        </Form.Text>
        <Form.Control
          required
          className="QuestionOneFormControl"
          type="text"
          placeholder="Type of Work..."
          value={answer.QuestionOne}
          onChange={handleQuestionOneChange}
        />
        <Form.Control.Feedback type="invalid">
          Please fill this field
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionOne;
