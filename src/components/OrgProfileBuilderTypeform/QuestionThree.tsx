import React from "react";
import { Form } from "react-bootstrap";
import { OrgProfileBuilderData } from "../../types/OrganisationProfileBuilder";
import { motion } from "framer-motion";

type QuestionThreeProps = {
  answer: OrgProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<OrgProfileBuilderData>>;
  validated: boolean;
  setValidated: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuestionThree = ({
  answer,
  setAnswer,
  validated,
  setValidated,
}: QuestionThreeProps) => {
  const handleQuestionThreeChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (validated) setValidated(false);

      if (event.target.value.length > 4) {
        return;
      }

      setAnswer((prevState) => ({
        ...prevState,
        QuestionThree: event.target.value.toString(),
      }));
    };

  return (
    <motion.div
      className="OrgTypeformQuestion Question"
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.3 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          What is your year of inception?
        </Form.Text>
        <Form.Control
          required
          className="QuestionFormControl"
          type="number"
          placeholder="YYYY"
          pattern="[0-9]{4}"
          min={1800}
          value={answer.QuestionThree}
          onChange={handleQuestionThreeChange}
        />
        <Form.Control.Feedback type="invalid">
          Required field, enter valid value
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionThree;
