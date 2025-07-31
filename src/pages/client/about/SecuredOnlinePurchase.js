import Layout from "../../../layout/client/Layout";
import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function SecuredOnlinePurchase() {
  const store = useContextStore();
  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <h1 className="d-none">ACHAT EN LIGNE SÉCURISÉ</h1>

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
              ACHAT EN LIGNE SÉCURISÉ
            </Typography>
            <Grid
              sx={{
                width: "100%",
                background: "#FFF",
                padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
              }}
            >
              <Box sx={{ fontWeight: "300", fontSize: "1rem" }}>
                Chez Change et Or Bastille, nous accordons une grande importance
                à la sécurité de vos transactions en ligne. Nous avons mis en
                place des mesures de sécurité rigoureuses pour protéger vos
                informations et vous offrir une expérience d’achat en ligne
                fiable et sécurisée.
                <br />
                <br />
                Voici les méthodes de paiement disponibles sur notre site et les
                mesures de sécurité associées
                <br />
                <br />
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "600", fontSize: "1rem" }}
                >
                  Paiement par carte bancaire
                </Typography>
                <br />
                Vous pouvez régler votre commande en utilisant votre carte
                bancaire (Visa, Mastercard, etc.). Pour assurer la sécurité de
                cette méthode de paiement, nous utilisons un protocole de
                cryptage SSL (Secure Socket Layer) qui garantit la
                confidentialité de vos données bancaires lors de la transaction.
                De plus, nous ne stockons aucune information relative à votre
                carte bancaire sur notre site. Lorsque vous effectuez un
                paiement par carte, vous êtes redirigé vers le site sécurisé de
                notre partenaire bancaire, où vous entrez directement vos
                informations de carte bancaire. Cette procédure garantit que vos
                données sont protégées et que votre transaction est sécurisée.
                <br />
                <br />
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "600", fontSize: "1rem" }}
                >
                  Paiement par virement bancaire
                </Typography>
                <br />
                Le paiement par virement bancaire est également une option
                sécurisée pour régler votre commande sur notre site. Lorsque
                vous choisissez cette méthode, nous vous fournirons nos
                coordonnées bancaires pour effectuer le virement. Les virements
                bancaires sont gérés et protégés par les banques elles-mêmes, ce
                qui garantit la sécurité de cette méthode de paiement.
                <br />
                <br />
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "600", fontSize: "1rem" }}
                >
                  Engagement en matière de sécurité
                </Typography>
                <br />
                Nous nous engageons à protéger la confidentialité de vos
                informations personnelles et à assurer la sécurité de vos
                transactions en ligne. Nous mettons régulièrement à jour nos
                protocoles de sécurité et surveillons attentivement notre
                système pour prévenir les tentatives de fraude et d’accès non
                autorisé.
                <br />
                <br />
                Si vous avez des questions ou des préoccupations concernant la
                sécurité de vos transactions en ligne sur notre site, n’hésitez
                pas à nous contacter à{" "}
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
                Nous sommes là pour vous aider et vous rassurer.
              </Box>
            </Grid>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
