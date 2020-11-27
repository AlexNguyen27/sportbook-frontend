import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/auth";
// import logo from '../../images/logo.svg';

import Landing from "../pages/homePage/component/Landing";
import Swal from "sweetalert2";

const Navbar = ({ logoutUser, navLinks = [], isHome }) => {
  const history = useHistory();
  const [activeClass, setActiveClass] = useState("");

  useEffect(() => {
    if (isHome) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
          setActiveClass("top-nav-collapse mb-16");
        } else {
          setActiveClass("");
        }
      });
    } else {
      setActiveClass("top-nav-collapse");
    }
  }, [isHome]);

  
  return (
    <>
      <nav
        style={{ position: "fixed " }}
        className={[
          "navbar navbar-expand-lg navbar-dark navbar-custom fixed-top",
          activeClass,
        ].join(" ")}
      >
        <a className="navbar-brand logo-image" href="#header">
          <NavLink
            className="navbar-brand logo-image front-size-16"
            style={{ color: "black", textDecoration: "none" }}
            activeClassName="activeLink"
            to="/"
          >
            <span className="turquoise">Love</span> <span>Sport</span>
          </NavLink>
        </a>

        {/* <!-- Mobile Menu Toggle Button --> */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-awesome fas fa-bars"></span>
          <span className="navbar-toggler-awesome fas fa-times"></span>
        </button>
        {/* <!-- end of mobile menu toggle button --> */}

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav ml-auto">
            {navLinks.map((item) => (
              <li className="nav-item">
                <NavLink
                  className="nav-link page-scroll"
                  activeClassName="activeLink"
                  to={item.to}
                  onClick={item.onClick}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
