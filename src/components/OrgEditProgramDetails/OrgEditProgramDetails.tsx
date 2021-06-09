/* eslint-disable eqeqeq */
import React from "react";
import { OrgEditProgramDetailsIllustration } from "../../assets/Illustrations/Illustrations";
import {
  OrgEditProgramDetailsActionType,
  OrgEditProgramDetailsState,
} from "../../types/OrgEditProgramDetails";
import Error from "../Error/Error";
import EditGeneralDetailsForm from "./EditGeneralDetailsForm";
import "./OrgEditProgramDetails.css";
import "../CreateProgramForm/CreateProgramForm.css";
import EditCoordinatorDetailsForm from "./EditCoordinatorDetailsForm";
import EditMentorDetailsForm from "./EditMentorDetailsForm";
import EditStudentDetailsForm from "./EditStudentDetailsForm";
import { CreateProgramData } from "../../types/CreateProgram";
import { Button } from "react-bootstrap";
import { GiStamper } from "react-icons/gi";
import { RiDraftLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { ORGANISATION_PROGRAM_VIEW_SEARCH } from "../../constants/Routes";

type OrgEditProgramDetailsProps = {
  state: OrgEditProgramDetailsState;
  dispatch: React.Dispatch<OrgEditProgramDetailsActionType>;
  editedData: CreateProgramData | null;
  setEditedData: React.Dispatch<React.SetStateAction<CreateProgramData | null>>;
};

const OrgEditProgramDetails = ({
  state,
  dispatch,
  editedData,
  setEditedData,
}: OrgEditProgramDetailsProps) => {
  const { putUpdatedProgramDetails, putUpdatedProgramStatusToPublish } =
    useOrgAPI();
  const history = useHistory();

  const canMakeAPICall = () => {
    return (
      [
        editedData?.title ?? "",
        editedData?.description ?? "",
        editedData?.tentativeStartDate ?? "",
        editedData?.durationInMonths ?? "",
        editedData?.languageRequirements ?? "",
        editedData?.ageLimit?.from ?? "",
        editedData?.ageLimit?.to ?? "",
        editedData?.programLink ?? "",
        editedData?.coordinator?.name ?? "",
        editedData?.coordinator?.email ?? "",
        editedData?.coordinator?.contact?.number ?? "",
        editedData?.mentorFields?.applyBy ?? "",
        editedData?.mentorFields?.generalInstructions ?? "",
        editedData?.mentorFields?.openings ?? "",
        editedData?.mentorFields?.subjectRequirements ?? "",
        editedData?.studentFields?.applyBy ?? "",
        editedData?.studentFields?.generalInstructions ?? "",
        editedData?.studentFields?.openings ?? "",
        editedData?.studentFields?.subjectRequirements ?? "",
      ].includes("") === false
    );
  };

  const areTwoObjectContainsSameData = () => {
    const originalDataTemp = { ...state.originalData } as CreateProgramData;
    const editedDataTemp = { ...editedData } as CreateProgramData;

    let key: keyof CreateProgramData;
    for (key in originalDataTemp) {
      if (key != "id" && key != "status") {
        switch (key) {
          case "ageLimit":
            if (
              originalDataTemp.ageLimit.from != editedDataTemp.ageLimit.from ||
              originalDataTemp.ageLimit.to != editedDataTemp.ageLimit.to
            )
              return false;
            break;

          case "coordinator":
            let ckey: keyof CreateProgramData["coordinator"];

            for (ckey in originalDataTemp.coordinator) {
              switch (ckey) {
                case "contact":
                  let cckey: keyof CreateProgramData["coordinator"]["contact"];
                  for (cckey in originalDataTemp.coordinator.contact) {
                    if (
                      originalDataTemp.coordinator.contact[cckey] !=
                      editedDataTemp.coordinator.contact[cckey]
                    )
                      return false;
                  }
                  break;

                default:
                  if (
                    originalDataTemp.coordinator[ckey] !=
                    editedDataTemp.coordinator[ckey]
                  )
                    return false;
                  break;
              }
            }
            break;

          case "mentorFields":
            let mkey: keyof CreateProgramData["mentorFields"];

            for (mkey in originalDataTemp.mentorFields) {
              if (
                originalDataTemp.mentorFields[mkey] !=
                editedDataTemp.mentorFields[mkey]
              )
                return false;
            }
            break;

          case "studentFields":
            let skey: keyof CreateProgramData["studentFields"];

            for (skey in originalDataTemp.studentFields) {
              if (
                originalDataTemp.studentFields[skey] !=
                editedDataTemp.studentFields[skey]
              )
                return false;
            }
            break;

          default:
            if (originalDataTemp[key] != editedDataTemp[key]) return false;
            break;
        }
      }
    }

    return true;
  };

  const makeAPICall = async (status: string, message: string) => {
    try {
      document.documentElement.scrollTop = 0;

      dispatch({ type: "loadingMessage", payload: message });
      dispatch({ type: "validationError", payload: "" });

      const id = state.originalData?.id as CreateProgramData["id"];

      if (
        areTwoObjectContainsSameData() &&
        status === "PUBLISHED" &&
        state.originalData?.status === "SAVED_TO_DRAFT"
      ) {
        const response = await putUpdatedProgramStatusToPublish(
          parseInt(id),
          editedData as CreateProgramData
        );

        console.log(response);
      } else if (
        !(
          areTwoObjectContainsSameData() &&
          status === "PUBLISHED" &&
          state.originalData?.status === "PUBLISHED"
        )
      ) {
        const response = await putUpdatedProgramDetails(
          parseInt(id),
          editedData as CreateProgramData
        );
        console.log(response);
      }

      dispatch({ type: "loadingMessage", payload: "" });
      // history.push(`${ORGANISATION_PROGRAM_VIEW_SEARCH}/all`);
    } catch (error) {
      document.documentElement.scrollTop =
        document.documentElement.scrollHeight;

      dispatch({ type: "loadingMessage", payload: "" });
      dispatch({
        type: "validationError",
        payload: error.response?.data?.message ?? "",
      });
    }
  };

  const handlePublishBtnClick = () => {
    dispatch({ type: "validated", payload: true });

    if (Boolean(state.selectedLanguages.length) === false) {
      dispatch({ type: "isLanguageSelected", payload: true });
      return;
    }

    if ((editedData?.coordinator?.contact?.number ?? "").length <= 4) {
      dispatch({ type: "isInvalid", payload: true });
      return;
    }

    if (canMakeAPICall()) {
      makeAPICall("PUBLISHED", "Publishing program...");
    }
  };

  const handleDraftBtnClick = () => {
    dispatch({ type: "validationError", payload: "" });

    if (editedData?.title === "") {
      dispatch({
        type: "validationError",
        payload: 'To "save to draft", atleast fill the title.',
      });
      return;
    }

    makeAPICall("SAVED_TO_DRAFT", "Saving to draft...");
  };

  return (
    <section className="CreateProgramFormContainer">
      {state.error ? (
        <Error message={state.error} className="OrgDetailsNotFound" />
      ) : (
        <>
          <div className="CreateProgramFirstSection">
            <EditGeneralDetailsForm
              state={state}
              dispatch={dispatch}
              editedData={editedData}
              setEditedData={setEditedData}
            />
            <div className="CreateProgramFirstSubSection">
              <img
                src={OrgEditProgramDetailsIllustration}
                alt="edit program details illustration"
                className="CreateProgramIllustration"
              />
              <EditCoordinatorDetailsForm
                state={state}
                dispatch={dispatch}
                editedData={editedData}
                setEditedData={setEditedData}
              />
            </div>
          </div>
          <div className="CreateProgramSecondSection">
            <EditMentorDetailsForm
              state={state}
              dispatch={dispatch}
              editedData={editedData}
              setEditedData={setEditedData}
            />
            <EditStudentDetailsForm
              state={state}
              dispatch={dispatch}
              editedData={editedData}
              setEditedData={setEditedData}
            />
          </div>
          <div className="EditProgramDetails CreateProgramButtonContainer">
            {state.originalData?.status !== "PUBLISHED" && (
              <Button
                className="CreateProgramDraftBtn"
                onClick={handleDraftBtnClick}
              >
                Save to Draft&nbsp;
                <RiDraftLine />
              </Button>
            )}
            <Button
              className="CreateProgramPublishBtn"
              onClick={handlePublishBtnClick}
            >
              Publish <GiStamper />
            </Button>
          </div>
          {state.validationError && (
            <Error
              message={state.validationError}
              className="CreateProgramErrorMessage"
            />
          )}
        </>
      )}
    </section>
  );
};

export default OrgEditProgramDetails;
