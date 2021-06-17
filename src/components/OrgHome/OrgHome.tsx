import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ORGANISATION_PROGRAM_CREATE } from "../../constants/Routes";
import "./OrgHome.css";
import SectionFive from "./SectionFive";
import SectionFour from "./SectionFour";
import SectionOne from "./SectionOne";
import SectionThree from "./SectionThree";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { OrgHomeActionType, OrgHomeState } from "../../types/OrgHome";
import { GetProgramMetaListData } from "../../types/OrgViewSearchProgram";

type OrgHomeProps = {
  state: OrgHomeState;
  dispatch: React.Dispatch<OrgHomeActionType>;
};

const OrgHome = ({ state, dispatch }: OrgHomeProps) => {
  const { getProgramsStartingThisMonth, getOngoingPrograms } = useOrgAPI();

  useEffect(() => {
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

    const getPrograms = async () => {
      try {
        const programsStartingThisMonth = await getProgramsStartingThisMonth();
        const ongoingPrograms = await getOngoingPrograms();

        dispatch({
          type: "programsStartingThisMonth",
          payload: programsStartingThisMonth
            .sort(sortDateFromOldToNewByUsing)
            .slice(0, 3),
        });

        dispatch({
          type: "ongoingPrograms",
          payload: ongoingPrograms
            .sort(sortDateFromNewToOldByUsing)
            .slice(0, 3),
        });
      } catch (error) {
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

    getPrograms();
  }, [dispatch, getOngoingPrograms, getProgramsStartingThisMonth]);

  return (
    <div className="OrgHomeSectionContainer">
      <SectionOne />
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
        <SectionThree state={state} />
        <SectionFour state={state} />
      </div>
      <SectionFive />
    </div>
  );
};

export default OrgHome;
