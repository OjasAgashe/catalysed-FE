import React from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  MentorProfileBuilderActionType,
  MentorProfileBuilderData,
  MentorProfileBuilderState,
} from "../../types/MentorProfileBuilder";

type QuestionSixProps = {
  answer: MentorProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<MentorProfileBuilderData>>;
  state: MentorProfileBuilderState;
  dispatch: React.Dispatch<MentorProfileBuilderActionType>;
};

const QuestionSix = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionSixProps) => {
  const handleQuestionSixChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (state.validated) dispatch({ type: "validated", payload: false });
    if (state.submitClicked)
      dispatch({ type: "submitClicked", payload: false });

    let value: string | number | boolean = event.target.value;
    if (event.target.name === "yes_no") {
      value = value === "true" ? true : false;

      dispatch({ type: "isProfMentorYes", payload: value });
    }

    setAnswer((prevState) => ({
      ...prevState,
      previouslyMentored: {
        ...prevState.previouslyMentored,
        [event.target.name]: value,
      },
    }));
  };

  return (
    <motion.div
      className="MentorTypeformQuestion Question"
      initial={{ x: "-100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.6 }}
    >
      <Form.Group className="QuestionFormGroup">
        {state.isProfMentorYes === false && (
          <>
            <Form.Text className="QuestionFormText">
              Have you ever professionally mentored before?
            </Form.Text>
            <Form.Group className="ProfMentorRadioQuestion">
              <Form.Check type="radio" id="prof-mentor-yes">
                <Form.Check.Input
                  checked={answer.previouslyMentored.yes_no === true}
                  onChange={handleQuestionSixChange}
                  type="radio"
                  name="yes_no"
                  value="true"
                />
                <Form.Check.Label>yes</Form.Check.Label>
              </Form.Check>
              <Form.Check type="radio" id="prof-mentor-no">
                <Form.Check.Input
                  checked={answer.previouslyMentored.yes_no === false}
                  onChange={handleQuestionSixChange}
                  type="radio"
                  name="yes_no"
                  value="false"
                />
                <Form.Check.Label>no</Form.Check.Label>
              </Form.Check>
            </Form.Group>
          </>
        )}
        {state.isProfMentorYes && (
          <>
            <Form.Group className="YOERadioQuestion">
              <Form.Text className="QuestionFormText">
                Years of experience ...
              </Form.Text>
              <Form.Check type="radio" id="yoeZero">
                <Form.Check.Input
                  checked={
                    answer.previouslyMentored.yoe === 0
                    // answer.previouslyMentored.yoe === "" ||
                    // answer.previouslyMentored.yoe === "0-2"
                  }
                  onChange={handleQuestionSixChange}
                  type="radio"
                  name="yoe"
                  value={0}
                />
                <Form.Check.Label>0 - 2</Form.Check.Label>
              </Form.Check>
              <Form.Check type="radio" id="yoeTwo">
                <Form.Check.Input
                  checked={
                    answer.previouslyMentored.yoe === 2
                    // answer.previouslyMentored.yoe === "2-5"
                  }
                  onChange={handleQuestionSixChange}
                  type="radio"
                  name="yoe"
                  value={2}
                />
                <Form.Check.Label>2 - 5</Form.Check.Label>
              </Form.Check>
              <Form.Check type="radio" id="yoeFive">
                <Form.Check.Input
                  checked={
                    answer.previouslyMentored.yoe === 5
                    // answer.previouslyMentored.yoe === ">5"
                  }
                  onChange={handleQuestionSixChange}
                  type="radio"
                  name="yoe"
                  value={5}
                />
                <Form.Check.Label>&gt; 5</Form.Check.Label>
              </Form.Check>
            </Form.Group>
          </>
        )}
      </Form.Group>
    </motion.div>
  );
};

export default QuestionSix;
