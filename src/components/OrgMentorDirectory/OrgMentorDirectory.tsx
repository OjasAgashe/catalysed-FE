import React from "react";
import Error from "../Error/Error";
import OrgDirectoryCard from "../OrgDirectoryCard/OrgDirectoryCard";
import "./OrgMentorDirectory.css";
import { useHistory } from "react-router-dom";
import { ORGANISATION_DIRECTORY_DETAILS_MENTOR } from "../../constants/Routes";

type OrgMentorDirectoryProps = {
  fakeMentorData: {
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

const OrgMentorDirectory = ({
  fakeMentorData,
  searchedNameNotFound,
  filteredResponseData,
  searchedName,
}: OrgMentorDirectoryProps) => {
  const history = useHistory();

  const handleDirectoryCardViewAllBtnClick = (id: number) => {
    history.push(`${ORGANISATION_DIRECTORY_DETAILS_MENTOR}/${id}`);
  };

  return (
    <div className="OrgMentorDirectoryContainer">
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

      {searchedName === "" && fakeMentorData.length
        ? fakeMentorData.map((data) => (
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

export default OrgMentorDirectory;
