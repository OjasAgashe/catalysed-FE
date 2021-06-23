import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { OrgProfileManageContactUs } from "../../assets/Illustrations/Illustrations";

type SectionThreeProps = {
  fakeData: {
    firstName: string;
    lastName: string;
    email: string;
    organisation: {
      name: string;
      description: string;
      social_link: string;
      website_link: string;
      area_of_work: string;
      contact: {
        phone: string;
        email: string;
      };
      year_of_inception: string;
      address: {
        country: string;
        region: string;
      };
      primary_language: string;
    };
  };

  setFakeData: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      email: string;
      organisation: {
        name: string;
        description: string;
        social_link: string;
        website_link: string;
        area_of_work: string;
        contact: {
          phone: string;
          email: string;
        };
        year_of_inception: string;
        address: {
          country: string;
          region: string;
        };
        primary_language: string;
      };
    }>
  >;

  validated: boolean;
  setValidated: React.Dispatch<React.SetStateAction<boolean>>;
};

const SectionThree = ({
  fakeData,
  setFakeData,
  validated,
  setValidated,
}: SectionThreeProps) => {
  const handleOrgEditProfileChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (validated) setValidated(false);

      if (
        event.target.name === "year_of_inception" &&
        event.target.value.length > 4
      ) {
        return;
      }

      setFakeData((prevState) => ({
        ...prevState,
        organisation: {
          ...prevState.organisation,
          [event.target.name]: event.target.value,
        },
      }));
    };

  const handleOrgEditProfileContactChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (validated) setValidated(false);

      setFakeData((prevState) => ({
        ...prevState,
        organisation: {
          ...prevState.organisation,
          contact: {
            ...prevState.organisation.contact,
            [event.target.name]: event.target.value,
          },
        },
      }));
    };

  const handleOrgEditProfileAddressChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (validated) setValidated(false);

      setFakeData((prevState) => ({
        ...prevState,
        organisation: {
          ...prevState.organisation,
          address: {
            ...prevState.organisation.address,
            [event.target.name]: event.target.value,
          },
        },
      }));
    };

  return (
    <section className="OrgProfileManageSectionThree">
      <div className="SectionThreeFirstHalf">
        <img src={OrgProfileManageContactUs} alt="contact us svg" />
      </div>

      <div className="SectionThreeSecondHalf">
        <Form noValidate validated={validated}>
          <Form.Control
            disabled
            className="SectionThreeFormControl EditOrgProfileDetailsDisabledField"
            value={fakeData.organisation.area_of_work}
          />

          <Form.Group>
            <Form.Text className="SectionThreeFormTextLabel">
              contact&nbsp;:&nbsp;
            </Form.Text>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Text className="SectionThreeFormTextLabel">
                    phone
                  </Form.Text>
                  <Form.Control
                    required
                    type="tel"
                    name="phone"
                    placeholder="Type..."
                    className="SectionThreeFormControl"
                    value={fakeData.organisation.contact.phone}
                    onChange={handleOrgEditProfileContactChange}
                  />
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                  Required field, please Enter Correct Value.
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Text className="SectionThreeFormTextLabel">
                    email
                  </Form.Text>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    placeholder="Type.."
                    className="SectionThreeFormControl"
                    value={fakeData.organisation.contact.email}
                    onChange={handleOrgEditProfileContactChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Required field, please Enter Correct Value.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionThreeFormTextLabel">
              year of Inception
            </Form.Text>
            <Form.Control
              required
              type="number"
              placeholder="YYYY"
              pattern="[0-9]{4}"
              min={1800}
              name="year_of_inception"
              className="SectionThreeFormControl"
              value={fakeData.organisation.year_of_inception}
              onChange={handleOrgEditProfileChange}
            />
            <Form.Control.Feedback type="invalid">
              Required field, please Enter Correct Value (&gt;1800).
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionThreeFormTextLabel">
              address&nbsp;:&nbsp;
            </Form.Text>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Text className="SectionThreeFormTextLabel">
                    country
                  </Form.Text>
                  <Form.Control
                    required
                    name="country"
                    type="text"
                    placeholder="Type..."
                    className="SectionThreeFormControl"
                    value={fakeData.organisation.address.country}
                    onChange={handleOrgEditProfileAddressChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Required field, please Enter.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Text className="SectionThreeFormTextLabel">
                    region
                  </Form.Text>
                  <Form.Control
                    required
                    name="region"
                    type="text"
                    placeholder="Type..."
                    className="SectionThreeFormControl"
                    value={fakeData.organisation.address.region}
                    onChange={handleOrgEditProfileAddressChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Required field, please Enter.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionThreeFormTextLabel">
              primary language
            </Form.Text>
            <Form.Control
              required
              name="primary_language"
              type="text"
              placeholder="Type..."
              className="SectionThreeFormControl"
              value={fakeData.organisation.primary_language}
              onChange={handleOrgEditProfileChange}
            />
            <Form.Control.Feedback type="invalid">
              Required field, please Enter.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </div>
    </section>
  );
};

export default SectionThree;
