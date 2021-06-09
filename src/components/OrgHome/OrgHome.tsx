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

type OrgHomeProps = {
  state: OrgHomeState;
  dispatch: React.Dispatch<OrgHomeActionType>;
};

const OrgHome = ({ state, dispatch }: OrgHomeProps) => {
  const { getProgramsStartingThisMonth, getOngoingPrograms } = useOrgAPI();

  useEffect(() => {
    const getPrograms = async () => {
      try {
        const programsStartingThisMonth = await getProgramsStartingThisMonth();
        const ongoingPrograms = await getOngoingPrograms();

        dispatch({
          type: "programsStartingThisMonth",
          payload: programsStartingThisMonth.slice(0, 3),
        });
        dispatch({
          type: "ongoingPrograms",
          payload: ongoingPrograms.slice(0, 3),
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
