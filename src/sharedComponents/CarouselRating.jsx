import React, { useEffect } from "react";
function CarouselRating() {
  useEffect(() => {
    // Insert the script here
    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src =
      "//widgets.rr.skeepers.io/carousel/e97d53a1-e435-3464-f15c-8da363dab054/f354fbd8-9cf2-4dd3-98ea-3ffc383ed3f4.js";

    // Append the script to the document body
    document.body.appendChild(script);

    return () => {
      // Cleanup by removing the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="skeepers_carousel_container"
      data-slides-count="4"
      style={{ margin: 0 }}
    >
      {/* Content goes here */}
    </div>
  );
}

export default CarouselRating;
