import React from "react";
import icon1 from "../../../../images/services-icon-1.svg";
import icon2 from "../../../../images/services-icon-2.svg";
import icon3 from "../../../../images/services-icon-3.svg";
import { Col } from "reactstrap";

function Service(props) {
  return (
    <div id="services" className="cards-1">
      <div className="container">
        <div className="row  ml-0 mr-0">
          <div className="col-lg-12">
            <h2>Why Love Sport?</h2>
            <p className="p-heading p-large">
              We serve small and medium sized companies in all tech related
              industries with high quality growth services which are presented
              below
            </p>
          </div>
        </div>
        <div className="row ml-0 mr-0">
          <Col>
            <div className="card">
              <img className="card-image" src={icon1} alt="alternative" />
              <div className="card-body">
                <h4 className="card-title">Market Analysis</h4>
                <p>
                  Manage simple booking schedules, easy reception of online
                  bookings, and fill empty fields
                </p>
              </div>
            </div>
          </Col>
          <Col>
            <div className="card">
              <img className="card-image" src={icon2} alt="alternative" />
              <div className="card-body">
                <h4 className="card-title">
                  Search and book playground online
                </h4>
                <p>
                  Playground information closest to your location, online,
                  convenient and easy
                </p>
              </div>
            </div>
          </Col>
          <Col>
            <div className="card">
              <img className="card-image" src={icon3} alt="alternative" />
              <div className="card-body">
                <h4 className="card-title">Payment online easily</h4>
                <p>
                  With all the information in place you will be presented with
                  your payment choice that you prefer
                </p>
              </div>
            </div>
          </Col>
        </div>
      </div>
    </div>
  );
}

export default Service;
