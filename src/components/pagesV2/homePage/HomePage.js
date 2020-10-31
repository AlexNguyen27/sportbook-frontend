import React from 'react';

const HomePage = () => {
    return <div data-spy="scroll" data-target=".fixed-top">
        {/* <div class="spinner-wrapper">
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        </div> */}
        <nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
            <a class="navbar-brand logo-image" href="index.html"><img src="images/logo.svg" alt="alternative" /></a>

            {/* <!-- Mobile Menu Toggle Button --> */}
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-awesome fas fa-bars"></span>
                <span class="navbar-toggler-awesome fas fa-times"></span>
            </button>
            {/* <!-- end of mobile menu toggle button --> */}

            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link page-scroll" href="#header">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link page-scroll" href="#services">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link page-scroll" href="#pricing">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link page-scroll" href="#request">Request</a>
                    </li>

                    {/* <!-- Dropdown Menu -->           */}
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle page-scroll" href="#about" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">About</a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="terms-conditions.html"><span class="item-text">Terms Conditions</span></a>
                            <div class="dropdown-items-divide-hr"></div>
                            <a class="dropdown-item" href="privacy-policy.html"><span class="item-text">Privacy Policy</span></a>
                        </div>
                    </li>
                    {/* <!-- end of dropdown menu --> */}

                    <li class="nav-item">
                        <a class="nav-link page-scroll" href="#contact">Contact</a>
                    </li>
                </ul>
                <span class="nav-item social-icons">
                    <span class="fa-stack">
                        <a href="#your-link">
                            <i class="fas fa-circle fa-stack-2x facebook"></i>
                            <i class="fab fa-facebook-f fa-stack-1x"></i>
                        </a>
                    </span>
                    <span class="fa-stack">
                        <a href="#your-link">
                            <i class="fas fa-circle fa-stack-2x twitter"></i>
                            <i class="fab fa-twitter fa-stack-1x"></i>
                        </a>
                    </span>
                </span>
            </div>
        </nav>
        {/* <!-- end of navbar --> */}
        {/* <!-- end of navigation --> */}


        {/* <!-- Header --> */}
        <header id="header" class="header">
            <div class="header-content">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="text-container">
                                <h1><span class="turquoise">StartUp Landing</span> Page Template Free</h1>
                                <p class="p-large">Use Evolo free landing page template to promote your business startup and generate leads for the offered services</p>
                                <a class="btn-solid-lg page-scroll" href="#services">DISCOVER</a>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="image-container">
                                <img class="img-fluid" src="images/header-teamwork.svg" alt="alternative" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div class="slider-1">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h5>Trusted By</h5>

                        <div class="slider-container">
                            <div class="swiper-container image-slider">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <div class="image-container">
                                            <img class="img-responsive" src="images/customer-logo-1.png" alt="alternative" />
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="image-container">
                                            <img class="img-responsive" src="images/customer-logo-2.png" alt="alternative" />
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="image-container">
                                            <img class="img-responsive" src="images/customer-logo-3.png" alt="alternative" />
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="image-container">
                                            <img class="img-responsive" src="images/customer-logo-4.png" alt="alternative" />
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="image-container">
                                            <img class="img-responsive" src="images/customer-logo-5.png" alt="alternative" />
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="image-container">
                                            <img class="img-responsive" src="images/customer-logo-6.png" alt="alternative" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div id="services" class="cards-1">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h2>Business Growth Services</h2>
                        <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">

                        <div class="card">
                            <img class="card-image" src="images/services-icon-1.svg" alt="alternative" />
                            <div class="card-body">
                                <h4 class="card-title">Market Analysis</h4>
                                <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p>
                            </div>
                        </div>
                        <div class="card">
                            <img class="card-image" src="images/services-icon-2.svg" alt="alternative" />
                            <div class="card-body">
                                <h4 class="card-title">Opportunity Scan</h4>
                                <p>Once the market analysis process is completed our staff will search for opportunities that are in reach</p>
                            </div>
                        </div>

                        <div class="card">
                            <img class="card-image" src="images/services-icon-3.svg" alt="alternative" />
                            <div class="card-body">
                                <h4 class="card-title">Action Plan</h4>
                                <p>With all the information in place you will be presented with an action plan that your company needs to follow</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="basic-1">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="text-container">
                            <h2>Design And Plan Your Business Growth Steps</h2>
                            <p>Use our staff and our expertise to design and plan your business growth strategy. Evolo team is eager to advise you on the best opportunities that you should look into</p>
                            <a class="btn-solid-reg popup-with-move-anim" href="#details-lightbox-1">LIGHTBOX</a>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="image-container">
                            <img class="img-fluid" src="images/details-1-office-worker.svg" alt="alternative" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="basic-2">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="image-container">
                            <img class="img-fluid" src="images/details-2-office-team-work.svg" alt="alternative" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="text-container">
                            <h2>Search For Optimization Wherever Is Possible</h2>
                            <ul class="list-unstyled li-space-lg">
                                <li class="media">
                                    <i class="fas fa-check"></i>
                                    <div class="media-body">Basically we'll teach you step by step what you need to do</div>
                                </li>
                                <li class="media">
                                    <i class="fas fa-check"></i>
                                    <div class="media-body">In order to develop your company and reach new heights</div>
                                </li>
                                <li class="media">
                                    <i class="fas fa-check"></i>
                                    <div class="media-body">Everyone will be pleased from stakeholders to employees</div>
                                </li>
                            </ul>
                            <a class="btn-solid-reg popup-with-move-anim" href="#details-lightbox-2">LIGHTBOX</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="details-lightbox-1" class="lightbox-basic zoom-anim-dialog mfp-hide">
            <div class="container">
                <div class="row">
                    <button title="Close (Esc)" type="button" class="mfp-close x-button">×</button>
                    <div class="col-lg-8">
                        <div class="image-container">
                            <img class="img-fluid" src="images/details-lightbox-1.svg" alt="alternative" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <h3>Design And Plan</h3>
                        <hr />
                        <h5>Core feature</h5>
                        <p>The emailing module basically will speed up your email marketing operations while offering more subscriber control.</p>
                        <p>Do you need to build lists for your email campaigns? It just got easier with Evolo.</p>
                        <ul class="list-unstyled li-space-lg">
                            <li class="media">
                                <i class="fas fa-check"></i><div class="media-body">List building framework</div>
                            </li>
                            <li class="media">
                                <i class="fas fa-check"></i><div class="media-body">Easy database browsing</div>
                            </li>
                            <li class="media">
                                <i class="fas fa-check"></i><div class="media-body">User administration</div>
                            </li>
                            <li class="media">
                                <i class="fas fa-check"></i><div class="media-body">Automate user signup</div>
                            </li>
                            <li class="media">
                                <i class="fas fa-check"></i><div class="media-body">Quick formatting tools</div>
                            </li>
                            <li class="media">
                                <i class="fas fa-check"></i><div class="media-body">Fast email checking</div>
                            </li>
                        </ul>
                        <a class="btn-solid-reg mfp-close page-scroll" href="#request">REQUEST</a> <a class="btn-outline-reg mfp-close as-button" href="#screenshots">BACK</a>
                    </div>
                </div>
            </div>
        </div>

        <div id="details-lightbox-2" class="lightbox-basic zoom-anim-dialog mfp-hide">
            <div class="container">
                <div class="row">
                    <button title="Close (Esc)" type="button" class="mfp-close x-button">×</button>
                    <div class="col-lg-8">
                        <div class="image-container">
                            <img class="img-fluid" src="images/details-lightbox-2.svg" alt="alternative" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <h3>Search To Optimize</h3>
                        <hr />
                        <h5>Core feature</h5>
                        <p>The emailing module basically will speed up your email marketing operations while offering more subscriber control.</p>
                        <p>Do you need to build lists for your email campaigns? It just got easier with Evolo.</p>
                        <ul class="list-unstyled li-space-lg">
                            <li class="media">
                                <i class="fas fa-check"></i><div class="media-body">List building framework</div>
                            </li>
                            <li class="media">
                                <i class="fas fa-check"></i><div class="media-body">Easy database browsing</div>
                            </li>
                            <li class="media">
                                <i class="fas fa-check"></i><div class="media-body">User administration</div>
                            </li>
                            <li class="media">
                                <i class="fas fa-check"></i><div class="media-body">Automate user signup</div>
                            </li>
                            <li class="media">
                                <i class="fas fa-check"></i><div class="media-body">Quick formatting tools</div>
                            </li>
                            <li class="media">
                                <i class="fas fa-check"></i><div class="media-body">Fast email checking</div>
                            </li>
                        </ul>
                        <a class="btn-solid-reg mfp-close page-scroll" href="#request">REQUEST</a> <a class="btn-outline-reg mfp-close as-button" href="#screenshots">BACK</a>
                    </div>
                </div>
            </div>
        </div>

        <div id="pricing" class="cards-2">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h2>Multiple Pricing Options</h2>
                        <p class="p-heading p-large">We've prepared pricing plans for all budgets so you can get started right away. They're great for small companies and large organizations</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">

                        <div class="card">
                            <div class="card-body">
                                <div class="card-title">STARTER</div>
                                <div class="card-subtitle">Just to see what can be achieved</div>
                                <hr class="cell-divide-hr" />
                                <div class="price">
                                    <span class="currency">$</span><span class="value">199</span>
                                    <div class="frequency">monthly</div>
                                </div>
                                <hr class="cell-divide-hr" />
                                <ul class="list-unstyled li-space-lg">
                                    <li class="media">
                                        <i class="fas fa-check"></i><div class="media-body">Improve Your Email Marketing</div>
                                    </li>
                                    <li class="media">
                                        <i class="fas fa-check"></i><div class="media-body">User And Admin Rights Control</div>
                                    </li>
                                    <li class="media">
                                        <i class="fas fa-times"></i><div class="media-body">List Building And Cleaning</div>
                                    </li>
                                    <li class="media">
                                        <i class="fas fa-times"></i><div class="media-body">Collected Data Management</div>
                                    </li>
                                    <li class="media">
                                        <i class="fas fa-times"></i><div class="media-body">More Planning And Evaluation</div>
                                    </li>
                                </ul>
                                <div class="button-wrapper">
                                    <a class="btn-solid-reg page-scroll" href="#request">REQUEST</a>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <div class="card-title">MEDIUM</div>
                                <div class="card-subtitle">Very appropriate for the short term</div>
                                <hr class="cell-divide-hr" />
                                <div class="price">
                                    <span class="currency">$</span><span class="value">299</span>
                                    <div class="frequency">monthly</div>
                                </div>
                                <hr class="cell-divide-hr" />
                                <ul class="list-unstyled li-space-lg">
                                    <li class="media">
                                        <i class="fas fa-check"></i><div class="media-body">Improve Your Email Marketing</div>
                                    </li>
                                    <li class="media">
                                        <i class="fas fa-check"></i><div class="media-body">User And Admin Rights Control</div>
                                    </li>
                                    <li class="media">
                                        <i class="fas fa-check"></i><div class="media-body">List Building And Cleaning</div>
                                    </li>
                                    <li class="media">
                                        <i class="fas fa-check"></i><div class="media-body">Collected Data Management</div>
                                    </li>
                                    <li class="media">
                                        <i class="fas fa-times"></i><div class="media-body">More Planning And Evaluation</div>
                                    </li>
                                </ul>
                                <div class="button-wrapper">
                                    <a class="btn-solid-reg page-scroll" href="#request">REQUEST</a>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="label">
                                <p class="best-value">Best Value</p>
                            </div>
                            <div class="card-body">
                                <div class="card-title">COMPLETE</div>
                                <div class="card-subtitle">Must have for large companies</div>
                                <hr class="cell-divide-hr" />
                                <div class="price">
                                    <span class="currency">$</span><span class="value">399</span>
                                    <div class="frequency">monthly</div>
                                </div>
                                <hr class="cell-divide-hr" />
                                <ul class="list-unstyled li-space-lg">
                                    <li class="media">
                                        <i class="fas fa-check"></i><div class="media-body">Improve Your Email Marketing</div>
                                    </li>
                                    <li class="media">
                                        <i class="fas fa-check"></i><div class="media-body">User And Admin Rights Control</div>
                                    </li>
                                    <li class="media">
                                        <i class="fas fa-check"></i><div class="media-body">List Building And Cleaning</div>
                                    </li>
                                    <li class="media">
                                        <i class="fas fa-check"></i><div class="media-body">Collected Data Management</div>
                                    </li>
                                    <li class="media">
                                        <i class="fas fa-check"></i><div class="media-body">More Planning And Evaluation</div>
                                    </li>
                                </ul>
                                <div class="button-wrapper">
                                    <a class="btn-solid-reg page-scroll" href="#request">REQUEST</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>


        <div id="request" class="form-1">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="text-container">
                            <h2>Fill The Following Form To Request A Meeting</h2>
                            <p>Evolo is one of the easiest and feature packed marketing automation apps in the market. Discover what it can do for your business organization right away.</p>
                            <ul class="list-unstyled li-space-lg">
                                <li class="media">
                                    <i class="fas fa-check"></i>
                                    <div class="media-body"><strong class="blue">Automate your marketing</strong> activities and get results today</div>
                                </li>
                                <li class="media">
                                    <i class="fas fa-check"></i>
                                    <div class="media-body"><strong class="blue">Interact with all your</strong> targeted customers at a personal level</div>
                                </li>
                                <li class="media">
                                    <i class="fas fa-check"></i>
                                    <div class="media-body"><strong class="blue">Convince them to buy</strong> your company's awesome products</div>
                                </li>
                                <li class="media">
                                    <i class="fas fa-check"></i>
                                    <div class="media-body"><strong class="blue">Save precious time</strong> and invest it where you need it the most</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-container">
                            <form id="requestForm" data-toggle="validator" data-focus="false">
                                <div class="form-group">
                                    <input type="text" class="form-control-input" id="rname" name="rname" required />
                                    <label class="label-control" for="rname">Full name</label>
                                    <div class="help-block with-errors"></div>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control-input" id="remail" name="remail" required />
                                    <label class="label-control" for="remail">Email</label>
                                    <div class="help-block with-errors"></div>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control-input" id="rphone" name="rphone" required />
                                    <label class="label-control" for="rphone">Phone</label>
                                    <div class="help-block with-errors"></div>
                                </div>
                                <div class="form-group">
                                    <select class="form-control-select" id="rselect" required>
                                        <option class="select-option" value="" disabled selected>Interested in...</option>
                                        <option class="select-option" value="Personal Loan">Starter</option>
                                        <option class="select-option" value="Car Loan">Medium</option>
                                        <option class="select-option" value="House Loan">Complete</option>
                                    </select>
                                    <div class="help-block with-errors"></div>
                                </div>
                                <div class="form-group checkbox">
                                    <input type="checkbox" id="rterms" value="Agreed-to-Terms" name="rterms" required />I agree with Evolo's stated <a href="privacy-policy.html">Privacy Policy</a> and <a href="terms-conditions.html">Terms & Conditions</a>
                                    <div class="help-block with-errors"></div>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="form-control-submit-button">REQUEST</button>
                                </div>
                                <div class="form-message">
                                    <div id="rmsgSubmit" class="h3 text-center hidden"></div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="basic-3">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h2>Check Out The Video</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">

                        <div class="image-container">
                            <div class="video-wrapper">
                                <a class="popup-youtube" href="https://www.youtube.com/watch?v=fLCjQJCekTs" data-effect="fadeIn">
                                    <img class="img-fluid" src="images/video-frame.svg" alt="alternative" />
                                    <span class="video-play-button">
                                        <span></span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <p>This video will show you a case study for one of our <strong>Major Customers</strong> and will help you understand why your startup needs Evolo in this highly competitive market</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="slider-2">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="image-container">
                            <img class="img-fluid" src="images/testimonials-2-men-talking.svg" alt="alternative" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <h2>Testimonials</h2>

                        <div class="slider-container">
                            <div class="swiper-container card-slider">
                                <div class="swiper-wrapper">

                                    <div class="swiper-slide">
                                        <div class="card">
                                            <img class="card-image" src="images/testimonial-1.svg" alt="alternative" />
                                            <div class="card-body">
                                                <p class="testimonial-text">I just finished my trial period and was so amazed with the support and results that I purchased Evolo right away at the special price.</p>
                                                <p class="testimonial-author">Jude Thorn - Designer</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="swiper-slide">
                                        <div class="card">
                                            <img class="card-image" src="images/testimonial-2.svg" alt="alternative" />
                                            <div class="card-body">
                                                <p class="testimonial-text">Evolo has always helped or startup to position itself in the highly competitive market of mobile applications. You will not regret using it!</p>
                                                <p class="testimonial-author">Marsha Singer - Developer</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="swiper-slide">
                                        <div class="card">
                                            <img class="card-image" src="images/testimonial-3.svg" alt="alternative" />
                                            <div class="card-body">
                                                <p class="testimonial-text">Love their services and was so amazed with the support and results that I purchased Evolo for two years in a row. They are awesome.</p>
                                                <p class="testimonial-author">Roy Smith - Marketer</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="swiper-button-next"></div>
                                <div class="swiper-button-prev"></div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div id="about" class="basic-4">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h2>About The Team</h2>
                        <p class="p-heading p-large">Meat our team of specialized marketers and business developers which will help you research new products and launch them in new emerging markets</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">

                        <div class="team-member">
                            <div class="image-wrapper">
                                <img class="img-fluid" src="images/team-member-1.svg" alt="alternative" />
                            </div>
                            <p class="p-large"><strong>Lacy Whitelong</strong></p>
                            <p class="job-title">Business Developer</p>
                            <span class="social-icons">
                                <span class="fa-stack">
                                    <a href="#your-link">
                                        <i class="fas fa-circle fa-stack-2x facebook"></i>
                                        <i class="fab fa-facebook-f fa-stack-1x"></i>
                                    </a>
                                </span>
                                <span class="fa-stack">
                                    <a href="#your-link">
                                        <i class="fas fa-circle fa-stack-2x twitter"></i>
                                        <i class="fab fa-twitter fa-stack-1x"></i>
                                    </a>
                                </span>
                            </span>
                        </div>

                        <div class="team-member">
                            <div class="image-wrapper">
                                <img class="img-fluid" src="images/team-member-2.svg" alt="alternative" />
                            </div>
                            <p class="p-large"><strong>Chris Brown</strong></p>
                            <p class="job-title">Online Marketer</p>
                            <span class="social-icons">
                                <span class="fa-stack">
                                    <a href="#your-link">
                                        <i class="fas fa-circle fa-stack-2x facebook"></i>
                                        <i class="fab fa-facebook-f fa-stack-1x"></i>
                                    </a>
                                </span>
                                <span class="fa-stack">
                                    <a href="#your-link">
                                        <i class="fas fa-circle fa-stack-2x twitter"></i>
                                        <i class="fab fa-twitter fa-stack-1x"></i>
                                    </a>
                                </span>
                            </span>
                        </div>

                        <div class="team-member">
                            <div class="image-wrapper">
                                <img class="img-fluid" src="images/team-member-3.svg" alt="alternative" />
                            </div>
                            <p class="p-large"><strong>Sheila Zimerman</strong></p>
                            <p class="job-title">Software Engineer</p>
                            <span class="social-icons">
                                <span class="fa-stack">
                                    <a href="#your-link">
                                        <i class="fas fa-circle fa-stack-2x facebook"></i>
                                        <i class="fab fa-facebook-f fa-stack-1x"></i>
                                    </a>
                                </span>
                                <span class="fa-stack">
                                    <a href="#your-link">
                                        <i class="fas fa-circle fa-stack-2x twitter"></i>
                                        <i class="fab fa-twitter fa-stack-1x"></i>
                                    </a>
                                </span>
                            </span>
                        </div>
                        <div class="team-member">
                            <div class="image-wrapper">
                                <img class="img-fluid" src="images/team-member-4.svg" alt="alternative" />
                            </div>
                            <p class="p-large"><strong>Mary Villalonga</strong></p>
                            <p class="job-title">Product Manager</p>
                            <span class="social-icons">
                                <span class="fa-stack">
                                    <a href="#your-link">
                                        <i class="fas fa-circle fa-stack-2x facebook"></i>
                                        <i class="fab fa-facebook-f fa-stack-1x"></i>
                                    </a>
                                </span>
                                <span class="fa-stack">
                                    <a href="#your-link">
                                        <i class="fas fa-circle fa-stack-2x twitter"></i>
                                        <i class="fab fa-twitter fa-stack-1x"></i>
                                    </a>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="contact" class="form-2">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h2>Contact Information</h2>
                        <ul class="list-unstyled li-space-lg">
                            <li class="address">Don't hesitate to give us a call or send us a contact form message</li>
                            <li><i class="fas fa-map-marker-alt"></i>22 Innovative Area, San Francisco, CA 94043, US</li>
                            <li><i class="fas fa-phone"></i><a class="turquoise" href="tel:003024630820">+81 720 2212</a></li>
                            <li><i class="fas fa-envelope"></i><a class="turquoise" href="mailto:office@evolo.com">office@evolo.com</a></li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="map-responsive">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.507640204439!3d37.757814996609724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan+Francisco%2C+CA%2C+USA!5e0!3m2!1sen!2sro!4v1498231462606" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-lg-6">

                        <form id="contactForm" data-toggle="validator" data-focus="false">
                            <div class="form-group">
                                <input type="text" class="form-control-input" id="cname" required />
                                <label class="label-control" for="cname">Name</label>
                                <div class="help-block with-errors"></div>
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control-input" id="cemail" required />
                                <label class="label-control" for="cemail">Email</label>
                                <div class="help-block with-errors"></div>
                            </div>
                            <div class="form-group">
                                <textarea class="form-control-textarea" id="cmessage" required></textarea>
                                <label class="label-control" for="cmessage">Your message</label>
                                <div class="help-block with-errors"></div>
                            </div>
                            <div class="form-group checkbox">
                                <input type="checkbox" id="cterms" value="Agreed-to-Terms" required />I have read and agree with Evolo's stated <a href="privacy-policy.html">Privacy Policy</a> and <a href="terms-conditions.html">Terms Conditions</a>
                                <div class="help-block with-errors"></div>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="form-control-submit-button">SUBMIT MESSAGE</button>
                            </div>
                            <div class="form-message">
                                <div id="cmsgSubmit" class="h3 text-center hidden"></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <div class="footer-col">
                            <h4>About Evolo</h4>
                            <p>We're passionate about offering some of the best business growth services for startups</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="footer-col middle">
                            <h4>Important Links</h4>
                            <ul class="list-unstyled li-space-lg">
                                <li class="media">
                                    <i class="fas fa-square"></i>
                                    <div class="media-body">Our business partners <a class="turquoise" href="#your-link">startupguide.com</a></div>
                                </li>
                                <li class="media">
                                    <i class="fas fa-square"></i>
                                    <div class="media-body">Read our <a class="turquoise" href="terms-conditions.html">Terms & Conditions</a>, <a class="turquoise" href="privacy-policy.html">Privacy Policy</a></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="footer-col last">
                            <h4>Social Media</h4>
                            <span class="fa-stack">
                                <a href="#your-link">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-facebook-f fa-stack-1x"></i>
                                </a>
                            </span>
                            <span class="fa-stack">
                                <a href="#your-link">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-twitter fa-stack-1x"></i>
                                </a>
                            </span>
                            <span class="fa-stack">
                                <a href="#your-link">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-google-plus-g fa-stack-1x"></i>
                                </a>
                            </span>
                            <span class="fa-stack">
                                <a href="#your-link">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-instagram fa-stack-1x"></i>
                                </a>
                            </span>
                            <span class="fa-stack">
                                <a href="#your-link">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-linkedin-in fa-stack-1x"></i>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <p class="p-small">Copyright © 2020 <a href="https://inovatik.com">Inovatik</a> - All rights reserved</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
}

export default HomePage;