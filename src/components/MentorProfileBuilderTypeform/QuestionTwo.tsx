import React from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";

const QuestionTwo = () => {
  return (
    <motion.div
      className="MentorTypeformQuestion Question"
      initial={{ x: "-100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.2 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          To which school or organisation do you belong?
        </Form.Text>
        <Form.Control
          className="QuestionFormControl"
          type="text"
          placeholder="Type your organisation/school..."
        />
        <Form.Control.Feedback type="invalid">
          Please fill this field
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionTwo;
