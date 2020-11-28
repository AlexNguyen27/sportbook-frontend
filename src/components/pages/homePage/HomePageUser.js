import React from "react";

import Header from "../../layout/Header";
// import Branch from '../../layoutV2/Branch';
import Planning from "./component/Planning";
import Testimonial from "./component/Testimonial";

import Service from "./component/Service";
import Checkout from "./component/Checkout";
import About from "./component/About";
import Contact from "./component/Contact";
// import { Nav, Navbar } from 'reactstrap';
import Navbar from "../../layout/Navbar";
import GroundList from "./component/GroundList";
import Request from "./component/Request";

const HomePageUser = (props) => {
  return (
    <div data-spy="scroll" data-target=".fixed-top">
      <Header />

      {/* TODO FIX LATER */}
      {/* <Branch /> */}
      {/* GROUND LIST */}
      <GroundList />

      <Service />

      <Planning />


      {/* CRAETE CONTACT FORM */}
      <Request />

      {/* <Checkout /> */}

      {/* LOYAL CUSTOMERS */}
      <Testimonial />

      <About />

      <Contact />
    </div>
  );
};

export default HomePageUser;
