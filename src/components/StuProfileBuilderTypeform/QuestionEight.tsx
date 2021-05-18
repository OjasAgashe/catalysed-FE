import React from "react";
import { motion } from "framer-motion";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import {
  StudentProfileBuilderActionType,
  StudentProfileBuilderData,
  StudentProfileBuilderState,
} from "../../types/StudentProfileBuilder";

type QuestionEightProps = {
  answer: StudentProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<StudentProfileBuilderData>>;
  state: StudentProfileBuilderState;
  dispatch: React.Dispatch<StudentProfileBuilderActionType>;
};

const QuestionEight = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionEightProps) => {
  const handleQuestionEightChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.isInvalid) dispatch({ type: "isInvalid", payload: false });

      setAnswer((prevState) => ({
        ...prevState,
        QuestionEight: {
          ...prevState.QuestionEight,
          [event.target.name]: event.target.value,
        },
      }));
    };

  const handlePhoneInputChange = (phone: string) => {
    if (state.validated) dispatch({ type: "validated", payload: false });
    if (state.isInvalid) dispatch({ type: "isInvalid", payload: false });

    setAnswer((prevState) => ({
      ...prevState,
      QuestionEight: {
        ...prevState.QuestionEight,
        phone,
      },
    }));
  };

  return (
    <div>
      <motion.div
        className="StuTypeformQuestion Question"
        initial={{ x: "-100vw" }}
        animate={{ x: "0" }}
        transition={{ delay: 0.8 }}
      >
        <Form.Group className="QuestionFormGroup">
          <Form.Text className="QuestionFormText">
            How someone can contact you?
          </Form.Text>
          <Form.Control
            required
            className="QuestionFormControl"
            type="email"
            name="email"
            placeholder="name@example.com"
            value={answer.QuestionEight.email}
            onChange={handleQuestionEightChange}
            isInvalid={state.isInvalid}
          />

          <Form.Control className="phoneFormControl" />
          <PhoneInput
            country={"in"}
            placeholder=""
            enableSearch={true}
            value={answer.QuestionEight.phone}
            onChange={handlePhoneInputChange}
            inputProps={{
              name: "phone",
              required:true,
              className: "form-control",
            }}
          />
          <Form.Control.Feedback type="invalid">
              Required fields, enter valid Email and Number.
          </Form.Control.Feedback>
        </Form.Group>
      </motion.div>
    </div>
  );
};

export default QuestionEight;
