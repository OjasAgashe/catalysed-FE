import React from "react";
import { Col, Form, Row } from "react-bootstrap";

type SectionTwoProps = {
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

  socialLinkIsInvalid: boolean;
  setSocialLinkIsInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  websiteLinkIsInvalid: boolean;
  setWebsiteLinkIsInvalid: React.Dispatch<React.SetStateAction<boolean>>;
};

const SectionTwo = ({
  fakeData,
  setFakeData,
  validated,
  setValidated,
  socialLinkIsInvalid,
  setSocialLinkIsInvalid,
  websiteLinkIsInvalid,
  setWebsiteLinkIsInvalid,
}: SectionTwoProps) => {
  const handleOrgEditProfileChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (validated) setValidated(false);
      if (socialLinkIsInvalid) setSocialLinkIsInvalid(false);
      if (websiteLinkIsInvalid) setWebsiteLinkIsInvalid(false);

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
    <section className="OrgProfileEditSectionTwo">
      <div className="SectionTwoFirstHalf">
        <Form noValidate validated={validated}>
          <Form.Text className="FormDetailsText">
            Organization Details
            <Form.Group>
              <Form.Text className="SectionTwoFormTextLabel EditOrgProfileDetailsDisabledField">
                name
              </Form.Text>

              <Form.Control
                className="SectionTwoFormControl EditOrgProfileDetailsDisabledField"
                disabled
                value={fakeData.organisation.name}
              />
            </Form.Group>
            <Form.Group>
              <Form.Text className="SectionTwoFormTextLabel">
                description
              </Form.Text>

              <Form.Control
                required
                name="description"
                as="textarea"
                rows={3}
                minLength={10}
                placeholder="Write About Your Organisation"
                className="SectionTwoFormControl SectionTwoTextArea"
                value={fakeData.organisation.description}
                onChange={handleOrgEditProfileChange}
              />
              <Form.Control.Feedback type="invalid" className="InvalidFeedback">
                Organisation description is required (and must have atleast 10
                characters).
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Text className="SectionTwoFormTextLabel">
                social link
              </Form.Text>

              <Form.Control
                required
                name="social_link"
                type="url"
                placeholder="Enter URL..."
                className="SectionTwoFormControl"
                value={fakeData.organisation.social_link}
                onChange={handleOrgEditProfileChange}
                isInvalid={socialLinkIsInvalid}
              />
              <Form.Control.Feedback type="invalid" className="InvalidFeedback">
                Required field, enter Valid Link.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Text className="SectionTwoFormTextLabel">
                website link
              </Form.Text>

              <Form.Control
                required
                name="website_link"
                type="url"
                placeholder="Enter URL..."
                className="SectionTwoFormControl"
                value={fakeData.organisation.website_link}
                onChange={handleOrgEditProfileChange}
                isInvalid={websiteLinkIsInvalid}
              />
              <Form.Control.Feedback type="invalid" className="InvalidFeedback">
                Required field, enter Valid Link.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Text>
        </Form>
      </div>

      <div className="SectionTwoSecondHalf">
        <Form noValidate validated={validated}>
          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel EditOrgProfileDetailsDisabledField">
              area of work
            </Form.Text>

            <Form.Control
              disabled
              className="SectionTwoFormControl EditOrgProfileDetailsDisabledField"
              value={fakeData.organisation.area_of_work}
            />
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">
              contact&nbsp;:&nbsp;
            </Form.Text>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Text className="SectionTwoFormTextLabel">
                    phone
                  </Form.Text>
                  <Form.Control
                    required
                    type="tel"
                    name="phone"
                    placeholder="Type..."
                    className="SectionTwoFormControl"
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
                  <Form.Text className="SectionTwoFormTextLabel">
                    email
                  </Form.Text>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    placeholder="Type.."
                    className="SectionTwoFormControl"
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
            <Form.Text className="SectionTwoFormTextLabel">
              year of Inception
            </Form.Text>
            <Form.Control
              required
              type="number"
              placeholder="YYYY"
              pattern="[0-9]{4}"
              min={1800}
              name="year_of_inception"
              className="SectionTwoFormControl"
              value={fakeData.organisation.year_of_inception}
              onChange={handleOrgEditProfileChange}
            />
            <Form.Control.Feedback type="invalid">
              Required field, please Enter Correct Value (&gt;1800).
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Text className="SectionTwoFormTextLabel">
              address&nbsp;:&nbsp;
            </Form.Text>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Text className="SectionTwoFormTextLabel">
                    country
                  </Form.Text>
                  <Form.Control
                    required
                    name="country"
                    type="text"
                    placeholder="Type..."
                    className="SectionTwoFormControl"
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
                  <Form.Text className="SectionTwoFormTextLabel">
                    region
                  </Form.Text>
                  <Form.Control
                    required
                    name="region"
                    type="text"
                    placeholder="Type..."
                    className="SectionTwoFormControl"
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
            <Form.Text className="SectionTwoFormTextLabel">
              primary language
            </Form.Text>
            <Form.Control
              required
              name="primary_language"
              type="text"
              placeholder="Type..."
              className="SectionTwoFormControl"
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

export default SectionTwo;
