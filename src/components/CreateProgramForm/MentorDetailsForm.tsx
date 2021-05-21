import React from "react";
import { Form } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CreateProgramActionType,
  CreateProgramState,
} from "../../types/CreateProgram";

type GeneralDetailsFormProps = {
  state: CreateProgramState;
  dispatch: React.Dispatch<CreateProgramActionType>;
};

const MentorDetailsForm = ({ state, dispatch }: GeneralDetailsFormProps) => {
  const handleDatePickerChange: (
    date: Date | [Date, Date] | null,
    event: React.SyntheticEvent<any, Event> | undefined
  ) => void = (selectedDate) => {
    dispatch({
      type: "selectedDate",
      payload: selectedDate as Date | null,
    });
  };

  return (
    <div className="CreateProgramMentorDetailsFormContainer">
      <Form className="CreateProgramMentorDetailsForm">
        <Form.Text className="FormDetailsText">Mentor Fields</Form.Text>

        <Form.Control
          className="CreateProgramFormControl"
          name="subjectRequirements"
          placeholder="Subjects Required"
        />

        <Form.Group>
          <Form.Text className="CreateProgramFormText">
            Number of Openings:&nbsp;
          </Form.Text>
          <Form.Control
            type="number"
            name="openings"
            pattern="[0-9]"
            placeholder="0"
            min={0}
            className="CreateProgramFormControl InlineFormControl"
          />
        </Form.Group>

        <Form.Group>
          <Form.Text className="CreateProgramFormText">
            Apply by Date:
          </Form.Text>
          <ReactDatePicker
            name="applyBy"
            selected={state.selectedDate}
            onChange={handleDatePickerChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className="form-control CreateProgramFormControl"
          />
        </Form.Group>

        <Form.Control
          as="textarea"
          rows={4}
          name="generalInstructions"
          placeholder="General Instruction"
          className="GeneralInstructionTextArea CreateProgramFormControl"
        />
      </Form>
    </div>
  );
};

export default MentorDetailsForm;
