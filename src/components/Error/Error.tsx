import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LOGIN } from "../../constants/Routes";
import "./Error.css";

type ErrorProps = {
  message: string;
};

const Error = ({ message }: ErrorProps) => {
  return (
    <Alert variant="danger" className="FormError">
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
