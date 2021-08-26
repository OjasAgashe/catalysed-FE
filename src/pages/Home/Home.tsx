/*
 * This page is for Common Home, which every entity (Organisation,
 *   Mentor, Student) will visit first.
 *
 * Landing Page
 */

import React, { useEffect } from "react";
import CommonHome from "../../components/CommonHome/CommonHome";

const Home = () => {
  useEffect(() => {
    /*
     * Whenever anyone visits first time to Langing Page, we want scroll
     * position on the top of the page
     */
    document.documentElement.scrollTop = 0;

    // set document title
    document.title = "Home | CatalysEd";
  }, []);

  return (
    <div>
      {/* Show CommonHome Component */}
      <CommonHome />
    </div>
  );
};

export default Home;
