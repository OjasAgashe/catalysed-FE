import React, { useEffect, useState } from "react";
import StuUpdatesOrganisations from "../../components/StuUpdatesOrganisations/StuUpdatesOrganisations";
import StuUpdatesPageHeader from "../../components/StuUpdatesPageHeader/StuUpdatesPageHeader";
import StuUpdatesPrograms from "../../components/StuUpdatesPrograms/StuUpdatesPrograms";
import { useQuery } from "../../custom_hooks/useQuery";

const StudentUpdatesPage = () => {
  const query = useQuery();
  const [view, setView] = useState(
    query.get("view") === "PROGRAMS"
      ? "Programs"
      : query.get("view") === "ORGANISATIONS"
      ? "Organisations"
      : ""
  );

  const fakeProgramData = [
    {
      id: 1,
      name: "abc",
      duration: "3",
      mode: "VIRTUAL",
    },
    {
      id: 2,
      name: "HTML5 Language",
      duration: "5",
      mode: "IN_PERSON",
    },
    {
      id: 3,
      name: "ABC",
      duration: "7",
      mode: "VIRTUAL",
    },
    {
      id: 4,
      name: "CSS3 AND HTML5 AND JAVASCRIPT",
      duration: "2",
      mode: "IN_PERSON",
    },
  ];

  const fakeOrganisationData = [
    {
      id: 1,
      name: "CatalyseEd",
      description:
        "We aim to help every child colour the world by facilitating easy and streamlined access to quality guidance and education by providing them with a platform that helps them unveil their potential and introduce them to phenomenal and unforeseen opportunities.",
    },
    {
      id: 2,
      name: "CatalyseEdCatalyseEd",
      description:
        "We aim to help every child colour the world by facilitating easy and streamlined access to quality guidance and education by providing them with a platform that helps them unveil their potential and introduce them to phenomenal and unforeseen opportunities.",
    },
    {
      id: 3,
      name: "CatalyseEdCatalyseEdCatalyseEd",
      description:
        "We aim to help every child colour the world by facilitating easy and streamlined access to quality guidance and education by providing them with a platform that helps them unveil their potential and introduce them to phenomenal and unforeseen opportunities.",
    },
    {
      id: 4,
      name: "CatalyseEd CatalyseEd",
      description:
        "We aim to help every child colour the world by facilitating easy and streamlined access to quality guidance and education by providing them with a platform that helps them unveil their potential and introduce them to phenomenal and unforeseen opportunities.",
    },
  ];

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.title = `Connected ${view} | CatalysEd`;
  }, [view]);

  return (
    <div className="StudentUpdatesPage">
      <StuUpdatesPageHeader view={view} setView={setView} />

      {view === "Programs" && (
        <StuUpdatesPrograms fakeProgramData={fakeProgramData} />
      )}

      {view === "Organisations" && (
        <StuUpdatesOrganisations fakeOrganisationData={fakeOrganisationData} />
      )}
    </div>
  );
};

export default StudentUpdatesPage;
