/*
 * This component is same as OrgProgramInvitationDetails, difference is that
 * we are dealing with applicants data
 */

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
import "./OrgProgramApplicantDetails.css";

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

  const filterAcceptedResponseData = useMemo(() => {
    return (
      state.responseData !== null &&
      state.responseData.filter((data) => data.status === "APPROVED")
    );
  }, [state.responseData]);

  const filterAcceptedTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramApplicantData[]) =>
      tempFilteredData.filter((data) => data.status === "APPROVED"),
    []
  );

  const filterPendingResponseData = useMemo(() => {
    return (
      state.responseData !== null &&
      state.responseData.filter((data) => data.status === "PENDING")
    );
  }, [state.responseData]);

  const filterPendingTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramApplicantData[]) =>
      tempFilteredData.filter((data) => data.status === "PENDING"),
    []
  );

  const filterRejectedResponseData = useMemo(() => {
    return (
      state.responseData !== null &&
      state.responseData.filter((data) => data.status === "REJECTED")
    );
  }, [state.responseData]);

  const filterRejectedTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramApplicantData[]) =>
      tempFilteredData.filter((data) => data.status === "REJECTED"),
    []
  );

  const filterViewedResponseData = useMemo(() => {
    return (
      state.responseData !== null &&
      state.responseData.filter((data) => data.viewedByOrg)
    );
  }, [state.responseData]);

  const filterViewedTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramApplicantData[]) =>
      tempFilteredData.filter((data) => data.viewedByOrg),
    []
  );

  const filterNotViewedResponseData = useMemo(() => {
    return (
      state.responseData !== null &&
      state.responseData.filter((data) => data.viewedByOrg === false)
    );
  }, [state.responseData]);

  const filterNotViewedTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramApplicantData[]) =>
      tempFilteredData.filter((data) => data.viewedByOrg === false),
    []
  );
  const sortDateByLatestUsing = useCallback(
    (obj1: OrgProgramApplicantData, obj2: OrgProgramApplicantData) => {
      const DateOne = new Date(obj1.appliedOn);
      const DateTwo = new Date(obj2.appliedOn);

      const [day1, month1, year1] = [
        DateOne.getDate(),
        DateOne.getMonth(),
        DateOne.getFullYear(),
      ];
      const [day2, month2, year2] = [
        DateTwo.getDate(),
        DateTwo.getMonth(),
        DateOne.getFullYear(),
      ];

      return new Date(year1, month1, day1) > new Date(year2, month2, day2)
        ? 1
        : -1;
    },
    []
  );

  const sortDateByOldestUsing = useCallback(
    (obj1: OrgProgramApplicantData, obj2: OrgProgramApplicantData) => {
      const DateOne = new Date(obj1.appliedOn);
      const DateTwo = new Date(obj2.appliedOn);

      const [day1, month1, year1] = [
        DateOne.getDate(),
        DateOne.getMonth(),
        DateOne.getFullYear(),
      ];
      const [day2, month2, year2] = [
        DateTwo.getDate(),
        DateTwo.getMonth(),
        DateOne.getFullYear(),
      ];

      return new Date(year1, month1, day1) > new Date(year2, month2, day2)
        ? -1
        : 1;
    },
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

    sortDateByLatestUsing,
    sortDateByOldestUsing,
  };

  return (
    <div className="OrgProgramApplicantDetails">
      <div className="OrgProgramApplicantDetailsContainer">
        {state.responseData !== null && state.responseData.length ? (
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
