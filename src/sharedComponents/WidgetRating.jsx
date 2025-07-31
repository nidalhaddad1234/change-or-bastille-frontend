import React, { useEffect } from "react";

function WidgetRating() {
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src =
      "https://widgets.rr.skeepers.io/generated/e97d53a1-e435-3464-f15c-8da363dab054/e7f166e7-d6f0-4222-9683-2b89bb3579d6.js";

    // Append the script to the document's body
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div>{/* Your component's content */}</div>;
}

export default WidgetRating;
