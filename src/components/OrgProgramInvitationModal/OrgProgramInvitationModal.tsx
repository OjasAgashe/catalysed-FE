import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  OrgProgramInvitationActionType,
  OrgProgramInvitationState,
  OrgInvitationCardData,
} from "../../types/OrgProgramDetails";
import "./OrgProgramInvitationModal.css";
import { MdClose } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import Error from "../Error/Error";

type OrgProgramInvitationModalProps = {
  state: OrgProgramInvitationState;
  dispatch: React.Dispatch<OrgProgramInvitationActionType>;
};

const OrgProgramInvitationModal = ({
  state,
  dispatch,
}: OrgProgramInvitationModalProps) => {
  const [formData, setFormData] = useState<OrgInvitationCardData>({
    type: "Mentor",
    name: "",
    email: "",
    custom_message: "",
  });

  const handleOrgInvitationCardChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.validated) dispatch({ type: "validated", payload: false });

      setFormData((prevState: OrgInvitationCardData) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    };

  const handleInvitationFormBtn: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    dispatch({ type: "validated", payload: true });

    if (event.currentTarget.checkValidity() === true) {
      console.log(formData);
    }
  };

  return (
    <Modal
      show={state.showInvitationModal}
      onHide={() => dispatch({ type: "showInvitationModal", payload: false })}
      centered
      className="OrgProgramInvitationModal"
    >
      <Modal.Header className="ModalHeader">
        <Button
          className="Button"
          onClick={() =>
            dispatch({ type: "showInvitationModal", payload: false })
          }
        >
          <MdClose className="Icon" />
        </Button>
      </Modal.Header>
      <Modal.Body className="ModalBody">
        {state.error && <Error message={state.error} />}
        <Form
          noValidate
          validated={state.validated}
          onSubmit={handleInvitationFormBtn}
        >
          <Form.Group className="ModalFormGroup">
            <Form.Text className="ModalFormText">Participant Type</Form.Text>
            <Form.Check
              inline
              label="mentor"
              type="radio"
              name="type"
              value="Mentor"
              checked={formData.type === "Mentor"}
              onChange={handleOrgInvitationCardChange}
            />
            <Form.Check
              inline
              label="student"
              type="radio"
              name="type"
              value="Student"
              checked={formData.type === "Student"}
              onChange={handleOrgInvitationCardChange}
            />
          </Form.Group>

          <Form.Group className="ModalFormGroup">
            <Form.Text className="ModalFormText">Participant Name</Form.Text>
            <div>
              <Form.Control
                required
                type="text"
                placeholder="Type..."
                name="name"
                value={formData.name}
                onChange={handleOrgInvitationCardChange}
                className="InlineFormControl ModalFormControl"
              />
              <Form.Control.Feedback type="invalid">
                Required Field.
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="ModalFormGroup">
            <Form.Text className="ModalFormText">Participant Email</Form.Text>
            <div>
              <Form.Control
                required
                type="email"
                placeholder="Type..."
                name="email"
                value={formData.email}
                onChange={handleOrgInvitationCardChange}
                className="InlineFormControl ModalFormControl"
              />
              <Form.Control.Feedback type="invalid">
                Required Field.
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Control
              required
              as="textarea"
              rows={4}
              minLength={10}
              placeholder="Custom Message"
              name="custom_message"
              value={formData.custom_message}
              onChange={handleOrgInvitationCardChange}
              className="CustomMessageTextArea ModalFormControl"
            />
            <Form.Control.Feedback type="invalid">
              Required field, minimum 10 Characters.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="ModalFormButtonContainer">
            <Button type="submit" className="ModalFormButton">
              Send <FiSend />
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrgProgramInvitationModal;
