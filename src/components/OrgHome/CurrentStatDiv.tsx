import React from "react";

type CurrentStatDivProps = {
  divHeadingText: string;
  divHeadingValue: string;
};

const CurrentStatDiv = ({
  divHeadingText,
  divHeadingValue,
}: CurrentStatDivProps) => {
  return (
    <div className="CurrentStatDiv">
      <div className="CurrentStatDivHeading">
        {divHeadingText === "New This Month" ? (
          <>
            New
            <br />
            This Month
          </>
        ) : (
          divHeadingText
        )}
        &nbsp;:&nbsp;
      </div>
      <div className="CurrentStatDivValue">{divHeadingValue}</div>
    </div>
  );
};

export default CurrentStatDiv;
