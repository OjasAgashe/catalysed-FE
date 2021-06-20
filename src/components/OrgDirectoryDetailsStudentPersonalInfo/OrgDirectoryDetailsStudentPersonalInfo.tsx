import React from "react";
import OrgDirectoryDetailsBackBtn from "../OrgDirectoryDetailsBackBtn/OrgDirectoryDetailsBackBtn";

import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import "../OrgDirectoryDetailsPersonalInfo/OrgDirectoryDetailsPersonalInfo.css";

type OrgDirectoryDetailsStudentPersonalInfoProps = {
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
    professionally_get_mentored: string;
    stable_connection: string;
    device_most_prefer: string;
  };
};

const OrgDirectoryDetailsStudentPersonalInfo = ({
  fakeData,
}: OrgDirectoryDetailsStudentPersonalInfoProps) => {
  return (
    <div className="OrgDirectoryDetailsPersonalContainer">
      <SectionOne fakeData={fakeData} />
      <SectionTwo fakeData={fakeData} />
      <OrgDirectoryDetailsBackBtn />
    </div>
  );
};

export default OrgDirectoryDetailsStudentPersonalInfo;
