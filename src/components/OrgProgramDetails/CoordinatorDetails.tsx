import React from "react";
// @ts-ignore
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";
import { OrgProgramDetailsState } from "../../types/OrgProgramDetails";

type CoordinatorDetailsProps = {
  state: OrgProgramDetailsState;
};

const CoordinatorDetails = ({ state }: CoordinatorDetailsProps) => {
  return (
    <div className="CoordinatorProgramDetailsContainer">
      <div className="FormDetailsText">Co-ordinator Details</div>

      <div className="CoordinatorProgramDetailsDataContainer">
        <div className="CNameDataContainer">
          <span className="CreateProgramFormText">Name&nbsp;:&nbsp;</span>
          <span className="Data">{state.responseData?.coordinator.name}</span>
        </div>

        <div className="CEmailDataContainer">
          <span className="CreateProgramFormText">Email&nbsp;:&nbsp;</span>
          <span className="Data">{state.responseData?.coordinator.email}</span>
        </div>

        <div className="CContactDataContainer">
          <span className="CreateProgramFormText">Contact&nbsp;:&nbsp;</span>
          <span>
            <ReactCountryFlag
              countryCode={getCode(
                state.responseData?.coordinator.contact.countryName ?? ""
              )}
              svg
              style={{
                width: "1.5em",
                height: "1.35em",
                verticalAlign: "bottom",
                boxShadow: "2px 2px 8px var(--blue-gray-300)",
              }}
              title="US"
            />
            &nbsp;&nbsp; +
            <span className="Data">
              {state.responseData?.coordinator.contact.countryCode}
            </span>
            &nbsp;
            <span className="Data">
              {state.responseData?.coordinator.contact.number}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDetails;
