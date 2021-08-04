import React, { useCallback, useEffect, useReducer } from "react";
import { Button, Modal } from "react-bootstrap";

import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import { MdColorLens } from "react-icons/md";

import "../MentorDashboardSessionDetailsForm/MentorDashboardSessionDetailsForm.css";
import "./MentorDashboardSessionEditFormModal.css";
import {
  MentorDashboardSessionDetailsCardData,
  MentorUpdatesProgramDashboardActionType,
  MentorUpdatesProgramDashboardState,
} from "../../types/MentorDashboardSessionDetails";
import { mentorDashboardSessionEditFormModalReducer } from "../../reducers/mentorDashboardSessionEditFormModalReducer";

type MentorDashboardSessionEditFormModalProps = {
  dbState: MentorUpdatesProgramDashboardState;
  dbDispatch: React.Dispatch<MentorUpdatesProgramDashboardActionType>;
};

const MentorDashboardSessionEditFormModal = ({
  dbState,
  dbDispatch,
}: MentorDashboardSessionEditFormModalProps) => {
  const [state, dispatch] = useReducer(
    mentorDashboardSessionEditFormModalReducer,
    {
      modalFormData: dbState.selectedNoteCardData,
      showColorPicker: false,
      dataHasChanged: false,
    }
  );

  const hasDataChanged = useCallback(() => {
    const modalFormData =
      state.modalFormData as MentorDashboardSessionDetailsCardData;
    const selectedNoteCardData =
      dbState.selectedNoteCardData as MentorDashboardSessionDetailsCardData;

    let key: keyof MentorDashboardSessionDetailsCardData;
    for (key in modalFormData) {
      if (modalFormData[key] !== selectedNoteCardData[key]) return true;
    }
    return false;
  }, [dbState.selectedNoteCardData, state.modalFormData]);

  useEffect(() => {
    if (!hasDataChanged()) {
      dispatch({
        type: "modalFormData",
        payload: dbState.selectedNoteCardData,
      });
    }

    dispatch({ type: "dataHasChanged", payload: hasDataChanged() });
  }, [dbState.selectedNoteCardData, hasDataChanged]);

  const handlePinButtonClick = () => {
    dispatch({
      type: "modalFormData",
      payload: {
        ...state.modalFormData,
        pinned: !state.modalFormData?.pinned,
      } as MentorDashboardSessionDetailsCardData,
    });
  };

  const handleNoteTitleOnInputEvent: React.FormEventHandler<HTMLDivElement> = (
    event
  ) => {
    const currentInnerHtml = event.currentTarget.innerHTML;
    dispatch({
      type: "modalFormData",
      payload: {
        ...state.modalFormData,
        sessionNoteTitle: currentInnerHtml,
      } as MentorDashboardSessionDetailsCardData,
    });
  };

  const handleNoteDescriptionOnInputEvent: React.FormEventHandler<HTMLDivElement> =
    (event) => {
      const currentInnerHtml = event.currentTarget.innerHTML;
      dispatch({
        type: "modalFormData",
        payload: {
          ...state.modalFormData,
          sessionNoteDescription: currentInnerHtml,
        } as MentorDashboardSessionDetailsCardData,
      });
    };

  const handleColorPicker = (colorString: string) => {
    dispatch({
      type: "modalFormData",
      payload: {
        ...state.modalFormData,
        color: colorString,
      } as MentorDashboardSessionDetailsCardData,
    });

    dispatch({
      type: "showColorPicker",
      payload: !state.showColorPicker,
    });
  };

  const handleModalCloseEvent = () => {
    const noteCardArray =
      dbState.noteCardArray as MentorDashboardSessionDetailsCardData[];
    const selectedNoteCardData =
      dbState.selectedNoteCardData as MentorDashboardSessionDetailsCardData;

    dbDispatch({
      type: "noteCardArray",
      payload: [...noteCardArray, selectedNoteCardData],
    });
    dbDispatch({ type: "showModal", payload: false });
  };

  const handleModalSaveChangedBtnClick = () => {
    const modalFormData =
      state.modalFormData as MentorDashboardSessionDetailsCardData;

    dbDispatch({
      type: "noteCardArray",
      payload: [...dbState.noteCardArray, modalFormData],
    });
    dbDispatch({ type: "showModal", payload: false });
  };

  return (
    <Modal
      show={dbState.showModal}
      onHide={handleModalCloseEvent}
      centered
      className="MentorDashboardSessionEditFormModal"
    >
      <div
        className="modal-content MentorDashboardSessionDetailsForm"
        style={{ backgroundColor: state.modalFormData?.color ?? "#fff" }}
      >
        <Button
          className="PinContainerButton"
          onClick={handlePinButtonClick}
          style={{ backgroundColor: state.modalFormData?.color ?? "#fff" }}
        >
          {state.modalFormData?.pinned ? (
            <AiFillPushpin />
          ) : (
            <AiOutlinePushpin />
          )}
        </Button>

        <div
          className="NoteTitleText"
          style={
            state.modalFormData?.sessionNoteTitle &&
            state.modalFormData?.sessionNoteTitle !== "<br>"
              ? { display: "none" }
              : {}
          }
        >
          Note Title...
        </div>
        <div
          contentEditable="true"
          aria-multiline="true"
          spellCheck="true"
          dir="ltr"
          role="textbox"
          className="NoteTitleFormControl"
          onInput={handleNoteTitleOnInputEvent}
          dangerouslySetInnerHTML={{
            __html: dbState.selectedNoteCardData?.sessionNoteTitle ?? "",
          }}
        ></div>

        <div
          className="GiveSessionNoteText"
          style={
            state.modalFormData?.sessionNoteDescription &&
            state.modalFormData?.sessionNoteDescription !== "<br>"
              ? { display: "none" }
              : { paddingTop: "6.4rem" }
          }
        >
          Give Session Note...
        </div>
        <div
          contentEditable="true"
          aria-multiline="true"
          spellCheck="true"
          dir="ltr"
          role="textbox"
          className="NoteDescriptionFormControl"
          onInput={handleNoteDescriptionOnInputEvent}
          dangerouslySetInnerHTML={{
            __html: dbState.selectedNoteCardData?.sessionNoteDescription ?? "",
          }}
        ></div>

        <div className="AddButtonNColorPickerContainer">
          {state.showColorPicker && (
            <div role="tooltip" className="ColorsToPickContainer">
              <span
                className="DefaultColor Color"
                onClick={() => handleColorPicker("#fff")}
              ></span>
              <span
                className="RedColor Color"
                onClick={() => handleColorPicker("#ff9898")}
              ></span>
              <span
                className="GreenColor Color"
                onClick={() => handleColorPicker("#75fa75")}
              ></span>
              <span
                className="BlueColor Color"
                onClick={() => handleColorPicker("#a9a9ff")}
              ></span>
              <span
                className="YellowColor Color"
                onClick={() => handleColorPicker("#eded72")}
              ></span>
            </div>
          )}

          <Button
            className="PinContainerButton"
            onClick={() =>
              dispatch({
                type: "showColorPicker",
                payload: !state.showColorPicker,
              })
            }
            style={{ backgroundColor: state.modalFormData?.color ?? "#fff" }}
          >
            <MdColorLens className="ColorButton" />
          </Button>

          <div className="CloseNSaveBtnContainer">
            <Button className="CloseButton" onClick={handleModalCloseEvent}>
              Close
            </Button>

            <Button
              className="MentorDashboardSessionDetailsFormButton"
              style={state.dataHasChanged ? {} : { opacity: "0.5" }}
              disabled={state.dataHasChanged ? false : true}
              onClick={handleModalSaveChangedBtnClick}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MentorDashboardSessionEditFormModal;
