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

    const getDashboardData = async () => {
      try {
        const connectedRunningPrograms = await getConnectedRunningPrograms();
        const connectedAboutToStartPrograms =
          await getConnectedAboutToStartPrograms();
        const suggestedProgramsResponse = await getSuggestedPrograms();

        dispatch({
          type: "runningPrograms",
          payload: connectedRunningPrograms
            .sort(sortDateFromOldToNewByUsing)
            .slice(0, 3),
        });

        dispatch({
          type: "aboutToStartPrograms",
          payload: connectedAboutToStartPrograms
            .sort(sortDateFromOldToNewByUsing)
            .slice(0, 3),
        });

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
      <SectionOne />
      <section className="OrgHomeSectionTwo"></section>
      <div className="SectionThreeAndFourContainer">
        <SectionThree state={state} />
        <SectionFour state={state} />
      </div>
      <SectionFive state={state} />
      <SectionSix />
    </div>
  );
};

export default StudentHome;
