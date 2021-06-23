import React from "react";
import "./OrgProfileManageSectionContainer.css";

import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";

import { FaUserEdit } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { ORGANISATION_PROFILE_EDIT } from "../../constants/Routes";

const OrgProfileManageSectionContainer = () => {
  const fakeData = {
    firstName: "Stefan",
    lastName: "le",
    email: "stefan.le@gmail.com",
    organisation: {
      name: "catalysed",
      description: "our aim is to help student",
      social_link: "https://twitter.com/foo",
      website_link: "https://catalysed.org",
      area_of_work: "Education",
      contact: {
        phone: "111111111",
        email: "example@gmail.com",
      },
      year_of_inception: "1985",
      address: {
        country: "India",
        region: "Delhi",
      },
      primary_language: "English",
    },
  };

  const history = useHistory();

  const handleEditProfileBtn = () => {
    history.push(ORGANISATION_PROFILE_EDIT);
  };

  return (
    <div className="OrgProfileManageSectionContainer">
      <SectionOne fakeData={fakeData} />

      <SectionTwo fakeData={fakeData} />

      <SectionThree fakeData={fakeData} />

      <div className="OrgProfileManageBtnContainer">
        <button className="OrgProfileManageBtn" onClick={handleEditProfileBtn}>
          Edit Profile <FaUserEdit className="OrgProfileManageBtnIcon" />
        </button>
      </div>
    </div>
  );
};

export default OrgProfileManageSectionContainer;
