/*
 * This file is much same as StuUpdatesOrganisationDetails page, only
 * we are dealing with Mentor Data instead of Student
 */

import React, { useEffect, useReducer } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import StuUpdatesOrganisationDetailsCommon from "../../components/StuUpdatesOrganisationDetailsCommon/StuUpdatesOrganisationDetailsCommon";
import StuUpdatesOrganisationDetailsInfo from "../../components/StuUpdatesOrganisationDetailsInfo/StuUpdatesOrganisationDetailsInfo";
import StuUpdatesOrganisationProgramsDetails from "../../components/StuUpdatesOrganisationProgramsDetails/StuUpdatesOrganisationProgramsDetails";
import { MENTOR_UPDATES_DETAILS_ORGANISATION } from "../../constants/Routes";
import { useMentorAPI } from "../../context/api_context/MentorAPIContext";
import { stuUpdatesOrganisationDetailsReducer } from "../../reducers/stuUpdatesOrganisationDetailsReducer";
import Error from "../../components/Error/Error";

const MentorUpdatesOrganisationDetails = () => {
  const location = useLocation();

  const [state, dispatch] = useReducer(stuUpdatesOrganisationDetailsReducer, {
    choosedOption:
      location.pathname.includes(MENTOR_UPDATES_DETAILS_ORGANISATION) &&
      location.pathname.includes("details")
        ? "Details"
        : location.pathname.includes(MENTOR_UPDATES_DETAILS_ORGANISATION) &&
          location.pathname.includes("programs")
        ? "Programs"
        : "",
    responseData: null,
    loading: true,
    error: "",
  });

  const { organisationId } = useParams<{ organisationId: string }>();
  const history = useHistory();
  const { getConnectedOrganisationDetails } = useMentorAPI();

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
    <div className="MentorUpdatesOrganisationDetailsPage Page">
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
        entity="MENTOR"
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

export default MentorUpdatesOrganisationDetails;
