import React, { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgEditProgramDetails from "../../components/OrgEditProgramDetails/OrgEditProgramDetails";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { orgEditProgramDetailsReducer } from "../../reducers/orgEditProgramDetailsReducer";
import { CreateProgramData } from "../../types/CreateProgram";
import "./OrgEditProgramDetailsPage.css";

const OrgEditProgramDetailsPage = () => {
  /*
   * state.loading: to show the LoadingProgress component, till we are getting
   * the details
   *
   * state.validationError: to show the Error, When we will get from unsuccessful
   * API call to update new details
   *
   * state.originalData: to store the Original Data of details (not new edited
   * details)
   *
   * From state.error to state.urlInput is same as CreateProgram page
   *
   * From state.showModal to state.dataHasChanged is as OrgProfileEdit page
   */
  const [state, dispatch] = useReducer(orgEditProgramDetailsReducer, {
    loading: true,
    validationError: "",
    originalData: null,
    error: "",
    isInvalid: false,
    isLanguageSelected: false,
    loadingMessage: "",
    mentorApplyDate: null,
    phoneValue: "",
    selectedTSDate: null,
    selectedLanguages: [],
    studentApplyDate: null,
    validated: false,
    urlInput: "",
    showModal: false,
    leave: false,
    stay: false,
    navigateToPath: "",
    dataHasChanged: false,
  });

  /*
   * To store new changed program details
   */
  const [editedData, setEditedData] = useState<CreateProgramData | null>(null);

  const { programId } = useParams<{ programId: string }>();
  const { getProgramDetails } = useOrgAPI();

  const history = useHistory();

  useEffect(() => {
    /*
     * Whenever anyone visits this page first time, we
     * want the scroll position on Top
     */
    document.documentElement.scrollTop = 0;

    // Set the document title
    document.title = "Edit Program | CatalysEd";

    /*
     * Function to get Day, Month, and Year from
     * "dd/mm/yyyy" format of Date
     */
    const getDayMonthYear = (date: string) => {
      const [day, month, year] = date.split("/");
      return {
        day: parseInt(day),
        month: parseInt(month) - 1,
        year: parseInt(year),
      };
    };

    // Function to get Program Details
    const getDetails = async () => {
      try {
        // If previously, we have shown any error then hide it
        dispatch({ type: "error", payload: "" });

        // Get Program Details
        const response = await getProgramDetails(parseInt(programId));

        // Store whole data in state.originalData
        dispatch({ type: "originalData", payload: response.data });

        // Store the phone value from response in state.phoneValue
        dispatch({
          type: "phoneValue",
          payload:
            response.data.coordinator.contact.countryCode +
            response.data.coordinator.contact.number,
        });

        /*
         * Store the mentor applyBy from response in state.mentorApplyDate
         *
         * If response has value of mentor applyBy
         */
        if (response.data.mentorFields.applyBy) {
          const {
            day: mDay,
            month: mMonth,
            year: mYear,
          } = getDayMonthYear(response.data.mentorFields.applyBy);
          dispatch({
            type: "mentorApplyDate",
            payload: new Date(mYear, mMonth, mDay),
          });
        }

        /*
         * Store the student applyBy from response in state.studentApplyDate
         *
         * If response has value of student applyBy
         */
        if (response.data.studentFields.applyBy) {
          const {
            day: sDay,
            month: sMonth,
            year: sYear,
          } = getDayMonthYear(response.data.studentFields.applyBy);
          dispatch({
            type: "studentApplyDate",
            payload: new Date(sYear, sMonth, sDay),
          });
        }

        /*
         * Store the tentativeStartDate from response in state.selectedTSDate
         *
         * If response has value of tentativeStartDate
         */
        if (response.data.tentativeStartDate) {
          const {
            day: tsDay,
            month: tsMonth,
            year: tsYear,
          } = getDayMonthYear(response.data.tentativeStartDate);
          dispatch({
            type: "selectedTSDate",
            payload: new Date(tsYear, tsMonth, tsDay),
          });
        }

        /*
         * Store the languageRequirements from response in state.selectedLanguages
         *
         * If response has value of languageRequirements
         */
        if (response.data.languageRequirements.length) {
          dispatch({
            type: "selectedLanguages",
            payload: [...response.data.languageRequirements.split(",")],
          });
        }

        // initially the new details would be same as old details
        setEditedData(response.data);

        // After storing everthing hide the LoadingProgress
        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          /*
           * If while getting the details, we get 404 error then push the
           * Org to PageNotFound
           */
          history.push("*");
        } else {
          /*
           * If we get any other error, then first hide the LoadingProgress
           */
          dispatch({ type: "loading", payload: false });

          // Then show the error
          dispatch({ type: "error", payload: "Sorry!! No Details Found" });
        }
      }
    };

    // Call getDetails function
    getDetails();
  }, [dispatch, getProgramDetails, history, programId]);

  return (
    <div className="OrgEditProgramDetailsPage Page">
      {/*
       * Show the LoadingProgress, if state.loading is true
       * Or state.loadingMessage has any value
       */}
      {(state.loading || state.loadingMessage) && (
        <LoadingProgress
          loading={state.loading || (state.loadingMessage ? true : false)}
          emailSent={false}
          loadingMessage={
            state.loading ? "Getting Details..." : state.loadingMessage
          }
        />
      )}

      {/* Show Error Header */}
      <div className="OrgEditProgramDetailsHeader">
        <span>Edit {state.originalData?.title ?? ""}</span>
      </div>

      {/* Show OrgEditProgramDetials component */}
      <OrgEditProgramDetails
        state={state}
        dispatch={dispatch}
        editedData={editedData}
        setEditedData={setEditedData}
      />
    </div>
  );
};

export default OrgEditProgramDetailsPage;
