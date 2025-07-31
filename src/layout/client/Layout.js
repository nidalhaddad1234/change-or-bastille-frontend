import * as React from "react";
import Box from "@mui/material/Box";
import "../../css/layout.css";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "react-cookie-consent";
import { getCookie } from "../../helpers";
import CookiesAlert from "./CookiesAlert";
import { Link } from "react-router-dom";

export default function Layout(props) {
  const { children } = props;
  const [consentValue, setConsentValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const googleConversionId = "AW-11314892976";
  const googleAnalyticsId = "G-P3NWRDQ2KJ";

  React.useEffect(() => {
    var consent = getCookie("consent");
    var consentGaGCL = getCookie("gaGclConsent");
    if (consent == undefined) {
      loadGoogleConversion();
      loadGoogleAnalytics();
    } else if (consent === "false") {
      removeCookieConversion();
      removeCookieAnalytics();
    } else if (consent === "true") {
      if (consentGaGCL === "GaGcl") {
        loadGoogleConversion();
        loadGoogleAnalytics();
      }
      if (consentGaGCL === "Ga") {
        loadGoogleAnalytics();
        removeCookieConversion();
      }
      if (consentGaGCL === "Gcl") {
        loadGoogleConversion();
        removeCookieAnalytics();
      }
    }

    return () => {};
  }, [consentValue]);
  const removeCookieConversion = () => {
    document.cookie =
      "_gcl_au=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.change-or-enligne.com; path=/;";

    const scriptElement = document.querySelector(
      `[src="https://www.googletagmanager.com/gtag/js?id=${googleConversionId}"]`
    );

    if (scriptElement) document.head.removeChild(scriptElement);
  };
  const removeCookieAnalytics = () => {
    document.cookie =
      "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.change-or-enligne.com; path=/;";
    document.cookie =
      "_ga_P3NWRDQ2KJ=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.change-or-enligne.com; path=/;";
    const scriptElement = document.querySelector(
      `[src="https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}"]`
    );
    if (scriptElement) document.head.removeChild(scriptElement);
  };
  const loadGoogleConversion = () => {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleConversionId}`;
    script.async = true;

    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }

    gtag("js", new Date());
    gtag("config", googleConversionId);
  };
  const loadGoogleAnalytics = () => {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
    script.async = true;

    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }

    gtag("js", new Date());
    gtag("config", googleAnalyticsId);
  };
  return (
    <>
      <Box bgcolor="customLighGrey.main" className="body">
        <Header />
        <Box bgcolor="customLighGrey.main">{children}</Box>
        <Footer />
      </Box>

      {consentValue == null && (
        <CookieConsent
          location="bottom"
          cookieName="consent"
          style={{
            background: " rgba(0, 0, 0, .6)",
            zIndex: "9999999",
          }}
          buttonText="Tout Accepter"
          buttonStyle={{
            background: "#000",
            color: "#fff",
            borderRadius: "10px",
            fontSize: "14px",
            padding: "9px 15px",
          }}
          expires={150}
        >
          <Box sx={{ fontWeight: "400" }}>
            Ce site utilise des cookies pour améliorer votre expérience de
            navigation, analyser le trafic de notre site et pour des
            fins publicitaires.{"  "}
            <Link style={{ color: "Gold" }} onClick={() => setOpen(true)}>
              Gérer les Préférences
            </Link>
          </Box>
        </CookieConsent>
      )}
      <CookiesAlert
        open={open}
        setOpen={setOpen}
        consent={consentValue}
        setConsentValue={setConsentValue}
      />
    </>
  );
}
