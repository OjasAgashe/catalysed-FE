import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import { MENTOR, STUDENT } from "../../constants/Entities";
import {
  INVITE_ALREADY_ACCEPTED,
  INVITE_INVALID,
  MENTOR_REGISTER,
  STUDENT_REGISTER,
} from "../../constants/Routes";
import { useInviteAPI } from "../../context/api_context/InviteAPIContext";

const ValidateInvitationKey = () => {
  const [loading, setLoading] = useState(true);

  const { invitationKey } = useParams<{ invitationKey: string }>();
  const history = useHistory();
  const { getInviteValidation } = useInviteAPI();

  useEffect(() => {
    /*
     * Whenever anyone visit this page first time, the scroll
     * bar position should be on top
     */
    document.documentElement.scrollTop = 0;

    // set the document title
    document.title = "Validate Invite | CatalysEd";

    // Function to Call API
    const validateInvite = async () => {
      try {
        // Call API
        const response = await getInviteValidation(invitationKey);

        // After successful API call, First hide LoadingProgress component
        setLoading(false);

        //   Then push to respected Route
        if (response.data.userType === MENTOR) {
          history.push(MENTOR_REGISTER);
        } else if (response.data.userType === STUDENT) {
          history.push(STUDENT_REGISTER);
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message ?? "";

        // If we get any Error, then First hide LoadingProgress component
        setLoading(false);

        // Then push to respected Route
        if (errorMessage === "Invalid Invite") {
          history.push(INVITE_INVALID);
        } else if (errorMessage === "Account already created") {
          history.push(INVITE_ALREADY_ACCEPTED);
        }
      }
    };

    // Call validateInvite function
    validateInvite();
  }, [getInviteValidation, history, invitationKey]);

  return (
    <div className="Page">
      {/*
       * Show LoadingProgress component till loading has true value
       */}
      {loading && (
        <LoadingProgress
          loading={loading}
          emailSent={false}
          loadingMessage="Validating Invitation..."
        />
      )}
    </div>
  );
};

export default ValidateInvitationKey;
