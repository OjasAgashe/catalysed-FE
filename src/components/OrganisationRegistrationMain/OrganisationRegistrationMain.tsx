import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { ORGANISATION_DETAILS } from "../../routes/Routes";
import "./OrganisationRegistrationMain.css";
import { MdNavigateNext } from "react-icons/md";

const OrganisationRegistrationMain = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = "Organisation Registration | CatalysEd";
  });

  const handleOrganisationRegistrationFormSubmit: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    e.preventDefault();
    console.log("Organisation Registration Form Button clicked.");
    history.push(ORGANISATION_DETAILS);
  };

  return (
    <div className="OrganisationRegistrationMain">
      <Form
        className="OrganisationRegistrationMainForm"
        onSubmit={handleOrganisationRegistrationFormSubmit}
      >
        <Row>
          <Col>
            <Form.Control
              className="FormControlFirstname"
              type="text"
              placeholder="First Name"
            />
          </Col>
          <Col>
            <Form.Control
              className="FormControlLastname"
              type="text"
              placeholder="Last Name"
            />
          </Col>
        </Row>
        <Form.Control
          className="FormControlEmail"
          type="email"
          placeholder="Your Official Email Id"
        />
        <Form.Control
          className="FormControlPassword"
          type="password"
          placeholder="Password"
        />
        <Form.Control
          className="FormControlConfirmPassword"
          type="password"
          placeholder="Confirm Password"
        />

        <div className="FormButtonContainer">
          <Button type="submit" className="FormButton">
            Next <MdNavigateNext className="MdNavigateNextIcon" />
          </Button>
        </div>
        <Form.Text className="FormTextOr">Or</Form.Text>
        <Form.Text className="FormTextLogin">
          Do you have an account?{" "}
          <span className="FormTextLoginSpan">Click here to login</span>
        </Form.Text>
      </Form>
    </div>
  );
};

export default OrganisationRegistrationMain;
