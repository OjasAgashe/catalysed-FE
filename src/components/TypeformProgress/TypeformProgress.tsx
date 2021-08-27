import React from "react";
import "./TypeformProgress.css";
import { ProgressBar } from "react-bootstrap";

type TypeformProgressProps = {
  now: number;
};

/*
 * This component has been used to show the filled typeform status
 *
 * What percent of typeform is filled
 *
 * For profile builder page
 */

const TypeformProgress = ({ now }: TypeformProgressProps) => {
  return (
    <div className="TypeformProgressContainer">
      <h5>completed</h5>
      <ProgressBar
        className="TypeformProgressBar"
        animated
        striped
        variant="success"
        now={now}
      />
    </div>
  );
};

export default TypeformProgress;
