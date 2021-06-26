import React, { useEffect, useState } from "react";
import OrgDirectoryDetailsCommonHeader from "../../components/OrgDirectoryDetailsCommonHeader/OrgDirectoryDetailsCommonHeader";
import OrgDirectoryDetailsConnectedToPrograms from "../../components/OrgDirectoryDetailsConnectedToPrograms/OrgDirectoryDetailsConnectedToPrograms";
import OrgDirectoryDetailsStudentPersonalInfo from "../../components/OrgDirectoryDetailsStudentPersonalInfo/OrgDirectoryDetailsStudentPersonalInfo";

const OrgDirectoryStudentPage = () => {
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
    professionally_get_mentored: "yes",
    stable_connection: "yes",
    device_most_prefer: "Mobile",
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

    document.title = "Student Details | CatalysEd";
  });

  return (
    <div className="OrgDirectoryStudentPage">
      <OrgDirectoryDetailsCommonHeader
        full_name={fakeData.full_name}
        choosedOption={choosedOption}
        setChoosedOption={setChoosedOption}
      />

      {choosedOption === "PersonalInfo" && (
        <OrgDirectoryDetailsStudentPersonalInfo fakeData={fakeData} />
      )}

      {choosedOption === "ConnectedToPrograms" && (
        <OrgDirectoryDetailsConnectedToPrograms fakePrograms={fakePrograms} />
      )}
    </div>
  );
};

export default OrgDirectoryStudentPage;
