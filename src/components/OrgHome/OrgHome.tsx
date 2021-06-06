import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ORGANISATION_PROGRAM_CREATE } from "../../constants/Routes";
import "./OrgHome.css";
import SectionOne from "./SectionOne";
import SectionThree from "./SectionThree";

const OrgHome = () => {
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
        <SectionThree />
      </div>
    </div>
  );
};

export default OrgHome;
