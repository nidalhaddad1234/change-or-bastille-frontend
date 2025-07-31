import Layout from "../../../layout/client/Layout";
import { Alert, Box, Divider, Grid, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import agent from "../../../agent";
import LoadingData from "../../../sharedComponents/LoadingData";
import { translateOrderStatusToFrench } from "../../../helpers";
import { useNavigate } from "react-router-dom";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function OrderHistory() {
  useEffect(() => {
    const fetchData = async () => await agent.orders.getOrderByUserId();
    fetchData().then((result) => {
      setData(result.data);
    });
    return () => {};
  }, []);
  const store = useContextStore();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  return (
    <>
      {store.globalStoreClient.isLoadedBanner && data ? (
        <Layout>
          <h1 className="d-none">Historique de mes commandes</h1>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 3rem 1rem" },
            }}
          >
            {data && data.length == 0 ? (
              <Alert
                severity={"warning"}
                sx={{
                  margin: "0 0 2rem 0",
                  display: "flex",
                }}
              >
                Vous n'avez pas encore passé de commande. Parcourez nos produits
                et passez votre première commande dès aujourd'hui!
              </Alert>
            ) : (
              <LoadingData data={data}>
                <>
                  <Typography variant="h2" className="titleUnderline">
                    Historique de mes commandes
                  </Typography>
                  {/* <Typography
            variant="h6"
            sx={{
              fontFamily: "Work Sans,sans-serif",
              margin: "1rem 0",
              fontWeight: "700",
            }}
          >
            Devises
          </Typography>
          <Typography variant="body1">
            Sur notre site, nous mettons à votre disposition la fonctionnalité
            « Alerte Meilleur Taux ». C’est un service gratuit qui vous permet
            de fixer votre propre taux souhaité pour l’achat d’une devise ou
            d’une pièce d’or ou lingotin d’or. Il vous suffit d’entrer le taux
            désiré et nous vous enverrons un mail lorsque le marché atteint ce
            niveau. Cela vous donne le contrôle total et vous aide à Achetez
            au moment le plus avantageux pour vous. Veuillez noter que le taux
            d’alerte reste actif pendant 30 jours, après quoi vous pouvez le
            renouveler ou en fixer un nouveau. Commencez dès maintenant à
            optimiser vos achats avec notre fonctionnalité “Alerte Meilleur
            Taux”.
          </Typography> */}
                  <Box
                    sx={{
                      background: "#fff",
                      padding: "2rem",
                      marginTop: "2rem",
                    }}
                  >
                    <Grid
                      container
                      sx={{ display: "flex", justifyContent: "space-between" }}
                      gap={2}
                    >
                      <Grid item container xs={12} display="flex">
                        <Grid item xs={3} sx={{ textAlign: "start" }}>
                          <Typography
                            fontWeight={700}
                            sx={{ fontSize: { xs: "10px", lg: "16px" } }}
                          >
                            Référence
                          </Typography>
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: "start" }}>
                          <Typography
                            sx={{ fontSize: { xs: "10px", lg: "16px" } }}
                            fontWeight={700}
                          >
                            statut de la commande
                          </Typography>
                        </Grid>
                        {/* <Grid item xs={3} sx={{ textAlign: "start" }}>
                  <Typography
                    sx={{ fontSize: { xs: "10px", lg: "16px" } }}
                    fontWeight={700}
                  >
                    statut de paiement
                  </Typography>
                </Grid> */}
                        <Grid item xs={3} sx={{ textAlign: "start" }}>
                          <Typography
                            sx={{ fontSize: { xs: "10px", lg: "16px" } }}
                            fontWeight={700}
                          >
                            Mode de paiement
                          </Typography>
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: "start" }}>
                          <Typography
                            sx={{ fontSize: { xs: "10px", lg: "16px" } }}
                            fontWeight={700}
                          >
                            {" "}
                            Montant
                          </Typography>
                        </Grid>
                      </Grid>
                      {data &&
                        data.map((el) => (
                          <Fragment key={el._id}>
                            <Grid item container xs={12}>
                              <Grid item xs={3} sx={{ textAlign: "start" }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontSize: { xs: "10px", md: "initial" },
                                  }}
                                >
                                  <Link
                                    sx={{ cursor: "pointer" }}
                                    onClick={() =>
                                      navigate(
                                        "/historique-commandes/" + el._id
                                      )
                                    }
                                  >
                                    {el.orderNumber}
                                  </Link>
                                </Typography>
                              </Grid>
                              <Grid item xs={3} sx={{ textAlign: "start" }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontSize: { xs: "10px", md: "initial" },
                                  }}
                                >
                                  {translateOrderStatusToFrench(el.status)}
                                </Typography>
                              </Grid>
                              {/* <Grid item xs={3} sx={{ textAlign: "start" }}>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: { xs: "10px", md: "initial" } }}
                        >
                          {translatePaymentStatusToFrench(el.paymentStatus)}
                        </Typography>
                      </Grid> */}
                              <Grid item xs={3} sx={{ textAlign: "start" }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontSize: { xs: "10px", md: "initial" },
                                  }}
                                >
                                  {el.paymentType}
                                </Typography>
                              </Grid>
                              <Grid item xs={3} sx={{ textAlign: "start" }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontSize: { xs: "10px", md: "initial" },
                                  }}
                                >
                                  {el.amount} Euro
                                </Typography>
                              </Grid>
                            </Grid>
                            <Divider
                              width="100%"
                              sx={{ background: "#000000" }}
                            />
                          </Fragment>
                        ))}
                    </Grid>
                  </Box>
                </>
              </LoadingData>
            )}
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
