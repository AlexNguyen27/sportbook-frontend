import React from "react";
import teamMember1 from "../../../../images/team-member-1.svg";
import teamMember2 from "../../../../images/team-member-2.svg";
import teamMember3 from "../../../../images/team-member-3.svg";
import teamMember4 from "../../../../images/team-member-4.svg";

function About(props) {
  return (
    <div id="about" className="basic-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h2>About The Team</h2>
            <p className="p-heading p-large">
              Meat our team of specialized marketers and business developers
              which will help you research new products and launch them in new
              emerging markets
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="team-member">
              <div className="image-wrapper">
                <img
                  className="img-fluid"
                  src={teamMember1}
                  alt="alternative"
                />
              </div>
              <p className="p-large">
                <strong>Thanh Nguyen</strong>
              </p>
              <p className="job-title">
                Software Engineer & Business Developer
              </p>
              <span className="social-icons">
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x facebook"></i>
                    <i className="fab fa-facebook-f fa-stack-1x"></i>
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x twitter"></i>
                    <i className="fab fa-twitter fa-stack-1x"></i>
                  </a>
                </span>
              </span>
            </div>

            <div className="team-member">
              <div className="image-wrapper">
                <img
                  className="img-fluid"
                  src={teamMember2}
                  alt="alternative"
                />
              </div>
              <p className="p-large">
                <strong>Duc Vo</strong>
              </p>
              <p className="job-title">Online Marketer & Software Engineer</p>
              <span className="social-icons">
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x facebook"></i>
                    <i className="fab fa-facebook-f fa-stack-1x"></i>
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x twitter"></i>
                    <i className="fab fa-twitter fa-stack-1x"></i>
                  </a>
                </span>
              </span>
            </div>

            {/* <div className="team-member">
                            <div className="image-wrapper">
                                <img className="img-fluid" src={teamMember3} alt="alternative" />
                            </div>
                            <p className="p-large"><strong>Sheila Zimerman</strong></p>
                            <p className="job-title">Software Engineer</p>
                            <span className="social-icons">
                                <span className="fa-stack">
                                    <a href="#your-link">
                                        <i className="fas fa-circle fa-stack-2x facebook"></i>
                                        <i className="fab fa-facebook-f fa-stack-1x"></i>
                                    </a>
                                </span>
                                <span className="fa-stack">
                                    <a href="#your-link">
                                        <i className="fas fa-circle fa-stack-2x twitter"></i>
                                        <i className="fab fa-twitter fa-stack-1x"></i>
                                    </a>
                                </span>
                            </span>
                        </div> */}
            {/* <div className="team-member">
                            <div className="image-wrapper">
                                <img className="img-fluid" src={teamMember4} alt="alternative" />
                            </div>
                            <p className="p-large"><strong>Mary Villalonga</strong></p>
                            <p className="job-title">Product Manager</p>
                            <span className="social-icons">
                                <span className="fa-stack">
                                    <a href="#your-link">
                                        <i className="fas fa-circle fa-stack-2x facebook"></i>
                                        <i className="fab fa-facebook-f fa-stack-1x"></i>
                                    </a>
                                </span>
                                <span className="fa-stack">
                                    <a href="#your-link">
                                        <i className="fas fa-circle fa-stack-2x twitter"></i>
                                        <i className="fab fa-twitter fa-stack-1x"></i>
                                    </a>
                                </span>
                            </span>
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
