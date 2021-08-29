import React from "react";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import {
  MentorProfileBuilderActionType,
  MentorProfileBuilderData,
  MentorProfileBuilderState,
} from "../../types/MentorProfileBuilder";
import { motion } from "framer-motion";

type QuestionEightProps = {
  answer: MentorProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<MentorProfileBuilderData>>;
  state: MentorProfileBuilderState;
  dispatch: React.Dispatch<MentorProfileBuilderActionType>;
};

type CountryData = {
  name: string;
  countryCode: string;
  dialCode: string;
  format: string;
};

const QuestionEight = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionEightProps) => {
  /*
   * This file is much same as QuestionEight of StuProfileBuilderTypeform
   */

  const handleQuestionTwoChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (state.validated) dispatch({ type: "validated", payload: false });
    if (state.isInvalid) dispatch({ type: "isInvalid", payload: false });
    if (state.submitClicked)
      dispatch({ type: "submitClicked", payload: false });

    setAnswer((prevState) => ({
      ...prevState,
      contactDetails: {
        ...prevState.contactDetails,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const handlePhoneInputChange = (
    value: string,
    country: {} | CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    if (state.validated) dispatch({ type: "validated", payload: false });
    if (state.isInvalid) dispatch({ type: "isInvalid", payload: false });
    if (state.submitClicked)
      dispatch({ type: "submitClicked", payload: false });

    dispatch({ type: "phoneValue", payload: value });

    const countryInfo = country as CountryData;
    const phone = {
      countryName: countryInfo.name,
      countryCode: countryInfo.dialCode,
      number: formattedValue.replace(`+${countryInfo.dialCode} `, ""),
    };

    setAnswer((prevState) => ({
      ...prevState,
      contactDetails: {
        ...prevState.contactDetails,
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
          value={answer.contactDetails.email}
          onChange={handleQuestionTwoChange}
          isInvalid={state.isInvalid}
        />

        <Form.Control className="phoneFormControl" />
        <PhoneInput
          country={"in"}
          placeholder=""
          value={state.phoneValue}
          onChange={(value, country, event, formattedValue) =>
            handlePhoneInputChange(value, country, event, formattedValue)
          }
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

export default QuestionEight;
