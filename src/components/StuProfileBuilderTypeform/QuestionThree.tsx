import React from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  StudentProfileBuilderActionType,
  StudentProfileBuilderData,
  StudentProfileBuilderState,
} from "../../types/StudentProfileBuilder";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

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
  /*
   * This file has logic much same as QuestionFour of OrgProfileBuilderTypeform
   */

  const handleQuestionThreeCountryChange: React.ChangeEventHandler<HTMLInputElement> =
    (value) => {
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.submitClicked)
        dispatch({ type: "submitClicked", payload: false });

      setAnswer((prevState) => ({
        ...prevState,
        location: {
          ...prevState.location,
          country: value as unknown as string,
        },
      }));
    };

  const handleQuestionThreeRegionChange: React.ChangeEventHandler<HTMLInputElement> =
    (value) => {
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.submitClicked)
        dispatch({ type: "submitClicked", payload: false });

      setAnswer((prevState) => ({
        ...prevState,
        location: {
          ...prevState.location,
          region: value as unknown as string,
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
        <Form.Control
          className="QuestionFormControl CountryDropdown"
          as={CountryDropdown}
          value={answer.location.country}
          onChange={handleQuestionThreeCountryChange}
        />
        {state.submitClicked && answer.location.country === "" && (
          <Form.Text className="LocationDropdown">
            Required field, select One Option.
          </Form.Text>
        )}
        {answer.location.country && (
          <Form.Control
            className="QuestionFormControl RegionDropdown"
            country={answer.location.country}
            value={answer.location.region}
            onChange={handleQuestionThreeRegionChange}
            as={RegionDropdown}
          />
        )}
        {answer.location.country &&
          state.submitClicked &&
          answer.location.region === "" && (
            <Form.Text className="LocationDropdown">
              Required field, select One Option.
            </Form.Text>
          )}
      </Form.Group>
    </motion.div>
  );
};

export default QuestionThree;
