import React from "react";
import { Col, Form, Row } from "react-bootstrap";
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

const StudentDetailsForm = ({ state, dispatch }: GeneralDetailsFormProps) => {
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
    <div className="CreateProgramStudentDetailsFormContainer">
      <Form className="CreateProgramStudentDetailsForm">
        <Form.Text className="FormDetailsText">Student Fields</Form.Text>

        <Form.Control
          className="CreateProgramFormControl"
          name="subjectRequirements"
          placeholder="Subjects Required"
        />

        <Form.Group>
          <Form.Text className="CreateProgramFormText">Seats:&nbsp;</Form.Text>
          <Form.Control
            type="number"
            name="openings"
            pattern="[0-9]"
            placeholder="0"
            min={0}
            className="CreateProgramFormControl InlineFormControl"
          />
        </Form.Group>

        <Row className="CreateProgramStudentRow">
          <Col className="CreateProgramStudentCol">
            <Form.Check
              inline
              label="is Paid ?"
              type="checkbox"
              name="isPaid"
            />
          </Col>

          <Col className="CreateProgramStudentCol">
            <Form.Text className="CreateProgramFormText">Fees:&nbsp;</Form.Text>
            <Form.Control
              type="number"
              name="programFees"
              pattern="[0-9]"
              placeholder="0"
              min={0}
              className="CreateProgramFormControl InlineFormControl"
            />
          </Col>
        </Row>

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

export default StudentDetailsForm;
