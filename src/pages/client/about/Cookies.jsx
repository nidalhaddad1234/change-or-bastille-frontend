import Layout from "../../../layout/client/Layout";
import React from "react";
import { Typography, Box, Button } from "@mui/material";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import CookiesAlert from "../../../layout/client/CookiesAlert";
import { getCookie } from "../../../helpers";
export default observer(function Cookies() {
  const store = useContextStore();
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
      "_gcl_au=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    const scriptElement = document.querySelector(
      `[src="https://www.googletagmanager.com/gtag/js?id=${googleConversionId}"]`
    );

    if (scriptElement) document.head.removeChild(scriptElement);
  };
  const removeCookieAnalytics = () => {
    document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "_ga_P3NWRDQ2KJ=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <h1 className="d-none">COOKIES</h1>

          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontWeight: "700" }}
              className="titleUnderline"
              pb={5}
            >
              COOKIES
            </Typography>
            <Box
              sx={{
                width: "100%",
                background: "#FFF",
                padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
                fontWeight: "600",
                fontSize: "1rem",
              }}
            >
              <Box style={{ fontWeight: "300", fontSize: "1rem" }}>
                Bienvenue sur Change et Or Bastille. Cette page explique notre
                politique concernant l'utilisation de cookies.
                <br />
                <br />
                <Typography sx={{ fontWeight: "700" }}>
                  Qu&#39;est-ce qu&#39;un cookie ?
                </Typography>
                <br />
                <Typography>
                  Un cookie est un petit fichier texte qui peut être enregistré
                  sur votre appareil lorsque vous visitez notre site Web. Ce
                  fichier texte contient des informations qui peuvent être lues
                  par le site Web lorsque vous y retournez.
                </Typography>
                <br />
                <Typography sx={{ fontWeight: "700" }}>
                  Comment utilisons-nous les cookies ?
                </Typography>
                <br />
                <Typography>
                  Sur Change et Or Bastille, nous utilisons trois types de
                  cookies:
                </Typography>
                <br />
                <Typography>
                  <span style={{ fontWeight: "700" }}>
                    Cookies Essentiels:
                  </span>{" "}
                  Ces cookies sont nécessaires pour le bon fonctionnement de
                  notre site Web. Ils sont utilisés pour des fonctionnalités
                  clés telles que la sécurité, la gestion du réseau, et
                  l'accessibilité. Ces cookies ne recueillent pas d'informations
                  sur vous pouvant être utilisées pour le marketing ou pour se
                  souvenir de votre historique de navigation sur internet.
                </Typography>
                <br />
                <Typography>
                  <span style={{ fontWeight: "700" }}>
                    Cookies de Suivi des Conversions Google Ads:
                  </span>{" "}
                  Nous utilisons également les cookies de Google Ads pour
                  mesurer l'efficacité de nos campagnes publicitaires. Ces
                  cookies nous aident à comprendre comment les visiteurs
                  interagissent avec notre site après avoir vu une de nos
                  annonces Google. Ces cookies sont utilisés uniquement avec
                  votre consentement.
                </Typography>
                <br />
                <Typography>
                  <span style={{ fontWeight: "700" }}>
                    Cookies Google Analytics:
                  </span>{" "}
                  Google Analytics est un service d&#39;analyse web fourni par
                  Google qui utilise des cookies pour suivre et rapporter le
                  trafic sur notre site web. Ces cookies collectent des
                  informations de manière anonyme, y compris le nombre de
                  visiteurs du site, d&#39;où viennent les visiteurs, et les
                  pages qu&#39;ils ont visitées. Les informations collectées par
                  les cookies Google Analytics sont utilisées pour analyser les
                  tendances d&#39;utilisation de notre site, ce qui nous permet
                  d&#39;améliorer la fonctionnalité et l&#39;expérience
                  utilisateur. Ces données nous aident à comprendre quelles
                  pages sont les plus populaires, quelles stratégies de
                  marketing sont efficaces, et comment nous pouvons rendre notre
                  site plus intuitif et accessible.
                </Typography>
                <br />
                <Typography sx={{ fontWeight: "700" }}>
                  Votre Choix et Consentement:
                </Typography>
                <br />
                <Typography>
                  Lorsque vous visitez notre site pour la première fois, une
                  bannière s&#39;affiche vous demandant votre consentement à
                  l&#39;utilisation des cookies non essentiels, tels que ceux
                  liés au suivi des conversions Google Ads et les cookies Google
                  Analytics. Vous avez la possibilité d&#39;accepter ou de
                  refuser ces cookies. Vous pouvez changer vos préférences à
                  tout moment en revisitant cette page.
                </Typography>
                <br />
                <Typography sx={{ fontWeight: "700" }}>
                  {" "}
                  Plus d'Informations:
                </Typography>
                <br />
                <Typography>
                  Pour plus d'informations sur notre utilisation des cookies et
                  sur la façon dont vous pouvez gérer vos préférences de
                  cookies, veuillez nous contacter à{" "}
                  <Link
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                    to="/nous-contacter"
                  >
                    contact@change-or-enligne.com
                  </Link>{" "}
                </Typography>
                <br />
                <Button
                  variant="contained"
                  color="gold"
                  onClick={() => setOpen(true)}
                >
                  Gérer les préférences
                </Button>
              </Box>
            </Box>
          </Box>
          <CookiesAlert
            open={open}
            setOpen={setOpen}
            setConsentValue={setConsentValue}
          />
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
