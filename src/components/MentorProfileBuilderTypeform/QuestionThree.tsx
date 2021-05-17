import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { motion } from "framer-motion";

const QuestionThree = () => {
  return (
    <motion.div
      className="MentorTypeformQuestion Question"
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.3 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">Where are you based?</Form.Text>
        <Row>
          <Col>
            <Form.Control
              className="QuestionFormControl"
              type="text"
              placeholder="Country..."
            />
            <Form.Control.Feedback type="invalid">
              Please fill this field
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Control
              className="QuestionFormControl"
              type="text"
              placeholder="City..."
            />
            <Form.Control.Feedback type="invalid">
              Please fill this field
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionThree;
