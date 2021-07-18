import React from "react";
import Error from "../Error/Error";
import StuUpdatesProgramCard from "../StuUpdatesCard/StuUpdatesProgramCard";
import "./StuUpdatesPrograms.css";

type StuUpdatesProgramsProps = {
  fakeProgramData: {
    id: number;
    name: string;
    duration: string;
    mode: string;
  }[];
};

const StuUpdatesPrograms = ({ fakeProgramData }: StuUpdatesProgramsProps) => {
  const handleUpdatesProgramCardViewAllBtnClick = (id: number) => {
    console.log(id);
  };

  return (
    <div className="StuUpdatesProgramsContainer">
      {fakeProgramData && fakeProgramData.length ? (
        fakeProgramData.map((data) => (
          <StuUpdatesProgramCard
            key={data.id}
            data={data}
            handleUpdatesProgramCardViewAllBtnClick={
              handleUpdatesProgramCardViewAllBtnClick
            }
          />
        ))
      ) : (
        <Error message="Sorry !!! No Data Found" />
      )}
    </div>
  );
};

export default StuUpdatesPrograms;
