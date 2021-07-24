import React from "react";
import { Alert, Form, InputGroup } from "react-bootstrap";
import { OrgDirectoryPage } from "../../assets/Illustrations/Illustrations";
import { FcSearch } from "react-icons/fc";
import "./OrgDirectoryPageHeader.css";
import {
  OrganisationDirectoryCommonActionType,
  OrganisationDirectoryCommonResponse,
  OrganisationDirectoryCommonState,
} from "../../types/OrganisationDirectory";
import { useHistory } from "react-router-dom";
import { ORGANISATION_DIRECTORY } from "../../constants/Routes";

type OrgDirectoryPageHeaderProps = {
  state: OrganisationDirectoryCommonState;
  dispatch: React.Dispatch<OrganisationDirectoryCommonActionType>;
};

/*
 * OrgDirectoryPageHeader component accepts state, and dispatch
 * as the props
 */
const OrgDirectoryPageHeader = ({
  state,
  dispatch,
}: OrgDirectoryPageHeaderProps) => {
  const history = useHistory();

  /*
   * handleOrgDirectorySearch : function to filter responseData based on
   * searchedName value
   */
  const handleOrgDirectorySearch: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    /*
     * whatever the user typing in searched bar, store its value in
     * state.searchedName
     */
    dispatch({ type: "searchedName", payload: event.target.value });

    /*
     * If earlier, we have the error of searched name not found, then
     * on researching of the user, remove the searched name not found
     * error from the UI
     */
    dispatch({ type: "searchedNameNotFound", payload: false });

    /*
     * Store the value state.responseData in responseData, as the value
     * of state.responseData can be null also but we can not call filter()
     * method on null value. So instead of calling filter directly on
     * state.responseData, we are storing state.responseData value in
     * responseData variable by doing Type Assertion (typescript). So
     * responseData variable can never has null value
     */
    const responseData =
      state.responseData as OrganisationDirectoryCommonResponse[];

    /*
     * filtering responseData either on name field in responseData or email
     * field in responseData. Our filtering method is case insensitive, and
     * we are filtering based on substring (or searched value) is present in
     * name field value (or in email field value) or not.
     */
    const tempFilteredData = responseData.filter(
      (data: OrganisationDirectoryCommonResponse) =>
        data.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        data.email.toLowerCase().includes(event.target.value.toLowerCase())
    );

    /*
     * storing the value of tempFilteredData in state.filteredResponseData
     */
    dispatch({ type: "filteredResponseData", payload: tempFilteredData });

    if (event.target.value !== "" && tempFilteredData.length === 0) {
      /*
       * In case, we have a searched value but on filtering according to searched
       * value our tempFilteredData has empty array([]), then in that case we will
       * set state.searchedNameNotFound to true
       */
      dispatch({ type: "searchedNameNotFound", payload: true });
    }
  };

  return (
    <div
      className="OrgDirectoryPageHeaderContainer"
      style={{ backgroundImage: `url(${OrgDirectoryPage})` }}
    >
      <div className="OrgDirectoryPageHeaderHeroText">
        {/*
         * Showing the "Mentors Directory" or "Students Directory" text
         * based on the value of "type" query parameter value
         */}
        <span>{state.title} Directory</span>
      </div>

      <div className="SearchBarContainer">
        <Form className="SearchBarForm">
          <InputGroup>
            <InputGroup.Prepend className="InputGroupPrepend">
              <FcSearch className="SearchIcon" />
            </InputGroup.Prepend>
            <Form.Control
              className="DirectorySearchFormControl"
              type="search"
              placeholder="Search by Name or Email..."
              value={state.searchedName}
              onChange={handleOrgDirectorySearch}
            />
          </InputGroup>
        </Form>
      </div>

      <div className="OrgDirectoryMentorOrStudentOptContainer">
        <Alert variant="warning" className="OrgDirectoryMentorOrStudentOpt">
          <div
            className={`${
              state.title === "Mentors"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } OrgDirectoryMentorOpt`}
          >
            <button
              className="MentorBtnOpt"
              type="button"
              onClick={() => {
                /*
                 * On click of mentor button from tab, we will set
                 * state.title to "Mentors"
                 */
                dispatch({ type: "title", payload: "Mentors" });

                /*
                 * And then, push to OrgDirectoryPage with "MENTOR" as
                 * the value of "type" query parameter
                 */
                history.push(`${ORGANISATION_DIRECTORY}?type=MENTOR`);
              }}
            >
              Mentors
            </button>
          </div>
          <div
            className={`${
              state.title === "Mentors"
                ? "NotCurrentSelectedTab"
                : "CurrentSelectedTab"
            }`}
          >
            <button
              className="StudentBtnOpt"
              type="button"
              onClick={() => {
                /*
                 * On click of student button from tab, we will set
                 * state.title to "Students"
                 */

                dispatch({ type: "title", payload: "Students" });

                /*
                 * And then, push to OrgDirectoryPage with "STUDENT" as
                 * the value of "type" query parameter
                 */
                history.push(`${ORGANISATION_DIRECTORY}?type=STUDENT`);
              }}
            >
              Students
            </button>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default OrgDirectoryPageHeader;
