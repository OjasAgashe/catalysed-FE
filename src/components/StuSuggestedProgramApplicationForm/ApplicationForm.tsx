import React from "react";
import { Form } from "react-bootstrap";
import { StudentSuggestedProgramApplication } from "../../assets/Illustrations/Illustrations";
import {
  StuSuggestedProgramApplicationActionType,
  StuSuggestedProgramApplicationState,
} from "../../types/StuSuggestedProgramApplication";

type ApplicationFormProps = {
  state: StuSuggestedProgramApplicationState;
  dispatch: React.Dispatch<StuSuggestedProgramApplicationActionType>;
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
};

const ApplicationForm = ({
  state,
  dispatch,
  answer,
  setAnswer,
}: ApplicationFormProps) => {
  /*
   * Function to handle input field of application form
   */
  const handleAnswerInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    /*
     * Stop the validation, when user is inputing something
     */
    if (state.validated) dispatch({ type: "validated", payload: false });

    /*
     * If we have shown any error, then hide it
     */
    if (state.error) dispatch({ type: "error", payload: "" });

    // Set the answer
    setAnswer(event.target.value);
  };

  return (
    <div className="StuSuggestedProgramApplicationFormNImg">
      <div className="StuSuggestedProgramApplicationFormContainer">
        <Form
          noValidate
          validated={state.validated}
          className="StuSuggestedProgramApplicationForm"
        >
          <Form.Group>
            <Form.Text className="CreateProgramFormText">
              Why do you want to be part of the program ?
            </Form.Text>
            <Form.Control
              required
              as="textarea"
              rows={6}
              minLength={10}
              name="answer"
              placeholder="Your Answer..."
              className="AnswerTextArea CreateProgramFormControl"
              value={answer}
              onChange={handleAnswerInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Required field, minimum 10 Characters
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </div>
      <div className="ImageContainer">
        <img
          src={StudentSuggestedProgramApplication}
          alt="student suggested program application svg"
        />
      </div>
    </div>
  );
};

export default ApplicationForm;
