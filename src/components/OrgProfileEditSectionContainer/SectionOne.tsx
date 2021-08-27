import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { OrgProfileManagePersonalInfo } from "../../assets/Illustrations/Illustrations";
import {
  OrgProfileEditActionType,
  OrgProfileEditData,
  OrgProfileEditState,
} from "../../types/OrgProfileEdit";

type SectionOneProps = {
  editedData: OrgProfileEditData | null;
  setEditedData: React.Dispatch<
    React.SetStateAction<OrgProfileEditData | null>
  >;
  state: OrgProfileEditState;
  dispatch: React.Dispatch<OrgProfileEditActionType>;
};

const SectionOne = ({
  editedData,
  setEditedData,
  state,
  dispatch,
}: SectionOneProps) => {
  /*
   * Function to handle changes done in Input fields that has been
   * shown in SectionOne
   */
  const handleOrgEditProfileChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      /*
       * Set the value of state.validated to false, if previously it is true.
       * 
       * And do the same for state.phoneValueIsInvalid, state.socialLinkIsInvalid
       * , and state.websiteLinkIsInvalid
       */
      if (state.validated) dispatch({ type: "validated", payload: false });
      if (state.phoneValueIsInvalid)
        dispatch({ type: "phoneValueIsInvalid", payload: false });

      if (state.socialLinkIsInvalid)
        dispatch({ type: "socialLinkIsInvalid", payload: false });
      if (state.websiteLinkIsInvalid)
        dispatch({ type: "websiteLinkIsInvalid", payload: false });

      setEditedData(
        (prevState): OrgProfileEditData =>
          ({
            ...prevState,
            [event.target.name]: event.target.value,
          } as OrgProfileEditData)
      );
    };

  return (
    <section className="OrgProfileEditSectionOne">
      <div className="SectionOneFirstHalf">
        <img src={OrgProfileManagePersonalInfo} alt="personal info svg" />
      </div>

      <div className="SectionOneSecondHalf">
        <Form noValidate validated={state.validated}>
          <Form.Text className="FormDetailsText">User Details</Form.Text>

          <Row className="SectionOneRow">
            <Col>
              <Form.Text className="SectionOneFormTextLabel">
                first name
              </Form.Text>
              <Form.Control
                required
                name="firstName"
                type="text"
                placeholder="Type..."
                className="SectionOneFormControl"
                value={editedData?.firstName}
                onChange={handleOrgEditProfileChange}
              />
              <Form.Control.Feedback type="invalid">
                Required field, please Enter.
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Text className="SectionOneFormTextLabel">
                last name
              </Form.Text>
              <Form.Control
                required
                name="lastName"
                type="text"
                placeholder="Type..."
                className="SectionOneFormControl"
                value={editedData?.lastName}
                onChange={handleOrgEditProfileChange}
              />
              <Form.Control.Feedback type="invalid">
                Required field, please Enter.
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Form.Group>
            <Form.Text className="SectionOneFormTextLabel EditOrgProfileDetailsDisabledField">
              email-id
            </Form.Text>

            <Form.Control
              className="SectionOneFormControl EditOrgProfileDetailsDisabledField"
              disabled
              value={editedData?.email}
            />
          </Form.Group>
        </Form>
      </div>
    </section>
  );
};

export default SectionOne;
