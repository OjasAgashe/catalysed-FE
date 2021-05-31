import React, { useEffect } from "react";
import { Col, Form, FormControl, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Languages } from "../../data/Languages";
import { GiCrossMark } from "react-icons/gi";
import {
  OrgEditProgramDetailsActionType,
  OrgEditProgramDetailsState,
} from "../../types/OrgEditProgramDetails";
import { CreateProgramData } from "../../types/CreateProgram";

type EditGeneralDetailsFormProps = {
  state: OrgEditProgramDetailsState;
  dispatch: React.Dispatch<OrgEditProgramDetailsActionType>;
  editedData: CreateProgramData | null;
  setEditedData: React.Dispatch<React.SetStateAction<CreateProgramData | null>>;
};

const EditGeneralDetailsForm = ({
  state,
  dispatch,
  editedData,
  setEditedData,
}: EditGeneralDetailsFormProps) => {
  useEffect(() => {
    setEditedData(
      (prevState): CreateProgramData =>
        ({
          ...prevState,
          languageRequirements: [...state.selectedLanguages].join(),
        } as CreateProgramData)
    );
  }, [setEditedData, state.selectedLanguages]);

  const handleGeneralDetailsFormChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.error) dispatch({ type: "error", payload: "" });

      if (["from", "to"].includes(event.target.name)) {
        setEditedData(
          (prevState): CreateProgramData =>
            ({
              ...prevState,
              ageLimit: {
                ...prevState?.ageLimit,
                [event.target.name]: event.target.value,
              },
            } as CreateProgramData)
        );
      } else if (
        event.target.name === "programLink" &&
        event.target.validity.valid === false
      ) {
        dispatch({ type: "urlInput", payload: event.target.value });
      } else {
        setEditedData(
          (prevState): CreateProgramData =>
            ({
              ...prevState,
              [event.target.name]: event.target.value,
            } as CreateProgramData)
        );
      }
    };

  const handleDatePickerChange: (
    date: Date | [Date, Date] | null,
    event: React.SyntheticEvent<any, Event> | undefined
  ) => void = (selectedDate) => {
    dispatch({ type: "selectedTSDate", payload: selectedDate as Date | null });
    if (state.validated) dispatch({ type: "validated", payload: false });

    const selected_date = selectedDate as Date | null;
    let month = selected_date?.getMonth();

    if (month) {
      setEditedData(
        (prevState): CreateProgramData =>
          ({
            ...prevState,
            tentativeStartDate: `${selected_date?.getDate()}/${
              (month as number) + 1
            }/${selected_date?.getFullYear()}`,
          } as CreateProgramData)
      );
    }
  };

  const handleLanguageChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (state.validated) dispatch({ type: "validated", payload: false });

    if (state.isLanguageSelected)
      dispatch({ type: "isLanguageSelected", payload: false });

    if (state.selectedLanguages.includes(event.target.value) === false) {
      dispatch({
        type: "selectedLanguages",
        payload: [...state.selectedLanguages, event.target.value],
      });
    }
  };

  const handleLanguageLiCrossClick = (language: string) => {
    dispatch({
      type: "selectedLanguages",
      payload: state.selectedLanguages.filter(
        (presentLanguage) => presentLanguage !== language
      ),
    });
  };

  return (
    <div className="GeneralDetailsFormContainer">
      <Form
        noValidate
        validated={state.validated}
        className="GeneralDetailsForm"
      >
        <Form.Text className="FormDetailsText">Program Details</Form.Text>

        <Form.Group>
          <Form.Control
            required
            disabled={state.originalData?.status === "PUBLISHED" ? true : false}
            className={`CreateProgramFormControl ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
            name="title"
            placeholder="Program Title"
            value={editedData?.title ?? ""}
            onChange={handleGeneralDetailsFormChange}
          />
          <Form.Control.Feedback type="invalid">
            Required field.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Control
            required
            as="textarea"
            rows={4}
            minLength={10}
            name="description"
            placeholder="Program Description"
            className="ProgramDescriptionTextArea CreateProgramFormControl"
            value={editedData?.description ?? ""}
            onChange={handleGeneralDetailsFormChange}
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
            Tentative Start Date:
          </Form.Text>

          <ReactDatePicker
            required
            disabled={state.originalData?.status === "PUBLISHED" ? true : false}
            name="tentativeStartDate"
            selected={state.selectedTSDate}
            onChange={handleDatePickerChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className={`form-control CreateProgramFormControl ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
          />
          {state.validated && editedData?.tentativeStartDate === "" && (
            <FormControl.Feedback type="invalid" style={{ display: "block" }}>
              Required field.
            </FormControl.Feedback>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Text
            className={`CreateProgramFormText ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
          >
            Program Duration:&nbsp;
          </Form.Text>
          <Form.Control
            required
            disabled={state.originalData?.status === "PUBLISHED" ? true : false}
            type="number"
            name="durationInMonths"
            pattern="[0-9]"
            placeholder="0"
            min={0}
            className={`CreateProgramFormControl InlineFormControl ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
            value={editedData?.durationInMonths ?? ""}
            onChange={handleGeneralDetailsFormChange}
          />
          <Form.Text
            className={`FormTextSmallLabel ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
          >
            months
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Required field.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="ModeContainer">
          <Form.Text
            className={`CreateProgramFormText ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
          >
            Mode of the Program:&nbsp;&nbsp;
          </Form.Text>
          <Form.Check
            inline
            disabled={state.originalData?.status === "PUBLISHED" ? true : false}
            label="virtual"
            type="radio"
            name="mode"
            value="Virtual"
            className={`${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
            checked={editedData?.mode === "Virtual"}
            onChange={handleGeneralDetailsFormChange}
          />
          <Form.Check
            inline
            disabled={state.originalData?.status === "PUBLISHED" ? true : false}
            label="in person"
            type="radio"
            name="mode"
            value="InPerson"
            className={`${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
            checked={editedData?.mode === "InPerson"}
            onChange={handleGeneralDetailsFormChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Text
            className={`CreateProgramFormText ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
          >
            Language Requirements:&nbsp;
          </Form.Text>

          <FormControl
            isInvalid={state.isLanguageSelected}
            disabled={state.originalData?.status === "PUBLISHED" ? true : false}
            as="select"
            value=""
            className={`CreateProgramFormControl LanguageSelector ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
            onChange={handleLanguageChange}
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
                <option key={language.code} value={language.value}>
                  {language.value}
                </option>
              );
            })}
          </FormControl>
          <Form.Control.Feedback type="invalid">
            Required field, select atleast One Language.
          </Form.Control.Feedback>
          <ul
            className={`LanguagePreviewer ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
          >
            {state.selectedLanguages.map((language, index) => (
              <li key={index} className="LanguageLi">
                {language}{" "}
                <button
                  className="LanguageLiButton"
                  type="button"
                  onClick={() => handleLanguageLiCrossClick(language)}
                >
                  <GiCrossMark className="LanguageLiCrossIcon" />
                </button>
              </li>
            ))}
          </ul>
        </Form.Group>

        <Form.Group>
          <Form.Text
            className={`CreateProgramFormText ${
              state.originalData?.status === "PUBLISHED" &&
              "EditProgramDetailsDisabledField"
            } `}
          >
            Age Limit:
          </Form.Text>
          <Row>
            <Col>
              <Form.Text
                className={`FormTextSmallLabel ${
                  state.originalData?.status === "PUBLISHED" &&
                  "EditProgramDetailsDisabledField"
                } `}
              >
                From
              </Form.Text>
              <Form.Control
                required
                disabled={
                  state.originalData?.status === "PUBLISHED" ? true : false
                }
                type="number"
                name="from"
                pattern="[0-9]"
                placeholder="0"
                min={0}
                className={`CreateProgramFormControl InlineFormControl ${
                  state.originalData?.status === "PUBLISHED" &&
                  "EditProgramDetailsDisabledField"
                } `}
                value={editedData?.ageLimit?.from ?? ""}
                onChange={handleGeneralDetailsFormChange}
              />
              <Form.Control.Feedback type="invalid">
                Required field.
              </Form.Control.Feedback>
            </Col>

            <Col>
              <Form.Text
                className={`FormTextSmallLabel ${
                  state.originalData?.status === "PUBLISHED" &&
                  "EditProgramDetailsDisabledField"
                } `}
              >
                To
              </Form.Text>
              <Form.Control
                required
                disabled={
                  state.originalData?.status === "PUBLISHED" ? true : false
                }
                type="number"
                name="to"
                pattern="[0-9]"
                placeholder="0"
                min={0}
                className={`CreateProgramFormControl InlineFormControl ${
                  state.originalData?.status === "PUBLISHED" &&
                  "EditProgramDetailsDisabledField"
                } `}
                value={editedData?.ageLimit?.to ?? ""}
                onChange={handleGeneralDetailsFormChange}
              />

              <Form.Control.Feedback type="invalid">
                Required field.
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Control
          required
          type="url"
          name="programLink"
          placeholder="Program Url"
          className="CreateProgramFormControl"
          value={
            editedData?.programLink ? editedData?.programLink : state.urlInput
          }
          onChange={handleGeneralDetailsFormChange}
        />
        <Form.Control.Feedback type="invalid">
          Required field, enter Valid URL.
        </Form.Control.Feedback>
      </Form>
    </div>
  );
};

export default EditGeneralDetailsForm;
