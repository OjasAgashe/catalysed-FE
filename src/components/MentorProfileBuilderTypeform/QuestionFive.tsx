import React from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";

const QuestionFive = () => {
  return (
    <motion.div
      className="MentorTypeformQuestion Question"
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.5 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          What languages do you speak?
        </Form.Text>
        <Form.Control
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

export default QuestionFive;
