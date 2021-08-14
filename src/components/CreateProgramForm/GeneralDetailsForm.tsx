import React, { useEffect } from "react";
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

/*
 * GeneralDetailsForm : component accepts four props,
 * 1. answer : to set value of input fields
 * 2. setAnswer : to set the changed values of input fields
 * 3. state : to check the values of some validating states
 * 4. dispatch: to set the values of some validation states
 */
const GeneralDetailsForm = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: GeneralDetailsFormProps) => {
  useEffect(() => {
    /*
     * set the value of languageRequirements property of answer, as string
     * of names of languages
     */
    setAnswer(
      (prevState): CreateProgramData => ({
        ...prevState,
        languageRequirements: [...state.selectedLanguages].join(),
      })
    );
  }, [setAnswer, state.selectedLanguages]);

  /*
   * function handling onChange event of input fields of GeneralDetailsForm
   */
  const handleGeneralDetailsFormChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      /*
       * If we have shown any kind of error ( either validation or api call )
       * before, then hide it
       */
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.error) dispatch({ type: "error", payload: "" });

      // handles the onChange event of age input field
      if (["from", "to"].includes(event.target.name)) {
        setAnswer(
          (prevState): CreateProgramData => ({
            ...prevState,
            ageLimit: {
              ...prevState.ageLimit,
              [event.target.name]: event.target.value,
            },
          })
        );
      } else if (
        event.target.name === "programLink" &&
        event.target.validity.valid === false
      ) {
        /* Instead of directly setting value for programLink attribute of
         * answer
         *
         * Store the value of programLink input field in urlInput state, till
         * the value of programLink input field is not valid
         *
         * We are doing this so that we can show UI nicely to the Org, and
         * programLink attribute of answer has only valid value
         */
        dispatch({ type: "urlInput", payload: event.target.value });
      } else {
        /*
         * Now, If the programLink input field has valid value then
         * save its value in programLink attribute of answer as well as
         * in urlInput state
         */
        if (event.target.name === "programLink") {
          dispatch({ type: "urlInput", payload: event.target.value });
        }

        setAnswer(
          (prevState): CreateProgramData => ({
            ...prevState,
            [event.target.name]: event.target.value,
          })
        );
      }
    };

  /*
   * function handling onChange event of Date picker, as we are using external package
   * to show nice UI of Date picker, we are using an alone function to handle
   * its change
   */
  const handleDatePickerChange: (
    date: Date | [Date, Date] | null,
    event: React.SyntheticEvent<any, Event> | undefined
  ) => void = (selectedDate) => {
    /*
     * store the value of selected Date in selected temporary start date state
     */
    dispatch({ type: "selectedTSDate", payload: selectedDate as Date | null });

    /*
     * If we have shown some error before, then hide it
     */
    if (state.validated) dispatch({ type: "validated", payload: false });

    /*
     * the format of Date the Date picker package gives, is different from the
     * format we are storing in our backend.
     *
     * So to set correct Date format in backend we are extracting value of
     * Date, Month and Year from the selected date by Org, and storing it in
     * tentativeStartDate property of answer
     */
    const selected_date = selectedDate as Date | null;
    let month = selected_date?.getMonth();

    if (month) {
      setAnswer(
        (prevState): CreateProgramData => ({
          ...prevState,
          tentativeStartDate: `${selected_date?.getDate()}/${
            (month as number) + 1
          }/${selected_date?.getFullYear()}`,
        })
      );
    }
  };

  /*
   * function handling onChange event of language selector, in this function
   * we are storing array of values of selected languages in selectedLanguages
   * state,
   *
   * And when value of selectedLanguages state will change, through function in
   * useEffect we will set value of languageRequirements attribute of answer
   */
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

  /*
   * handle click event of cross button, when the Org wants to remove
   * a language from languageRequirement
   */
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
          value={state.urlInput}
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
