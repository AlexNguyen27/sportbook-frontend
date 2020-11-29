import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GroundCard from "./GroundCard";
const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 4,
    partialVisibilityGutter: 20
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 1,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464
    },
    items: 2,
    partialVisibilityGutter: 30
  }
};
const MultipleCarousel = ({ dataSource}) => {
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
    slidesToSlide={3}
    swipeable
    >
      {dataSource.map((item) => (
        <div>
          <GroundCard ground={item} />
        </div>
      ))}
    </Carousel>
  );
};

export default MultipleCarousel;
