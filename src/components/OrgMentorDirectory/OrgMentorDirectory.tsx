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

/*
 * OrgMentorDirectory component accepts state as the props
 */
const OrgMentorDirectory = ({ state }: OrgMentorDirectoryProps) => {
  /*
   * We need history Object here because on the click of View all
   * button of the card, we will push the Org to Specific Mentor
   * Details page
   */
  const history = useHistory();

  /*
   * handleDirectoryCardViewAllBtnClick : function that will be
   * called on click of View all button of OrgDirectoryCard,
   * that is visible in Mentor Tab
   *
   * This function will push the Org to specific mentor details page
   */
  const handleDirectoryCardViewAllBtnClick = (id: number) => {
    history.push(`${ORGANISATION_DIRECTORY_DETAILS_MENTOR}/${id}/details`);
  };

  return (
    <div className="OrgMentorDirectoryContainer">
      {/*
       * Logic : Show Mentor Card when state.responseData is not null and it is
       * not an empty Array, means we have got some Data from API call.
       *
       * If this is the case (we did not get anything from API call) then show an
       * Error message of "No Data Found"
       */}
      {state.responseData && state.responseData.length ? (
        <>
          {/*
           * Logic : Show filtered Data, only when there is something
           * has been typed in the search field, else does not show
           * filered Data
           *
           * And when there is something has been typed in the search field,
           * but no Data is found based on that search and
           * state.searchedNameNotFound has been set to true, then instead of
           * showing Cards, show Error Message
           */}
          {state.searchedName !== "" &&
          state.filteredResponseData &&
          state.filteredResponseData.length ? (
            // filtered Data Cards
            state.filteredResponseData.map((data) => (
              <OrgDirectoryCard
                key={data.id}
                data={data}
                handleDirectoryCardViewAllBtnClick={
                  handleDirectoryCardViewAllBtnClick
                }
              />
            ))
          ) : state.searchedNameNotFound ? (
            // No filtered Data found Error Message
            <Error message="Sorry !!! No mentor exists with this name" />
          ) : (
            ""
          )}

          {/*
           * Logic : When there is nothing typed in search field
           * then show all Data, that we have got from API
           * call
           */}
          {state.searchedName === "" &&
            state.responseData.map((data) => (
              <OrgDirectoryCard
                key={data.id}
                data={data}
                handleDirectoryCardViewAllBtnClick={
                  handleDirectoryCardViewAllBtnClick
                }
              />
            ))}
        </>
      ) : (
        // Error Message, When we do not get anything from API call
        <Error message="Sorry !!! No Data Found" />
      )}
    </div>
  );
};

export default OrgMentorDirectory;
