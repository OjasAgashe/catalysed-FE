import React from "react";
import Error from "../Error/Error";
import OrgDirectoryCard from "../OrgDirectoryCard/OrgDirectoryCard";
import "./OrgStudentDirectory.css";
import { useHistory } from "react-router-dom";
import { ORGANISATION_DIRECTORY_DETAILS_STUDENT } from "../../constants/Routes";
import { OrganisationDirectoryCommonState } from "../../types/OrganisationDirectory";

type OrgStudentDirectoryProps = {
  state: OrganisationDirectoryCommonState;
};

const OrgStudentDirectory = ({ state }: OrgStudentDirectoryProps) => {
  const history = useHistory();

  const handleDirectoryCardViewAllBtnClick = (id: number) => {
    history.push(`${ORGANISATION_DIRECTORY_DETAILS_STUDENT}/${id}/details`);
  };

  return (
    <div className="OrgStudentDirectoryContainer">
      {state.responseData && state.responseData.length ? (
        <>
          {state.searchedName !== "" &&
          state.filteredResponseData &&
          state.filteredResponseData.length ? (
            state.filteredResponseData.map((data: any) => (
              <OrgDirectoryCard
                key={data.name}
                data={data}
                handleDirectoryCardViewAllBtnClick={
                  handleDirectoryCardViewAllBtnClick
                }
              />
            ))
          ) : state.searchedNameNotFound ? (
            <Error message="Sorry !!! No student exists with this name" />
          ) : (
            ""
          )}
          {state.searchedName === "" &&
            state.responseData.map((data) => (
              <OrgDirectoryCard
                key={data.name}
                data={data}
                handleDirectoryCardViewAllBtnClick={
                  handleDirectoryCardViewAllBtnClick
                }
              />
            ))}
        </>
      ) : (
        <Error message="Sorry !!! No Data Found" />
      )}
    </div>
  );
};

export default OrgStudentDirectory;
