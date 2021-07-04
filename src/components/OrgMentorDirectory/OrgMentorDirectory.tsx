import React from "react";
import Error from "../Error/Error";
import OrgDirectoryCard from "../OrgDirectoryCard/OrgDirectoryCard";
import "./OrgMentorDirectory.css";
import { useHistory } from "react-router-dom";
import { ORGANISATION_DIRECTORY_DETAILS_MENTOR } from "../../constants/Routes";
import { OrganisationDirectoryCommonState } from "../../types/OrganisationDirectory";

type OrgMentorDirectoryProps = {
  state: OrganisationDirectoryCommonState;
};

const OrgMentorDirectory = ({ state }: OrgMentorDirectoryProps) => {
  const history = useHistory();

  const handleDirectoryCardViewAllBtnClick = (id: number) => {
    history.push(`${ORGANISATION_DIRECTORY_DETAILS_MENTOR}/${id}/details`);
  };

  return (
    <div className="OrgMentorDirectoryContainer">
      {state.responseData && state.responseData.length ? (
        <>
          {state.searchedName !== "" &&
          state.filteredResponseData &&
          state.filteredResponseData.length ? (
            state.filteredResponseData.map((data) => (
              <OrgDirectoryCard
                key={data.name}
                data={data}
                handleDirectoryCardViewAllBtnClick={
                  handleDirectoryCardViewAllBtnClick
                }
              />
            ))
          ) : state.searchedNameNotFound ? (
            <Error message="Sorry !!! No mentor exists with this name" />
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

export default OrgMentorDirectory;
