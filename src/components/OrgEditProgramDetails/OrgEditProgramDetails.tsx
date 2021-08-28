/* eslint-disable eqeqeq */
import React, { useCallback, useEffect } from "react";
import {
  OrgEditProgramDetailsActionType,
  OrgEditProgramDetailsState,
} from "../../types/OrgEditProgramDetails";

import Error from "../Error/Error";

import "./OrgEditProgramDetails.css";
import "../CreateProgramForm/CreateProgramForm.css";

import { CreateProgramData } from "../../types/CreateProgram";
import { useHistory } from "react-router-dom";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { ORGANISATION_PROGRAM_DETAILS } from "../../constants/Routes";
import OrgEditProgramDetailsFragment from "./OrgEditProgramDetailsFragment";

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

  /*
   * Function to know that user has changed something or not,
   * If he has changed something then we will get boolean value
   * true, else we will get boolean value false
   *
   * In this function, we are comparing each editable field that
   * we got from API call (stored in state.originalData) and editable
   * field presents in editedData
   */
  const hasDataChange = useCallback(() => {
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
              return true;
            break;

          case "coordinator":
            let ckey: keyof CreateProgramData["coordinator"] | any;
            for (ckey in originalDataTemp?.coordinator) {
              switch (ckey) {
                case "contact":
                  let cckey: keyof {
                    countryName: string;
                    countryCode: string;
                    number: string;
                  };
                  for (cckey in originalDataTemp?.coordinator?.contact) {
                    if (
                      originalDataTemp?.coordinator?.contact &&
                      editedDataTemp?.coordinator?.contact &&
                      originalDataTemp?.coordinator?.contact[cckey] !=
                        editedDataTemp?.coordinator?.contact[cckey]
                    )
                      return true;
                  }
                  break;

                default:
                  if (
                    originalDataTemp?.coordinator &&
                    editedDataTemp?.coordinator &&
                    originalDataTemp?.coordinator[
                      ckey as keyof CreateProgramData["coordinator"]
                    ] !=
                      editedDataTemp?.coordinator[
                        ckey as keyof CreateProgramData["coordinator"]
                      ]
                  )
                    return true;
                  break;
              }
            }
            break;

          case "mentorFields":
            let mkey: keyof CreateProgramData["mentorFields"] | string;

            for (mkey in originalDataTemp.mentorFields) {
              if (
                originalDataTemp?.mentorFields &&
                editedDataTemp?.mentorFields &&
                originalDataTemp?.mentorFields[
                  mkey as keyof CreateProgramData["mentorFields"]
                ] !=
                  editedDataTemp?.mentorFields[
                    mkey as keyof CreateProgramData["mentorFields"]
                  ]
              )
                return true;
            }
            break;

          case "studentFields":
            let skey: keyof CreateProgramData["studentFields"] | string;

            for (skey in originalDataTemp.studentFields) {
              if (
                originalDataTemp?.studentFields &&
                editedDataTemp?.studentFields &&
                originalDataTemp?.studentFields[
                  skey as keyof CreateProgramData["studentFields"]
                ] !=
                  editedDataTemp?.studentFields[
                    skey as keyof CreateProgramData["studentFields"]
                  ]
              )
                return true;
            }
            break;

          default:
            if (originalDataTemp[key] != editedDataTemp[key]) return true;
            break;
        }
      }
    }

    return false;
  }, [editedData, state.originalData]);

  /*
   * This useEffect is same as useEffect of OrgProfileEditSectionContainer
   * component
   */
  useEffect(() => {
    dispatch({ type: "dataHasChanged", payload: hasDataChange() });

    // @ts-ignore
    const unblock = history.block((tx) => {
      if (state.dataHasChanged === false) return true;

      if (state.leave) return true;

      dispatch({ type: "navigateToPath", payload: tx.pathname });

      if (state.dataHasChanged) dispatch({ type: "showModal", payload: true });

      return false;
    });

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (state.dataHasChanged) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      unblock();
    };
  }, [
    dispatch,
    editedData,
    hasDataChange,
    history,
    state.dataHasChanged,
    state.leave,
    state.originalData,
  ]);

  /*
   * Function to check that we can make an API call or not,
   * as to make an API call all the required fields should have
   * some value, and not empty string
   */
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

  // Function making API call
  const makeAPICall = async (status: string, message: string) => {
    try {
      /*
       * Before calling API, scroll on Top of the page
       */
      document.documentElement.scrollTop = 0;

      // Show LoadingProgress component
      dispatch({ type: "loadingMessage", payload: message });

      // Previously If we have shown any validatedError, then hide it
      dispatch({ type: "validationError", payload: "" });

      // Get the id of Program (stored with which in backend)
      const id = state.originalData?.id as CreateProgramData["id"];

      if (
        state.dataHasChanged === false &&
        status === "PUBLISHED" &&
        state.originalData?.status === "SAVED_TO_DRAFT"
      ) {
        /*
         * If nothing has been changed in Data, only user want to
         * change status of the Program from DRAFT to PUBLISH
         *
         * then call putUpdatedProgramStatusToPublish API
         */
        await putUpdatedProgramStatusToPublish(
          parseInt(id),
          editedData as CreateProgramData
        );
      } else if (
        !(
          state.dataHasChanged === false &&
          status === "PUBLISHED" &&
          state.originalData?.status === "PUBLISHED"
        )
      ) {
        /*
         * If data has not been changed, and user click to PUBLISH, and
         * the program was already has the status PUBLISHED, then don't call
         * the API.
         *
         * Else call the API
         */
        await putUpdatedProgramDetails(
          parseInt(id),
          editedData as CreateProgramData
        );
      }

      // After calling API, hide the LoadingProgress component
      dispatch({ type: "loadingMessage", payload: "" });

      // Set the value of state.dataHasChanged to false
      dispatch({ type: "dataHasChanged", payload: false });

      /*
       * Make originalData same as editedData, as editedData is
       * what with which we have make the above call.
       * And now, after successful call, it becomes the Original Data
       */
      dispatch({ type: "originalData", payload: editedData });

      /*
       * After doing all the above things, push the Org on Program Details
       * Page. To show the updated details
       */
      history.push(
        `${ORGANISATION_PROGRAM_DETAILS}/${state.originalData?.id}/details`
      );
    } catch (error) {
      /*
       * If we got any error, while calling API, then scroll to
       * the bottom of the page
       */
      document.documentElement.scrollTop =
        document.documentElement.scrollHeight;

      /*
       * Hide the LoadingProgress component
       */
      dispatch({ type: "loadingMessage", payload: "" });

      // Show the Error below the buttons
      dispatch({
        type: "validationError",
        payload: error.response?.data?.message ?? "",
      });
    }
  };

  // This is same as in CreateProgramForm component
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

  // This is same as in CreateProgramForm component
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

  // This is same as in OrgProfileEditSectionContainer component
  const handleLeavePageModalLeaveBtn = () => {
    dispatch({ type: "leave", payload: true });
    history.push(state.navigateToPath);
  };

  // This is same as in OrgProfileEditSectionContainer component
  const handleLeavePageModalStayBtn = () => {
    dispatch({ type: "stay", payload: true });
    dispatch({ type: "leave", payload: false });
    dispatch({ type: "showModal", payload: false });
    dispatch({ type: "navigateToPath", payload: "" });
  };

  return (
    <section className="CreateProgramFormContainer">
      {state.error ? (
        /*
         * If we have got any error, while getting the origingal details
         * then show that Error
         */
        <Error message={state.error} className="OrgDetailsNotFound" />
      ) : (
        /*
         * If we have not got any error, then show
         * OrgEditProgramDetialsFragment
         */
        <OrgEditProgramDetailsFragment
          handleLeavePageModalLeaveBtn={handleLeavePageModalLeaveBtn}
          handleLeavePageModalStayBtn={handleLeavePageModalStayBtn}
          state={state}
          dispatch={dispatch}
          editedData={editedData}
          setEditedData={setEditedData}
          handleDraftBtnClick={handleDraftBtnClick}
          handlePublishBtnClick={handlePublishBtnClick}
        />
      )}
    </section>
  );
};

export default OrgEditProgramDetails;
