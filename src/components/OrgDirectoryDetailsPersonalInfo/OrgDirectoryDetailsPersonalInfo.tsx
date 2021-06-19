import React from "react";
import OrgDirectoryDetailsBackBtn from "../OrgDirectoryDetailsBackBtn/OrgDirectoryDetailsBackBtn";
import "./OrgDirectoryDetailsPersonalInfo.css";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";

type OrgDirectoryDetailsPersonalInfoProps = {
  fakeData: {
    full_name: string;
    age: number;
    gender: string;
    contact: {
      phone: string;
      email: string;
    };
    school_or_organisation: string;
    address: {
      city: string;
      country: string;
    };
    known_languages: string[];
    professionally_mentored_ever: string;
    experience: number;
    stable_connection: string;
    academic_qualification: string;
    profession: string;
  };
};

const OrgDirectoryDetailsPersonalInfo = ({
  fakeData,
}: OrgDirectoryDetailsPersonalInfoProps) => {
  return (
    <div className="OrgDirectoryDetailsPersonalContainer">
      <SectionOne fakeData={fakeData} />
      <SectionTwo fakeData={fakeData} />
      <OrgDirectoryDetailsBackBtn />
    </div>
  );
};

export default OrgDirectoryDetailsPersonalInfo;
