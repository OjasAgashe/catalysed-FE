import React, { useMemo } from "react";
import { CardColumns } from "react-bootstrap";
import MentorDashboardSessionCard from "../MentorDashboardSessionCard/MentorDashboardSessionCard";
import SectionHeadingDiv from "../OrgHome/SectionHeadingDiv";
import "../MentorDashboardSessionCardColumn/MentorDashboardSessionCardColumn.css";

const SectionSix = () => {
  const noteCardArray = useMemo(
    () => [
      {
        sessionNoteTitle: "Title One",
        sessionNoteDescription:
          "The Lorem ipsum text is derived from sections 1.10.32 and 1.10.33 of Cicero's 'De finibus bonorum et malorum'.[7][8] The physical source may have been the 1914 Loeb Classical Library edition of De finibus",
        pinned: true,
        color: "#fff",
      },
      {
        sessionNoteTitle: "Title Two",
        sessionNoteDescription:
          "The Lorem ipsum text is derived from sections 1.10.32 and 1.10.33 of Cicero's 'De finibus bonorum et malorum'.[7][8] The physical source may have been the 1914 Loeb Classical Library edition of De finibus, where the Latin text, presented on the left-hand (even) pages,",
        pinned: true,
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
        pinned: true,
        color: "#a9a9ff",
      },
      {
        sessionNoteTitle: "Title Five",
        sessionNoteDescription:
          "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos,",
        pinned: true,
        color: "#eded72",
      },
    ],
    []
  );

  return (
    <section className="StudentSectionSixContainer">
      {/*
       * Using SectionHeadingDiv component of Org Home, to show
       * the heading
       */}
      <SectionHeadingDiv headingText="Pinned Message" />

      <div className="MentorDashboardSessionCardColumnContainer">
        <CardColumns className="CardColumns">
          {[...noteCardArray].map((data) => (
            <MentorDashboardSessionCard
              key={data.sessionNoteTitle}
              data={data}
            />
          ))}
        </CardColumns>
      </div>
    </section>
  );
};

export default SectionSix;
