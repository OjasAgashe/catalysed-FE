import React, { useEffect } from "react";
import { useStudentAPI } from "../../context/api_context/StudentAPIContext";
import {
  StudentHomeActionType,
  StudentHomeState,
} from "../../types/StudentHome";
import { StudentConnectedProgramData } from "../../types/StudentUpdates";
import SectionOne from "./SectionOne";
import "../OrgHome/OrgHome.css";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import SectionSix from "./SectionSix";
import "./StudentHome.css";
import SectionFive from "./SectionFive";

type StudentHomeProps = {
  state: StudentHomeState;
  dispatch: React.Dispatch<StudentHomeActionType>;
};

const StudentHome = ({ state, dispatch }: StudentHomeProps) => {
  const {
    getConnectedRunningPrograms,
    getConnectedAboutToStartPrograms,
    getSuggestedPrograms,
  } = useStudentAPI();

  useEffect(() => {
    /*
     * Function to Sort Date from Old to New
     */
    const sortDateFromOldToNewByUsing = (
      obj1: StudentConnectedProgramData,
      obj2: StudentConnectedProgramData
    ) => {
      const [day1, month1, year1] = obj1.tentativeStartDate.split("/");
      const [day2, month2, year2] = obj2.tentativeStartDate.split("/");

      return new Date(parseInt(year1), parseInt(month1) - 1, parseInt(day1)) >
        new Date(parseInt(year2), parseInt(month2) - 1, parseInt(day2))
        ? 1
        : -1;
    };

    /*
     * Function to get all the Data related to Student Home
     */
    const getDashboardData = async () => {
      try {
        // get running programs
        const connectedRunningPrograms = await getConnectedRunningPrograms();

        // get programs about to start
        const connectedAboutToStartPrograms =
          await getConnectedAboutToStartPrograms();

        // get suggested programs
        const suggestedProgramsResponse = await getSuggestedPrograms();

        /*
         * Store the 3 least recent running programs
         */
        dispatch({
          type: "runningPrograms",
          payload: connectedRunningPrograms
            .sort(sortDateFromOldToNewByUsing)
            .slice(0, 3),
        });

        /*
         * Store the 3 least recent about to start programs
         */
        dispatch({
          type: "aboutToStartPrograms",
          payload: connectedAboutToStartPrograms
            .sort(sortDateFromOldToNewByUsing)
            .slice(0, 3),
        });

        /*
         * Store first 3 suggested programs
         */
        dispatch({
          type: "suggestedPrograms",
          payload: suggestedProgramsResponse.data.slice(0, 3),
        });
      } catch (error) {
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

    getDashboardData();
  }, [
    dispatch,
    getConnectedAboutToStartPrograms,
    getConnectedRunningPrograms,
    getSuggestedPrograms,
  ]);

  return (
    <div className="OrgHomeSectionContainer">
      {/* Show SectionOne component */}
      <SectionOne />

      <section className="OrgHomeSectionTwo"></section>

      <div className="SectionThreeAndFourContainer">
        {/* Show SectionThree component */}
        <SectionThree state={state} />

        {/* Show SectionFour component */}
        <SectionFour state={state} />
      </div>

      {/* Show SectionFive component */}
      <SectionFive state={state} />

      {/* Show SectionSix component */}
      <SectionSix />
    </div>
  );
};

export default StudentHome;
