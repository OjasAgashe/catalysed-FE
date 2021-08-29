import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import StuUpdatesProgramDetailsCommon from "../../components/StuUpdatesProgramDetailsCommon/StuUpdatesProgramDetailsCommon";
import StuUpdatesProgramPeopleDetails from "../../components/StuUpdatesProgramPeopleDetails/StuUpdatesProgramPeopleDetails";
import { useStudentAPI } from "../../context/api_context/StudentAPIContext";
import { stuUpdatesProgramPeopleReducer } from "../../reducers/stuUpdatesProgramPeopleReducer";
import { StuUpdatesProgramPeopleResponse } from "../../types/StuUpdatesProgramDetails";

const StuUpdatesProgramPeople = () => {
  /*
   * state.loading: to show LoadingProgress component, till we are getting
   * Data
   *
   * state.error: to show an error, if we got any while making API call
   *
   * state.programTitle: to store program title, we will send it in Header
   *
   * state.responseData: to store the Data
   */
  const [state, dispatch] = useReducer(stuUpdatesProgramPeopleReducer, {
    loading: true,
    error: "",
    programTitle: "",
    responseData: null,
  });

  const { programId } = useParams<{ programId: string }>();
  const history = useHistory();
  const { getConnectedProgramDetails, getConnectedProgramParticipants } =
    useStudentAPI();

  useEffect(() => {
    /*
     * Whenever anyone visits this page first time, we want the
     * scroll bar on Top
     */
    document.documentElement.scrollTop = 0;

    // Set the document title
    document.title = "Connected Program People | CatalysEd";

    // Function to call API, and get Data
    const getTitlePeopleDetails = async () => {
      try {
        // If previously, we have shown any error then hide it
        dispatch({ type: "error", payload: "" });

        /*
         * Get the Program Details, so that we can get program title from
         * it
         */
        const programDetailsResponse = await getConnectedProgramDetails(
          parseInt(programId)
        );

        // Get details of participants
        const response = await getConnectedProgramParticipants(
          parseInt(programId)
        );

        // Store the program title
        dispatch({
          type: "programTitle",
          payload: programDetailsResponse.data.title,
        });

        // Store the details of participants
        dispatch({ type: "responseData", payload: response.data });

        // After storing everything hide the LoadingProgress
        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          /*
           * If while calling the API, we got 404 then push the
           * user to PageNotFound
           */
          history.push("*");
        } else {
          /*
           * If we got any other error, then first hide the LoadingProgress
           */
          dispatch({ type: "loading", payload: false });

          // And then show the error
          dispatch({ type: "error", payload: "Sorry!! No Data Found" });
        }
      }
    };

    // Call getTitlePeopleDetials function
    getTitlePeopleDetails();
  }, [
    getConnectedProgramDetails,
    getConnectedProgramParticipants,
    history,
    programId,
  ]);

  return (
    <div className="StuUpdatesProgramPeoplePage Page">
      {/* Show LoadingProgress component */}
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Details..."
        />
      )}

      {/* Show StuUpdatesProgramDetailsCommon component */}
      <StuUpdatesProgramDetailsCommon
        programTitle={state.programTitle}
        programId={parseInt(programId)}
        entity="STUDENT"
      />

      {/* Show StuUpdatesProgramPeopleDetails component */}
      <StuUpdatesProgramPeopleDetails
        responseData={
          state.responseData as StuUpdatesProgramPeopleResponse | null
        }
      />
    </div>
  );
};

export default StuUpdatesProgramPeople;
