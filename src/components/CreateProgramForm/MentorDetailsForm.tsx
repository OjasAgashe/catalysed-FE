import React from "react";
import { Form, FormControl, OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CreateProgramActionType,
  CreateProgramData,
  CreateProgramState,
} from "../../types/CreateProgram";
import { GoInfo } from "react-icons/go";

type MentorDetailsFormProps = {
  answer: CreateProgramData;
  setAnswer: React.Dispatch<React.SetStateAction<CreateProgramData>>;
  state: CreateProgramState;
  dispatch: React.Dispatch<CreateProgramActionType>;
};

const MentorDetailsForm = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: MentorDetailsFormProps) => {
  const handleMentorDetailsFormChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.error) dispatch({ type: "error", payload: "" });

      setAnswer(
        (prevState): CreateProgramData =>
          ({
            ...prevState,
            mentorFields: {
              ...prevState.mentorFields,
              [event.target.name]: event.target.value,
            },
          } as CreateProgramData)
      );
    };

  const handleDatePickerChange: (
    date: Date | [Date, Date] | null,
    event: React.SyntheticEvent<any, Event> | undefined
  ) => void = (selectedDate) => {
    dispatch({ type: "mentorApplyDate", payload: selectedDate as Date | null });
    dispatch({ type: "validated", payload: false });

    const selected_date = selectedDate as Date | null;
    let month = selected_date?.getMonth();

    if (month) {
      setAnswer(
        (prevState): CreateProgramData =>
          ({
            ...prevState,
            mentorFields: {
              ...prevState.mentorFields,
              applyBy: `${selected_date?.getDate()}/${
                (month as number) + 1
              }/${selected_date?.getFullYear()}`,
            },
          } as CreateProgramData)
      );
    }
  };

  return (
    <div className="CreateProgramMentorDetailsFormContainer">
      <Form
        noValidate
        validated={state.validated}
        className="CreateProgramMentorDetailsForm"
      >
        <Form.Text className="FormDetailsText">
          Mentor Fields&nbsp;
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="info-tooltip">
                these specific fields will only be visible to mentor
              </Tooltip>
            }
          >
            <GoInfo className="InfoIcon" />
          </OverlayTrigger>
        </Form.Text>

        <Form.Group>
          <Form.Control
            required
            className="CreateProgramFormControl"
            name="subjectRequirements"
            placeholder="Subjects Required"
            value={answer?.mentorFields?.subjectRequirements}
            onChange={handleMentorDetailsFormChange}
          />
          <Form.Control.Feedback type="invalid">
            Required field.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="NoOfOpeningsFormGroup">
          <Form.Text className="CreateProgramFormText">
            Number of Openings:&nbsp;
          </Form.Text>
          <Form.Control
            required
            type="number"
            name="openings"
            pattern="[0-9]"
            placeholder="0"
            min={0}
            className="CreateProgramFormControl InlineFormControl"
            value={answer?.mentorFields?.openings}
            onChange={handleMentorDetailsFormChange}
          />
          <Form.Control.Feedback type="invalid">
            Required field.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Text className="CreateProgramFormText">
            Apply by Date:
          </Form.Text>

          <ReactDatePicker
            required
            name="applyBy"
            selected={state.mentorApplyDate}
            onChange={handleDatePickerChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className="form-control CreateProgramFormControl"
          />
          {state.validated && answer?.mentorFields?.applyBy === "" && (
            <FormControl.Feedback type="invalid" style={{ display: "block" }}>
              Required field.
            </FormControl.Feedback>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Control
            required
            as="textarea"
            rows={4}
            minLength={10}
            name="generalInstructions"
            placeholder="General Instruction"
            className="GeneralInstructionTextArea CreateProgramFormControl"
            value={answer?.mentorFields?.generalInstructions}
            onChange={handleMentorDetailsFormChange}
          />
          <Form.Control.Feedback type="invalid">
            Required field.
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MentorDetailsForm;
