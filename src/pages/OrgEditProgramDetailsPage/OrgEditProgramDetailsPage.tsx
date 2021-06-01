import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgEditProgramDetails from "../../components/OrgEditProgramDetails/OrgEditProgramDetails";
import { useOrgCreateProgram } from "../../context/api_context/OrgCreateProgramContext";
import { orgEditProgramDetailsReducer } from "../../reducers/orgEditProgramDetailsReducer";
import { CreateProgramData } from "../../types/CreateProgram";
import "./OrgEditProgramDetailsPage.css";

const OrgEditProgramDetailsPage = () => {
  const [state, dispatch] = useReducer(orgEditProgramDetailsReducer, {
    loading: true,
    error: "",
    validationError: "",
    originalData: null,
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
  });

  const [editedData, setEditedData] = useState<CreateProgramData | null>(null);

  const { programId } = useParams<{ programId: string }>();
  const { getProgramDetails } = useOrgCreateProgram();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Edit Program | CatalysEd";

    const getDayMonthYear = (date: string) => {
      const [day, month, year] = date.split("/");
      return {
        day: parseInt(day),
        month: parseInt(month) - 1,
        year: parseInt(year),
      };
    };

    const getDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });

        const response = await getProgramDetails(parseInt(programId));

        dispatch({ type: "originalData", payload: response.data });

        dispatch({
          type: "phoneValue",
          payload:
            response.data.coordinator.contact.countryCode +
            response.data.coordinator.contact.number,
        });

        const {
          day: mDay,
          month: mMonth,
          year: mYear,
        } = getDayMonthYear(response.data.mentorFields.applyBy);
        dispatch({
          type: "mentorApplyDate",
          payload: new Date(mYear, mMonth, mDay),
        });

        const {
          day: sDay,
          month: sMonth,
          year: sYear,
        } = getDayMonthYear(response.data.studentFields.applyBy);
        dispatch({
          type: "studentApplyDate",
          payload: new Date(sYear, sMonth, sDay),
        });

        const {
          day: tsDay,
          month: tsMonth,
          year: tsYear,
        } = getDayMonthYear(response.data.tentativeStartDate);
        dispatch({
          type: "selectedTSDate",
          payload: new Date(tsYear, tsMonth, tsDay),
        });

        dispatch({
          type: "selectedLanguages",
          payload: [...response.data.languageRequirements.split(",")],
        });

        setEditedData(response.data);
      } catch (error) {
        dispatch({ type: "error", payload: "Sorry!! No Details Found" });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

    getDetails();
  }, [dispatch, getProgramDetails, programId]);

  return (
    <div className="OrgEditProgramDetailsPage">
      {(state.loading || state.loadingMessage) && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage={
            state.loading ? "Getting Details..." : state.loadingMessage
          }
        />
      )}

      <div className="OrgEditProgramDetailsHeader">
        <span>Edit {state.originalData?.title ?? ""}</span>
      </div>

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
