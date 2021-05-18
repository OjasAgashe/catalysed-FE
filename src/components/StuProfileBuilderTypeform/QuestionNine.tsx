import React from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  StudentProfileBuilderActionType,
  StudentProfileBuilderData,
  StudentProfileBuilderState,
} from "../../types/StudentProfileBuilder";

type QuestionNineProps = {
  answer: StudentProfileBuilderData;
  setAnswer: React.Dispatch<React.SetStateAction<StudentProfileBuilderData>>;
  state: StudentProfileBuilderState;
  dispatch: React.Dispatch<StudentProfileBuilderActionType>;
};

const QuestionNine = ({
  answer,
  setAnswer,
  state,
  dispatch,
}: QuestionNineProps) => {
  const handleQuestionNineChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.validated) dispatch({ type: "validated", payload: false });

      setAnswer((prevState) => ({
        ...prevState,
        QuestionNine: event.target.value,
      }));
    };

  return (
    <motion.div
      className="StuTypeformQuestion Question"
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.9 }}
    >
      <Form.Group className="QuestionFormGroup">
        <Form.Text className="QuestionFormText">
          Which kind of device do you frequently use?
        </Form.Text>
        <Form.Group className="DeviceRadioQuestion">
          <Form.Check type="radio" id="device-mobile">
            <Form.Check.Input
              checked={answer.QuestionNine === "mobile"}
              onChange={handleQuestionNineChange}
              type="radio"
              name="device"
              value="mobile"
            />
            <Form.Check.Label>Mobile</Form.Check.Label>
          </Form.Check>
          <Form.Check type="radio" id="device-computer">
            <Form.Check.Input
              checked={answer.QuestionNine === "computer"}
              onChange={handleQuestionNineChange}
              type="radio"
              name="device"
              value="computer"
            />
            <Form.Check.Label>Computer</Form.Check.Label>
          </Form.Check>
        </Form.Group>
      </Form.Group>
    </motion.div>
  );
};

export default QuestionNine;
