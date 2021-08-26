import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ORGANISATION_PROGRAM_CREATE } from "../../constants/Routes";
import "./OrgHome.css";
import SectionFive from "./SectionFive";
import SectionFour from "./SectionFour";
import SectionOne from "./SectionOne";
import SectionThree from "./SectionThree";
import SectionSix from "./SectionSix";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { OrgHomeActionType, OrgHomeState } from "../../types/OrgHome";
import { GetProgramMetaListData } from "../../types/OrgViewSearchProgram";

type OrgHomeProps = {
  state: OrgHomeState;
  dispatch: React.Dispatch<OrgHomeActionType>;
};

const OrgHome = ({ state, dispatch }: OrgHomeProps) => {
  const {
    getProgramsStartingThisMonth,
    getOngoingPrograms,
    getOrgHomePageData,
  } = useOrgAPI();

  useEffect(() => {
    /*
     * Function to sort the Date from New to Old
     */
    const sortDateFromNewToOldByUsing = (
      obj1: GetProgramMetaListData,
      obj2: GetProgramMetaListData
    ) => {
      const [day1, month1, year1] = obj1.tentativeStartDate.split("/");
      const [day2, month2, year2] = obj2.tentativeStartDate.split("/");

      return new Date(parseInt(year1), parseInt(month1) - 1, parseInt(day1)) >
        new Date(parseInt(year2), parseInt(month2) - 1, parseInt(day2))
        ? -1
        : 1;
    };

    /*
     * Function to sort the Date from Old to New
     */
    const sortDateFromOldToNewByUsing = (
      obj1: GetProgramMetaListData,
      obj2: GetProgramMetaListData
    ) => {
      const [day1, month1, year1] = obj1.tentativeStartDate.split("/");
      const [day2, month2, year2] = obj2.tentativeStartDate.split("/");

      return new Date(parseInt(year1), parseInt(month1) - 1, parseInt(day1)) >
        new Date(parseInt(year2), parseInt(month2) - 1, parseInt(day2))
        ? 1
        : -1;
    };

    /*
     * Function to call API, to get Dashboard Data
     */
    const getDashboardData = async () => {
      try {
        // get Dashboard Data
        const homeResponseData = await getOrgHomePageData();

        // get Programs starting this month
        const programsStartingThisMonth = await getProgramsStartingThisMonth();

        // get ongoing Programs
        const ongoingPrograms = await getOngoingPrograms();

        // store the Dashboard Data
        dispatch({ type: "responseData", payload: homeResponseData.data });

        /*
         * store the first three Programs (sorted from Old Date to New Date)
         * starting this month
         *
         * We will show the most recent 3 programs starting this month
         */
        dispatch({
          type: "programsStartingThisMonth",
          payload: programsStartingThisMonth
            .sort(sortDateFromOldToNewByUsing)
            .slice(0, 3),
        });

        /*
         * store the first three ongoing Programs (sorted from New Date to Old Date)
         *
         * We will show the least recent 3 ongoing programs
         */
        dispatch({
          type: "ongoingPrograms",
          payload: ongoingPrograms
            .sort(sortDateFromNewToOldByUsing)
            .slice(0, 3),
        });
      } catch (error) {
      } finally {
        /*
         * When we get each Data, we will hide the LoadingProgress component
         */
        dispatch({ type: "loading", payload: false });
      }
    };

    getDashboardData();
  }, [
    dispatch,
    getOngoingPrograms,
    getOrgHomePageData,
    getProgramsStartingThisMonth,
  ]);

  return (
    <div className="OrgHomeSectionContainer">
      {/* Show SectionOne component */}
      <SectionOne state={state} />

      <section className="OrgHomeSectionTwo">
        <div className="CreateProgramTextContainer">
          <Alert variant="info" className="CreateProgramText">
            💡 Want to Create a new Program?&nbsp;Then&nbsp;
            <Link className="CRClickHereLink" to={ORGANISATION_PROGRAM_CREATE}>
              click here
            </Link>
          </Alert>
        </div>
      </section>

      <div className="SectionThreeAndFourContainer">
        {/* Show SectionThree component */}
        <SectionThree state={state} />

        {/* Show SectionFour component */}
        <SectionFour state={state} />
      </div>

      {/* Show SectionFive component */}
      <SectionFive state={state} />

      {/* Show SectionSix component */}
      <SectionSix state={state} />
    </div>
  );
};

export default OrgHome;
