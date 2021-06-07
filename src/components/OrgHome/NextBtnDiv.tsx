import React from "react";
import { BsChevronDoubleRight } from "react-icons/bs";

type NextBtnDivProps = {
  onClick: () => void;
}

const NextBtnDiv = ({ onClick }: NextBtnDivProps) => {
  return (
    <div className="NextBtnDiv" onClick={onClick}>
      <button className="NextBtnIconContainer">
        <BsChevronDoubleRight className="NextBtnIcon" />
      </button>
      View all
    </div>
  );
};

export default NextBtnDiv;
