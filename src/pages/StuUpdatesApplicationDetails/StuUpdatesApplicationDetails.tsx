import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import { useStudentAPI } from "../../context/api_context/StudentAPIContext";
import { stuUpdatesApplicationDetailsReducer } from "../../reducers/stuUpdatesApplicationDetailsReducer";
import Error from "../../components/Error/Error";
import "./StuUpdatesApplicationDetails.css";
import OrgProgramDetails from "../../components/OrgProgramDetails/OrgProgramDetails";
import StuUpdatesApplicationDetailsHeader from "../../components/StuUpdatesApplicationDetailsHeader/StuUpdatesApplicationDetailsHeader";
import StuUpdatesApplicationStatusInfo from "../../components/StuUpdatesApplicationStatusInfo/StuUpdatesApplicationStatusInfo";

const StuUpdatesApplicationDetails = () => {
  /*
   * state.choosedOption: to store the current selected Tab value
   *
   * state.responseData: to store the Data, that we will get from API call
   *
   * state.loading: to show LoadingProgress till we are getting Data
   *
   * state.error: to show any error, if we get from API call
   */
  const [state, dispatch] = useReducer(stuUpdatesApplicationDetailsReducer, {
    choosedOption: "Application",
    responseData: null,
    loading: true,
    error: "",
  });

  const { applicationId } = useParams<{ applicationId: string }>();
  const history = useHistory();
  const { getSpecificFilledApplicationDetails } = useStudentAPI();

  /*
   * This useEffect is much same as useEffect of StuUpdatesOrganisationDetails
   *
   * Only API call is different
   */
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
    <div className="StuUpdatesApplicationDetailsPage Page">
      {/* Show LoadingProgress component */}
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Details..."
        />
      )}

      {/* Show StuUpdatesApplicationDetailsHeader component */}
      <StuUpdatesApplicationDetailsHeader
        state={state}
        dispatch={dispatch}
        entity="STUDENT"
      />

      {state.error.length === 0 ? (
        /*
         * Show Data only when we have no error
         */
        <>
          {state.choosedOption === "Application" && (
            /*
             * If current selected Tab is "Application", then
             * Show StuUpdatesApplicationStatusInfo component
             */
            <StuUpdatesApplicationStatusInfo state={state} />
          )}

          {state.choosedOption === "Program Details" && (
            /*
             * If current selected Tab is "Program Details", then
             * Show OrgProgramDetails component
             */
            <OrgProgramDetails
              state={{
                loading: state.loading,
                error: state.error,
                responseData: state.responseData?.programDetails ?? null,
              }}
            />
          )}
        </>
      ) : (
        // Else Show error
        <div className="ErrorDiv">
          <Error message={state.error} />
        </div>
      )}
    </div>
  );
};

export default StuUpdatesApplicationDetails;
