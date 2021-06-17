import React from "react";
import Error from "../Error/Error";
import OrgDirectoryCard from "../OrgDirectoryCard/OrgDirectoryCard";
import "./OrgStudentDirectory.css";

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
  return (
    <div className="OrgStudentDirectoryContainer">
      {searchedName !== "" && filteredResponseData.length ? (
        filteredResponseData.map((data: any) => (
          <OrgDirectoryCard key={data.id} data={data} />
        ))
      ) : searchedNameNotFound ? (
        <Error message="Sorry !!! No mentor exists with this name" />
      ) : (
        ""
      )}
      {searchedName === "" && fakeStudentData.length
        ? fakeStudentData.map((data) => (
            <OrgDirectoryCard key={data.id} data={data} />
          ))
        : ""}
    </div>
  );
};

export default OrgStudentDirectory;
