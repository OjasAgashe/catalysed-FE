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
  // To check that there is any Pinned Note present or Not
  const [hasPinnedNote, setHasPinnedNote] = useState<boolean>(false);

  // To check that there is any Others Note present or Not
  const [hasOthersNote, setHasOthersNote] = useState<boolean>(false);

  useEffect(() => {
    let foundPinned = false;
    let foundOthers = false;

    // Function checking for Pinned and Others Note
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

  /*
   * Function to get Data of all Cards, that has not been clicked
   */
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

  // Function handling functionality of Pinning and Unpinning a Note
  const handlePinButtonClick = (
    index: number,
    data: MentorDashboardSessionDetailsCardData
  ) => {
    // Get all the Cards Data, other then what is clicked
    const tempNoteCardArray = [...filterNoteCardArray(index, data)].reverse();

    /*
     * Now set the pinned property of clicked Card Data
     * to opposite of its previous value
     */
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
