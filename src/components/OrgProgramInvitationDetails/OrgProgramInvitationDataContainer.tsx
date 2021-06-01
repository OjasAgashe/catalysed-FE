import React from "react";
import {
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";

const OrgProgramInvitationDataContainer = () => {
  const fakeData = [
    {
      id: 1,
      name: "oj",
      email: "oj@gmail.com",
      sent_on: "02/06/2021",
      status: "Pending",
    },
    {
      id: 2,
      name: "Peter Parker",
      email: "Peter.Parker@gmail.com",
      sent_on: "01/06/2021",
      status: "Accepted",
    },
    {
      id: 3,
      name: "Wolfeschlegelsteinhausenbergerdorffwel",
      email:
        "contact-admin-hello-abcd@please-try-to.send-me-this-coz.this-is-but-to-be-honest.this-is-on-forever.pacraig.com",
      sent_on: "31/06/2021",
      status: "Pending",
    },
  ];

  return (
    <div className="OrgProgramInvitationDataContainer">
      <Table striped responsive="md">
        <thead>
          <tr className="ProgramInvitationTableRow">
            <th className="ProgramInvitationHeader">Name</th>
            <th className="ProgramInvitationHeader">Email</th>
            <th className="ProgramInvitationHeader">
              <DropdownButton
                title="Sent On"
                className="ProgramFilterSortDropdown"
              >
                <Dropdown.Item>Latest</Dropdown.Item>
                <Dropdown.Item>Oldest</Dropdown.Item>
              </DropdownButton>
            </th>
            <th className="ProgramInvitationHeader">
              <DropdownButton
                title="Status"
                className="ProgramFilterSortDropdown"
              >
                <Dropdown.Item>Accepted</Dropdown.Item>
                <Dropdown.Item>Pending</Dropdown.Item>
              </DropdownButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {fakeData.map((data) => (
            <tr className="ProgramInvitationTableRow" key={data.id}>
              <td className="ProgramInvitationTableData">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="name-tooltip">{data.name}</Tooltip>}
                >
                  <span>
                    {data.name.length > 20
                      ? `${data.name.substring(0, 20)}...`
                      : data.name}
                  </span>
                </OverlayTrigger>
              </td>
              <td className="ProgramInvitationTableData">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="email-tooltip">{data.email}</Tooltip>}
                >
                  <span>
                    {data.email.length > 25
                      ? `${data.email.substring(0, 25)}...`
                      : data.email}
                  </span>
                </OverlayTrigger>
              </td>
              <td className="ProgramInvitationTableData">{data.sent_on}</td>
              <td className="ProgramInvitationTableData">{data.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrgProgramInvitationDataContainer;
