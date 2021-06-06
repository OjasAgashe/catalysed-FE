import React, { useCallback, useMemo, useState } from "react";
import {
  OrgInvitationDetailsData,
  OrgProgramInvitationActionType,
  OrgProgramInvitationState,
} from "../../types/OrgProgramDetails";
import OrgProgramInvitationDataContainer from "./OrgProgramInvitationDataContainer";
import "./OrgProgramInvitationDetails.css";
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
  const fakeData = useMemo(
    () => [
      {
        id: 1,
        name: "oj",
        email: "oj@gmail.com",
        type: "Mentor",
        sent_on: "02/06/2021",
        status: "Pending",
      },
      {
        id: 2,
        name: "Peter Parker",
        email: "Peter.Parker@gmail.com",
        type: "Student",
        sent_on: "01/06/2021",
        status: "Accepted",
      },
      {
        id: 3,
        name: "Wolfeschlegelsteinhausenbergerdorffwel",
        email:
          "contact-admin-hello-abcd@please-try-to.send-me-this-coz.this-is-but-to-be-honest.this-is-on-forever.pacraig.com",
        type: "Student",
        sent_on: "31/06/2021",
        status: "Pending",
      },
    ],
    []
  );

  const [filteredFakeData, setFilteredFakeData] = useState<
    OrgInvitationDetailsData[]
  >([]);

  const filterAcceptedFakeData = useMemo(
    () => fakeData.filter((data) => data.status === "Accepted"),
    [fakeData]
  );

  const filterAcceptedTempFilteredData = useCallback(
    (tempFilteredData: OrgInvitationDetailsData[]) =>
      tempFilteredData.filter((data) => data.status === "Accepted"),
    []
  );

  const filterPendingFakeData = useMemo(
    () => fakeData.filter((data) => data.status === "Pending"),
    [fakeData]
  );

  const filterPendingTempFilteredData = useCallback(
    (tempFilteredData: OrgInvitationDetailsData[]) =>
      tempFilteredData.filter((data) => data.status === "Pending"),
    []
  );

  const filterMentorFakeData = useMemo(
    () => fakeData.filter((data) => data.type === "Mentor"),
    [fakeData]
  );

  const filterMentorTempFilteredData = useCallback(
    (tempFilteredData: OrgInvitationDetailsData[]) =>
      tempFilteredData.filter((data) => data.type === "Mentor"),
    []
  );

  const filterStudentFakeData = useMemo(
    () => fakeData.filter((data) => data.type === "Student"),
    [fakeData]
  );

  const filterStudentTempFilteredData = useCallback(
    (tempFilteredData: OrgInvitationDetailsData[]) =>
      tempFilteredData.filter((data) => data.type === "Student"),
    []
  );

  const sortDateByLatestUsing = useCallback(
    (obj1: OrgInvitationDetailsData, obj2: OrgInvitationDetailsData) => {
      const [day1, month1, year1] = obj1.sent_on.split("/");
      const [day2, month2, year2] = obj2.sent_on.split("/");

      return new Date(parseInt(year1), parseInt(month1) - 1, parseInt(day1)) >
        new Date(parseInt(year2), parseInt(month2) - 1, parseInt(day2))
        ? 1
        : -1;
    },
    []
  );

  const sortDateByOldestUsing = useCallback(
    (obj1: OrgInvitationDetailsData, obj2: OrgInvitationDetailsData) => {
      const [day1, month1, year1] = obj1.sent_on.split("/");
      const [day2, month2, year2] = obj2.sent_on.split("/");

      return new Date(parseInt(year1), parseInt(month1) - 1, parseInt(day1)) >
        new Date(parseInt(year2), parseInt(month2) - 1, parseInt(day2))
        ? -1
        : 1;
    },
    []
  );

  return (
    <div className="OrgProgramInvitationDetails">
      <div className="OrgProgramInvitationDetailsContainer">
        {fakeData.length ? (
          <>
            <SearchBar
              fakeData={fakeData}
              state={state}
              dispatch={dispatch}
              setFilteredFakeData={setFilteredFakeData}
              filterAcceptedTempFilteredData={filterAcceptedTempFilteredData}
              filterPendingTempFilteredData={filterPendingTempFilteredData}
              filterMentorTempFilteredData={filterMentorTempFilteredData}
              filterStudentTempFilteredData={filterStudentTempFilteredData}
              sortDateByLatestUsing={sortDateByLatestUsing}
              sortDateByOldestUsing={sortDateByOldestUsing}
            />

            <OrgProgramInvitationDataContainer
              fakeData={fakeData}
              filteredFakeData={filteredFakeData}
              state={state}
              dispatch={dispatch}
              setFilteredFakeData={setFilteredFakeData}
              filterAcceptedFakeData={filterAcceptedFakeData}
              filterPendingFakeData={filterPendingFakeData}
              filterMentorFakeData={filterMentorFakeData}
              filterStudentFakeData={filterStudentFakeData}
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
