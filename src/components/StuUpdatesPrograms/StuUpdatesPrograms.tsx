import React from "react";
import { useHistory } from "react-router-dom";
import { MENTOR, STUDENT } from "../../constants/Entities";
import {
  MENTOR_UPDATES_DETAILS_PROGRAM,
  STUDENT_UPDATES_DETAILS_PROGRAM,
} from "../../constants/Routes";
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
  entity: string;
};

const StuUpdatesPrograms = ({
  fakeProgramData,
  entity,
}: StuUpdatesProgramsProps) => {
  const history = useHistory();

  const handleUpdatesProgramCardViewAllBtnClick = (id: number) => {
    if (entity === STUDENT)
      history.push(`${STUDENT_UPDATES_DETAILS_PROGRAM}/${id}/details`);
    else if (entity === MENTOR)
      history.push(`${MENTOR_UPDATES_DETAILS_PROGRAM}/${id}/details`);
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
