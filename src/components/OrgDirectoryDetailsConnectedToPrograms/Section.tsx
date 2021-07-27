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

/*
 * Section : component accepts state and applicantState as props
 */
const Section = ({ state = null, applicantState = null }: SectionProps) => {
  /*
   * We are maintaining filteredResponseData, selectedRadioForFilterState, and
   * noFilteredData states because the Org can filter programs based on current
   * program status,
   *
   * That's program is in PUBLISHED state, or it is in SAVED_TO_DRAFT state
   *
   * sectionState.filteredResponseData : will contain the filtered data
   *
   * sectionState.selectedRadioForFilterState : will store the value according to which
   * the Org wants to filter
   *
   * state.noFilteredData : will contain the message, when there is a value in
   * state.selectedRadioForFilterState (other than "All") but state.fitleredResponseData
   * is an empty Array
   */
  const [sectionState, sectionDispatch] = useReducer(
    orgDirectoryDetailsCTPSectionReducer,
    {
      filteredResponseData: null,
      selectedRadioForFilterState: "All",
      noFilteredData: "",
    }
  );

  /*
   * filtering all the data, when status of the program is "PUBLISHED"
   */
  const filterActiveResponseData = useMemo(() => {
    /*
     * if we have value of state (means we do not have value of applicantState),
     * then filter its value
     */
    if (state?.responseData?.connectPrograms.length)
      return state?.responseData?.connectPrograms.filter(
        (data) => data.status === "PUBLISHED"
      );

    /*
     * But If we have value of applicantState (means do not have value of state),
     * then filter according to its value
     *
     * As the applicant can be of Mentor type or Student type, So when
     * the applicant type is mentor, use its connected to programs information
     * else use the connected to programs information of student
     */
    if (
      applicantState?.responseData?.applicationDetails.applicantType ===
      "MENTOR"
    ) {
      // applicant type is Mentor
      return applicantState?.responseData?.mentorDetails?.connectPrograms.filter(
        (data) => data.status === "PUBLISHED"
      );
    } else {
      //  applicant type is Student
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

  /*
   * In this function, we are filtering all the data when status of the
   * program is "SAVED_TO_DRAFT"
   *
   * Everything else is same as above method
   */
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

  /*
   * function handling dropdown select of Program Status,
   * according to which we will filter our data
   */
  const handleDirectoryDetailsStateDropdownSelect = (
    eventKey: string | null
  ) => {
    // if the eventKey has any value only then do something in this function
    if (eventKey) {
      /*
       * first store the value of eventKey in sectionState.selectedRadioForFilterState,
       * as we are changing the title of dropdown according to its value
       */
      sectionDispatch({
        type: "selectedRadioForFilterState",
        payload: eventKey,
      });

      /*
       * If earlier we have shown any no data found error message, then hide it
       */
      sectionDispatch({ type: "noFilteredData", payload: "" });

      let tempFilteredData:
        | { programId: number; status: string; title: string }[] = [];

      // if we have value of state, then store its value in tempFilteredData
      if (state?.responseData?.connectPrograms.length)
        tempFilteredData = [...state?.responseData?.connectPrograms];

      /*
       *  if we have value of applicantState, then store its value in tempFilteredData
       *
       * Do it based on the applicant type
       */
      if (
        applicantState?.responseData?.applicationDetails.applicantType ===
        "MENTOR"
      ) {
        // if applicant type is mentor, stores its value
        if (applicantState?.responseData?.mentorDetails?.connectPrograms.length)
          tempFilteredData = [
            ...applicantState?.responseData?.mentorDetails?.connectPrograms,
          ];
      } else {
        // else stores value of student applicant type
        if (
          applicantState?.responseData?.studentDetails?.connectPrograms.length
        )
          tempFilteredData = [
            ...applicantState?.responseData?.studentDetails?.connectPrograms,
          ];
      }

      /*
       * Now, If the Org has selected "Published" dropdown option, then filter the
       * data according to "PUBLISHED" status of the program
       */
      if (eventKey === "Published")
        tempFilteredData = filterActiveResponseData as {
          programId: number;
          status: string;
          title: string;
        }[];

      /*
       * If the Org has selected "In Draft" dropdown option, then filter the data
       * according to "SAVED_TO_DRAFT" status
       */
      if (eventKey === "In Draft")
        tempFilteredData = filterInactiveResponseData as {
          programId: number;
          status: string;
          title: string;
        }[];

      // store the filtered data in sectionState.filteredResponseData
      sectionDispatch({
        type: "filteredResponseData",
        payload: tempFilteredData,
      });

      /*
       *  if there is value in eventKey, but the length of tempFilteredData is
       * 0, then store the error message in sectionState.noFilteredData
       */
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
                  /*
                   * If the Org has selected dropdown option other than none,
                   * then show the selected option in drodpown title
                   */
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
          {/*
           * Now, If there is a value in sectionState.selectedRadioForFilterState
           * other than "All", then show the filtered Data (if we have)
           *
           * Else show message of sectionState.noFilterData
           */}
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

          {/*
           * If sectionState.selectedRadioForFilterState does not contain
           * "Published" or "In Draft" as value, then show the all data (not
           * filtered)
           */}
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
