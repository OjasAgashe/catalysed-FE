import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Logo } from "../../assets/Illustrations/Illustrations";

import "./LeavePageModal.css";

type LeavePageModalProps = {
  handleLeavePageModalLeaveBtn: any;
  handleLeavePageModalStayBtn: any;
};

/*
 * This modal will be visible on the pages, in which user will try
 * to navigate without saving the changes done
 */

const LeavePageModal = ({
  handleLeavePageModalLeaveBtn,
  handleLeavePageModalStayBtn,
}: LeavePageModalProps) => {
  return (
    <Modal show={true} backdrop={false}>
      <Modal.Body>
        <div className="LeavePageModalBrand">
          <img
            src={Logo}
            className="LeavePageModalBrandLogo"
            alt="brand logo"
          />
          &nbsp;&nbsp;<span className="LeavePageModalBrandText">CatalysEd</span>
        </div>
        <span className="LeavePageModalInfoText">
          You have unsaved changes, Are you sure you want to leave this page?
        </span>
      </Modal.Body>
      <Modal.Footer className="LeavePageModalFooter">
        <Button
          className="BtnLeave Button"
          onClick={handleLeavePageModalLeaveBtn}
        >
          Leave
        </Button>
        <Button
          className="BtnStay Button"
          onClick={handleLeavePageModalStayBtn}
        >
          Stay
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LeavePageModal;
