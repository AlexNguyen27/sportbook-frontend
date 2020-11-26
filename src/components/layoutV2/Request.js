import React from "react";

function Request(props) {
  return (
    <div id="request" className="form-1" style={{ backgroundColor: "none" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="text-container">
              <h2>
                Fill The Following Form To Request A Meeting with our team
              </h2>
              <p>
                Cooperation with Love Sport. Are you the owner? Worried when the
                yard is empty? Love Sport helps you to fill your booking
                schedule with the lowest cost!
              </p>
              <ul className="list-unstyled li-space-lg">
                <li className="media">
                  <i className="fas fa-check"></i>
                  <div className="media-body">
                    <strong className="blue">Automate your marketing</strong>{" "}
                    activities and get results today
                  </div>
                </li>
                <li className="media">
                  <i className="fas fa-check"></i>
                  <div className="media-body">
                    <strong className="blue">Interact with all your</strong>{" "}
                    targeted customers at a personal level
                  </div>
                </li>
                <li className="media">
                  <i className="fas fa-check"></i>
                  <div className="media-body">
                    <strong className="blue">Convince them to book</strong> your
                    awesome playground
                  </div>
                </li>
                <li className="media">
                  <i className="fas fa-check"></i>
                  <div className="media-body">
                    <strong className="blue">Save precious time</strong> and
                    invest it where you need it the most
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-container">
              {/* TODO: CTEATE A FROM REQUEST FOR ADMIN TO IF THEY ARE A OWNER */}
              <form id="requestForm" data-toggle="validator" data-focus="false">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control-input"
                    id="rname"
                    name="rname"
                    required
                  />
                  <label className="label-control" htmlFor="rname">
                    Full name
                  </label>
                  <div className="help-block with-errors"></div>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control-input"
                    id="remail"
                    name="remail"
                    required
                  />
                  <label className="label-control" htmlFor="remail">
                    Email
                  </label>
                  <div className="help-block with-errors"></div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control-input"
                    id="rphone"
                    name="rphone"
                    required
                  />
                  <label className="label-control" htmlFor="rphone">
                    Phone
                  </label>
                  <div className="help-block with-errors"></div>
                </div>
                <div className="form-group">
                  <select className="form-control-select" id="rselect" required>
                    <option
                      className="select-option"
                      defaultValue=""
                      disabled
                      selected
                    >
                      Interested in...
                    </option>
                    <option
                      className="select-option"
                      defaultValue="Personal Loan"
                    >
                      Starter
                    </option>
                    <option className="select-option" defaultValue="Car Loan">
                      Medium
                    </option>
                    <option className="select-option" defaultValue="House Loan">
                      Complete
                    </option>
                  </select>
                  <div className="help-block with-errors"></div>
                </div>
                <div className="form-group checkbox">
                  <input
                    type="checkbox"
                    id="rterms"
                    value="Agreed-to-Terms"
                    name="rterms"
                    required
                  />
                  I agree with Evolo's stated{" "}
                  <a href="privacy-policy.html">Privacy Policy</a> and{" "}
                  <a href="terms-conditions.html">Terms & Conditions</a>
                  <div className="help-block with-errors"></div>
                </div>
                <div className="form-group">
                  <button type="submit" className="form-control-submit-button">
                    REQUEST
                  </button>
                </div>
                <div className="form-message">
                  <div id="rmsgSubmit" className="h3 text-center hidden"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Request;
