import React from "react";
import { Form, FormControl } from "react-bootstrap";
import {
  OrgProfileBuilderActionType,
  OrgProfileBuilderData,
  OrgProfileBuilderState,
} from "../../types/OrganisationProfileBuilder";
import { motion } from "framer-motion";
import { Languages } from "../../data/Languages";

type QuestionFiveProps = {
  answer: OrgProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<OrgProfileBuilderData>>;
  state: OrgProfileBuilderState;
  dispatch: React.Dispatch<OrgProfileBuilderActionType>;
};

const QuestionFive = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionFiveProps) => {
  const handleQuestionFiveChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (state.validated) dispatch({ type: "validated", payload: false });
    if (state.submitClicked)
      dispatch({ type: "submitClicked", payload: false });

    setAnswer((prevState) => ({
      ...prevState,
      primaryLanguage: event.target.value,
    }));
  };

  return (
    <motion.div
      className="OrgTypeformQuestion Question"
      initial={{ x: "-100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.5 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          Primary language the org operates in ...
        </Form.Text>
        <FormControl
          required
          className="QuestionFormControl LanguageSelector"
          as="select"
          value={answer.primaryLanguage}
          onChange={handleQuestionFiveChange}
        >
          {Languages.map((language: { value: string; code: string }) => {
            if (language.code === "") {
              return (
                <option
                  key={language.value}
                  value={language.code}
                  disabled
                  selected
                >
                  {language.value}
                </option>
              );
            }
            return (
              <option key={language.code} value={language.code}>
                {language.value}
              </option>
            );
          })}
        </FormControl>
        <Form.Control.Feedback type="invalid">
          Required field, select One Value.
        </Form.Control.Feedback>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionFive;
