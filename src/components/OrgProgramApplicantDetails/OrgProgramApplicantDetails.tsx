import React, { useCallback, useMemo, useState } from "react";
import {
  OrgProgramApplicantActionType,
  OrgProgramApplicantData,
  OrgProgramApplicantState,
  OrgProgramApplicantValues,
} from "../../types/OrgProgramDetails";
import OrgProgramApplicantDataContainer from "./OrgProgramApplicantDataContainer";
import "./OrgProgramApplicantDetails.css";

type OrgProgramApplicantDetailsProps = {
  state: OrgProgramApplicantState;
  dispatch: React.Dispatch<OrgProgramApplicantActionType>;
  fakeData: OrgProgramApplicantData[];
};

const OrgProgramApplicantDetails = ({
  state,
  dispatch,
  fakeData,
}: OrgProgramApplicantDetailsProps) => {
  const [filteredResponseData, setFilteredResponseData] = useState<
    OrgProgramApplicantData[]
  >([]);

  const filterAcceptedResponseData = useMemo(
    () => fakeData.filter((data) => data.status === "accepted"),
    [fakeData]
  );

  const filterAcceptedTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramApplicantData[]) =>
      tempFilteredData.filter((data) => data.status === "accepted"),
    []
  );

  const filterPendingResponseData = useMemo(
    () => fakeData.filter((data) => data.status === "pending"),
    [fakeData]
  );

  const filterPendingTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramApplicantData[]) =>
      tempFilteredData.filter((data) => data.status === "pending"),
    []
  );

  const filterRejectedResponseData = useMemo(
    () => fakeData.filter((data) => data.status === "rejected"),
    [fakeData]
  );

  const filterRejectedTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramApplicantData[]) =>
      tempFilteredData.filter((data) => data.status === "rejected"),
    []
  );

  const filterViewedResponseData = useMemo(
    () => fakeData.filter((data) => data.viewed === "yes"),
    [fakeData]
  );

  const filterViewedTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramApplicantData[]) =>
      tempFilteredData.filter((data) => data.viewed === "yes"),
    []
  );

  const filterNotViewedResponseData = useMemo(
    () => fakeData.filter((data) => data.viewed === "no"),
    [fakeData]
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
        <OrgProgramApplicantDataContainer
          fakeData={fakeData}
          state={state}
          dispatch={dispatch}
          values={values}
        />
      </div>
    </div>
  );
};

export default OrgProgramApplicantDetails;
