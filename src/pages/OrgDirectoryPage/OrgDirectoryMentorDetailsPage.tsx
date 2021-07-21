import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgDirectoryDetailsCommonHeader from "../../components/OrgDirectoryDetailsCommonHeader/OrgDirectoryDetailsCommonHeader";
import OrgDirectoryDetailsConnectedToPrograms from "../../components/OrgDirectoryDetailsConnectedToPrograms/OrgDirectoryDetailsConnectedToPrograms";
import OrgDirectoryDetailsPersonalInfo from "../../components/OrgDirectoryDetailsPersonalInfo/OrgDirectoryDetailsPersonalInfo";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { orgDirectoryDetailsReducer } from "../../reducers/orgDirectoryDetailsReducer";

const OrgDirectoryMentorDetailsPage = () => {
  const [state, dispatch] = useReducer(orgDirectoryDetailsReducer, {
    choosedOption: "PersonalInfo",
    responseData: null,
    loading: true,
    error: "",
  });

  const { mentorId } = useParams<{ mentorId: string }>();
  const history = useHistory();
  const { getSpecificConnectedMentor } = useOrgAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Mentor Details | CatalysEd";

    const getDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });

        const response = await getSpecificConnectedMentor(parseInt(mentorId));

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
  }, [getSpecificConnectedMentor, history, mentorId]);

  return (
    <div className="OrgDirectoryMentorPage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Details..."
        />
      )}

      <OrgDirectoryDetailsCommonHeader state={state} dispatch={dispatch} />

      {state.choosedOption === "PersonalInfo" && (
        <OrgDirectoryDetailsPersonalInfo state={state} />
      )}

      {state.choosedOption === "ConnectedToPrograms" && (
        <OrgDirectoryDetailsConnectedToPrograms state={state} />
      )}
    </div>
  );
};

export default OrgDirectoryMentorDetailsPage;
