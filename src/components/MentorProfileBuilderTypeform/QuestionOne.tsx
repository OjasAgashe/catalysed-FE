import React from "react";
import { motion } from "framer-motion";
import { Form } from "react-bootstrap";

const QuestionOne = () => {
  return (
    <motion.div
      className="MentorTypeformQuestion Question"
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">How old are you?</Form.Text>
        <Form.Control
          className="QuestionFormControl"
          type="number"
          pattern="[0-9]"
          placeholder="Type..."
        />
        <Form.Control.Feedback type="invalid">
          Required field, enter valid value
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionOne;
