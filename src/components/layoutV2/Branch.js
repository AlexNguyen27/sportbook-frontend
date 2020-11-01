import React from 'react';
import customer1 from '../../images/customer-logo-1.png';
import customer2 from '../../images/customer-logo-2.png';
import customer3 from '../../images/customer-logo-3.png';
import customer4 from '../../images/customer-logo-4.png';
import customer5 from '../../images/customer-logo-5.png';
import customer6 from '../../images/customer-logo-6.png';

function Branch(props) {
    return (
        <div className="slider-1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h5>Trusted By</h5>

                        <div className="slider-container">
                            <div className="swiper-container image-slider">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <div className="image-container">
                                            <img className="img-responsive" src={customer1} alt="alternative" />
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="image-container">
                                            <img className="img-responsive" src={customer2} alt="alternative" />
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="image-container">
                                            <img className="img-responsive" src={customer3} alt="alternative" />
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="image-container">
                                            <img className="img-responsive" src={customer4} alt="alternative" />
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="image-container">
                                            <img className="img-responsive" src={customer5} alt="alternative" />
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="image-container">
                                            <img className="img-responsive" src={customer6} alt="alternative" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Branch;