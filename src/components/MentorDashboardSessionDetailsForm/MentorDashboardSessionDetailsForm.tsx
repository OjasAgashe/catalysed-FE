import React, { useReducer, useRef } from "react";
import { Button } from "react-bootstrap";
import { mentorDashboardSessionDetailsFormReducer } from "../../reducers/mentorDashboardSessionDetailsFormReducer";
import "./MentorDashboardSessionDetailsForm.css";

import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import { MdColorLens } from "react-icons/md";
import {
  MentorUpdatesProgramDashboardActionType,
  MentorUpdatesProgramDashboardState,
} from "../../types/MentorDashboardSessionDetails";

type MentorDashboardSessionDetailsFormProps = {
  dbState: MentorUpdatesProgramDashboardState;
  dbDispatch: React.Dispatch<MentorUpdatesProgramDashboardActionType>;
};

const MentorDashboardSessionDetailsForm = ({
  dbState,
  dbDispatch,
}: MentorDashboardSessionDetailsFormProps) => {
  const [state, dispatch] = useReducer(
    mentorDashboardSessionDetailsFormReducer,
    {
      sessionNoteTitle: "",
      sessionNoteDescription: "",
      pinned: false,
      color: "#fff",
      descriptionClicked: false,
      showColorPicker: false,
    }
  );

  const descriptionRef = useRef<HTMLDivElement | null>(null);

  const handleNoteTitleOnInputEvent: React.FormEventHandler<HTMLDivElement> = (
    event
  ) => {
    dispatch({
      type: "sessionNoteTitle",
      payload: event.currentTarget.innerHTML,
    });
  };

  const handleNoteDescriptionOnInputEvent: React.FormEventHandler<HTMLDivElement> =
    (event) => {
      dispatch({
        type: "sessionNoteDescription",
        payload: event.currentTarget.innerHTML,
      });
    };

  const handleAddButtonClick = () => {
    if (state.sessionNoteTitle || state.sessionNoteDescription) {
      dbDispatch({
        type: "noteCardArray",
        payload: [
          ...dbState.noteCardArray,
          {
            sessionNoteTitle: state.sessionNoteTitle,
            sessionNoteDescription: state.sessionNoteDescription,
            color: state.color,
            pinned: state.pinned,
          },
        ],
      });

      if (descriptionRef && descriptionRef.current) {
        descriptionRef.current.innerHTML = "";
      }

      dispatch({ type: "sessionNoteTitle", payload: "" });
      dispatch({ type: "sessionNoteDescription", payload: "" });
      dispatch({ type: "color", payload: "#fff" });
      dispatch({ type: "pinned", payload: false });
      dispatch({ type: "descriptionClicked", payload: false });
    }
  };

  const handleColorPicker = (colorString: string) => {
    dispatch({ type: "color", payload: colorString });
    dispatch({
      type: "showColorPicker",
      payload: !state.showColorPicker,
    });
  };

  return (
    <div
      className="MentorDashboardSessionDetailsForm"
      style={{ backgroundColor: state.color }}
    >
      {state.descriptionClicked && (
        <Button
          className="PinContainerButton"
          onClick={() => dispatch({ type: "pinned", payload: !state.pinned })}
          style={{ backgroundColor: state.color }}
        >
          {state.pinned ? <AiFillPushpin /> : <AiOutlinePushpin />}
        </Button>
      )}
      {state.descriptionClicked && (
        <>
          <div
            className="NoteTitleText"
            style={
              state.sessionNoteTitle && state.sessionNoteTitle !== "<br>"
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
          ></div>
        </>
      )}
      <div
        className="GiveSessionNoteText"
        style={
          state.sessionNoteDescription &&
          state.sessionNoteDescription !== "<br>"
            ? { display: "none" }
            : state.descriptionClicked === false
            ? { paddingTop: "1.05rem" }
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
        onClick={() => {
          dispatch({ type: "descriptionClicked", payload: true });
        }}
        ref={descriptionRef}
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
          style={{ backgroundColor: state.color }}
          onClick={() =>
            dispatch({
              type: "showColorPicker",
              payload: !state.showColorPicker,
            })
          }
        >
          <MdColorLens className="ColorButton" />
        </Button>

        <Button
          className="MentorDashboardSessionDetailsFormButton"
          onClick={handleAddButtonClick}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default MentorDashboardSessionDetailsForm;
