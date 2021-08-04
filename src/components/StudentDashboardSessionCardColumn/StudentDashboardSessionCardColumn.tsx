import React, { useEffect, useState } from "react";
import { CardColumns } from "react-bootstrap";
import MentorDashboardSessionCard from "../MentorDashboardSessionCard/MentorDashboardSessionCard";
import SectionHeadingDiv from "../OrgHome/SectionHeadingDiv";

import "../OrgHome/OrgHome.css";
import "../MentorDashboardSessionCardColumn/MentorDashboardSessionCardColumn.css";
import { MentorDashboardSessionDetailsCardData } from "../../types/MentorDashboardSessionDetails";

type StudentDashboardSessionCardColumnProps = {
  noteCardArray: MentorDashboardSessionDetailsCardData[];
  setNoteCardArray: React.Dispatch<
    React.SetStateAction<MentorDashboardSessionDetailsCardData[]>
  >;
};

const StudentDashboardSessionCardColumn = ({
  noteCardArray,
  setNoteCardArray,
}: StudentDashboardSessionCardColumnProps) => {
  const [hasPinnedNote, setHasPinnedNote] = useState<boolean>(false);
  const [hasOthersNote, setHasOthersNote] = useState<boolean>(false);

  useEffect(() => {
    let foundPinned = false;
    let foundOthers = false;

    for (let value of noteCardArray) {
      if (value.pinned && !foundPinned) {
        setHasPinnedNote(true);
        foundPinned = true;
      }

      if (!value.pinned && !foundOthers) {
        setHasOthersNote(true);
        foundOthers = true;
      }

      if (foundPinned && foundOthers) {
        break;
      }
    }

    if (!foundPinned) setHasPinnedNote(false);

    if (!foundOthers) setHasOthersNote(false);
  }, [noteCardArray]);

  const filterNoteCardArray = (
    index: number,
    data: MentorDashboardSessionDetailsCardData
  ) => {
    return [...noteCardArray]
      .reverse()
      .filter(
        (filterData, filterIndex) =>
          filterIndex !== index &&
          (filterData.sessionNoteDescription !== data.sessionNoteDescription ||
            filterData.sessionNoteTitle !== data.sessionNoteTitle)
      );
  };

  const handlePinButtonClick = (
    index: number,
    data: MentorDashboardSessionDetailsCardData
  ) => {
    const tempNoteCardArray = [...filterNoteCardArray(index, data)].reverse();

    setNoteCardArray([...tempNoteCardArray, { ...data, pinned: !data.pinned }]);
  };

  return (
    <div className="MentorDashboardSessionCardColumnContainer OrgHomeSectionContainer">
      {/*
       * This className has been used only for styling purpose
       */}

      {hasPinnedNote && hasOthersNote && (
        <SectionHeadingDiv headingText="Pinned" />
      )}
      {hasPinnedNote && (
        <>
          <CardColumns className="CardColumns">
            {[...noteCardArray]
              .reverse()
              .map(
                (
                  data: MentorDashboardSessionDetailsCardData,
                  index: number
                ) => {
                  if (data.pinned) {
                    return (
                      <MentorDashboardSessionCard
                        key={index}
                        data={data}
                        pinnedOnClick={() => handlePinButtonClick(index, data)}
                      />
                    );
                  }
                  return <></>;
                }
              )}
          </CardColumns>
        </>
      )}

      {hasPinnedNote && hasOthersNote && (
        <SectionHeadingDiv headingText="Others" />
      )}
      <CardColumns className="CardColumns">
        {[...noteCardArray]
          .reverse()
          .map((data: MentorDashboardSessionDetailsCardData, index: number) => {
            if (!data.pinned) {
              return (
                <MentorDashboardSessionCard
                  key={index}
                  data={data}
                  pinnedOnClick={() => handlePinButtonClick(index, data)}
                />
              );
            }
            return <></>;
          })}
      </CardColumns>
    </div>
  );
};

export default StudentDashboardSessionCardColumn;
