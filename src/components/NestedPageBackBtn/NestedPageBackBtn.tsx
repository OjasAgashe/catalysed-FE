import React from "react";
import { FiChevronsLeft } from "react-icons/fi";
import "./NestedPageBackBtn.css";

type NestedPageBackBtnProps = {
  onClick: () => void;
};

const NestedPageBackBtn = ({ onClick }: NestedPageBackBtnProps) => {
  return (
    <button className="NestedPageButton" onClick={onClick}>
      <FiChevronsLeft className="NestedPageBackBtnIcon" />
    </button>
  );
};

export default NestedPageBackBtn;
