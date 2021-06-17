import React from "react";
import Error from "../Error/Error";
import OrgDirectoryCard from "../OrgDirectoryCard/OrgDirectoryCard";
import "./OrgMentorDirectory.css";

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

  return (
    <div className="OrgMentorDirectoryContainer">
      {searchedName !== "" && filteredResponseData.length ? (
        filteredResponseData.map((data: any) => (
          <OrgDirectoryCard key={data.id} data={data} />
        ))
      ) : searchedNameNotFound ? (
        <Error message="Sorry !!! No mentor exists with this name" />
      ) : (
        ""
      )}

      {searchedName === "" && fakeMentorData.length
        ? fakeMentorData.map((data) => (
            <OrgDirectoryCard key={data.id} data={data} />
          ))
        : ""}
    </div>
  );
};

export default OrgMentorDirectory;
