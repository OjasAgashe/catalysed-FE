import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import Error from "../../components/Error/Error";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgDirectoryDetailsConnectedToPrograms from "../../components/OrgDirectoryDetailsConnectedToPrograms/OrgDirectoryDetailsConnectedToPrograms";
import OrgDirectoryDetailsStudentPersonalInfo from "../../components/OrgDirectoryDetailsStudentPersonalInfo/OrgDirectoryDetailsStudentPersonalInfo";
import OrgSpecificApplicantApplicationDetails from "../../components/OrgSpecificApplicantApplicationDetails/OrgSpecificApplicantApplicationDetails";
import OrgSpecificApplicantDetailsHeader from "../../components/OrgSpecificApplicantDetailsHeader/OrgSpecificApplicantDetailsHeader";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { orgSpecificApplicantDetailsReducer } from "../../reducers/orgSpecificApplicantDetailsReducer";
import "./OrgSpecificApplicantDetailsPage.css";

const OrgSpecificStudentApplicantDetailsPage = () => {
  const [state, dispatch] = useReducer(orgSpecificApplicantDetailsReducer, {
    choosedOption: "Application",
    responseData: null,
    loading: true,
    error: "",
    loadingMessage: "",
    reRenderComponent: false,
  });

  const { applicationId, programId } =
    useParams<{ applicationId: string; programId: string }>();
  const history = useHistory();
  const { getSpecificStudentApplicantDetails } = useOrgAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Student Applicant Details | CatalysEd";

    if (state.reRenderComponent)
      dispatch({ type: "reRenderComponent", payload: false });

    const getDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });
        dispatch({ type: "loadingMessage", payload: "Getting Details..." });

        const response = await getSpecificStudentApplicantDetails(
          parseInt(programId),
          parseInt(applicationId)
        );

        dispatch({ type: "responseData", payload: response.data });
        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          history.push("*");
        } else {
          dispatch({ type: "loading", payload: false });
          dispatch({ type: "error", payload: "Sorry !! No Details Found" });
        }
      }
    };

    getDetails();
  }, [
    applicationId,
    getSpecificStudentApplicantDetails,
    history,
    programId,
    state.reRenderComponent,
  ]);

  return (
    <div className="OrgSpecificStudentApplicantDetailsPage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage={state.loadingMessage}
        />
      )}

      <OrgSpecificApplicantDetailsHeader state={state} dispatch={dispatch} />

      {state.error.length === 0 ? (
        <>
          {state.choosedOption === "Application" && (
            <OrgSpecificApplicantApplicationDetails
              state={state}
              dispatch={dispatch}
            />
          )}

          {state.choosedOption === "PersonalInfo" && (
            <OrgDirectoryDetailsStudentPersonalInfo applicantState={state} />
          )}

          {state.choosedOption === "ConnectedToPrograms" && (
            <OrgDirectoryDetailsConnectedToPrograms applicantState={state} />
          )}
        </>
      ) : (
        <div className="ErrorDiv">
          <Error message={state.error} />
        </div>
      )}
    </div>
  );
};

export default OrgSpecificStudentApplicantDetailsPage;
