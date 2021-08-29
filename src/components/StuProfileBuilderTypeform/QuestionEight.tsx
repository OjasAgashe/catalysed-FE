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
   * This file has logic much same as QuestionTwo of OrgProfileBuilderTypeform
   */

  const handleQuestionEightChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
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
            value={answer.contactDetails.email}
            onChange={handleQuestionEightChange}
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
    </div>
  );
};

export default QuestionEight;
