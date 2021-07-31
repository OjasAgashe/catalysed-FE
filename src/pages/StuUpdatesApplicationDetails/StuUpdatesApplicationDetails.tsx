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
  const [state, dispatch] = useReducer(stuUpdatesApplicationDetailsReducer, {
    choosedOption: "Application",
    responseData: null,
    loading: true,
    error: "",
  });

  const { applicationId } = useParams<{ applicationId: string }>();
  const history = useHistory();
  const { getSpecificFilledApplicationDetails } = useStudentAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = `Connected Application ${
      state.choosedOption === "Application" ? "Details" : "Program Details"
    }`;

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
  }, [
    applicationId,
    getSpecificFilledApplicationDetails,
    history,
    state.choosedOption,
  ]);

  return (
    <div className="StuUpdatesApplicationDetailsPage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Details..."
        />
      )}

      <StuUpdatesApplicationDetailsHeader state={state} dispatch={dispatch} />

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

export default StuUpdatesApplicationDetails;
