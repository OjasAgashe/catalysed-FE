import React, { useMemo, useReducer } from "react";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import Error from "../Error/Error";
import ConnectedToProgramTableRow from "./ConnectedToProgramTableRow";
import { OrgDirectoryDetailsCommonState } from "../../types/OrganisationDirectory";
import { orgDirectoryDetailsCTPSectionReducer } from "../../reducers/orgDirectoryDetailsCTPSectionReducer";
import { OrgSpecificApplicantDetailsState } from "../../types/OrgSpecificApplicantDetails";

type SectionProps = {
  state?: OrgDirectoryDetailsCommonState | null;
  applicantState?: OrgSpecificApplicantDetailsState | null;
};

const Section = ({ state = null, applicantState = null }: SectionProps) => {
  const [sectionState, sectionDispatch] = useReducer(
    orgDirectoryDetailsCTPSectionReducer,
    {
      filteredResponseData: null,
      selectedRadioForFilterState: "All",
      noFilteredData: "",
    }
  );

  const filterActiveResponseData = useMemo(() => {
    if (state?.responseData?.connectPrograms.length)
      return state?.responseData?.connectPrograms.filter(
        (data) => data.status === "PUBLISHED"
      );

    if (
      applicantState?.responseData?.applicationDetails.applicantType ===
      "MENTOR"
    ) {
      return applicantState?.responseData?.mentorDetails?.connectPrograms.filter(
        (data) => data.status === "PUBLISHED"
      );
    } else {
      return applicantState?.responseData?.studentDetails?.connectPrograms.filter(
        (data) => data.status === "PUBLISHED"
      );
    }
  }, [
    applicantState?.responseData?.applicationDetails.applicantType,
    applicantState?.responseData?.mentorDetails?.connectPrograms,
    applicantState?.responseData?.studentDetails?.connectPrograms,
    state?.responseData?.connectPrograms,
  ]);

  const filterInactiveResponseData = useMemo(() => {
    if (state?.responseData?.connectPrograms.length)
      return state?.responseData?.connectPrograms.filter(
        (data) => data.status === "SAVED_TO_DRAFT"
      );

    if (
      applicantState?.responseData?.applicationDetails.applicantType ===
      "MENTOR"
    ) {
      return applicantState?.responseData?.mentorDetails?.connectPrograms.filter(
        (data) => data.status === "SAVED_TO_DRAFT"
      );
    } else {
      return applicantState?.responseData?.studentDetails?.connectPrograms.filter(
        (data) => data.status === "SAVED_TO_DRAFT"
      );
    }
  }, [
    applicantState?.responseData?.applicationDetails.applicantType,
    applicantState?.responseData?.mentorDetails?.connectPrograms,
    applicantState?.responseData?.studentDetails?.connectPrograms,
    state?.responseData?.connectPrograms,
  ]);

  const handleDirectoryDetailsStateDropdownSelect = (
    eventKey: string | null
  ) => {
    if (eventKey) {
      sectionDispatch({
        type: "selectedRadioForFilterState",
        payload: eventKey,
      });
      sectionDispatch({ type: "noFilteredData", payload: "" });

      let tempFilteredData:
        | { programId: number; status: string; title: string }[] = [];

      if (state?.responseData?.connectPrograms.length)
        tempFilteredData = [...state?.responseData?.connectPrograms];

      if (
        applicantState?.responseData?.applicationDetails.applicantType ===
        "MENTOR"
      ) {
        if (applicantState?.responseData?.mentorDetails?.connectPrograms.length)
          tempFilteredData = [
            ...applicantState?.responseData?.mentorDetails?.connectPrograms,
          ];
      } else {
        if (
          applicantState?.responseData?.studentDetails?.connectPrograms.length
        )
          tempFilteredData = [
            ...applicantState?.responseData?.studentDetails?.connectPrograms,
          ];
      }

      if (eventKey === "Published")
        tempFilteredData = filterActiveResponseData as {
          programId: number;
          status: string;
          title: string;
        }[];

      if (eventKey === "In Draft")
        tempFilteredData = filterInactiveResponseData as {
          programId: number;
          status: string;
          title: string;
        }[];

      sectionDispatch({
        type: "filteredResponseData",
        payload: tempFilteredData,
      });

      if (eventKey && tempFilteredData && tempFilteredData.length === 0) {
        sectionDispatch({
          type: "noFilteredData",
          payload: "Sorry!! No Programs Found for This Option",
        });
      }
    }
  };

  return (
    <div className="OrgProgramInvitationDataContainer">
      <Table striped responsive="md">
        <thead>
          <tr className="ProgramInvitationTableRow">
            <th className="ProgramInvitationHeader">Program Name</th>
            <th className="ProgramInvitationHeader">
              <DropdownButton
                title={`Program Status${
                  sectionState.selectedRadioForFilterState !== "All"
                    ? `:${sectionState.selectedRadioForFilterState}`
                    : ""
                }`}
                className="ProgramFilterSortDropdown"
              >
                <Dropdown.Item
                  eventKey="All"
                  onSelect={handleDirectoryDetailsStateDropdownSelect}
                >
                  None
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Published"
                  onSelect={handleDirectoryDetailsStateDropdownSelect}
                >
                  Published
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="In Draft"
                  onSelect={handleDirectoryDetailsStateDropdownSelect}
                >
                  In Draft
                </Dropdown.Item>
              </DropdownButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {["Published", "In Draft"].includes(
            sectionState.selectedRadioForFilterState
          ) &&
          sectionState.filteredResponseData &&
          sectionState.filteredResponseData.length ? (
            [...sectionState.filteredResponseData]
              .reverse()
              .map((data) => (
                <ConnectedToProgramTableRow data={data} key={data.programId} />
              ))
          ) : (
            <tr
              style={
                sectionState.noFilteredData === "" ? { display: "none" } : {}
              }
            >
              <td colSpan={2}>
                <div className="ErrorCompContainer">
                  <Error message={sectionState.noFilteredData} />
                </div>
              </td>
            </tr>
          )}

          {!["Published", "In Draft"].includes(
            sectionState.selectedRadioForFilterState
          ) && state
            ? state?.responseData?.connectPrograms &&
              [...state?.responseData?.connectPrograms]
                .reverse()
                .map((data) => (
                  <ConnectedToProgramTableRow
                    data={data}
                    key={data.programId}
                  />
                ))
            : applicantState?.responseData?.applicationDetails.applicantType ===
              "MENTOR"
            ? applicantState?.responseData?.mentorDetails?.connectPrograms &&
              [...applicantState?.responseData?.mentorDetails?.connectPrograms]
                .reverse()
                .map((data) => (
                  <ConnectedToProgramTableRow
                    data={data}
                    key={data.programId}
                  />
                ))
            : applicantState?.responseData?.studentDetails?.connectPrograms &&
              [...applicantState?.responseData?.studentDetails?.connectPrograms]
                .reverse()
                .map((data) => (
                  <ConnectedToProgramTableRow
                    data={data}
                    key={data.programId}
                  />
                ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Section;
