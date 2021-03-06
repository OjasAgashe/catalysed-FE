import React, { useEffect } from "react";
import "./StudentMentorRegister.css";

/*
 * As for now, We are not giving access to mentor or student to
 * directly register
 *
 * They will register when they will get invite from an Org
 *
 * So this file will show message to them
 */

const StudentMentorRegister = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Register | CatalysEd";
  }, []);

  return (
    <div className="StudentMentorRegisterPage Page">
      <section className="StudentMentorRegisterBox">
        <h1>
          Hey, we're still opening up but anyone can join with an invite from an
          organisation present on our platform! :)
        </h1>
        <h2>
          Feel free to check if you have programs of your interest and fancy
          running on our platform. We can't wait for you to join us!
        </h2>
        <h3>
          {/* Later link span to how to get started page */}
          Check our <span>How to get started</span> page for more info.
        </h3>
      </section>
    </div>
  );
};

export default StudentMentorRegister;
