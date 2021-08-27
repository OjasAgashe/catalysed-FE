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
  /*
   * To store the filtered list of Invitations based on the searched
   * name, or choosed filter option
   */
  const [filteredResponseData, setFilteredResponseData] = useState<
    OrgInvitationResponseData[]
  >([]);

  // Filter the Accepted Invitations from the whole sended Invitations
  const filterAcceptedResponseData = useMemo(
    () =>
      state.responseData !== null &&
      state.responseData.filter((data) => data.responseStatus === "ACCEPTED"),
    [state.responseData]
  );

  // Filter the Accepted Invitations from tempFilteredData
  const filterAcceptedTempFilteredData = useCallback(
    (tempFilteredData: OrgInvitationResponseData[]) =>
      tempFilteredData.filter((data) => data.responseStatus === "ACCEPTED"),
    []
  );

  // Filter the Pending Invitations from the whole sended Invitations
  const filterPendingResponseData = useMemo(
    () =>
      state.responseData !== null &&
      state.responseData.filter((data) => data.responseStatus === "PENDING"),
    [state.responseData]
  );

  // Filter the Pending Invitations from tempFilteredData
  const filterPendingTempFilteredData = useCallback(
    (tempFilteredData: OrgInvitationResponseData[]) =>
      tempFilteredData.filter((data) => data.responseStatus === "PENDING"),
    []
  );

  // Filter the Mentor Invitations from the whole sended Invitations
  const filterMentorResponseData = useMemo(
    () =>
      state.responseData !== null &&
      state.responseData.filter((data) => data.userType === "MENTOR"),
    [state.responseData]
  );

  // Filter the Mentor Invitations from tempFilteredData
  const filterMentorTempFilteredData = useCallback(
    (tempFilteredData: OrgInvitationResponseData[]) =>
      tempFilteredData.filter((data) => data.userType === "MENTOR"),
    []
  );

  // Filter the Student Invitations from the whole sended Invitations
  const filterStudentResponseData = useMemo(
    () =>
      state.responseData !== null &&
      state.responseData.filter((data) => data.userType === "STUDENT"),
    [state.responseData]
  );

  // Filter the Student Invitations from tempFilteredData
  const filterStudentTempFilteredData = useCallback(
    (tempFilteredData: OrgInvitationResponseData[]) =>
      tempFilteredData.filter((data) => data.userType === "STUDENT"),
    []
  );

  // Use this helper function to Sort Date by Latest
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

  // Use this helper function to Sort Date by Oldest
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
          /*
           * Show the list of Invitations only when we have something to Show
           */
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
          /*
           * When we have nothing to show then show an error
           */
          <div className="ErrorCompContainer">
            <Error message="You have not sent any Invitation yet !!" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgProgramInvitationDetails;
