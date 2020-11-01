import React from 'react';
import detailImage1 from '../../images/details-1-office-worker.svg';
import detailImage2 from '../../images/details-2-office-team-work.svg';

function Planning(props) {
    return (
        <>
            <div className="basic-1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="text-container">
                                <h2>Design And Plan Your Business Growth Steps</h2>
                                <p>Use our staff and our expertise to design and plan your business growth strategy. Evolo team is eager to advise you on the best opportunities that you should look into</p>
                                <a className="btn-solid-reg popup-with-move-anim" href="#details-lightbox-1">LIGHTBOX</a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="image-container">
                                <img className="img-fluid" src={detailImage1} alt="alternative" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="basic-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="image-container">
                                <img className="img-fluid" src={detailImage2} alt="alternative" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="text-container">
                                <h2>Search For Optimization Wherever Is Possible</h2>
                                <ul className="list-unstyled li-space-lg">
                                    <li className="media">
                                        <i className="fas fa-check"></i>
                                        <div className="media-body">Basically we'll teach you step by step what you need to do</div>
                                    </li>
                                    <li className="media">
                                        <i className="fas fa-check"></i>
                                        <div className="media-body">In order to develop your company and reach new heights</div>
                                    </li>
                                    <li className="media">
                                        <i className="fas fa-check"></i>
                                        <div className="media-body">Everyone will be pleased from stakeholders to employees</div>
                                    </li>
                                </ul>
                                <a className="btn-solid-reg popup-with-move-anim" href="#details-lightbox-2">LIGHTBOX</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Planning;