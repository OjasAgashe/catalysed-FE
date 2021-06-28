import React, { useCallback, useMemo, useState } from "react";
import {
  OrgProgramApplicantActionType,
  OrgProgramApplicantData,
  OrgProgramApplicantState,
  OrgProgramApplicantValues,
} from "../../types/OrgProgramDetails";
import OrgProgramApplicantDataContainer from "./OrgProgramApplicantDataContainer";
import Error from "../Error/Error";
import SearchBar from "./SearchBar";

type OrgProgramApplicantDetailsProps = {
  state: OrgProgramApplicantState;
  dispatch: React.Dispatch<OrgProgramApplicantActionType>;
};

const OrgProgramApplicantDetails = ({
  state,
  dispatch,
}: OrgProgramApplicantDetailsProps) => {
  const [filteredResponseData, setFilteredResponseData] = useState<
    OrgProgramApplicantData[]
  >([]);

  const filterAcceptedResponseData = useMemo(
    () => state.fakeData.filter((data) => data.status === "accepted"),
    [state.fakeData]
  );

  const filterAcceptedTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramApplicantData[]) =>
      tempFilteredData.filter((data) => data.status === "accepted"),
    []
  );

  const filterPendingResponseData = useMemo(
    () => state.fakeData.filter((data) => data.status === "pending"),
    [state.fakeData]
  );

  const filterPendingTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramApplicantData[]) =>
      tempFilteredData.filter((data) => data.status === "pending"),
    []
  );

  const filterRejectedResponseData = useMemo(
    () => state.fakeData.filter((data) => data.status === "rejected"),
    [state.fakeData]
  );

  const filterRejectedTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramApplicantData[]) =>
      tempFilteredData.filter((data) => data.status === "rejected"),
    []
  );

  const filterViewedResponseData = useMemo(
    () => state.fakeData.filter((data) => data.viewed === "yes"),
    [state.fakeData]
  );

  const filterViewedTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramApplicantData[]) =>
      tempFilteredData.filter((data) => data.viewed === "yes"),
    []
  );

  const filterNotViewedResponseData = useMemo(
    () => state.fakeData.filter((data) => data.viewed === "no"),
    [state.fakeData]
  );

  const filterNotViewedTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramApplicantData[]) =>
      tempFilteredData.filter((data) => data.viewed === "no"),
    []
  );

  const values: OrgProgramApplicantValues = {
    filteredResponseData,
    filterAcceptedResponseData,
    filterPendingResponseData,
    filterRejectedResponseData,
    filterViewedResponseData,
    filterNotViewedResponseData,

    setFilteredResponseData,
    filterAcceptedTempFilteredData,
    filterPendingTempFilteredData,
    filterRejectedTempFilteredData,
    filterViewedTempFilteredData,
    filterNotViewedTempFilteredData,
  };

  return (
    <div className="OrgProgramApplicantDetails">
      <div className="OrgProgramApplicantDetailsContainer">
        {state.fakeData !== null && state.fakeData.length ? (
          <>
            <SearchBar state={state} dispatch={dispatch} values={values} />

            <OrgProgramApplicantDataContainer
              state={state}
              dispatch={dispatch}
              values={values}
            />
          </>
        ) : (
          <div className="ErrorCompContainer">
            <Error message="No Applicants found for this Program !!" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgProgramApplicantDetails;
