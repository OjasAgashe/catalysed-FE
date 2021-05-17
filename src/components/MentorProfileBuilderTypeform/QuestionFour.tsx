import React from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";

const QuestionFour = () => {
  return (
    <motion.div
      className="MentorTypeformQuestion Question"
      initial={{ x: "-100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.4 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          Which gender do you belong to?
        </Form.Text>
        <Form.Group className="GenderRadioQuestion">
          <Form.Check type="radio" id="gender-male">
            <Form.Check.Input type="radio" name="gender" value="male" />
            <Form.Check.Label>male</Form.Check.Label>
          </Form.Check>
          <Form.Check type="radio" id="gender-female">
            <Form.Check.Input type="radio" name="gender" value="female" />
            <Form.Check.Label>female</Form.Check.Label>
          </Form.Check>
          <Form.Check type="radio" id="gender-other">
            <Form.Check.Input type="radio" name="gender" value="other" />
            <Form.Check.Label>other</Form.Check.Label>
            <Form.Control.Feedback type="invalid">
              Choose One!
            </Form.Control.Feedback>
          </Form.Check>
        </Form.Group>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionFour;
