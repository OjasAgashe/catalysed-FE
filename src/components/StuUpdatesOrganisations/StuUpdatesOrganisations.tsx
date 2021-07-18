import React from "react";
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
  const handleUpdatesOrganisationCardViewAllBtnClick = (id: number) => {
    console.log(id);
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
