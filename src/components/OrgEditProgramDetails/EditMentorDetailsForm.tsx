import React from "react";
import { Form, FormControl, OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoInfo } from "react-icons/go";
import { CreateProgramData } from "../../types/CreateProgram";
import {
  OrgEditProgramDetailsActionType,
  OrgEditProgramDetailsState,
} from "../../types/OrgEditProgramDetails";

type EditMentorDetailsFormProps = {
  state: OrgEditProgramDetailsState;
  dispatch: React.Dispatch<OrgEditProgramDetailsActionType>;
  editedData: CreateProgramData | null;
  setEditedData: React.Dispatch<React.SetStateAction<CreateProgramData | null>>;
};

const EditMentorDetailsForm = ({
  state,
  dispatch,
  editedData,
  setEditedData,
}: EditMentorDetailsFormProps) => {
  /*
   * Functions in this file is same as in MentorDetailsForm file of
   * CreateProgramForm component
   */

  const handleMentorDetailsFormChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.error) dispatch({ type: "error", payload: "" });

      setEditedData(
        (prevState): CreateProgramData =>
          ({
            ...prevState,
            mentorFields: {
              ...prevState?.mentorFields,
              [event.target.name]: event.target.value,
            },
          } as CreateProgramData)
      );
    };

  const handleDatePickerChange: (
    date: Date | [Date, Date] | null,
    event: React.SyntheticEvent<any, Event> | undefined
  ) => void = (selectedDate) => {
    dispatch({
      type: "mentorApplyDate",
      payload: selectedDate as Date | null,
    });
    console.log(selectedDate);
    dispatch({ type: "validated", payload: false });

    const selected_date = selectedDate as Date | null;
    let month = selected_date?.getMonth();

    if (month) {
      setEditedData(
        (prevState): CreateProgramData =>
          ({
            ...prevState,
            mentorFields: {
              ...prevState?.mentorFields,
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
            disabled={state.originalData?.status === "PUBLISHED" ? true : false}
            className={`CreateProgramFormControl ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
            name="subjectRequirements"
            placeholder="Subjects Required"
            value={editedData?.mentorFields?.subjectRequirements ?? ""}
            onChange={handleMentorDetailsFormChange}
          />
          <Form.Control.Feedback type="invalid">
            Required field.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="NoOfOpeningsFormGroup">
          <Form.Text
            className={`CreateProgramFormText ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
          >
            Number of Openings:&nbsp;
          </Form.Text>
          <Form.Control
            required
            disabled={state.originalData?.status === "PUBLISHED" ? true : false}
            type="number"
            name="openings"
            pattern="[0-9]"
            placeholder="0"
            min={0}
            className={`CreateProgramFormControl InlineFormControl ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
            value={editedData?.mentorFields?.openings ?? ""}
            onChange={handleMentorDetailsFormChange}
          />
          <Form.Control.Feedback type="invalid">
            Required field.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Text
            className={`CreateProgramFormText ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
          >
            Apply by Date:
          </Form.Text>

          <ReactDatePicker
            required
            disabled={state.originalData?.status === "PUBLISHED" ? true : false}
            name="applyBy"
            selected={state.mentorApplyDate}
            onChange={handleDatePickerChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className={`form-control CreateProgramFormControl ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
          />
          {state.validated && editedData?.mentorFields?.applyBy === "" && (
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
            value={editedData?.mentorFields?.generalInstructions ?? ""}
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

export default EditMentorDetailsForm;
