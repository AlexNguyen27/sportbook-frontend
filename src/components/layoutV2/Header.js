import React from 'react';
import alternative from '../../images/header-teamwork.svg';
import header from '../../images/background-header.png';
// import landing from '../../images/landing-img.png';

const Header = () => {

    return (
        <header id="header" className="header">
        <div className="header-content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="text-container">
                            <h1><span className="turquoise">Love Sport</span><br/> In This Hottest Place</h1>
                            <p className="p-large">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                            <a className="btn-solid-lg page-scroll" href="#services">DISCOVER</a>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="image-container">
                            <img width="450px" height="450px" className="img-fluid" src={alternative} alt="alternative" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    )
}

export default Header;