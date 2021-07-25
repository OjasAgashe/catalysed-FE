import React from "react";
import { Form } from "react-bootstrap";
import { StudentSuggestedProgramApplication } from "../../assets/Illustrations/Illustrations";

const ApplicationForm = () => {
  return (
    <div className="StuSuggestedProgramApplicationFormNImg">
      <div className="StuSuggestedProgramApplicationFormContainer">
        <Form noValidate className="StuSuggestedProgramApplicationForm">
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
            />
            <Form.Control.Feedback type="invalid">
              Required field.
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
