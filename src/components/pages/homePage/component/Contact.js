import React from "react";

function Contact(props) {
  return (
    <div id="contact" className="form-2">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h2>Contact Information</h2>
            <ul className="list-unstyled li-space-lg">
              <li className="address">
                Don't hesitate to give us a call or send us a contact form
                message
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>97 Man Thien Street,
                Hiep Phu, District 9, Ho Chi Minh City, Viet Nam
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <a className="turquoise" href="tel:003024630820">
                  028 3730 6600
                </a>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <a className="turquoise" href="mailto:office@evolo.com">
                  lovesport@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="map-responsive">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7836.983714026452!2d106.78194775393679!3d10.850144971186923!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb838977f3d419d!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IGNow61uaCBWaeG7hW4gdGjDtG5nIEPGoSBT4bufIFThuqFpIFRQLiBI4buTIENow60gTWluaMK3!5e0!3m2!1svi!2s!4v1604223922437!5m2!1svi!2s"
                allowFullScreen
                title="te"
              ></iframe>
            </div>
          </div>
          <div className="col-lg-6">
            <form id="contactForm" data-toggle="validator" data-focus="false">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control-input"
                  id="cname"
                  required
                />
                <label className="label-control" htmlFor="cname">
                  Name
                </label>
                <div className="help-block with-errors"></div>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control-input"
                  id="cemail"
                  required
                />
                <label className="label-control" htmlFor="cemail">
                  Email
                </label>
                <div className="help-block with-errors"></div>
              </div>
              <div className="form-group">
                <textarea
                  className="form-control-textarea"
                  id="cmessage"
                  required
                ></textarea>
                <label className="label-control" htmlFor="cmessage">
                  Your message
                </label>
                <div className="help-block with-errors"></div>
              </div>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="cterms"
                  value="Agreed-to-Terms"
                  required
                />
                I have read and agree with Love Sport's stated{" "}
                <a href="privacy-policy.html">Privacy Policy</a> and{" "}
                <a href="terms-conditions.html">Terms Conditions</a>
                <div className="help-block with-errors"></div>
              </div>
              <div className="form-group">
                <button type="submit" className="form-control-submit-button">
                  SUBMIT MESSAGE
                </button>
              </div>
              <div className="form-message">
                <div id="cmsgSubmit" className="h3 text-center hidden"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
