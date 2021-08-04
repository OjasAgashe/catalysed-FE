import React, { useEffect, useState } from "react";
import "./MentorDashboardSessionCardColumn.css";
import "../OrgHome/OrgHome.css";

import { CardColumns } from "react-bootstrap";
import {
  MentorDashboardSessionDetailsCardData,
  MentorUpdatesProgramDashboardActionType,
  MentorUpdatesProgramDashboardState,
} from "../../types/MentorDashboardSessionDetails";
import MentorDashboardSessionCard from "../MentorDashboardSessionCard/MentorDashboardSessionCard";
import SectionHeadingDiv from "../OrgHome/SectionHeadingDiv";

type MentorDashboardSessionCardColumnProps = {
  dbState: MentorUpdatesProgramDashboardState;
  dbDispatch: React.Dispatch<MentorUpdatesProgramDashboardActionType>;
};

const MentorDashboardSessionCardColumn = ({
  dbState,
  dbDispatch,
}: MentorDashboardSessionCardColumnProps) => {
  const [hasPinnedNote, setHasPinnedNote] = useState<boolean>(false);
  const [hasOthersNote, setHasOthersNote] = useState<boolean>(false);

  useEffect(() => {
    let foundPinned = false;
    let foundOthers = false;

    for (let value of dbState.noteCardArray) {
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
  }, [dbState.noteCardArray]);

  const filterNoteCardArray = (
    index: number,
    data: MentorDashboardSessionDetailsCardData
  ) => {
    return [...dbState.noteCardArray]
      .reverse()
      .filter(
        (filterData, filterIndex) =>
          filterIndex !== index &&
          (filterData.sessionNoteDescription !== data.sessionNoteDescription ||
            filterData.sessionNoteTitle !== data.sessionNoteTitle)
      );
  };

  const handleCardBodyClick = (
    index: number,
    data: MentorDashboardSessionDetailsCardData
  ) => {
    dbDispatch({ type: "selectedNoteCardData", payload: data });

    const tempNoteCardArray = filterNoteCardArray(index, data);

    dbDispatch({
      type: "noteCardArray",
      payload: [...tempNoteCardArray].reverse(),
    });

    dbDispatch({ type: "showModal", payload: true });
  };

  const handlePinButtonClick = (
    index: number,
    data: MentorDashboardSessionDetailsCardData
  ) => {
    const tempNoteCardArray = [...filterNoteCardArray(index, data)].reverse();

    dbDispatch({
      type: "noteCardArray",
      payload: [...tempNoteCardArray, { ...data, pinned: !data.pinned }],
    });
  };

  return (
    <div className="MentorDashboardSessionCardColumnContainer OrgHomeSectionContainer">
      {/*
       * OrgHomeSectionContainer has been used only for styling purpose
       * of SectionHeadingDiv
       */}

      {hasPinnedNote && hasOthersNote && (
        <SectionHeadingDiv headingText="Pinned" />
      )}
      {hasPinnedNote && (
        <>
          <CardColumns className="CardColumns">
            {[...dbState.noteCardArray]
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
                        cardBodyOnClick={() => handleCardBodyClick(index, data)}
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
        {[...dbState.noteCardArray]
          .reverse()
          .map((data: MentorDashboardSessionDetailsCardData, index: number) => {
            if (!data.pinned) {
              return (
                <MentorDashboardSessionCard
                  key={index}
                  data={data}
                  cardBodyOnClick={() => handleCardBodyClick(index, data)}
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

export default MentorDashboardSessionCardColumn;
