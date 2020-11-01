import React from 'react';
import icon1 from '../../images/services-icon-1.svg';
import icon2 from '../../images/services-icon-2.svg';
import icon3 from '../../images/services-icon-3.svg';

function Service(props) {
    return (
        <div id="services" className="cards-1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h2>Business Growth Services</h2>
                        <p className="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">

                        <div className="card">
                            <img className="card-image" src={icon1} alt="alternative" />
                            <div className="card-body">
                                <h4 className="card-title">Market Analysis</h4>
                                <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-image" src={icon2} alt="alternative" />
                            <div className="card-body">
                                <h4 className="card-title">Opportunity Scan</h4>
                                <p>Once the market analysis process is completed our staff will search for opportunities that are in reach</p>
                            </div>
                        </div>

                        <div className="card">
                            <img className="card-image" src={icon3} alt="alternative" />
                            <div className="card-body">
                                <h4 className="card-title">Action Plan</h4>
                                <p>With all the information in place you will be presented with an action plan that your company needs to follow</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Service;