import React, { useEffect, useReducer, useState } from "react";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgProfileCommonHeader from "../../components/OrgProfileCommonHeader/OrgProfileCommonHeader";
import OrgProfileEditSectionContainer from "../../components/OrgProfileEditSectionContainer/OrgProfileEditSectionContainer";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { orgProfileEditReducer } from "../../reducers/orgProfileEditReducer";
import { OrgProfileEditData } from "../../types/OrgProfileEdit";
import Error from "../../components/Error/Error";
import "./OrgProfileEdit.css";

const OrgProfileEdit = () => {
  const [state, dispatch] = useReducer(orgProfileEditReducer, {
    loading: true,
    loadingMessage: "",
    error: "",
    putCallError: "",
    validated: false,
    phoneValueIsInvalid: false,
    socialLinkIsInvalid: false,
    websiteLinkIsInvalid: false,
    dataHasChanged: false,
    showModal: false,
    leave: false,
    stay: false,
    navigateToPath: "",
    responseData: null,
    phoneValue: "",
  });

  const [editedData, setEditedData] = useState<OrgProfileEditData | null>(null);

  const { getOrganisationProfile } = useOrgAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Org Profile Edit | CatalysEd";

    const getDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });

        const response = await getOrganisationProfile();

        dispatch({ type: "responseData", payload: response.data });

        dispatch({
          type: "phoneValue",
          payload:
            response.data.organizationDetails.phone.countryCode +
            response.data.organizationDetails.phone.number,
        });

        setEditedData(response.data);
      } catch (error) {
        dispatch({ type: "error", payload: "Sorry!! No Details Found" });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

    getDetails();
  }, [getOrganisationProfile]);

  return (
    <div className="OrgProfileEditPage Page">
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
        <OrgProfileEditSectionContainer
          state={state}
          dispatch={dispatch}
          editedData={editedData}
          setEditedData={setEditedData}
        />
      )}
    </div>
  );
};

export default OrgProfileEdit;
