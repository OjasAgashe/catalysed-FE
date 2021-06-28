import React, { useCallback, useMemo, useState } from "react";
import {
  OrgInvitationResponseData,
  OrgProgramInvitationActionType,
  OrgProgramInvitationState,
} from "../../types/OrgProgramDetails";
import OrgProgramInvitationDataContainer from "./OrgProgramInvitationDataContainer";
import SearchBar from "./SearchBar";
import Error from "../Error/Error";

type OrgProgramInvitationDetailsProps = {
  state: OrgProgramInvitationState;
  dispatch: React.Dispatch<OrgProgramInvitationActionType>;
};

const OrgProgramInvitationDetails = ({
  state,
  dispatch,
}: OrgProgramInvitationDetailsProps) => {
  const [filteredResponseData, setFilteredResponseData] = useState<
    OrgInvitationResponseData[]
  >([]);

  const filterAcceptedResponseData = useMemo(
    () =>
      state.responseData !== null &&
      state.responseData.filter((data) => data.responseStatus === "ACCEPTED"),
    [state.responseData]
  );

  const filterAcceptedTempFilteredData = useCallback(
    (tempFilteredData: OrgInvitationResponseData[]) =>
      tempFilteredData.filter((data) => data.responseStatus === "ACCEPTED"),
    []
  );

  const filterPendingResponseData = useMemo(
    () =>
      state.responseData !== null &&
      state.responseData.filter((data) => data.responseStatus === "PENDING"),
    [state.responseData]
  );

  const filterPendingTempFilteredData = useCallback(
    (tempFilteredData: OrgInvitationResponseData[]) =>
      tempFilteredData.filter((data) => data.responseStatus === "PENDING"),
    []
  );

  const filterMentorResponseData = useMemo(
    () =>
      state.responseData !== null &&
      state.responseData.filter((data) => data.userType === "MENTOR"),
    [state.responseData]
  );

  const filterMentorTempFilteredData = useCallback(
    (tempFilteredData: OrgInvitationResponseData[]) =>
      tempFilteredData.filter((data) => data.userType === "MENTOR"),
    []
  );

  const filterStudentResponseData = useMemo(
    () =>
      state.responseData !== null &&
      state.responseData.filter((data) => data.userType === "STUDENT"),
    [state.responseData]
  );

  const filterStudentTempFilteredData = useCallback(
    (tempFilteredData: OrgInvitationResponseData[]) =>
      tempFilteredData.filter((data) => data.userType === "STUDENT"),
    []
  );

  const sortDateByLatestUsing = useCallback(
    (obj1: OrgInvitationResponseData, obj2: OrgInvitationResponseData) => {
      const DateOne = new Date(obj1.sentAt);
      const DateTwo = new Date(obj2.sentAt);

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
    (obj1: OrgInvitationResponseData, obj2: OrgInvitationResponseData) => {
      const DateOne = new Date(obj1.sentAt);
      const DateTwo = new Date(obj2.sentAt);

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

  return (
    <div className="OrgProgramInvitationDetails">
      <div className="OrgProgramInvitationDetailsContainer">
        {state.responseData !== null && state.responseData.length ? (
          <>
            <SearchBar
              state={state}
              dispatch={dispatch}
              setFilteredResponseData={setFilteredResponseData}
              filterAcceptedTempFilteredData={filterAcceptedTempFilteredData}
              filterPendingTempFilteredData={filterPendingTempFilteredData}
              filterMentorTempFilteredData={filterMentorTempFilteredData}
              filterStudentTempFilteredData={filterStudentTempFilteredData}
              sortDateByLatestUsing={sortDateByLatestUsing}
              sortDateByOldestUsing={sortDateByOldestUsing}
            />

            <OrgProgramInvitationDataContainer
              filteredResponseData={filteredResponseData}
              state={state}
              dispatch={dispatch}
              setFilteredResponseData={setFilteredResponseData}
              filterAcceptedResponseData={filterAcceptedResponseData}
              filterPendingResponseData={filterPendingResponseData}
              filterMentorResponseData={filterMentorResponseData}
              filterStudentResponseData={filterStudentResponseData}
              filterAcceptedTempFilteredData={filterAcceptedTempFilteredData}
              filterPendingTempFilteredData={filterPendingTempFilteredData}
              filterMentorTempFilteredData={filterMentorTempFilteredData}
              filterStudentTempFilteredData={filterStudentTempFilteredData}
              sortDateByLatestUsing={sortDateByLatestUsing}
              sortDateByOldestUsing={sortDateByOldestUsing}
            />
          </>
        ) : (
          <div className="ErrorCompContainer">
            <Error message="You have not sent any Invitation yet !!" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgProgramInvitationDetails;
