import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import StuUpdatesProgramDetailsCommon from "../../components/StuUpdatesProgramDetailsCommon/StuUpdatesProgramDetailsCommon";
import StuUpdatesProgramPeopleDetails from "../../components/StuUpdatesProgramPeopleDetails/StuUpdatesProgramPeopleDetails";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { stuUpdatesProgramPeopleReducer } from "../../reducers/stuUpdatesProgramPeopleReducer";

const MentorUpdatesProgramPeople = () => {
  const [state, dispatch] = useReducer(stuUpdatesProgramPeopleReducer, {
    loading: true,
    error: "",
    programTitle: "",
  });

  const { programId } = useParams<{ programId: string }>();
  const history = useHistory();
  const { getProgramDetails } = useOrgAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Connected Program People | CatalysEd";

    const getTitlePeopleDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });
        const programDetailsResponse = await getProgramDetails(
          parseInt(programId)
        );

        dispatch({
          type: "programTitle",
          payload: programDetailsResponse.data.title,
        });

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
  }, [getProgramDetails, history, programId]);

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
        programTitle={"Program Title"}
        programId={parseInt(programId)}
        entity="MENTOR"
      />

      <StuUpdatesProgramPeopleDetails />
    </div>
  );
};

export default MentorUpdatesProgramPeople;
