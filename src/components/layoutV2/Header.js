import React from "react";
import alternative from "../../images/header-teamwork.svg";
import header from "../../images/background-header.png";
import { useHistory } from "react-router-dom";
// import landing from '../../images/landing-img.png';

const Header = () => {
  const history = useHistory();
  return (
    <header id="header" className="header">
      <div className="header-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="text-container">
                <h1>
                  <span className="turquoise">Love Sports</span>
                  <br /> In This Hottest Place
                </h1>
                <p className="p-large">
                  Easily book online playgrounds, open playgrounds and manage
                  online playgrounds quickly and easily
                </p>
                <a
                  className="btn-solid-lg page-scroll"
                  href="/find-ground-online"
                >
                  SEACHING FOR PLAYGROUND
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="image-container">
                <img
                  width="450px"
                  height="450px"
                  className="img-fluid"
                  src={alternative}
                  alt="alternative"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
