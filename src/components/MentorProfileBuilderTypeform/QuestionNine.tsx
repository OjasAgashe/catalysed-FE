import React from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";

const QuestionNine = () => {
  return (
    <motion.div
      className="MentorTypeformQuestion Question"
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.9 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          What is your last academic qualification?
        </Form.Text>
        <Form.Control
          required
          className="QuestionFormControl"
          type="text"
          placeholder="Type..."
        />
        <Form.Control.Feedback type="invalid">
          Please fill this field
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionNine;
