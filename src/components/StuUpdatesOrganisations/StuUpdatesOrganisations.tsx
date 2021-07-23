import React from "react";
import { useHistory } from "react-router-dom";
import { MENTOR, STUDENT } from "../../constants/Entities";
import {
  MENTOR_UPDATES_DETAILS_ORGANISATION,
  STUDENT_UPDATES_DETAILS_ORGANISATION,
} from "../../constants/Routes";
import Error from "../Error/Error";
import StuUpdatesOrganisationCard from "../StuUpdatesCard/StuUpdatesOrganisationCard";
import "./StuUpdatesOrganisations.css";

type StuUpdatesOrganisationsProps = {
  fakeOrganisationData: {
    id: number;
    name: string;
    description: string;
  }[];
  entity: string;
};

const StuUpdatesOrganisations = ({
  fakeOrganisationData,
  entity,
}: StuUpdatesOrganisationsProps) => {
  const history = useHistory();

  const handleUpdatesOrganisationCardViewAllBtnClick = (id: number) => {
    if (entity === STUDENT)
      history.push(`${STUDENT_UPDATES_DETAILS_ORGANISATION}/${id}/details`);
    else if (entity === MENTOR)
      history.push(`${MENTOR_UPDATES_DETAILS_ORGANISATION}/${id}/details`);
  };

  return (
    <div className="StuUpdatesOrganisationsContainer">
      {fakeOrganisationData && fakeOrganisationData.length ? (
        fakeOrganisationData.map((data) => (
          <StuUpdatesOrganisationCard
            key={data.id}
            data={data}
            handleUpdatesOrganisationCardViewAllBtnClick={
              handleUpdatesOrganisationCardViewAllBtnClick
            }
          />
        ))
      ) : (
        <Error message="Sorry !!! No Data Found" />
      )}
    </div>
  );
};

export default StuUpdatesOrganisations;
