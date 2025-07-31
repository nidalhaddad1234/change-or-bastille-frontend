import Layout from "../../../layout/client/Layout";
import { Box, Divider, Grid, Typography } from "@mui/material";
import LoadingData from "../../../sharedComponents/LoadingData";
import { Fragment } from "react";
import React, { useEffect, useState } from "react";
import AlertModal from "../../../sharedComponents/AlertModal";
import RateAlertComponent from "./RateAlertComponent";
import { Helmet } from "react-helmet-async";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react";
export default observer(function RateAlertInvestmentCoin() {
  const store = useContextStore();
  useEffect(() => {
    const fetchData = async () => await store.metalStore.loadmetals(true);
    fetchData().then((result) => {
      result = result.filter((x) => x.type !== "Piece De Collection");
      setData(result);
    });
    return () => {};
  }, []);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  return (
    <>
      <Helmet>
        <title>Alerte Meilleur Taux Or</title>
        <link
          rel="canonical"
          href="https://www.change-or-enligne.com/alerte-meilleur-taux-or"
        />
        <meta
          name="description"
          content="Restez informé des fluctuations du marché de l'or. Abonnez-vous à nos alertes pour
          connaître les meilleurs moments pour Achetez ou vendre de l'or."
        />
      </Helmet>

      <LoadingData data={data} fullHeight>
        <Layout>
          <h1 className="d-none">Alerte Meilleur Taux Or</h1>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 3rem 1rem" },
            }}
          >
            <Typography
              variant="h2"
              className="titleUnderline"
              sx={{ textTransform: "uppercase" }}
            >
              Alerte Meilleur Taux Or
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Work Sans,sans-serif",
                margin: "1rem 0",
                fontWeight: "700",
                fontSize: "1.25rem",
              }}
            >
              Or d’investissement
            </Typography>

            <Typography variant="body1">
              Sur notre site, nous mettons à votre disposition la fonctionnalité
              « Alerte Meilleur Taux ».
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
              Cela vous donne le contrôle total et vous aide à Achetez au moment
              le plus avantageux pour vous.
            </Typography>
            <Typography variant="body1">
              Veuillez noter que le taux d’alerte reste actif pendant 30 jours,
              après quoi vous pouvez le renouveler ou en fixer un nouveau.
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
                      Nom
                    </Typography>
                  </Grid>
                  <Grid item xs={3} lg={2} sx={{ textAlign: "start" }}>
                    <Typography
                      sx={{ fontSize: { xs: "12px", lg: "16px" } }}
                      fontWeight={700}
                    >
                      Prix de vente actuel
                    </Typography>
                  </Grid>
                  <Grid item xs={3} lg={2} sx={{ textAlign: "start" }}>
                    <Typography
                      sx={{ fontSize: { xs: "12px", lg: "16px" } }}
                      fontWeight={700}
                    >
                      Prix souhaité
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
                {data &&
                  data.map((el) => (
                    <Fragment key={el._id}>
                      <Grid item xs={12}>
                        <RateAlertComponent el={el} />
                      </Grid>
                      <Divider width="100%" sx={{ background: "#000000" }} />
                    </Fragment>
                  ))}
              </Grid>
            </Box>
            <AlertModal open={open} setOpen={setOpen} />
          </Box>
        </Layout>
      </LoadingData>
    </>
  );
});
