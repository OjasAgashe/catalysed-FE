import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LOGIN } from "../../constants/Routes";
import "./Error.css";

type ErrorProps = {
  message: string;
  className?: string;
};

/*
 * This component we will show on Registration, when an already
 * registered user tries to register again
 */

const Error = ({ message, className = "" }: ErrorProps) => {
  return (
    <Alert variant="danger" className={`FormError ${className}`}>
      {message === "User already registered in system - Please Login" ? (
        <>
          User already registered in system -{" "}
          <Link to={LOGIN}>Please Login</Link>
        </>
      ) : (
        message
      )}
    </Alert>
  );
};

export default Error;
