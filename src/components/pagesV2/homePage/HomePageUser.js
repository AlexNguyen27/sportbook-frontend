import React from 'react';

import Header from '../../layoutV2/Header';
import Branch from '../../layoutV2/Branch';
import Service from '../../layoutV2/Service';
import Planning from '../../layoutV2/Planning';
import Pricing from '../../layoutV2/Pricing';
import Request from '../../layoutV2/Request';
import Checkout from '../../layoutV2/Checkout';
import Testimonial from '../../layoutV2/Testimonial';
import About from '../../layoutV2/About';
import Contact from '../../layoutV2/Contact';

const HomePageUser = (props) => {
    return <div data-spy="scroll" data-target=".fixed-top">
    <Header />

    {/* TODO FIX LATER */}
    <Branch />

    <Service />

    <Planning />

    <Pricing />

    <Request />

    <Checkout />

    <Testimonial />

    <About />

    <Contact />
</div>
}

export default HomePageUser;