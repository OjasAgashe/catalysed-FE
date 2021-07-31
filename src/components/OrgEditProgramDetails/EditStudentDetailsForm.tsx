import React from "react";
import {
  Col,
  Form,
  FormControl,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoInfo } from "react-icons/go";
import {
  OrgEditProgramDetailsActionType,
  OrgEditProgramDetailsState,
} from "../../types/OrgEditProgramDetails";
import { CreateProgramData } from "../../types/CreateProgram";

type EditStudentDetailsFormProps = {
  state: OrgEditProgramDetailsState;
  dispatch: React.Dispatch<OrgEditProgramDetailsActionType>;
  editedData: CreateProgramData | null;
  setEditedData: React.Dispatch<React.SetStateAction<CreateProgramData | null>>;
};

const EditStudentDetailsForm = ({
  state,
  dispatch,
  editedData,
  setEditedData,
}: EditStudentDetailsFormProps) => {
  const handleStudentDetailsFormChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.error) dispatch({ type: "error", payload: "" });

      let value: string | boolean = event.target.value;
      if (event.target.name === "isPaid") {
        value = editedData?.studentFields?.isPaid ? false : true;
      }

      setEditedData(
        (prevState): CreateProgramData =>
          ({
            ...prevState,
            studentFields: {
              ...prevState?.studentFields,
              [event.target.name]: value,
            },
          } as CreateProgramData)
      );
    };

  const handleDatePickerChange: (
    date: Date | [Date, Date] | null,
    event: React.SyntheticEvent<any, Event> | undefined
  ) => void = (selectedDate) => {
    dispatch({
      type: "studentApplyDate",
      payload: selectedDate as Date | null,
    });
    dispatch({ type: "validated", payload: false });

    const selected_date = selectedDate as Date | null;
    let month = selected_date?.getMonth();

    if (month) {
      setEditedData(
        (prevState): CreateProgramData =>
          ({
            ...prevState,
            studentFields: {
              ...prevState?.studentFields,
              applyBy: `${selected_date?.getDate()}/${
                (month as number) + 1
              }/${selected_date?.getFullYear()}`,
            },
          } as CreateProgramData)
      );
    }
  };

  return (
    <div className="CreateProgramStudentDetailsFormContainer">
      <Form
        noValidate
        validated={state.validated}
        className="CreateProgramStudentDetailsForm"
      >
        <Form.Text className="FormDetailsText">
          Student Fields&nbsp;
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="info-tooltip">
                these specific fields will only be visible to student
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
            value={editedData?.studentFields?.subjectRequirements ?? ""}
            onChange={handleStudentDetailsFormChange}
          />
          <Form.Control.Feedback type="invalid">
            Required field.
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="CreateProgramStudentRow">
          <Col className="CreateProgramStudentCol">
            <Form.Text
              className={`CreateProgramFormText ${
                state.originalData?.status === "PUBLISHED" &&
                "EditProgramDetailsDisabledField"
              } `}
            >
              Seats:&nbsp;
            </Form.Text>
            <Form.Control
              required
              disabled={
                state.originalData?.status === "PUBLISHED" ? true : false
              }
              type="number"
              name="openings"
              pattern="[0-9]"
              placeholder="0"
              min={0}
              className={`CreateProgramFormControl InlineFormControl ${
                state.originalData?.status === "PUBLISHED" &&
                "EditProgramDetailsDisabledField"
              } `}
              value={editedData?.studentFields?.openings ?? ""}
              onChange={handleStudentDetailsFormChange}
            />
            <Form.Control.Feedback type="invalid">
              Required field.
            </Form.Control.Feedback>
          </Col>
          <Col className="CreateProgramStudentCol">
            <Form.Check
              id="IsPaidCheckbox"
              inline
              disabled={
                state.originalData?.status === "PUBLISHED" ? true : false
              }
              className={`${
                state.originalData?.status === "PUBLISHED" &&
                "EditProgramDetailsDisabledField"
              } `}
              label="is Paid ?"
              type="checkbox"
              name="isPaid"
              checked={editedData?.studentFields?.isPaid ?? false}
              onChange={handleStudentDetailsFormChange}
            />
          </Col>

          {editedData?.studentFields?.isPaid && (
            <Col className="CreateProgramStudentCol">
              <Form.Text
                className={`CreateProgramFormText ${
                  state.originalData?.status === "PUBLISHED" &&
                  "EditProgramDetailsDisabledField"
                } `}
              >
                Fees:&nbsp;
              </Form.Text>
              <Form.Control
                type="number"
                disabled={
                  state.originalData?.status === "PUBLISHED" ? true : false
                }
                name="programFees"
                pattern="[0-9]"
                placeholder="0"
                min={0}
                className={`CreateProgramFormControl InlineFormControl ${
                  state.originalData?.status === "PUBLISHED" &&
                  "EditProgramDetailsDisabledField"
                } `}
                value={editedData?.studentFields?.programFees ?? ""}
                onChange={handleStudentDetailsFormChange}
              />
            </Col>
          )}
        </Row>

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
            name="applyBy"
            disabled={state.originalData?.status === "PUBLISHED" ? true : false}
            selected={state.studentApplyDate}
            onChange={handleDatePickerChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className={`form-control CreateProgramFormControl ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
          />
          {state.validated && editedData?.studentFields?.applyBy === "" && (
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
            value={editedData?.studentFields?.generalInstructions ?? ""}
            onChange={handleStudentDetailsFormChange}
          />
          <Form.Control.Feedback type="invalid">
            Required field.
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditStudentDetailsForm;
