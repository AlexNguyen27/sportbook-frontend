import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GroundCard from "./GroundCard";
import { Col, Row } from "reactstrap";
const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1300,
    },
    items: 3,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1299,
      min: 890,
    },
    items: 3,
    partialVisibilityGutter: 10,
  },
  mobile: {
    breakpoint: {
      max: 889,
      min: 0,
    },
    items: 2,
    partialVisibilityGutter: 0,
  },
  
};
const MultipleCarousel = ({ dataSource }) => {
  return (
    <Carousel
      additionalTransfrom={0}
      autoPlaySpeed={4000}
      centerMode={false}
      containerClass="container-with-dots"
      draggable
      autoPlay
      focusOnSelect={false}
      infinite
      partialVisible
      keyBoardControl
      minimumTouchDrag={80}
      renderDotsOutside={true}
      responsive={responsive}
      showDots={true}
      sliderClass=""
      slidesToSlide={2}
      swipeable
    >
        {dataSource.map((item) => (
            <GroundCard ground={item} />
        ))}
    </Carousel>
  );
};

export default MultipleCarousel;
