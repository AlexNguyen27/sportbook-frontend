import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import momoIcon from "../../images/momo.jpeg";
import cashIcon from "../../images/cash.png";
import webIcon from "../../images/webIcon.png";
import emailIcon from "../../images/emailIcon.png";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (window.location.pathname === "/") {
      // console.log(window.location);
      setClassName("");
    } else {
      // setClassName('footer-fixed');
    }
  }, [window.location.pathname]);
  return (
    <>
      <Row
        className="py-4"
        style={{ justifyContent: "center", backgroundColor: "#e9ecef" }}
      >
        <Col xs={4}>
          <h5>ABOUT LOVE SPORT</h5>
          <p style={{ width: "70%" }}>
            We're passionate about connecting user and owner while offering some
            of the best business growth services for all playground owner
          </p>
        </Col>
        <Col xs={2}>
          <h5>PAYMENT</h5>
          <p className="mb-3">
            <img
              src={momoIcon}
              alt=""
              width="25"
              height="25"
              className="mr-1"
              style={{ borderRadius: "20%" }}
            ></img>
            Momo
          </p>
          <p className="mb-1">
            <img
              src={cashIcon}
              alt=""
              width="25"
              height="25"
              className="mr-1"
              style={{ borderRadius: "20%" }}
            ></img>
            Cash
          </p>
        </Col>
        <Col xs={3}>
          <h5>CONTACT US</h5>
          <p className="mb-3">
            <img
              src={webIcon}
              alt=""
              width="25"
              height="25"
              className="mr-1"
              style={{ borderRadius: "20%" }}
            ></img>
            <a href="/" style={{ textDecoration: "none" }}>
              lovesport.vn
            </a>
          </p>

          <p className="mb-1">
            <img
              src={emailIcon}
              alt=""
              width="24"
              height="24"
              className="mr-1"
              style={{ borderRadius: "20%" }}
            ></img>
            <a
              href="mailto:lovesport@gmail.com"
              style={{ textDecoration: "none" }}
            >
              lovesport@gmail.com
            </a>
          </p>
        </Col>
      </Row>
      <Row
        style={{
          justifyContent: "center",
          color: "white",
          backgroundColor: "#343a40",
        }}
      >
        <Col style={{ alignSelft: "center" }}>
          <p
            className="p-large mb-0 text-center py-4"
            style={{ color: "white" }}
          >
            Copyright © {currentYear}{" "}
            <a
              href="/"
              style={{
                color: "#49CEE1",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Love Sport
            </a>{" "}
            - All rights reserved
          </p>
        </Col>
      </Row>
      {/* <footer className={["footer", className].join(" ")}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="footer-col">
                <h4>About Love Sport</h4>
                <p>
                  We're passionate about connecting user and owner while
                  offering some of the best business growth services for all
                  playground owner
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="footer-col middle">
                <h4>Important Links</h4>
                <ul className="list-unstyled li-space-lg">
                  <li className="media">
                    <i className="fas fa-square"></i>
                    <div className="media-body">
                      Our business partners{" "}
                      <a className="turquoise" href="#your-link">
                        startup.com
                      </a>
                    </div>
                  </li>
                  <li className="media">
                    <i className="fas fa-square"></i>
                    <div className="media-body">
                      Read our{" "}
                      <a className="turquoise" href="terms-conditions.html">
                        Terms & Conditions
                      </a>
                      ,{" "}
                      <a className="turquoise" href="privacy-policy.html">
                        Privacy Policy
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="footer-col last">
                <h4>Social Media</h4>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-facebook-f fa-stack-1x"></i>
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-twitter fa-stack-1x"></i>
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-google-plus-g fa-stack-1x"></i>
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-instagram fa-stack-1x"></i>
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-linkedin-in fa-stack-1x"></i>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <hr />
                <p className="p-large">
                  Copyright © {currentYear}{" "}
                  <a href="/">Love Sport</a> - All rights
                  reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer> */}
    </>
  );
}

export default Footer;
