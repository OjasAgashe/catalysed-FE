import React from "react";
import { Alert } from "react-bootstrap";
import "./Error.css";

type ErrorProps = {
  message: string;
};

const Error = ({ message }: ErrorProps) => {
  return (
    <Alert variant="danger" className="FormError">
      {message}
    </Alert>
  );
};

export default Error;
