import React from "react";
import Error from "../Error/Error";
import OrgDirectoryCard from "../OrgDirectoryCard/OrgDirectoryCard";
import "./OrgStudentDirectory.css";
import { useHistory } from "react-router-dom";
import { ORGANISATION_DIRECTORY_DETAILS_STUDENT } from "../../constants/Routes";

type OrgStudentDirectoryProps = {
  fakeStudentData: {
    id: number;
    name: string;
    email: string;
    active_programs: string[];
  }[];
  filteredResponseData:
    | []
    | {
        id: number;
        name: string;
        email: string;
        active_programs: string[];
      }[];
  searchedNameNotFound: boolean;
  searchedName: string;
};

const OrgStudentDirectory = ({
  fakeStudentData,
  searchedNameNotFound,
  filteredResponseData,
  searchedName,
}: OrgStudentDirectoryProps) => {
  const history = useHistory();

  const handleDirectoryCardViewAllBtnClick = (id: number) => {
    history.push(`${ORGANISATION_DIRECTORY_DETAILS_STUDENT}/${id}`);
  };

  return (
    <div className="OrgStudentDirectoryContainer">
      {searchedName !== "" && filteredResponseData.length ? (
        filteredResponseData.map((data: any) => (
          <OrgDirectoryCard
            key={data.id}
            data={data}
            handleDirectoryCardViewAllBtnClick={
              handleDirectoryCardViewAllBtnClick
            }
          />
        ))
      ) : searchedNameNotFound ? (
        <Error message="Sorry !!! No mentor exists with this name" />
      ) : (
        ""
      )}
      {searchedName === "" && fakeStudentData.length
        ? fakeStudentData.map((data) => (
            <OrgDirectoryCard
              key={data.id}
              data={data}
              handleDirectoryCardViewAllBtnClick={
                handleDirectoryCardViewAllBtnClick
              }
            />
          ))
        : ""}
    </div>
  );
};

export default OrgStudentDirectory;
