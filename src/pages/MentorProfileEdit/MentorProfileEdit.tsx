/*
 * The logic for this file is much like the logic of OrgProfileEdit file,
 * the difference is that we are dealing with Mentor Profile data, in place
 * of Organisation Profile data
 */

import React, { useEffect, useReducer, useState } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgProfileCommonHeader from "../../components/OrgProfileCommonHeader/OrgProfileCommonHeader";
import { useMentorAPI } from "../../context/api_context/MentorAPIContext";
import { mentorProfileEditReducer } from "../../reducers/mentorProfileEditReducer";
import { MentorProfileEditData } from "../../types/MentorProfileEdit";
import Error from "../../components/Error/Error";
import "./MentorProfileEdit.css";
import MentorProfileEditSectionContainer from "../../components/MentorProfileEditSectionContainer/MentorProfileEditSectionContainer";

const MentorProfileEdit = () => {
  const [state, dispatch] = useReducer(mentorProfileEditReducer, {
    loading: true,
    loadingMessage: "",
    error: "",
    putCallError: "",
    validated: false,
    phoneValueIsInvalid: false,
    dataHasChanged: false,
    showModal: false,
    leave: false,
    stay: false,
    navigateToPath: "",
    responseData: null,
    phoneValue: "",
  });

  const [editedData, setEditedData] = useState<MentorProfileEditData | null>(
    null
  );

  const { getMentorProfile } = useMentorAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Mentor Profile Edit | CatalysEd";

    const getDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });

        const response = await getMentorProfile();

        dispatch({ type: "responseData", payload: response.data });

        dispatch({
          type: "phoneValue",
          payload: response.data.phone.countryCode + response.data.phone.number,
        });

        setEditedData(response.data);
      } catch (error) {
        dispatch({ type: "error", payload: "Sorry!! No Details Found" });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

    getDetails();
  }, [getMentorProfile]);

  return (
    <div className="MentorProfileEditPage Page">
      {(state.loading || state.loadingMessage) && (
        <LoadingProgress
          loading={state.loading || (state.loadingMessage ? true : false)}
          emailSent={false}
          loadingMessage={
            state.loading ? "Getting Details..." : state.loadingMessage
          }
        />
      )}

      <OrgProfileCommonHeader textToShow="Manage Your Profile" />

      {state.responseData === null ? (
        <div className="ErrorDiv">
          <Error message={state.error} />
        </div>
      ) : (
        // Show MentorProfileEditSectionContainer component
        <MentorProfileEditSectionContainer
          state={state}
          dispatch={dispatch}
          editedData={editedData}
          setEditedData={setEditedData}
        />
      )}
    </div>
  );
};

export default MentorProfileEdit;
