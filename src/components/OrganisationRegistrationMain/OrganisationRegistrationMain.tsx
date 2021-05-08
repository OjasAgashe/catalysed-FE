import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./OrganisationRegistrationMain.css";

const OrganisationRegistrationMain = () => {
  return (
    <div className="OrganisationRegistrationMain">
      <Form className="OrganisationRegistrationMainForm">
        <Row>
          <Col>
            <Form.Control
              className="FormControlFirstname"
              type="text"
              placeholder="First Name *"
            />
          </Col>
          <Col>
            <Form.Control
              className="FormControlLastname"
              type="text"
              placeholder="Last Name *"
            />
          </Col>
        </Row>
        <Form.Control
          className="FormControlEmail"
          type="email"
          placeholder="Your Official Email Id *"
        />
        <Form.Control
          className="FormControlPassword"
          type="password"
          placeholder="Password *"
        />
        <Form.Control
          className="FormControlConfirmPassword"
          type="password"
          placeholder="Confirm Password *"
        />

        <div className="FormButtonContainer">
          <Button className="FormButton">Register now</Button>
        </div>
        <Form.Text className="FormTextOr">Or</Form.Text>
        <Form.Text className="FormTextLogin">
          Do you have an account? <span className="FormTextLoginSpan">Click here to login</span>
        </Form.Text>
      </Form>
    </div>
  );
};

export default OrganisationRegistrationMain;
