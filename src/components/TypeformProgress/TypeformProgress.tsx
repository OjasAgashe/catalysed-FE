import React from "react";
import "./TypeformProgress.css";
import { ProgressBar } from "react-bootstrap";

type TypeformProgressProps = {
  now: number;
};

const TypeformProgress = ({ now }: TypeformProgressProps) => {
  return (
    <div className="TypeformProgressContainer">
      <h5>completed</h5>
      <ProgressBar className="TypeformProgressBar" animated striped variant="success" now={now} />
    </div>
  );
};

export default TypeformProgress;
