import React from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";

const QuestionTen = () => {
  return (
    <motion.div
      className="MentorTypeformQuestion Question"
      initial={{ x: "-100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 1.0 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          Tell us about your profession?
        </Form.Text>
        <Form.Control
          className="QuestionFormControl"
          type="text"
          placeholder="Your profession..."
        />
        <Form.Control.Feedback type="invalid">
          Please fill this field
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionTen;
