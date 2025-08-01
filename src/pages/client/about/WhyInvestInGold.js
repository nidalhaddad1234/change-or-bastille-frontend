import Layout from "../../../layout/client/Layout";
import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Button, TextField } from "@mui/material";
import Product from "../bills/Product";
import { Helmet } from "react-helmet-async";
import { observer } from "mobx-react";
import { useContextStore } from "../../../stores/RootStoreContext";
import CustomCarousel from "../../../sharedComponents/CustomCarousel";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { getFileName } from "../../../helpers";
export default observer(function WhyInvestInGold() {
  const store = useContextStore();
  useEffect(() => {
    const fetchData = async () => await store.metalsStore.loadmetals(true);
    fetchData().then((result) => {
      setFeatured(result);
    });
    return () => { };
  }, []);
  const [featured, setFeatured] = useState([]);

  const product = featured.map((item) => (
    <Product
      key={item._id}
      id={item._id}
      name={item.metalName}
      type={item.type}
      url={getFileName(item.photo)}
      price={item.netSellPrice}
    />
  ));
  return (
    <>
      {store.globalStoreClient.isLoadedBanner && featured.length > 0 ? (
        <Layout>
          <Helmet>
            <title> POURQUOI INVESTIR DE L’OR | Change et Or Bastille</title>
            <link
              rel="canonical"
              href="https://www.change-or-enligne.com/pourquoi-investir-dans-or"
            />
            <meta
              name="description"
              content="Découvrez pourquoi l’or est considéré comme une valeur refuge depuis des siècles. Des insights pertinents pour comprendre les avantages de l’investissement en or."
            />
          </Helmet>
          <h1 className="d-none">POURQUOI INVESTIR DE L’OR</h1>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 3rem 1rem" },
            }}
          >
            <Typography variant="h2" className="titleUnderline">
              POURQUOI INVESTIR DE L’OR?
            </Typography>
            {/* <Grid container mb={5}>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{ marginBottom: { xs: "1rem", lg: "0" }, margin: "auto " }}
          >
            <Typography variant="body1">
              Inscrivez-vous pour recevoir quotidiennement nos tarifs d’achat et
              de vente de l’or
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <TextField
              size="small"
              sx={{
                background: "white",
                marginRight: "1rem",
                marginBottom: { xs: "1rem", lg: "0" },
              }}
              placeholder="ADRESSE E-MAIL"
            ></TextField>
            <Button variant="contained" color="gold" sx={{ width: "200px" }}>
              JE M’INSCRIS
            </Button>
          </Grid>
        </Grid> */}
            <CustomCarousel>{product}</CustomCarousel>
            <Box
              sx={{
                margin: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <div className="font-lighter" style={{ fontWeight: "700" }}>
                Pourquoi investir dans l’or?
              </div>
              <div className="font-lighter">
                L’or est souvent considéré comme une valeur refuge et un moyen
                de préserver la richesse à travers les générations.
              </div>
              <div className="font-lighter">
                Voici quelques raisons pour lesquelles vous devriez envisager
                d’investir dans l’or
              </div>
              <span style={{ fontWeight: "700" }}>
                Protection contre l’inflation
              </span>
              <div className="font-lighter">
                L’or est traditionnellement considéré comme une protection
                contre l’inflation. Lorsque les prix des biens et des services
                augmentent, la valeur de l’or a tendance à suivre cette hausse,
                préservant ainsi le pouvoir d’achat des investisseurs.
              </div>
              <span style={{ fontWeight: "700" }}>
                Diversification du portefeuille
              </span>
              <div className="font-lighter">
                L’or offre une diversification intéressante pour les
                investisseurs, car il est généralement moins corrélé aux actions
                et aux obligations. Avoir une partie de son portefeuille
                investie en or peut aider à réduire la volatilité globale et à
                protéger contre les pertes en période de turbulences sur les
                marchés financiers.
              </div>
              <span style={{ fontWeight: "700" }}>
                Valeur refuge en période d’incertitude
              </span>
              <div className="font-lighter">
                L’or est souvent perçu comme une valeur refuge en période
                d’incertitude économique ou politique. Les investisseurs peuvent
                se tourner vers l’or lorsque les marchés boursiers sont
                instables ou lors de crises géopolitiques.
              </div>
              <span style={{ fontWeight: "700" }}> Liquidité </span>
              <div className="font-lighter">
                L’or est un actif très liquide, ce qui signifie qu’il est facile
                à Achetez et à vendre.
              </div>
              <div className="font-lighter">
                Vous pouvez convertir rapidement vos investissements en or en
                espèces en cas de besoin.
              </div>
              <span style={{ fontWeight: "700" }}>Demande mondiale </span>
              <div className="font-lighter">
                La demande d’or provient de divers secteurs, notamment la
                joaillerie, l’industrie et l’investissement. Cette demande
                mondiale soutenue contribue à maintenir la valeur de l’or sur le
                long terme.
              </div>
              <span style={{ fontWeight: "700" }}> Histoire et tradition </span>
              <div className="font-lighter">
                L’or a une longue histoire en tant que moyen d’échange et de
                préservation de la richesse. Il est reconnu et accepté dans le
                monde entier, ce qui en fait un investissement universellement
                apprécié.
              </div>
              <div className="font-lighter">
                En investissant dans l’or, vous pouvez profiter de ces avantages
                et protéger votre patrimoine face aux incertitudes économiques
                et financières. Chez Change et Or Bastille, nous proposons une
                gamme de pièces d’or d’investissement et des lingotins or pour
                vous aider à diversifier votre portefeuille et à investir dans
                ce métal précieux de manière sécurisée et pratique.
              </div>
              <div className="font-lighter">
                Nous vous invitons à consulter nos tarifs de vente pour
                découvrir notre gamme de produits d’or d’investissement. Que
                vous soyez intéressé par les pièces d’or, les lingotins ou les
                pièces de collection, nous sommes sûrs que vous trouverez
                quelque chose qui correspond à vos objectifs d’investissement.
              </div>
            </Box>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
