import React, { useEffect, useReducer } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import OrgProgramDetailsCommon from "../../components/OrgProgramDetailsCommon/OrgProgramDetailsCommon";
import OrgProgramInvitationDetails from "../../components/OrgProgramInvitationDetails/OrgProgramInvitationDetails";
import OrgProgramInvitationModal from "../../components/OrgProgramInvitationModal/OrgProgramInvitationModal";
import { orgProgramInvitationReducer } from "../../reducers/orgProgramInvitationReducer";
import "./OrgProgramDetailsPage.css";

const OrgProgramInvitationsPage = () => {
  const { programId } = useParams<{ programId: string }>();
  const [state, dispatch] = useReducer(orgProgramInvitationReducer, {
    showInvitationModal: false,
    loading: false,
    error: "",
    validated: false,
    searchedName: "",
    searchedNotPresentText: "",
    selectedRadioForFilter: "All",
    selectedRadioForFilterType: "All",
    selectedRadioForSort: "All",
  });

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Program Invitations | CatalysEd";
  }, []);

  return (
    <div className="OrgProgramInvitationsPage">
      <OrgProgramDetailsCommon
        programTitle="Temp Title"
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

      <OrgProgramInvitationModal state={state} dispatch={dispatch} />

      <OrgProgramInvitationDetails state={state} dispatch={dispatch} />
    </div>
  );
};

export default OrgProgramInvitationsPage;
