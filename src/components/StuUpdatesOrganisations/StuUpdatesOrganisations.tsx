import React from "react";
import { useHistory } from "react-router-dom";
import { STUDENT_UPDATES_DETAILS_ORGANISATION } from "../../constants/Routes";
import Error from "../Error/Error";
import StuUpdatesOrganisationCard from "../StuUpdatesCard/StuUpdatesOrganisationCard";
import "./StuUpdatesOrganisations.css";

type StuUpdatesOrganisationsProps = {
  fakeOrganisationData: {
    id: number;
    name: string;
    description: string;
  }[];
};

const StuUpdatesOrganisations = ({
  fakeOrganisationData,
}: StuUpdatesOrganisationsProps) => {
  const history = useHistory();

  const handleUpdatesOrganisationCardViewAllBtnClick = (id: number) => {
    history.push(`${STUDENT_UPDATES_DETAILS_ORGANISATION}/${id}/details`);
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
