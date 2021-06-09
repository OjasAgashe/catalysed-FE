import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  OrgProgramInvitationActionType,
  OrgProgramInvitationState,
  OrgInvitationPostData,
} from "../../types/OrgProgramDetails";
import "./OrgProgramInvitationModal.css";
import { MdClose } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import Error from "../Error/Error";
import ErrorNotPublishedDiv from "./ErrorNotPublishedDiv";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";

type OrgProgramInvitationModalProps = {
  programId: string;
  state: OrgProgramInvitationState;
  dispatch: React.Dispatch<OrgProgramInvitationActionType>;
};

const OrgProgramInvitationModal = ({
  programId,
  state,
  dispatch,
}: OrgProgramInvitationModalProps) => {
  const [formData, setFormData] = useState<OrgInvitationPostData>({
    id: "",
    programId,
    userId: "",
    emailId: "",
    name: "",
    userType: "MENTOR",
    responseStatus: null,
    subject: "",
    message: "",
  });

  const { postProgramInvitations } = useOrgAPI();

  const handleOrgInvitationCardChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.validated) dispatch({ type: "validated", payload: false });

      setFormData((prevState: OrgInvitationPostData) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    };

  const makeAPICall = async () => {
    try {
      dispatch({ type: "formError", payload: "" });
      dispatch({ type: "showInvitationModal", payload: false });
      dispatch({
        type: "formLoadingMessage",
        payload: "Sending Invitation...",
      });
      dispatch({ type: "loading", payload: true });

      await postProgramInvitations(parseInt(programId), formData);

      setFormData({
        id: "",
        programId,
        userId: "",
        emailId: "",
        name: "",
        userType: "MENTOR",
        responseStatus: null,
        subject: "",
        message: "",
      });
      dispatch({ type: "validated", payload: false });
      dispatch({ type: "reRenderComponent", payload: true });
    } catch (error) {
      dispatch({ type: "showInvitationModal", payload: true });

      dispatch({
        type: "formError",
        payload: "Error: Please retry now or later",
      });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  const handleInvitationFormBtn: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    dispatch({ type: "validated", payload: true });

    if (event.currentTarget.checkValidity() === true) {
      makeAPICall();
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
        {state.programStatus === "PUBLISHED" ? (
          <>
            {state.formError && <Error message={state.formError} />}
            <Form
              noValidate
              validated={state.validated}
              onSubmit={handleInvitationFormBtn}
            >
              <Form.Group className="ModalFormGroup">
                <Form.Text className="ModalFormText">
                  Participant Type
                </Form.Text>
                <Form.Check
                  inline
                  label="mentor"
                  type="radio"
                  name="userType"
                  value="MENTOR"
                  checked={formData.userType === "MENTOR"}
                  onChange={handleOrgInvitationCardChange}
                />
                <Form.Check
                  inline
                  label="student"
                  type="radio"
                  name="userType"
                  value="STUDENT"
                  checked={formData.userType === "STUDENT"}
                  onChange={handleOrgInvitationCardChange}
                />
              </Form.Group>

              <Form.Group className="ModalFormGroup">
                <Form.Text className="ModalFormText">
                  Participant Name
                </Form.Text>
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
                <Form.Text className="ModalFormText">
                  Participant Email
                </Form.Text>
                <div>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Type..."
                    name="emailId"
                    value={formData.emailId}
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
                  name="message"
                  value={formData.message}
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
          </>
        ) : (
          <ErrorNotPublishedDiv programId={programId} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default OrgProgramInvitationModal;
