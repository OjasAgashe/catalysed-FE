import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import MentorUpdatesProgramPeopleDetails from "../../components/MentorUpdatesProgramPeopleDetails/MentorUpdatesProgramPeopleDetails";
import StuUpdatesProgramDetailsCommon from "../../components/StuUpdatesProgramDetailsCommon/StuUpdatesProgramDetailsCommon";
import { useMentorAPI } from "../../context/api_context/MentorAPIContext";
import { stuUpdatesProgramPeopleReducer } from "../../reducers/stuUpdatesProgramPeopleReducer";
import { MentorUpdatesProgramPeopleResponse } from "../../types/MentorUpdatesProgramDetails";

const MentorUpdatesProgramPeople = () => {
  const [state, dispatch] = useReducer(stuUpdatesProgramPeopleReducer, {
    loading: true,
    error: "",
    programTitle: "",
    responseData: null,
  });

  const { programId } = useParams<{ programId: string }>();
  const history = useHistory();
  const { getConnectedProgramDetails, getConnectedProgramParticipants } =
    useMentorAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Connected Program People | CatalysEd";

    const getTitlePeopleDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });

        const programDetailsResponse = await getConnectedProgramDetails(
          parseInt(programId)
        );
        const response = await getConnectedProgramParticipants(
          parseInt(programId)
        );

        dispatch({
          type: "programTitle",
          payload: programDetailsResponse.data.title,
        });
        dispatch({ type: "responseData", payload: response.data });

        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          history.push("*");
        } else {
          dispatch({ type: "loading", payload: false });
          dispatch({ type: "error", payload: "Sorry!! No Data Found" });
        }
      }
    };

    getTitlePeopleDetails();
  }, [
    getConnectedProgramDetails,
    getConnectedProgramParticipants,
    history,
    programId,
  ]);

  return (
    <div className="MentorUpdatesProgramPeoplePage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Details..."
        />
      )}

      <StuUpdatesProgramDetailsCommon
        programTitle={state.programTitle}
        programId={parseInt(programId)}
        entity="MENTOR"
      />

      <MentorUpdatesProgramPeopleDetails
        responseData={
          state.responseData as MentorUpdatesProgramPeopleResponse | null
        }
      />
    </div>
  );
};

export default MentorUpdatesProgramPeople;
