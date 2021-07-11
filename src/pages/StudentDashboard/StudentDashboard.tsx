import React, { useEffect, useState } from "react";
import { Button, Card, CardColumns, Modal } from "react-bootstrap";
import "./StudentDashboard.css";

type StudentDashboardSessionDetialsFormProps = {
  setCardTextArray: React.Dispatch<React.SetStateAction<string[]>>;
};

const StudentDashboardSessionDetailsForm = ({
  setCardTextArray,
}: StudentDashboardSessionDetialsFormProps) => {
  const [sessionDetails, setSessionDetails] = useState<string>("");

  const handleOnInputEvent: React.FormEventHandler<HTMLDivElement> = (
    event
  ) => {
    setSessionDetails(event.currentTarget.innerHTML ?? "");
  };

  const handleAddButtonClick = () => {
    setCardTextArray((prevState) => [...prevState, sessionDetails]);
  };

  return (
    <div className="StudentDashboardForm">
      <div
        className="TypeSessionNotesText"
        style={
          sessionDetails && sessionDetails !== "<br>" ? { display: "none" } : {}
        }
      >
        Take Session Notes...
      </div>
      <div
        contentEditable="true"
        aria-multiline="true"
        spellCheck="true"
        dir="ltr"
        role="textbox"
        className="StudentDashboardFormControl"
        onInput={handleOnInputEvent}
      ></div>
      <Button
        className="StudentDashboardFormButton"
        onClick={handleAddButtonClick}
      >
        Add
      </Button>
    </div>
  );
};

type StudentDashboardSessionDetailsCardColumnProps = {
  cardTextArray: string[];
  setClickedCardData: React.Dispatch<React.SetStateAction<string>>;
  setShowCardModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCardTextArray: React.Dispatch<React.SetStateAction<string[]>>;
};

const StudentDashboardSessionDetailsCardColumn = ({
  cardTextArray,
  setClickedCardData,
  setShowCardModal,
  setCardTextArray,
}: StudentDashboardSessionDetailsCardColumnProps) => {
  const handleCardClick = (index: number, text: string) => {
    setShowCardModal(true);
    setClickedCardData(text);

    const tempCardTextArray = [...cardTextArray]
      .reverse()
      .filter(
        (dataText, dataIndex) => dataIndex !== index && dataText !== text
      );
    setCardTextArray([...tempCardTextArray].reverse());
  };

  return (
    <div className="CardColumnsContainer">
      <CardColumns className="CardColumns">
        {[...cardTextArray].reverse().map((text, index) => (
          <Card
            className="CardColumnCard"
            key={index}
            onClick={() => handleCardClick(index, text)}
          >
            <Card.Body dangerouslySetInnerHTML={{ __html: text }} />
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

type StudentDashboardCardModalProps = {
  setCardTextArray: React.Dispatch<React.SetStateAction<string[]>>;
  showCardModal: boolean;
  setShowCardModal: React.Dispatch<React.SetStateAction<boolean>>;
  clickedCardData: string;
};

const StudentDashboardCardModal = ({
  setCardTextArray,
  showCardModal,
  setShowCardModal,
  clickedCardData,
}: StudentDashboardCardModalProps) => {
  const [modalSessionDetails, setModalSessionDetails] =
    useState<string>(clickedCardData);

  useEffect(() => {
    setModalSessionDetails(clickedCardData);
  }, [clickedCardData]);

  const handleModalCloseEvent = () => {
    setCardTextArray((prevState) => [...prevState, clickedCardData]);
    setShowCardModal(false);
  };

  const handleModalSaveChangeButtonClick = () => {
    setCardTextArray((prevState) => [...prevState, modalSessionDetails]);
    setShowCardModal(false);
  };

  const handleOnInputEvent: React.FormEventHandler<HTMLDivElement> = (
    event
  ) => {
    setModalSessionDetails(event.currentTarget.innerHTML ?? "");
  };

  return (
    <Modal show={showCardModal} onHide={handleModalCloseEvent} centered>
      <Modal.Body className="StudentDashboardForm ModalBodyForm">
        <div
          className="TypeSessionNotesText"
          style={modalSessionDetails ? { display: "none" } : {}}
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
          onInput={handleOnInputEvent}
          dangerouslySetInnerHTML={{ __html: clickedCardData }}
        ></div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleModalSaveChangeButtonClick}
          style={
            modalSessionDetails !== clickedCardData ? {} : { opacity: "0.5" }
          }
          disabled={modalSessionDetails !== clickedCardData ? false : true}
        >
          Save Changes
        </Button>
        <Button onClick={handleModalCloseEvent}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const StudentDashboard = () => {
  const [cardTextArray, setCardTextArray] = useState<string[]>([]);
  const [showCardModal, setShowCardModal] = useState<boolean>(false);
  const [clickedCardData, setClickedCardData] = useState<string>("");

  return (
    <div className="StudentDashboardPage">
      <StudentDashboardCardModal
        setCardTextArray={setCardTextArray}
        showCardModal={showCardModal}
        setShowCardModal={setShowCardModal}
        clickedCardData={clickedCardData}
      />

      <StudentDashboardSessionDetailsForm setCardTextArray={setCardTextArray} />

      <StudentDashboardSessionDetailsCardColumn
        cardTextArray={cardTextArray}
        setCardTextArray={setCardTextArray}
        setClickedCardData={setClickedCardData}
        setShowCardModal={setShowCardModal}
      />
    </div>
  );
};

export default StudentDashboard;
