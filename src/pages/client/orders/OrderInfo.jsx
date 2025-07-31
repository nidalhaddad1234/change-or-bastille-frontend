import { useParams } from "react-router-dom";
import Layout from "../../../layout/client/Layout";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import agent from "../../../agent";
import LoadingData from "../../../sharedComponents/LoadingData";
import {
  getCountryCode,
  translateOrderStatusToFrench,
  translatePaymentStatusToFrench,
} from "../../../helpers";
import dayjs from "dayjs";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function OrderInfo() {
  const store = useContextStore();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => await agent.orders.getOrderById(id);
    fetchData().then((result) => {
      setData(result.data);
    });
    return () => {};
  }, []);
  const [data, setData] = useState();
  return (
    <>
      {store.globalStoreClient.isLoadedBanner && data ? (
        <Layout>
          <h1 className="d-none"> Détails de la commande</h1>

          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 3rem 1rem" },
            }}
          >
            <LoadingData data={data} isObject={true}>
              <>
                <Typography variant="h2" className="titleUnderline">
                  Détails de la commande
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
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "start",

                      cursor: "pointer",
                    }}
                  >
                    {data && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          <Typography fontWeight={700}>
                            Numéro de commande:
                          </Typography>
                          <Typography>{data.orderNumber}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          <Typography fontWeight={700}>
                            Statut de paiement:{" "}
                          </Typography>
                          <Typography>
                            {translatePaymentStatusToFrench(data.paymentStatus)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          <Typography fontWeight={700}>
                            Statut de la commande:{" "}
                          </Typography>
                          <Typography>
                            {translateOrderStatusToFrench(data.status)}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", gap: "10px" }}>
                          <Typography fontWeight={700}>
                            Mode de paiement:{" "}
                          </Typography>
                          <Typography>{data.paymentType}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          <Typography fontWeight={700}>
                            Date de commande:
                          </Typography>
                          <Typography>
                            {dayjs(data.createdAt.$d).format("MM/DD/YYYY")}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                  <Grid
                    container
                    sx={{ marginBottom: { xs: 3, md: 0 }, mt: "3rem" }}
                  >
                    {/* <Typography variant="h5">Items commandés: </Typography> */}

                    {data &&
                      data.Items.map((item) => (
                        <Grid
                          item
                          key={item.id}
                          xs={12}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <Box sx={{ marginRight: "5px" }}>
                              <Box
                                component="img"
                                loading="lazy"
                                sx={{
                                  width: { xs: "6rem", md: "6rem" },
                                  height: "auto",
                                  objectFit: "scale-down",
                                  margin: { xs: "auto", md: "initial" },
                                }}
                                height="30px"
                                width="50px"
                                alt="The house from the offer."
                                src={
                                  item.photo
                                    ? item.photo
                                    : `https://flagsapi.com/${getCountryCode(
                                        item.iso.toUpperCase()
                                      )}/flat/64.png`
                                }
                                srcSet={
                                  item.photo
                                    ? item.photo
                                    : `https://flagsapi.com/${getCountryCode(
                                        item.iso.toUpperCase()
                                      )}/flat/64.png`
                                }
                              />
                            </Box>
                            <Typography
                              sx={{
                                textAlign: "center",
                                margin: "auto",
                                fontSize: { xs: "12px", md: "initial" },
                              }}
                            >
                              {item.exchangeFrom
                                ? item.exchangeFrom
                                : item.currencyName}{" "}
                              {item.exchangeFrom && item.iso}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex" }}>
                            <Typography
                              sx={{
                                margin: "auto",
                                fontSize: { xs: "12px", md: "initial" },
                              }}
                            >
                              {item.quantity &&
                                item.euro / item.quantity +
                                  " * " +
                                  item.quantity +
                                  " = "}{" "}
                              {item.euro} Euro
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              </>
            </LoadingData>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
