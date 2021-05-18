import React from "react";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import {
  OrgProfileBuilderActionType,
  OrgProfileBuilderData,
  OrgProfileBuilderState,
} from "../../types/OrganisationProfileBuilder";
import { motion } from "framer-motion";

type QuestionTwoProps = {
  answer: OrgProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<OrgProfileBuilderData>>;
  state: OrgProfileBuilderState;
  dispatch: React.Dispatch<OrgProfileBuilderActionType>;
};

const QuestionTwo = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionTwoProps) => {
  const handleQuestionTwoChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (state.validated) dispatch({ type: "validated", payload: false });
    if (state.isInvalid) dispatch({ type: "isInvalid", payload: false });

    setAnswer((prevState) => ({
      ...prevState,
      QuestionTwo: {
        ...prevState.QuestionTwo,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const handlePhoneInputChange = (phone: string) => {
    if (state.validated) dispatch({ type: "validated", payload: false });
    if (state.isInvalid) dispatch({ type: "isInvalid", payload: false });

    setAnswer((prevState) => ({
      ...prevState,
      QuestionTwo: {
        ...prevState.QuestionTwo,
        phone,
      },
    }));
  };

  return (
    <motion.div
      className="OrgTypeformQuestion Question"
      initial={{ x: "-100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.2 }}
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
          value={answer.QuestionTwo.email}
          onChange={handleQuestionTwoChange}
          isInvalid={state.isInvalid}
        />

        <Form.Control className="phoneFormControl" />
        <PhoneInput
          country={"in"}
          placeholder=""
          enableSearch={true}
          value={answer.QuestionTwo.phone}
          onChange={handlePhoneInputChange}
          inputProps={{
            name: "phone",
            required: true,
            className: "form-control",
          }}
        />
        <Form.Control.Feedback type="invalid">
          Required fields, enter valid Email and Number.
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionTwo;
