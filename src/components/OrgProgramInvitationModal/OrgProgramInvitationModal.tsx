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
  // to store the form data
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

  /*
   * Function to handle the changes that user will do in input fields
   */
  const handleOrgInvitationCardChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      /*
       * If we have shown any validation error, then hide it
       */
      if (state.validated) dispatch({ type: "validated", payload: false });

      if (event.target.name === "name") {
        const onlyAlphabets = /^[a-zA-Z ]*$/;

        if (onlyAlphabets.test(event.target.value) === false) {
          return;
        }
      }

      setFormData((prevState: OrgInvitationPostData) => ({
        ...prevState,
        [event.target.name]: event.target.value.replace(/^\s+/, ""),
      }));
    };

  // Function to make API call, to send a new Invitation
  const makeAPICall = async () => {
    try {
      /*
       * If we have shown any form error, then hide it
       */
      dispatch({ type: "formError", payload: "" });

      // Hide the Invitation Modal
      dispatch({ type: "showInvitationModal", payload: false });

      /*
       * And show the LoadingProgress component, with message of
       * "Sending Invitation"
       */
      dispatch({
        type: "formLoadingMessage",
        payload: "Sending Invitation...",
      });
      dispatch({ type: "loading", payload: true });

      // Call the API to send a new Invitation with form Data
      await postProgramInvitations(parseInt(programId), formData);

      // Empty the Old form Data, so that we can store new Data
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

      /*
       * Set state.validated to false, so that we can set
       * it to true for next time validation
       */
      dispatch({ type: "validated", payload: false });

      /*
       * Rerender the Invitation Page, to show the latest
       * sended Invitation in Invitations list
       */
      dispatch({ type: "reRenderComponent", payload: true });
    } catch (error) {
      /*
       * If we get any error while making the API, then first
       * reShow the Invitation Modal
       */
      dispatch({ type: "showInvitationModal", payload: true });

      /*
       * And then show the error in Invitation Modal
       */
      dispatch({
        type: "formError",
        payload: "Error: Please retry now or later",
      });
    } finally {
      // Hide the LoadingProgress component
      dispatch({ type: "loading", payload: false });
    }
  };

  /*
   * Function to handle the click of send Invitation button
   */
  const handleInvitationFormBtn: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();

    // Validate the form
    dispatch({ type: "validated", payload: true });

    // If form passed every validation then make the API call
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
          /*
           * If the programStatus is Published, only then show the form
           */
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
                    Required Field, only Alphabets.
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
                    Required Field, enter Valid Email.
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
          /*
           * And if the programStatus is not Published then show an
           * Error
           */
          <ErrorNotPublishedDiv programId={programId} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default OrgProgramInvitationModal;
