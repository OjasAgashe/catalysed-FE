import React, { useEffect, useState } from "react";
import OrgDirectoryPageHeader from "../../components/OrgDirectoryPageHeader/OrgDirectoryPageHeader";
import OrgMentorDirectory from "../../components/OrgMentorDirectory/OrgMentorDirectory";
import OrgStudentDirectory from "../../components/OrgStudentDirectory/OrgStudentDirectory";

const OrgDirectoryPage = () => {
  const [title, setTitle] = useState("Mentors");
  const [searchedName, setSearchedName] = useState("");
  const [filteredResponseData, setFilteredResponseData] = useState<
    | {
        id: number;
        name: string;
        email: string;
        active_programs: string[];
      }[]
    | []
  >([]);
  const [searchedNameNotFound, setSearchedNameNotFound] = useState(false);

  const fakeMentorData = [
    {
      id: 1,
      name: "Peter Parker",
      email: "Peter.Parker@gmail.com",
      active_programs: [
        "Get familiar with Web Development using Reactjs",
        "Learn HTML",
      ],
    },
    {
      id: 2,
      name: "Peter Parker",
      email: "Peter.Parker@gmail.com",
      active_programs: [
        "Learn HTML",
        "Get familiar with Web Development using Reactjs",
      ],
    },
    {
      id: 3,
      name: "Peter Parker",
      email: "Peter.Parker@gmail.com",
      active_programs: [
        "Get familiar with Web Development using Reactjs",
        "Learn HTML",
      ],
    },
    {
      id: 4,
      name: "Peter Parker",
      email: "Peter.Parker@gmail.com",
      active_programs: [
        "Get familiar with Web Development using Reactjs",
        "Learn HTML",
      ],
    },
    {
      id: 5,
      name: "Peter Parker",
      email: "Peter.Parker@gmail.com",
      active_programs: [
        "Get familiar with Web Development using Reactjs",
        "Learn HTML",
      ],
    },
  ];

  const fakeStudentData = [
    {
      id: 1,
      name: "Harry Potter",
      email: "Harry.Potter@gmail.com",
      active_programs: [
        "Get familiar with Web Development using Reactjs",
        "Learn HTML",
      ],
    },
    {
      id: 2,
      name: "Harry Potter",
      email: "Harry.Potter@gmail.com",
      active_programs: [
        "Get familiar with Web Development using Reactjs",
        "Learn HTML",
      ],
    },
    {
      id: 3,
      name: "Harry Potter",
      email: "Harry.Potter@gmail.com",
      active_programs: [
        "Get familiar with Web Development using Reactjs",
        "Learn HTML",
      ],
    },
    {
      id: 4,
      name: "Harry Potter",
      email: "Harry.Potter@gmail.com",
      active_programs: [
        "Get familiar with Web Development using Reactjs",
        "Learn HTML",
      ],
    },
    {
      id: 5,
      name: "Harry Potter",
      email: "Harry.Potter@gmail.com",
      active_programs: [
        "Get familiar with Web Development using Reactjs",
        "Learn HTML",
      ],
    },
  ];

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Org Directory | CatalysEd";
  });

  return (
    <div className="OrgDirectoryPage">
      <OrgDirectoryPageHeader
        setTitle={setTitle}
        title={title}
        searchedName={searchedName}
        setSearchedName={setSearchedName}
        setFilteredResponseData={setFilteredResponseData}
        fakeMentorData={fakeMentorData}
        fakeStudentData={fakeStudentData}
        setSearchedNameNotFound={setSearchedNameNotFound}
      />

      {title === "Mentors" && (
        <OrgMentorDirectory
          fakeMentorData={fakeMentorData}
          filteredResponseData={filteredResponseData}
          searchedNameNotFound={searchedNameNotFound}
          searchedName={searchedName}
        />
      )}

      {title === "Students" && (
        <OrgStudentDirectory
          fakeStudentData={fakeStudentData}
          filteredResponseData={filteredResponseData}
          searchedNameNotFound={searchedNameNotFound}
          searchedName={searchedName}
        />
      )}
    </div>
  );
};

export default OrgDirectoryPage;
