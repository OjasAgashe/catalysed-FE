import React from "react";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { OrgProfileBuilderData } from "../../types/OrganisationProfileBuilder";
import { motion } from "framer-motion";

type QuestionTwoProps = {
  answer: OrgProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<OrgProfileBuilderData>>;
  validated: boolean;
  setValidated: React.Dispatch<React.SetStateAction<boolean>>;
  isInvalid: boolean;
  setIsInvalid: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuestionTwo = ({
  answer,
  setAnswer,
  validated,
  setValidated,
  isInvalid,
  setIsInvalid,
}: QuestionTwoProps) => {
  const handleQuestionTwoChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (validated) setValidated(false);

    setAnswer((prevState) => ({
      ...prevState,
      QuestionTwo: {
        ...prevState.QuestionTwo,
        [event.target.name]: event.target.value,
      },
    }));
  };

  return (
    <motion.div
      className="OrgTypeformQuestionTwo"
      initial={{ x: "-100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.2 }}
    >
      <Form.Group className="QuestionTwoFormGroup">
        <Form.Text className="QuestionTwoFormText">
          How someone can contact you?
        </Form.Text>
        <Form.Control
          required
          className="QuestionTwoFormControl"
          type="email"
          name="email"
          placeholder="name@example.com"
          value={answer.QuestionTwo.email}
          onChange={handleQuestionTwoChange}
          isInvalid={isInvalid}
        />

        <Form.Control className="phoneFormControl" />
        <PhoneInput
          country={"in"}
          placeholder=""
          enableSearch={true}
          value={answer.QuestionTwo.phone}
          onChange={(phone) => {
            if (validated) setValidated(false);
            if (isInvalid) setIsInvalid(false);

            setAnswer((prevState) => ({
              ...prevState,
              QuestionTwo: {
                ...prevState.QuestionTwo,
                phone,
              },
            }));
          }}
          inputProps={{
            name: "phone",
            required: true,
            className: "form-control",
          }}
        />
        <Form.Control.Feedback type="invalid">
          Required fields
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionTwo;
