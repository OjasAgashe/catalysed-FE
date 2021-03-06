import React from "react";
import { Form } from "react-bootstrap";
import {
  OrgProfileBuilderActionType,
  OrgProfileBuilderData,
  OrgProfileBuilderState,
} from "../../types/OrganisationProfileBuilder";
import { motion } from "framer-motion";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

type QuestionFourProps = {
  answer: OrgProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<OrgProfileBuilderData>>;
  state: OrgProfileBuilderState;
  dispatch: React.Dispatch<OrgProfileBuilderActionType>;
};

const QuestionFour = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionFourProps) => {
  const handleQuestionFourCountryChange: React.ChangeEventHandler<HTMLInputElement> =
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

  const handleQuestionFourRegionChange: React.ChangeEventHandler<HTMLInputElement> =
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
      className="OrgTypeformQuestion Question"
      initial={{ x: "-100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.4 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">Where are you based?</Form.Text>
        <Form.Control
          className="QuestionFormControl CountryDropdown"
          as={CountryDropdown}
          value={answer.location.country}
          onChange={handleQuestionFourCountryChange}
        />

        {/*
         * If submit button clicked and country has no value, then
         * show an Error
         */}
        {state.submitClicked && answer.location.country === "" && (
          <Form.Text className="LocationDropdown">
            Required field, select One Option.
          </Form.Text>
        )}

        {/* If country has any value, only then give option for region */}
        {answer.location.country && (
          <Form.Control
            className="QuestionFormControl RegionDropdown"
            country={answer.location.country}
            value={answer.location.region}
            onChange={handleQuestionFourRegionChange}
            as={RegionDropdown}
          />
        )}

        {/*
         * If country has any value, and submit button clicked, and region
         * has no value, then show an Error
         */}
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

export default QuestionFour;
