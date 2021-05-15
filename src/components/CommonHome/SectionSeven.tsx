import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { IoIosSend } from "react-icons/io";

const SectionSeven = () => {
  return (
    <section className="CommonHomeSectionSeven">
      <Form className="CommonHomeForm">
        <Form.Text className="CommonHomeFormText">Contact Us</Form.Text>
        <Row>
          <Col>
            <Form.Control name="name" type="text" placeholder="Name" />
          </Col>
          <Col>
            <Form.Control name="email" type="email" placeholder="Email" />
          </Col>
        </Row>

        <Form.Control
          name="subject"
          className="CommonHomeFormSubject"
          type="text"
          placeholder="Subject"
        />

        <Form.Control
          className="CommonHomeFormMessage"
          name="message"
          as="textarea"
          rows={5}
          placeholder="Type your message here..."
        />

        <div className="CommonHomeFormButtonContainer FormButtonContainer">
          <Button className="CommonHomeFormButton FormButton">
            Submit <IoIosSend className="IoIosSendIcon" />
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default SectionSeven;
