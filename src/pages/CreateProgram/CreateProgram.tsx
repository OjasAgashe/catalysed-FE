import React, { useEffect } from "react";
import CreateProgramForm from "../../components/CreateProgramForm/CreateProgramForm";

const CreateProgram = () => {
  useEffect(() => {
    document.title = "Create Program Org | CatalysEd";
  });

  return (
    <div className="OrgCreateProgramPage">
      <CreateProgramForm />
    </div>
  );
};

export default CreateProgram;
