import React from "react";
import manTalk from "../../../../images/testimonials-2-men-talking.svg";
import test1 from "../../../../images/testimonial-1.svg";

function Testimonial(props) {
  return (
    <div className="slider-2">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="image-container">
              <img className="img-fluid" src={manTalk} alt="alternative" />
            </div>
          </div>
          <div className="col-lg-6">
            <h2>Loyal customers</h2>

            {/* GET TOP 3 OWNER HAVE GROUND HAVE ORDER */}
            <div className="slider-container">
              <div className="swiper-container card-slider">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="card">
                      <img
                        className="card-image"
                        src={test1}
                        alt="alternative"
                      />
                      <div className="card-body">
                        <p className="testimonial-text">
                          I just finished my trial period and was so amazed with
                          the support and results that I purchased Evolo right
                          away at the special price.
                        </p>
                        <p className="testimonial-author">
                          Jude Thorn - Designer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
