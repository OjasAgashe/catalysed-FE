import React, { useEffect, useState } from "react";
import OrgDirectoryDetailsCommonHeader from "../../components/OrgDirectoryDetailsCommonHeader/OrgDirectoryDetailsCommonHeader";
import OrgDirectoryDetailsConnectedToPrograms from "../../components/OrgDirectoryDetailsConnectedToPrograms/OrgDirectoryDetailsConnectedToPrograms";
import OrgDirectoryDetailsPersonalInfo from "../../components/OrgDirectoryDetailsPersonalInfo/OrgDirectoryDetailsPersonalInfo";

const OrgDirectoryMentorPage = () => {
  const [choosedOption, setChoosedOption] = useState("PersonalInfo");

  const fakeData = {
    full_name: "Sheldon Copper",
    age: 22,
    gender: "male",
    contact: {
      phone: "8888888888",
      email: "sheldon.copper@gmail.com",
    },
    school_or_organisation: "Caltech University",
    address: {
      city: "Texas",
      country: "US",
    },
    known_languages: [
      "English",
      "Chinese",
      "Hindi",
      "French",
      "English",
      "Chinese",
      "Hindi",
      "French",
      "English",
      "Chinese",
      "Hindi",
      "French",
    ],
    professionally_mentored_ever: "yes",
    experience: 2,
    stable_connection: "yes",
    academic_qualification: "Phd in Physics",
    profession: "Theoretical Physicist",
  };

  const fakePrograms = [
    {
      name: "Learn HTML for free at your own studying desk",
      state: "In-active",
    },
    {
      name: "Now You can learn English",
      state: "Active",
    },
    {
      name: "Learn HTML",
      state: "In-active",
    },
  ];

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Mentor Details | CatalysEd";
  });

  return (
    <div className="OrgDirectoryMentorPage">
      <OrgDirectoryDetailsCommonHeader
        full_name={fakeData.full_name}
        setChoosedOption={setChoosedOption}
      />

      {choosedOption === "PersonalInfo" && (
        <OrgDirectoryDetailsPersonalInfo fakeData={fakeData} />
      )}

      {choosedOption === "ConnectedToPrograms" && (
        <OrgDirectoryDetailsConnectedToPrograms fakePrograms={fakePrograms} />
      )}
    </div>
  );
};

export default OrgDirectoryMentorPage;
