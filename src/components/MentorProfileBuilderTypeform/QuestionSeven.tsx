import React from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";

const QuestionSeven = () => {
  return (
    <motion.div
      className="MentorTypeformQuestion Question"
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.7 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          Do you have a stable internet connection?
        </Form.Text>
        <Form.Group className="InternetRadioQuestion">
          <Form.Check type="radio" id="internet-yes">
            <Form.Check.Input type="radio" name="internet" value="no" />
            <Form.Check.Label>yes</Form.Check.Label>
          </Form.Check>
          <Form.Check type="radio" id="internet-no">
            <Form.Check.Input type="radio" name="internet" value="no" />
            <Form.Check.Label>no</Form.Check.Label>
            <Form.Control.Feedback type="invalid">
              Choose One!
            </Form.Control.Feedback>
          </Form.Check>
        </Form.Group>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionSeven;
