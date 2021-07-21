import React, { useEffect, useReducer } from "react";
import { Alert } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgProgramDetailsCommon from "../../components/OrgProgramDetailsCommon/OrgProgramDetailsCommon";
import OrgProgramInvitationDetails from "../../components/OrgProgramInvitationDetails/OrgProgramInvitationDetails";
import OrgProgramInvitationModal from "../../components/OrgProgramInvitationModal/OrgProgramInvitationModal";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { orgProgramInvitationReducer } from "../../reducers/orgProgramInvitationReducer";
import "./OrgProgramDetailsPage.css";

const OrgProgramInvitationsPage = () => {
  const [state, dispatch] = useReducer(orgProgramInvitationReducer, {
    reRenderComponent: false,
    showInvitationModal: false,
    loading: true,
    formLoadingMessage: "",
    error: "",
    formError: "",
    validated: false,
    searchedName: "",
    searchedNotPresentText: "",
    selectedRadioForFilter: "All",
    selectedRadioForFilterType: "All",
    selectedRadioForSort: "All",
    programTitle: "",
    programStatus: "",
    responseData: null,
  });

  const { programId } = useParams<{ programId: string }>();
  const history = useHistory();
  const { getProgramDetails, getProgramInvitations } = useOrgAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Program Invitations | CatalysEd";

    if (state.reRenderComponent)
      dispatch({ type: "reRenderComponent", payload: false });

    const getTitleStatusInvitationDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });
        const programDetailsResponse = await getProgramDetails(
          parseInt(programId)
        );
        const programInvitationsResponse = await getProgramInvitations(
          parseInt(programId)
        );

        dispatch({
          type: "programTitle",
          payload: programDetailsResponse.data.title,
        });
        dispatch({
          type: "programStatus",
          payload: programDetailsResponse.data.status,
        });
        dispatch({
          type: "responseData",
          payload: programInvitationsResponse.data,
        });

        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          history.push("*");
        } else {
          dispatch({ type: "loading", payload: false });
          dispatch({ type: "error", payload: "Sorry!! No Invitations Found" });
        }
      }
    };

    getTitleStatusInvitationDetails();
  }, [
    getProgramDetails,
    getProgramInvitations,
    history,
    programId,
    state.reRenderComponent,
  ]);

  return (
    <div className="OrgProgramInvitationsPage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage={
            state.formLoadingMessage
              ? state.formLoadingMessage
              : "Getting Invitations..."
          }
        />
      )}

      <OrgProgramDetailsCommon
        programTitle={state.programTitle}
        programId={parseInt(programId)}
      />

      <div className="SendNewInvitationTextContainer">
        <Alert variant="info" className="SendNewInvitationText">
          💡 Want to send a new invitation?&nbsp;Then&nbsp;
          <button
            className="SendNewInvitationClickHere"
            onClick={() =>
              dispatch({ type: "showInvitationModal", payload: true })
            }
          >
            click here
          </button>
        </Alert>
      </div>

      <OrgProgramInvitationModal
        programId={programId}
        state={state}
        dispatch={dispatch}
      />

      <OrgProgramInvitationDetails state={state} dispatch={dispatch} />
    </div>
  );
};

export default OrgProgramInvitationsPage;
