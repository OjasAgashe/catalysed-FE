import React, { useEffect, useReducer } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import StuUpdatesOrganisationDetailsCommon from "../../components/StuUpdatesOrganisationDetailsCommon/StuUpdatesOrganisationDetailsCommon";
import StuUpdatesOrganisationDetailsInfo from "../../components/StuUpdatesOrganisationDetailsInfo/StuUpdatesOrganisationDetailsInfo";
import StuUpdatesOrganisationProgramsDetails from "../../components/StuUpdatesOrganisationProgramsDetails/StuUpdatesOrganisationProgramsDetails";
import { STUDENT_UPDATES_DETAILS_ORGANISATION } from "../../constants/Routes";
import { useStudentAPI } from "../../context/api_context/StudentAPIContext";
import { stuUpdatesOrganisationDetailsReducer } from "../../reducers/stuUpdatesOrganisationDetailsReducer";
import Error from "../../components/Error/Error";
import "./StuUpdatesOrganisationDetails.css";

const StuUpdatesOrganisationDetails = () => {
  const location = useLocation();

  const [state, dispatch] = useReducer(stuUpdatesOrganisationDetailsReducer, {
    choosedOption:
      location.pathname.includes(STUDENT_UPDATES_DETAILS_ORGANISATION) &&
      location.pathname.includes("details")
        ? "Details"
        : location.pathname.includes(STUDENT_UPDATES_DETAILS_ORGANISATION) &&
          location.pathname.includes("programs")
        ? "Programs"
        : "",
    responseData: null,
    loading: true,
    error: "",
  });

  const { organisationId } = useParams<{ organisationId: string }>();
  const history = useHistory();
  const { getConnectedOrganisationDetails } = useStudentAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = `Connected Organisation ${state.choosedOption} | CatalysEd`;

    const getDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });

        const response = await getConnectedOrganisationDetails(
          parseInt(organisationId)
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
    getConnectedOrganisationDetails,
    history,
    organisationId,
    state.choosedOption,
  ]);

  return (
    <div className="StuUpdatesOrganisationDetailsPage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Details..."
        />
      )}

      <StuUpdatesOrganisationDetailsCommon
        state={state}
        dispatch={dispatch}
        organisationId={parseInt(organisationId)}
        entity="STUDENT"
      />

      {state.error.length === 0 ? (
        <>
          {state.choosedOption === "Details" && (
            <StuUpdatesOrganisationDetailsInfo
              orgDetails={state.responseData?.orgDetails ?? null}
            />
          )}

          {state.choosedOption === "Programs" && (
            <StuUpdatesOrganisationProgramsDetails
              programs={state.responseData?.programs ?? null}
            />
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

export default StuUpdatesOrganisationDetails;
