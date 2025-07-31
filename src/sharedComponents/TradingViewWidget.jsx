import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    const loadTradingViewScript = async () => {
      if (!window.TradingView) {
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.id = "tradingview-widget-loading-script";
          script.src = "https://s3.tradingview.com/tv.js";
          script.type = "text/javascript";
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }

      createWidget();
    };

    loadTradingViewScript();
  }, []);

  const createWidget = () => {
    setTimeout(() => {
      if (
        document.getElementById("tradingview_3759f") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: "FOREXCOM:XAUEUR",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "fr",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          container_id: "tradingview_3759f",
        });
      }
    }, 3000);
  };

  return (
    <Box>
      <div className="tradingview-widget-container">
        <Box
          id="tradingview_3759f"
          sx={{ height: { xs: "40vh", xl: "40vh" } }}
        />
        <div className="tradingview-widget-copyright">
          <a
            href="https://fr.tradingview.com/"
            rel="noopener nofollow"
            target="_blank"
          >
            <span className="blue-text">
              Suivre tous les marchés sur TradingView
            </span>
          </a>
        </div>
      </div>
    </Box>
  );
}
