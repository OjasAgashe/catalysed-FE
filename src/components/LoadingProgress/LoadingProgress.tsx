import React from "react";
import { BounceLoader } from "react-spinners";
import { AiFillCheckCircle } from "react-icons/ai";
import "./LoadingProgress.css";

const LoadingProgress = () => {
  return (
    <div className="LoadingProgressContainer">
      <div className="BounceLoaderContainer">
        <BounceLoader color="#2bc0ef" css="display:block; margin:0 auto;" />
        <span>Registering You...</span>
      </div>
      {/* <br /> */}
      <div className="EmailSentIconContainer">
        <AiFillCheckCircle className="EmailSentTickIcon" />
        <span>Registration Successful !</span>
        <span>Verification mail sent for account activation</span>
      </div>
    </div>
  );
};

export default LoadingProgress;
