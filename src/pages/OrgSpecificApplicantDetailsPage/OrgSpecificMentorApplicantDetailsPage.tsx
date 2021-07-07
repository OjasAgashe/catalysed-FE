import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgDirectoryDetailsConnectedToPrograms from "../../components/OrgDirectoryDetailsConnectedToPrograms/OrgDirectoryDetailsConnectedToPrograms";
import OrgDirectoryDetailsPersonalInfo from "../../components/OrgDirectoryDetailsPersonalInfo/OrgDirectoryDetailsPersonalInfo";
import OrgSpecificApplicantDetailsHeader from "../../components/OrgSpecificApplicantDetailsHeader/OrgSpecificApplicantDetailsHeader";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { orgSpecificApplicantDetailsReducer } from "../../reducers/orgSpecificApplicantDetailsReducer";

const OrgSpecificMentorApplicantDetailsPage = () => {
  const [state, dispatch] = useReducer(orgSpecificApplicantDetailsReducer, {
    choosedOption: "Application",
    responseData: null,
    loading: true,
    error: "",
  });

  const { mentorId, programId } =
    useParams<{ mentorId: string; programId: string }>();
  const history = useHistory();
  const { getSpecificMentorApplicantDetails } = useOrgAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Mentor Applicant Details | CatalysEd";

    const getDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });

        const response = await getSpecificMentorApplicantDetails(
          parseInt(programId),
          parseInt(mentorId)
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
  }, [getSpecificMentorApplicantDetails, history, mentorId, programId]);

  return (
    <div className="OrgSpecificMentorApplicantDetailsPage">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Details..."
        />
      )}

      <OrgSpecificApplicantDetailsHeader state={state} dispatch={dispatch} />

      {state.choosedOption === "PersonalInfo" && (
        <OrgDirectoryDetailsPersonalInfo applicantState={state} />
      )}

      {state.choosedOption === "ConnectedToPrograms" && (
        <OrgDirectoryDetailsConnectedToPrograms applicantState={state} />
      )}
    </div>
  );
};

export default OrgSpecificMentorApplicantDetailsPage;
