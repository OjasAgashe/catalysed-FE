import React from "react";
import { useHistory } from "react-router-dom";
import { MENTOR, STUDENT } from "../../constants/Entities";
import {
  MENTOR_UPDATES_DETAILS_ORGANISATION,
  STUDENT_UPDATES_DETAILS_ORGANISATION,
} from "../../constants/Routes";
import { StudentConnectedOrgData } from "../../types/StudentUpdates";
import Error from "../Error/Error";
import StuUpdatesOrganisationCard from "../StuUpdatesCard/StuUpdatesOrganisationCard";
import "./StuUpdatesOrganisations.css";

type StuUpdatesOrganisationsProps = {
  connectedOrgData: StudentConnectedOrgData[] | null;
  entity: string;
};

const StuUpdatesOrganisations = ({
  connectedOrgData,
  entity,
}: StuUpdatesOrganisationsProps) => {
  const history = useHistory();

  /*
   * Function to handle click on StuUpdatesProgramCard,
   *
   * When the user will click, push them to their respected
   * details page
   */
  const handleUpdatesOrganisationCardViewAllBtnClick = (id: number) => {
    if (entity === STUDENT)
      history.push(`${STUDENT_UPDATES_DETAILS_ORGANISATION}/${id}/details`);
    else if (entity === MENTOR)
      history.push(`${MENTOR_UPDATES_DETAILS_ORGANISATION}/${id}/details`);
  };

  return (
    <div className="StuUpdatesOrganisationsContainer">
      {connectedOrgData && connectedOrgData.length ? (
        /*
         * If we have any programs to show, then show it
         */
        connectedOrgData.map((data: StudentConnectedOrgData) => (
          <StuUpdatesOrganisationCard
            key={data.id}
            data={data}
            handleUpdatesOrganisationCardViewAllBtnClick={
              handleUpdatesOrganisationCardViewAllBtnClick
            }
          />
        ))
      ) : (
        // Else show an Error
        <Error message="Sorry !!! No Data Found" />
      )}
    </div>
  );
};

export default StuUpdatesOrganisations;
