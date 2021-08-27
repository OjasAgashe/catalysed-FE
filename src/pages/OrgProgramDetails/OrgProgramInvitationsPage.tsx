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
  /*
   * state.reRenderComponent: to render component, when we will send an
   * Invitation then to show the latest sended invitation in list. We will
   * reRender the Invitation page
   *
   * state.showInvitationModal: to show or hide the Invitation Modal
   *
   * state.loading: to show the LoadingProgress component, when we are getting
   * all the sended Invitations
   *
   * state.formLoadingMessage: to show the LoadingProgress component, when the
   * user clicks to send a new Invitation, with the new Message (other then
   * state.loading)
   *
   * state.error: to show any error, if we get while getting all the sended
   * Invitations
   *
   * state.formError: to show error related to the form, that has been shown in
   * the Invitation Modal
   *
   * state.validated: to validated form of Invitation Modal
   *
   * state.searchedName: to store the name that user typed to search
   *
   * state.searchedNotPresentText: to show an error when user tries to search a
   * name that is not present, or tries to filter by an option and we do not get
   * any data for that option
   *
   * state.selectedRadioForFilter, state.selectedRadioForFilterType, and
   * state.selectedRadioForSort: to store the selected option of filter and sort
   *
   * state.programTitle: to store the programTitle, we will send it in Header
   *
   * state.programStatus: to store the programStatus, as the form in the
   * Invitation Modal will only be visible when the program status is Published
   *
   * state.responseData: to store the list of all the sended invitations
   */
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
    /*
     * Whenever anyone visits this page first time, we want to show
     * the scrollbar on Top
     */
    document.documentElement.scrollTop = 0;

    // Set the document title
    document.title = "Program Invitations | CatalysEd";

    /*
     * If state.reRenderComponent has true value, then set it to
     * false. So that we can set it to true again, if we want to
     * reRender
     */
    if (state.reRenderComponent)
      dispatch({ type: "reRenderComponent", payload: false });

    /*
     * Function calling API, and getting all the Data needed
     * for this page
     */
    const getTitleStatusInvitationDetails = async () => {
      try {
        /*
         * Previously if we have shown any error, then hide it
         */
        dispatch({ type: "error", payload: "" });

        /*
         * Get the Program Details, so that we can get program title
         * and program status from that
         */
        const programDetailsResponse = await getProgramDetails(
          parseInt(programId)
        );

        // Get all the sended Invitations
        const programInvitationsResponse = await getProgramInvitations(
          parseInt(programId)
        );

        // Store the Program title
        dispatch({
          type: "programTitle",
          payload: programDetailsResponse.data.title,
        });

        // Store the Program status
        dispatch({
          type: "programStatus",
          payload: programDetailsResponse.data.status,
        });

        // Store the list of Invitations
        dispatch({
          type: "responseData",
          payload: programInvitationsResponse.data,
        });

        // After storing everything, hide the LoadingProgress component
        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          /*
           * If we get 404 error then push the user to PageNotFound
           */
          history.push("*");
        } else {
          /*
           * If we get any other error, other then 404, then first hide
           * the LoadingProgress component
           */
          dispatch({ type: "loading", payload: false });

          // And then show that error
          dispatch({ type: "error", payload: "Sorry!! No Invitations Found" });
        }
      }
    };

    // Call getTitleStatusInvitationDetails function
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
      {/* Show LoadingProgress component */}
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

      {/* Show OrgProgramDetailsCommon component */}
      <OrgProgramDetailsCommon
        programTitle={state.programTitle}
        programId={parseInt(programId)}
      />

      {/* Give option to send a new Invitation */}
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

      {/*
       * If user selected to send a new Invitation, then show
       * OrgProgramInvitationModal component
       */}
      <OrgProgramInvitationModal
        programId={programId}
        state={state}
        dispatch={dispatch}
      />

      {/* Show OrgProgramInvitationDetials component */}
      <OrgProgramInvitationDetails state={state} dispatch={dispatch} />
    </div>
  );
};

export default OrgProgramInvitationsPage;
