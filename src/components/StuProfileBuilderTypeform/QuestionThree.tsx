import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  StudentProfileBuilderActionType,
  StudentProfileBuilderData,
  StudentProfileBuilderState,
} from "../../types/StudentProfileBuilder";

type QuestionThreeProps = {
  answer: StudentProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<StudentProfileBuilderData>>;
  state: StudentProfileBuilderState;
  dispatch: React.Dispatch<StudentProfileBuilderActionType>;
};

const QuestionThree = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionThreeProps) => {
  const handleQuestionThreeChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.validated) dispatch({ type: "validated", payload: false });

      const onlyAlphabets = /^[a-zA-Z]*$/;

      if (onlyAlphabets.test(event.target.value) === false) {
        return;
      }

      setAnswer((prevState) => ({
        ...prevState,
        QuestionThree: {
          ...prevState.QuestionThree,
          [event.target.name]: event.target.value,
        },
      }));
    };

  return (
    <motion.div
      className="StuTypeformQuestion Question"
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.3 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">Where are you based?</Form.Text>
        <Row>
          <Col>
            <Form.Control
              required
              name="country"
              className="QuestionFormControl"
              type="text"
              placeholder="Country..."
              value={answer.QuestionThree.country}
              onChange={handleQuestionThreeChange}
            />
            <Form.Control.Feedback type="invalid">
              Required field, only Alphabets.
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Control
              required
              name="city"
              className="QuestionFormControl"
              type="text"
              placeholder="City..."
              value={answer.QuestionThree.city}
              onChange={handleQuestionThreeChange}
            />
            <Form.Control.Feedback type="invalid">
              Required field, only Alphabets.
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionThree;
