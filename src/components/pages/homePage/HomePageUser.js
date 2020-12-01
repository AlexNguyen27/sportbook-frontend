import React from "react";
import Header from "../../layout/Header";
import Planning from "./component/Planning";
import Testimonial from "./component/Testimonial";
import Service from "./component/Service";
import About from "./component/About";
import Contact from "./component/Contact";
import GroundList from "./component/GroundList";
import Request from "./component/Request";

const HomePageUser = (props) => {
  return (
    <div data-spy="scroll" data-target=".fixed-top">
      <Header />

      <GroundList />

      <Service />

      <Planning />

      <Request />

      <Testimonial />

      <About />

      <Contact />
    </div>
  );
};

export default HomePageUser;
