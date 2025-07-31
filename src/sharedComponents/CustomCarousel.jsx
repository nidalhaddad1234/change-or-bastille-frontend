import "swiper/css";
import { useEffect } from "react";
import { useRef } from "react";

import { register } from "swiper/element/bundle";
register();
export default function CustomCarousel(props) {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // Register Swiper web component
    register();

    // Object with parameters
    const params = {
      slidesPerView: 5,
      spaceBetween: 20,
      loop: false,
      centerSlide: "true",
      fade: "true",
      grabCursor: "true",
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },

        1200: {
          slidesPerView: 4,
        },
        1600: {
          slidesPerView: 6,
        },
      },
      injectStyles: [
        `
          .swiper-button-next,
          .swiper-button-prev {
            background-color: rgba(0, 0, 0, 0.5);
            background-position: center;
            background-repeat: no-repeat;
            padding: 10px;
            border-radius: 100%;
            height:1.2rem;
            width:1.2rem;
            border: 2px solid transparent;
            color: white;
          }
          .swiper-pagination-bullets{
           position:relative;
           top:0rem !important;
           margin-top: 1rem;
          }
          .swiper-button-disabled{
            pointer-events:all !important;
          }
      `,
      ],
    };

    // Assign it to swiper element
    Object.assign(swiperElRef.current, params);

    // initialize swiper
    swiperElRef.current.initialize();
  }, []);
  return (
    <swiper-container
      init="false"
      ref={swiperElRef}
      navigation="true"
      style={{
        "--swiper-pagination-color": "#FFBA08",
        "--swiper-pagination-bullet-inactive-color": "#999999",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-horizontal-gap": "6px",
      }}
      pagination="true"
    >
      {props.children}
    </swiper-container>
  );
}
