import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import { stuUpdatesApplicationDetailsReducer } from "../../reducers/stuUpdatesApplicationDetailsReducer";
import Error from "../../components/Error/Error";

import OrgProgramDetails from "../../components/OrgProgramDetails/OrgProgramDetails";
import StuUpdatesApplicationDetailsHeader from "../../components/StuUpdatesApplicationDetailsHeader/StuUpdatesApplicationDetailsHeader";
import StuUpdatesApplicationStatusInfo from "../../components/StuUpdatesApplicationStatusInfo/StuUpdatesApplicationStatusInfo";
import { useMentorAPI } from "../../context/api_context/MentorAPIContext";
import "./MentorUpdatesApplicationDetails.css";

const MentorUpdatesApplicationDetails = () => {
  const [state, dispatch] = useReducer(stuUpdatesApplicationDetailsReducer, {
    choosedOption: "Application",
    responseData: null,
    loading: true,
    error: "",
  });

  const { applicationId } = useParams<{ applicationId: string }>();
  const history = useHistory();
  const { getSpecificFilledApplicationDetails } = useMentorAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    const getDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });

        const response = await getSpecificFilledApplicationDetails(
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
  }, [applicationId, getSpecificFilledApplicationDetails, history]);

  return (
    <div className="MentorUpdatesApplicationDetailsPage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Details..."
        />
      )}

      <StuUpdatesApplicationDetailsHeader
        state={state}
        dispatch={dispatch}
        entity="MENTOR"
      />

      {state.error.length === 0 ? (
        <>
          {state.choosedOption === "Application" && (
            <>
              <StuUpdatesApplicationStatusInfo state={state} />
            </>
          )}

          {state.choosedOption === "Program Details" && (
            <>
              <OrgProgramDetails
                state={{
                  loading: state.loading,
                  error: state.error,
                  responseData: state.responseData?.programDetails ?? null,
                }}
              />
            </>
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

export default MentorUpdatesApplicationDetails;
