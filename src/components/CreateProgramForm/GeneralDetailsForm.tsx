import React from "react";
import { Col, Form, FormControl, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import {
  CreateProgramActionType,
  CreateProgramData,
  CreateProgramState,
} from "../../types/CreateProgram";
import "react-datepicker/dist/react-datepicker.css";
import { Languages } from "../../data/Languages";
import { GiCrossMark } from "react-icons/gi";

type GeneralDetailsFormProps = {
  answer: CreateProgramData;
  setAnswer: React.Dispatch<React.SetStateAction<CreateProgramData>>;
  state: CreateProgramState;
  dispatch: React.Dispatch<CreateProgramActionType>;
};

const GeneralDetailsForm = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: GeneralDetailsFormProps) => {
  const handleGeneralDetailsFormChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.error) dispatch({ type: "error", payload: "" });

      if (["from", "to"].includes(event.target.name)) {
        setAnswer((prevState: CreateProgramData) => ({
          ...prevState,
          ageLimit: {
            ...prevState.ageLimit,
            [event.target.name]: event.target.value,
          },
        }));
      } else if (
        event.target.name === "programLink" &&
        event.target.validity.valid === false
      ) {
        dispatch({ type: "urlInput", payload: event.target.value });
      } else {
        setAnswer((prevState: CreateProgramData) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
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
      setAnswer((prevState: CreateProgramData) => ({
        ...prevState,
        tentativeStartDate: `${selected_date?.getDate()}/${
          (month as number) + 1
        }/${selected_date?.getFullYear()}`,
      }));
    }
  };

  const handleLanguageChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (state.validated) dispatch({ type: "validated", payload: false });

    if (state.isLanguageSelected)
      dispatch({ type: "isLanguageSelected", payload: false });

    const value = [...state.selectedLanguages, event.target.value].join();

    if (state.selectedLanguages.includes(event.target.value) === false) {
      dispatch({
        type: "selectedLanguages",
        payload: [...state.selectedLanguages, event.target.value],
      });
    }
    if (state.selectedLanguages.length !== 0) {
      setAnswer((prevState: CreateProgramData) => ({
        ...prevState,
        languageRequirements: value,
      }));
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
            className="CreateProgramFormControl"
            name="title"
            placeholder="Program Title"
            value={answer.title}
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
            value={answer.description}
            onChange={handleGeneralDetailsFormChange}
          />
          <Form.Control.Feedback type="invalid">
            Required field.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Text className="CreateProgramFormText">
            Tentative Start Date:
          </Form.Text>

          <ReactDatePicker
            required
            name="tentativeStartDate"
            selected={state.selectedTSDate}
            onChange={handleDatePickerChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className="form-control CreateProgramFormControl"
          />
          {state.validated && answer.tentativeStartDate === "" && (
            <FormControl.Feedback type="invalid" style={{ display: "block" }}>
              Required field.
            </FormControl.Feedback>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Text className="CreateProgramFormText">
            Program Duration:&nbsp;
          </Form.Text>
          <Form.Control
            required
            type="number"
            name="durationInMonths"
            pattern="[0-9]"
            placeholder="0"
            min={0}
            className="CreateProgramFormControl InlineFormControl"
            value={answer.durationInMonths}
            onChange={handleGeneralDetailsFormChange}
          />
          <Form.Text className="FormTextSmallLabel">months</Form.Text>
          <Form.Control.Feedback type="invalid">
            Required field.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="ModeContainer">
          <Form.Text className="CreateProgramFormText">
            Mode of the Program:&nbsp;&nbsp;
          </Form.Text>
          <Form.Check
            inline
            label="virtual"
            type="radio"
            name="mode"
            value="Virtual"
            checked={answer.mode === "Virtual"}
            onChange={handleGeneralDetailsFormChange}
          />
          <Form.Check
            inline
            label="in person"
            type="radio"
            name="mode"
            value="InPerson"
            checked={answer.mode === "InPerson"}
            onChange={handleGeneralDetailsFormChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Text className="CreateProgramFormText">
            Language Requirements:&nbsp;
          </Form.Text>

          <FormControl
            isInvalid={state.isLanguageSelected}
            as="select"
            value=""
            className="CreateProgramFormControl LanguageSelector"
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
          <ul className="LanguagePreviewer">
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
          <Form.Text className="CreateProgramFormText">Age Limit:</Form.Text>
          <Row>
            <Col>
              <Form.Text className="FormTextSmallLabel">From</Form.Text>
              <Form.Control
                required
                type="number"
                name="from"
                pattern="[0-9]"
                placeholder="0"
                min={0}
                className="CreateProgramFormControl InlineFormControl"
                value={answer.ageLimit.from}
                onChange={handleGeneralDetailsFormChange}
              />
              <Form.Control.Feedback type="invalid">
                Required field.
              </Form.Control.Feedback>
            </Col>

            <Col>
              <Form.Text className="FormTextSmallLabel">To</Form.Text>
              <Form.Control
                required
                type="number"
                name="to"
                pattern="[0-9]"
                placeholder="0"
                min={0}
                className="CreateProgramFormControl InlineFormControl"
                value={answer.ageLimit.to}
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
          value={answer.programLink ? answer.programLink : state.urlInput}
          onChange={handleGeneralDetailsFormChange}
        />
        <Form.Control.Feedback type="invalid">
          Required field, enter Valid URL.
        </Form.Control.Feedback>
      </Form>
    </div>
  );
};

export default GeneralDetailsForm;
