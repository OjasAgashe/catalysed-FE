import React from "react";
import { BounceLoader } from "react-spinners";
import { AiFillCheckCircle } from "react-icons/ai";
import "./LoadingProgress.css";

type LoadingProgressProps = {
  loading: boolean;
  emailSent: boolean;
  loadingMessage: string;
};

const LoadingProgress = ({
  loading,
  emailSent,
  loadingMessage,
}: LoadingProgressProps) => {
  return (
    <div className="LoadingProgressModal">
      <div className="LoadingProgressContainer">
        {loading && (
          <div className="BounceLoaderContainer">
            <BounceLoader color="#2bc0ef" css="display:block; margin:0 auto;" />
            <br />
            <span>{loadingMessage}</span>
          </div>
        )}
        {emailSent && (
          <div className="EmailSentIconContainer">
            <AiFillCheckCircle className="EmailSentTickIcon" />
            <span className="RegistrationSuccessText">
              Registration Successful !
            </span>
            <span>Verification mail sent for account activation</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingProgress;
