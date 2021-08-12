import React, { useEffect } from "react";
import { useMentorAPI } from "../../context/api_context/MentorAPIContext";
import {
  StudentHomeActionType,
  StudentHomeState,
} from "../../types/StudentHome";
import { StudentConnectedProgramData } from "../../types/StudentUpdates";
import SectionFour from "../StudentHome/SectionFour";
import SectionOne from "../StudentHome/SectionOne";
import SectionThree from "../StudentHome/SectionThree";
import "../OrgHome/OrgHome.css";
import "../StudentHome/StudentHome.css";
import SectionSix from "../StudentHome/SectionSix";
import SectionFive from "../StudentHome/SectionFive";

type MentorHomeProps = {
  state: StudentHomeState;
  dispatch: React.Dispatch<StudentHomeActionType>;
};

const MentorHome = ({ state, dispatch }: MentorHomeProps) => {
  const {
    getConnectedRunningPrograms,
    getConnectedAboutToStartPrograms,
    getSuggestedPrograms,
  } = useMentorAPI();

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

export default MentorHome;
