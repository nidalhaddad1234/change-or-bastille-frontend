import Layout from "../../../layout/client/Layout";
import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";

export default observer(function WhoAreWe() {
  const store = useContextStore();
  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <h1 className="d-none">QUI SOMMES-NOUS?</h1>

          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            <Typography
              variant="h2"
              className="titleUnderline"
              sx={{ fontWeight: "700" }}
              pb={5}
            >
              QUI SOMMES-NOUS?
            </Typography>
            <Grid
              sx={{
                width: "100%",
                background: "#FFF",
                padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
                fontSize: "1rem",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "300", fontSize: "1rem" }}
              >
                Change et Or Bastille, opéré par Palm Exchange, est votre bureau de change en ligne et à Paris spécialisé dans la vente et l’achat de devises et de pièces d’or d’investissement. Fondée en 2005, nous avons acquis une solide réputation en offrant à nos clients un service professionnel, sécurisé et transparent.
                <br />
                <br />
                Notre équipe d'experts possède une vaste expérience dans le
                domaine des devises et des métaux précieux. Nous nous engageons
                à fournir des conseils fiables et à jour, en nous appuyant sur
                notre connaissance approfondie du marché et des tendances
                économiques mondiales.
                <br />
                <br />
                Notre mission est de faciliter l'accès à l'achat de devises et
                de pièces d'or d'investissement en proposant une plateforme en
                ligne sécurisée et conviviale. Nous offrons une large gamme de
                devises et de pièces d'or sous différentes formes, sélectionnées
                pour leur qualité et leur valeur.
                <br />
                <br />
                En plus de notre site de commerce électronique, nous opérons
                également un bureau de change physique situé à 18 rue
                Saint-Antoine 75004 Paris, où vous pouvez bénéficier de nos
                services en personne.
                <br />
                <br />
                Pourquoi nous choisir?
                <br />
                <br />
                Expérience et expertise dans le domaine des devises et des
                métaux précieux.
                <br />
                <br />
                Plateforme en ligne sécurisée et conviviale avec une large gamme
                de produits.
                <br />
                <br />
                Service clientèle professionnel et réactif.
                <br />
                <br />
                Livraison rapide et sécurisée à domicile.
                <br />
                <br />
                Respect des réglementations et des exigences légales.
                <br /> <br />
                Nous nous engageons à fournir un service exceptionnel et à aider
                nos clients à réaliser leurs objectifs d'investissement en
                devises et en or. N'hésitez pas à nous contacter si vous avez
                des questions ou si vous avez besoin d'aide pour passer une
                commande.
                <br />
                <br />
                Raison Social : PALM EXCHANGE
                <br />
                <br />
                RSC 481 423 143 PARIS
                <br />
                <br />
                Agréé par l'Autorité de Contrôle Prudentiel et de Résolution
                ACPR - Banque de France
              </Typography>
            </Grid>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
