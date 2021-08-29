/*
 * This file is much same as StuUpdatesProgramDetails file of
 * StuUpdatesProgramDetails page
 */

import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgProgramDetails from "../../components/OrgProgramDetails/OrgProgramDetails";
import StuUpdatesProgramDetailsCommon from "../../components/StuUpdatesProgramDetailsCommon/StuUpdatesProgramDetailsCommon";
import { useMentorAPI } from "../../context/api_context/MentorAPIContext";
import { stuUpdatesProgramDetailsReducer } from "../../reducers/stuUpdatesProgramDetailsReducer";

const MentorUpdatesProgramDetails = () => {
  const [state, dispatch] = useReducer(stuUpdatesProgramDetailsReducer, {
    loading: true,
    error: "",
    responseData: null,
  });

  const { programId } = useParams<{ programId: string }>();
  const history = useHistory();
  const { getConnectedProgramDetails } = useMentorAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Connected Program Details | CatalysEd";

    const getDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });

        const response = await getConnectedProgramDetails(parseInt(programId));

        dispatch({ type: "responseData", payload: response.data });
        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          history.push("*");
        } else {
          dispatch({ type: "loading", payload: false });
          dispatch({ type: "error", payload: "Sorry!! No Details Found" });
        }
      }
    };

    getDetails();
  }, [getConnectedProgramDetails, history, programId]);

  return (
    <div className="MentorUpdatesProgramDetailsPage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Details..."
        />
      )}

      <StuUpdatesProgramDetailsCommon
        programTitle={state.responseData ? state.responseData.title : ""}
        programId={parseInt(programId)}
        entity="MENTOR"
      />

      <OrgProgramDetails state={state} />
    </div>
  );
};

export default MentorUpdatesProgramDetails;
