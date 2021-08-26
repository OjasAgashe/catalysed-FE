import React from "react";
import { BounceLoader } from "react-spinners";
import { AiFillCheckCircle } from "react-icons/ai";
import "./LoadingProgress.css";

type LoadingProgressProps = {
  loading: boolean;
  emailSent: boolean;
  loadingMessage: string;
};

/*
 * LoadingProgress: component accepts three props,
 *
 * loading: to show the BounceLoader
 * emailSent: to show the emailSent Message, in case of
 * Org Registration
 * loadingMessage: to store the value of loading message to show
 */
const LoadingProgress = ({
  loading,
  emailSent,
  loadingMessage,
}: LoadingProgressProps) => {
  return (
    <div className="LoadingProgressModal">
      <div className="LoadingProgressContainer">
        {/*
         * Show the loading BounceLoader, with the loading Message
         */}
        {loading && (
          <div className="BounceLoaderContainer">
            <BounceLoader color="#2bc0ef" css="display:block; margin:0 auto;" />
            <br />
            <span>{loadingMessage}</span>
          </div>
        )}

        {/*
         * Show the emailSent Message
         */}
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
