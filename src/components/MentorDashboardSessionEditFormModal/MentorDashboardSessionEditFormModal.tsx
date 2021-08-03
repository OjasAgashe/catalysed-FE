import React from "react";
import { Button, Modal } from "react-bootstrap";

const MentorDashboardSessionEditFormModal = () => {
  //   const [modalSessionDetails, setModalSessionDetails] =
  //     useState<string>(clickedCardData);

  //   useEffect(() => {
  //     setModalSessionDetails(clickedCardData);
  //   }, [clickedCardData]);

  //   const handleModalCloseEvent = () => {
  //     setCardTextArray((prevState) => [...prevState, clickedCardData]);
  //     setShowCardModal(false);
  //   };

  //   const handleModalSaveChangeButtonClick = () => {
  //     setCardTextArray((prevState) => [...prevState, modalSessionDetails]);
  //     setShowCardModal(false);
  //   };

  //   const handleOnInputEvent: React.FormEventHandler<HTMLDivElement> = (
  //     event
  //   ) => {
  //     setModalSessionDetails(event.currentTarget.innerHTML ?? "");
  //   };

  return (
    <Modal
      // show={showCardModal} onHide={handleModalCloseEvent}
      centered
    >
      <Modal.Body className="StudentDashboardForm ModalBodyForm">
        <div
          className="TypeSessionNotesText"
          // style={modalSessionDetails ? { display: "none" } : {}}
        >
          Take Session Notes...
        </div>
        <div
          contentEditable="true"
          aria-multiline="true"
          spellCheck="true"
          dir="ltr"
          role="textbox"
          className="StudentDashboardFormControl ModalBodyFormControl"
          // onInput={handleOnInputEvent}
          // dangerouslySetInnerHTML={{ __html: clickedCardData }}
        ></div>
      </Modal.Body>
      <Modal.Footer>
        <Button
        //     onClick={handleModalSaveChangeButtonClick}
        //     style={
        //       modalSessionDetails !== clickedCardData ? {} : { opacity: "0.5" }
        //     }
        //     disabled={modalSessionDetails !== clickedCardData ? false : true}
        >
          Save Changes
        </Button>
        <Button
        // onClick={handleModalCloseEvent}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MentorDashboardSessionEditFormModal;
