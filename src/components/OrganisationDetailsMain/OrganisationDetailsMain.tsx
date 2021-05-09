import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import './OrganisationDetailsMain.css';

const OrganisationDetailsMain = () => {
  useEffect(() => {
    document.title = "Organisation Details | CatalysEd";
  });

  const handleOrganisationDetailsFormSubmit: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    e.preventDefault();
    console.log("Organisation Details Form Button clicked.");
  };

  return (
    <div className="OrganisationDetailsMain">
      <Form
        className="OrganisationDetailsMainForm"
        onSubmit={handleOrganisationDetailsFormSubmit}
      >
        <Form.Control
          className="FormControlOrganisationName"
          type="text"
          placeholder="Organisation Name"
        />
        <Form.Control
          className="FormControlAboutOrganisation"
          as="textarea"
          rows={3}
          placeholder="Write About Your Organisation"
        />
        <Form.Control
          className="FormControlOrganisationWebsiteLink"
          type="text"
          placeholder="Organisation Website Link"
        />

        <div className="FormButtonContainer">
          <Button type="submit" className="FormButton">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default OrganisationDetailsMain;
