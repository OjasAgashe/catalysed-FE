import React, { useMemo, useState } from "react";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import Error from "../Error/Error";
import ConnectedToProgramTableRow from "./ConnectedToProgramTableRow";

type SectionProps = {
  fakePrograms: {
    name: string;
    state: string;
  }[];
};

const Section = ({ fakePrograms }: SectionProps) => {
  const [filteredResponseData, setFilteredResponseData] = useState<
    {
      name: string;
      state: string;
    }[]
  >([]);
  const [selectedRadioForFilterState, setSelectedRadioForFilterState] =
    useState("All");
  const [noFilteredData, setNoFilteredData] = useState("");

  const filterActiveResponseData = useMemo(
    () => fakePrograms.filter((data) => data.state === "Active"),
    [fakePrograms]
  );

  const filterInactiveResponseData = useMemo(
    () => fakePrograms.filter((data) => data.state === "In-active"),
    [fakePrograms]
  );

  const handleDirectoryDetailsStateDropdownSelect = (
    eventKey: string | null
  ) => {
    if (eventKey) {
      setSelectedRadioForFilterState(eventKey);

      let tempFilteredData: {
        name: string;
        state: string;
      }[] = [...fakePrograms];

      if (eventKey === "Active") tempFilteredData = filterActiveResponseData;

      if (eventKey === "In-active")
        tempFilteredData = filterInactiveResponseData;

      setFilteredResponseData(tempFilteredData);
      if(eventKey && tempFilteredData.length === 0) {
        setNoFilteredData("Sorry!! No Programs Found for This Option")
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
                title={`State${
                  selectedRadioForFilterState !== "All"
                    ? `:${selectedRadioForFilterState}`
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
                  eventKey="Active"
                  onSelect={handleDirectoryDetailsStateDropdownSelect}
                >
                  Active
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="In-active"
                  onSelect={handleDirectoryDetailsStateDropdownSelect}
                >
                  In-active
                </Dropdown.Item>
              </DropdownButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {["Active", "In-active"].includes(selectedRadioForFilterState) &&
          filteredResponseData.length ? (
            [...filteredResponseData]
              .reverse()
              .map((data) => (
                <ConnectedToProgramTableRow data={data} key={data.name} />
              ))
          ) : (
            <tr style={noFilteredData === "" ? { display: "none" } : {}}>
              <td colSpan={2}>
                <div className="ErrorCompContainer">
                  <Error message={noFilteredData} />
                </div>
              </td>
            </tr>
          )}

          {!["Active", "In-active"].includes(selectedRadioForFilterState) &&
            [...fakePrograms]
              .reverse()
              .map((data) => (
                <ConnectedToProgramTableRow data={data} key={data.name} />
              ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Section;
