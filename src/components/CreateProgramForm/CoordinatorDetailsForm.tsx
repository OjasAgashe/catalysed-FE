import React from "react";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import {
  CreateProgramActionType,
  CreateProgramData,
  CreateProgramState,
} from "../../types/CreateProgram";

type CoordinatorDetailsFormProps = {
  answer: CreateProgramData;
  setAnswer: React.Dispatch<React.SetStateAction<CreateProgramData>>;
  state: CreateProgramState;
  dispatch: React.Dispatch<CreateProgramActionType>;
};

type CountryData = {
  name: string;
  countryCode: string;
  dialCode: string;
  format: string;
};

/*
 * CoordiantorDetialsForm : component accepts four props,
 * and has the same reason as the GeneralDetailsForm
 * Component has
 */
const CoordinatorDetailsForm = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: CoordinatorDetailsFormProps) => {
  /*
   * function handling onChange event of input fields of CoordinatorDetailsForm
   */
  const handleCoordinatorDetailsFormChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      /*
       * If we have shown any kind of error before, then hide it
       */
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.isInvalid) dispatch({ type: "isInvalid", payload: false });
      if (state.error) dispatch({ type: "error", payload: "" });

      setAnswer(
        (prevState): CreateProgramData =>
          ({
            ...prevState,
            coordinator: {
              ...prevState.coordinator,
              [event.target.name]: event.target.value,
            },
          } as CreateProgramData)
      );
    };

  /*
   * function handling change event for phone input
   */
  const handlePhoneInputChange = (
    value: string,
    country: {} | CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    /*
     * If we have shown any kind of error before, then hide it
     */
    if (state.validated) dispatch({ type: "validated", payload: false });
    if (state.isInvalid) dispatch({ type: "isInvalid", payload: false });

    /*
     * set the entered value of phone in phoneValue state
     */
    dispatch({ type: "phoneValue", payload: value });

    /*
     * the format the external Phone package sends for the entered Phone value
     * is different from the format we are storing in our backend. So to synchronize
     * with it, we are extracting the part of the entered phone value and converting
     * it in correct format
     */
    const countryInfo = country as CountryData;
    const contact = {
      countryName: countryInfo.name,
      countryCode: "+" + countryInfo.dialCode,
      number: value.replace(`${countryInfo.dialCode}`, ""),
    };

    /*
     * setting the correct format of phone in contact attribute of answer
     */
    setAnswer(
      (prevState): CreateProgramData =>
        ({
          ...prevState,
          coordinator: {
            ...prevState.coordinator,
            contact,
          },
        } as CreateProgramData)
    );
  };

  return (
    <div className="CoordinatorDetailsFormContainer">
      <Form
        noValidate
        validated={state.validated}
        className="CoordinatorDetailsForm"
      >
        <Form.Text className="FormDetailsText">Co-ordinator Details</Form.Text>

        <Form.Control
          required
          className="CreateProgramFormControl"
          name="name"
          placeholder="Name"
          value={answer?.coordinator?.name}
          onChange={handleCoordinatorDetailsFormChange}
          isInvalid={state.isInvalid}
        />

        <Form.Control
          required
          type="email"
          className="CreateProgramFormControl"
          name="email"
          placeholder="Email"
          value={answer?.coordinator?.email}
          onChange={handleCoordinatorDetailsFormChange}
          isInvalid={state.isInvalid}
        />

        {/*
         * this form control we are using to show the validation error message,
         *
         * It does not take user input
         */}
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
            className: "form-control CreateProgramFormControl",
          }}
        />
        <Form.Control.Feedback type="invalid">
          Required fields, enter Valid Details.
        </Form.Control.Feedback>
      </Form>
    </div>
  );
};

export default CoordinatorDetailsForm;
