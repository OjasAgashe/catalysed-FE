import React from "react";
import { Form, FormControl } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import {
  CreateProgramActionType,
  CreateProgramState,
} from "../../types/CreateProgram";
import "react-datepicker/dist/react-datepicker.css";
import { Languages } from "../../data/Languages";
import { GiCrossMark } from "react-icons/gi";

type GeneralDetailsFormProps = {
  state: CreateProgramState;
  dispatch: React.Dispatch<CreateProgramActionType>;
};

const GeneralDetailsForm = ({ state, dispatch }: GeneralDetailsFormProps) => {
  const handleDatePickerChange: (
    date: Date | [Date, Date] | null,
    event: React.SyntheticEvent<any, Event> | undefined
  ) => void = (selectedDate) => {
    dispatch({ type: "selectedDate", payload: selectedDate as Date | null });
  };

  const handleLanguageChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
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
      <Form className="GeneralDetailsForm">
        <Form.Text className="FormDetailsText">Program Details</Form.Text>
        <Form.Control
          className="CreateProgramFormControl"
          name="title"
          placeholder="Program Title"
        />

        <Form.Control
          as="textarea"
          rows={4}
          name="description"
          placeholder="Program Description"
          className="ProgramDescriptionTextArea CreateProgramFormControl"
        />

        <Form.Group>
          <Form.Text className="CreateProgramFormText">
            Tentative Start Date:
          </Form.Text>
          <ReactDatePicker
            name="tentativeStartDate"
            selected={state.selectedDate}
            onChange={handleDatePickerChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className="form-control CreateProgramFormControl"
          />
        </Form.Group>

        <Form.Group>
          <Form.Text className="CreateProgramFormText">
            Program Duration:&nbsp;
          </Form.Text>
          <Form.Control
            type="number"
            name="durationInMonths"
            pattern="[0-9]"
            placeholder="0"
            min={0}
            className="CreateProgramFormControl InlineFormControl"
          />
          <Form.Text className="FormTextSmallLabel">months</Form.Text>
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
          />
          <Form.Check
            inline
            label="in person"
            type="radio"
            name="mode"
            value="InPerson"
          />
        </Form.Group>

        <Form.Group>
          <FormControl
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

          <Form.Text className="FormTextSmallLabel">From</Form.Text>
          <Form.Control
            type="number"
            name="from"
            pattern="[0-9]"
            placeholder="0"
            min={0}
            className="CreateProgramFormControl InlineFormControl"
          />

          <Form.Text className="FormTextSmallLabel">To</Form.Text>
          <Form.Control
            type="number"
            name="to"
            pattern="[0-9]"
            placeholder="0"
            min={0}
            className="CreateProgramFormControl InlineFormControl"
          />
        </Form.Group>

        <Form.Control
          type="url"
          name="programLink"
          placeholder="Program Link"
          className="CreateProgramFormControl"
        />
      </Form>
    </div>
  );
};

export default GeneralDetailsForm;
