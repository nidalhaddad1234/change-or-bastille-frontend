import Layout from "../../../layout/client/Layout";
import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import LoadingData from "../../../sharedComponents/LoadingData";
import RateAlertComponentBills from "./RateAlertComponentBills";
import { Helmet } from "react-helmet-async";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react";
export default observer(function RateAlertCurrency() {
  const store = useContextStore();
  useEffect(() => {
    const fetchData = async () =>
      await store.currenciesStoreClient.loadCurrencies();
    fetchData().then((result) => {
      setResponse(result);
    });
    return () => { };
  }, []);
  const [response, setResponse] = useState([]);
  return (
    <>
      <Helmet>
        <title>Alerte Meilleur Taux devises</title>
        <link
          rel="canonical"
          href="https://www.change-or-enligne.com/alerte-meilleur-taux-devises"
        />
        <meta
          name="description"
          content="Ne manquez jamais une opportunité favorable. Inscrivez-vous pour recevoir des alertes sur
          les meilleurs taux de change pour vos devises préférées."
        />
      </Helmet>

      <LoadingData fullHeight data={response.data}>
        <Layout>
          <h1 className="d-none">Alerte Meilleur Taux devises</h1>

          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 3rem 1rem" },
            }}
          >
            <>
              <Typography
                variant="h2"
                className="titleUnderline"
                sx={{ textTransform: "uppercase" }}
              >
                {/* ALERTE MEILLEUR TAUX */}
                Alerte Meilleur Taux devises
              </Typography>
              <Typography
                variant="h63"
                sx={{
                  fontFamily: "Work Sans,sans-serif",
                  margin: "1rem 0",
                  fontWeight: "700",
                  fontSize: "1.25rem",
                }}
              >
                Devises
              </Typography>

              <Typography variant="body1">
                Sur notre site, nous mettons à votre disposition la
                fonctionnalité « Alerte Meilleur Taux ».
              </Typography>
              <Typography variant="body1">
                C’est un service gratuit qui vous permet de fixer votre propre
                taux souhaité pour l’achat d’une devise ou d’une pièce d’or ou
                lingotin d’or.
              </Typography>
              <Typography variant="body1">
                Il vous suffit d’entrer le taux désiré et nous vous enverrons un
                mail lorsque le marché atteint ce niveau.
              </Typography>
              <Typography variant="body1">
                Cela vous donne le contrôle total et vous aide à Achetez au
                moment le plus avantageux pour vous.
              </Typography>
              <Typography variant="body1">
                Veuillez noter que le taux d’alerte reste actif pendant 30
                jours, après quoi vous pouvez le renouveler ou en fixer un
                nouveau.
              </Typography>
              <Typography variant="body1">
                Commencez dès maintenant à optimiser vos achats avec notre
                fonctionnalité “Alerte Meilleur Taux”.
              </Typography>
              <Box
                sx={{ background: "#fff", padding: "2rem", marginTop: "2rem" }}
              >
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  gap={2}
                >
                  <Grid item container xs={12} display="flex">
                    <Grid item xs={4} sx={{ textAlign: "start" }}>
                      <Typography
                        fontWeight={700}
                        sx={{ fontSize: { xs: "12px", lg: "16px" } }}
                      >
                        Pays
                      </Typography>
                    </Grid>
                    <Grid item xs={3} lg={2} sx={{ textAlign: "start" }}>
                      <Typography
                        sx={{ fontSize: { xs: "12px", lg: "16px" } }}
                        fontWeight={700}
                      >
                        Taux de vente actuel
                      </Typography>
                    </Grid>
                    <Grid item xs={3} lg={2} sx={{ textAlign: "start" }}>
                      <Typography
                        sx={{ fontSize: { xs: "12px", lg: "16px" } }}
                        fontWeight={700}
                      >
                        Taux souhaité
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ textAlign: "start" }}>
                      <Typography
                        sx={{ fontSize: { xs: "12px", lg: "16px" } }}
                        fontWeight={700}
                      >
                        Adresse-mail
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: "start" }}>
                      <Typography
                        sx={{ fontSize: { xs: "12px", lg: "16px" } }}
                        fontWeight={700}
                      ></Typography>
                    </Grid>
                  </Grid>
                  {response && response.data &&
                    response.data.map((el) => (
                      <Fragment key={el._id}>
                        <Grid item xs={12}>
                          <RateAlertComponentBills el={el} />
                        </Grid>
                        <Divider width="100%" sx={{ background: "#000000" }} />
                      </Fragment>
                    ))}
                </Grid>
              </Box>
            </>
          </Box>
        </Layout>
      </LoadingData>
    </>
  );
});
