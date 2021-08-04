import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentDashboardSessionCardColumn from "../../components/StudentDashboardSessionCardColumn/StudentDashboardSessionCardColumn";
import StuUpdatesProgramDetailsCommon from "../../components/StuUpdatesProgramDetailsCommon/StuUpdatesProgramDetailsCommon";
import { MentorDashboardSessionDetailsCardData } from "../../types/MentorDashboardSessionDetails";
import "../MentorUpdatesProgramDetails/MentorUpdatesProgramDashboard.css";

const StuUpdatesProgramDashboard = () => {
  const [noteCardArray, setNoteCardArray] = useState<
    MentorDashboardSessionDetailsCardData[]
  >([
    {
      sessionNoteTitle: "Title One",
      sessionNoteDescription:
        "The Lorem ipsum text is derived from sections 1.10.32 and 1.10.33 of Cicero's 'De finibus bonorum et malorum'.[7][8] The physical source may have been the 1914 Loeb Classical Library edition of De finibus",
      pinned: false,
      color: "#fff",
    },
    {
      sessionNoteTitle: "Title Two",
      sessionNoteDescription:
        "The Lorem ipsum text is derived from sections 1.10.32 and 1.10.33 of Cicero's 'De finibus bonorum et malorum'.[7][8] The physical source may have been the 1914 Loeb Classical Library edition of De finibus, where the Latin text, presented on the left-hand (even) pages,",
      pinned: false,
      color: "#ff9898",
    },
    {
      sessionNoteTitle: "Title Three",
      sessionNoteDescription:
        "The Lorem ipsum text is derived from sections 1.10.32 and 1.10.33 of Cicero's 'De finibus bonorum et malorum'.[7][8] The physical source may have been the 1914 Loeb Classical Library edition of De finibus, where the Latin text, presented on the left-hand (even) pages, breaks off on page 34 with \"Neque porro quisquam est qui do-\" and continues on page 36 with \"lorem ipsum .",
      pinned: true,
      color: "#75fa75",
    },
    {
      sessionNoteTitle: "Title Four",
      sessionNoteDescription:
        "The relevant section of Cicero as printed in the source is reproduced below with fragments used in Lorem ipsum underlined. Letters in brackets were added to Lorem ipsum and were not present in the source text:",
      pinned: false,
      color: "#a9a9ff",
    },
    {
      sessionNoteTitle: "Title Five",
      sessionNoteDescription:
        "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos,",
      pinned: true,
      color: "#eded72",
    },
  ]);

  const { programId } = useParams<{ programId: string }>();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Connected Program Dashboard | CatalysEd";
  }, []);

  return (
    <div className="StuUpdatesProgramDashboardPage Page MentorUpdatesProgramDashboardPage">
      {/* Mentor className has been used only for styling purpose  */}

      <StuUpdatesProgramDetailsCommon
        programTitle={"Program Title"}
        programId={parseInt(programId)}
        entity="STUDENT"
      />

      <div className="MentorUpdatesProgramDashboardDetails">
        {/* className has been used only for design purpose */}
        <StudentDashboardSessionCardColumn
          noteCardArray={noteCardArray}
          setNoteCardArray={setNoteCardArray}
        />
      </div>
    </div>
  );
};

export default StuUpdatesProgramDashboard;
