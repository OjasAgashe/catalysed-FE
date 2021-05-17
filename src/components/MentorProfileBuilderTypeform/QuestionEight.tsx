import React from "react";
import { motion } from "framer-motion";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const QuestionEight = () => {
  return (
    <div>
      <motion.div
        className="MentorTypeformQuestion Question"
        initial={{ x: "-100vw" }}
        animate={{ x: "0" }}
        transition={{ delay: 0.8 }}
      >
        <Form.Group className="QuestionFormGroup">
          <Form.Text className="QuestionFormText">
            How someone can contact you?
          </Form.Text>
          <Form.Control
            className="QuestionFormControl"
            type="email"
            name="email"
            placeholder="name@example.com"
          />

          <Form.Control className="phoneFormControl" />
          <PhoneInput
            country={"in"}
            placeholder=""
            enableSearch={true}
            inputProps={{
              name: "phone",
              className: "form-control",
            }}
          />
          <Form.Control.Feedback type="invalid">
            Required fields
          </Form.Control.Feedback>
        </Form.Group>
      </motion.div>
    </div>
  );
};

export default QuestionEight;
