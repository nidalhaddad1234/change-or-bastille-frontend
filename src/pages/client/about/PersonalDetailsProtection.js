import Layout from "../../../layout/client/Layout";
import React from "react";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function PersonalDetailsProtection() {
  const store = useContextStore();
  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <h1 className="d-none"> Protection des données personnelles</h1>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            <Typography
              className="titleUnderline"
              variant="h2"
              sx={{ fontWeight: "700" }}
              pb={5}
            >
              Protection des données personnelles
            </Typography>
            <Box
              sx={{
                width: "100%",
                background: "#FFF",
                padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
                fontWeight: "300",
                fontSize: "1rem",
              }}
            >
              <span style={{ fontWeight: "700" }}>
                Protection des données personnelles
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Chez Change et Or Bastille, nous prenons la protection de vos
                données personnelles très au sérieux. Nous comprenons
                l'importance de protéger vos informations et respectons les
                réglementations en vigueur concernant la collecte, l'utilisation
                et la conservation de vos données. Cette politique explique
                comment nous traitons et protégeons vos données personnelles.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Collecte et utilisation des données
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Lorsque vous effectuez une transaction d'achat de devises ou
                d'or sur notre site, nous vous demandons de fournir certaines
                informations personnelles, telles que votre nom, votre adresse,
                votre date de naissance et une copie de votre pièce d'identité.
                Ces informations sont nécessaires pour vérifier votre identité
                et respecter nos obligations légales en matière de lutte contre
                le blanchiment d'argent et le financement du terrorisme.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Nous utilisons vos données personnelles uniquement aux fins pour
                lesquelles elles ont été collectées et conformément à la
                réglementation en vigueur. Nous ne partagerons pas vos données
                avec des tiers sans votre consentement, sauf si cela est requis
                par la loi ou dans le cadre d'une demande des autorités
                compétentes.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Conservation des données{" "}
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Conformément à la législation française, nous sommes tenus de
                conserver vos données personnelles pendant une durée minimale de
                5 ans à compter de la date de la transaction.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Après cette période, nous détruirons ou anonymiserons vos
                données de manière sécurisée.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>Sécurité des données </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Nous mettons en œuvre des mesures de sécurité techniques et
                organisationnelles appropriées pour protéger vos données
                personnelles contre la perte, l'accès non autorisé, la
                divulgation, l'altération ou la destruction. Ces mesures
                comprennent le cryptage des données, l'utilisation de pare-feu
                et de systèmes de détection d'intrusion, ainsi que la formation
                de notre personnel à la sécurité des données.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>Vos droits </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                En tant que personne concernée, vous disposez de plusieurs
                droits en matière de protection des données personnelles,
                notamment le droit d'accéder à vos données, de les rectifier, de
                les supprimer, de limiter leur traitement ou de vous opposer à
                leur traitement. Pour exercer ces droits, veuillez nous
                contacter à{" "}
                <Link
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  to="/nous-contacter"
                >
                  contact@change-or-enligne.com
                </Link>
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Si vous avez des questions ou des préoccupations concernant la
                protection de vos données personnelles, n'hésitez pas à nous
                contacter. Nous nous engageons à respecter votre vie privée et à
                traiter vos données personnelles de manière responsable et
                transparente.
              </span>
              <br /> <br />
            </Box>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
