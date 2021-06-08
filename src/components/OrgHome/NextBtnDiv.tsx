import React from "react";
import { BsChevronDoubleRight } from "react-icons/bs";

type NextBtnDivProps = {
  onClick: () => void;
  classNames?: string;
};

const NextBtnDiv = ({ onClick, classNames = "" }: NextBtnDivProps) => {
  return (
    <div className={`NextBtnDiv ${classNames}`} onClick={onClick}>
      <button className="NextBtnIconContainer">
        <BsChevronDoubleRight className="NextBtnIcon" />
      </button>
      View all
    </div>
  );
};

export default NextBtnDiv;
