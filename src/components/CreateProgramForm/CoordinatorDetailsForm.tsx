import React from "react";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const CoordinatorDetailsForm = () => {
  return (
    <div className="CoordinatorDetailsFormContainer">
      <Form className="CoordinatorDetailsForm">
        <Form.Text className="FormDetailsText">
          Co-ordinator Details
        </Form.Text>

        <Form.Control
          className="CreateProgramFormControl"
          name="name"
          placeholder="Name"
        />
        <Form.Control
          type="email"
          className="CreateProgramFormControl"
          name="email"
          placeholder="Email"
        />
        <PhoneInput
          country={"in"}
          inputProps={{
            name: "phone",
            required: true,
            className: "form-control CreateProgramFormControl",
          }}
        />
      </Form>
    </div>
  );
};

export default CoordinatorDetailsForm;
