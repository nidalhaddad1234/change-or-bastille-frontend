import Layout from "../../../layout/client/Layout";
import React, { useContext, useEffect } from "react";
import { Typography, Box, FormControl, Button, Grid } from "@mui/material";
import { useState } from "react";
import CartContext from "../../../sharedComponents/CartContext";
import { getCountryCode } from "../../../helpers";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../../../auth/AuthenticationContext";
import { isAdmin } from "../../../auth/handleJWT";
import DeliveryCharge from "./DeliveryCharge";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
import AlertModal from "../../../sharedComponents/AlertModal";
export default observer(function FinishCart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { claims } = useContext(AuthenticationContext);

  const [price, setPrice] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let result = 0;
    cartItems.forEach((item) => {
      result += Number(item.euro);
    });
    setPrice(result);
  }, [delivery]);
  const store = useContextStore();
  const valider = () => {
    debugger;
    var isAdminResult = isAdmin(claims);
    if (price < 300) {
      setOpen(true);
    } else if (claims.length === 0 || isAdminResult) navigate("/connexion");
    else navigate("/valider-commande");
  };
  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <h1 className="d-none">PANIER</h1>
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
              PANIER
            </Typography>
            {cartItems.length > 0 && (
              <FormControl
                sx={{
                  width: "100%",
                  background: "#FFF",
                  padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
                }}
              >
                <Grid container sx={{ marginBottom: { xs: 3, md: 0 } }}>
                  {cartItems.map((item) => (
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
                <Grid container mt={2} pb={5}>
                  <Grid item xs={12}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      {delivery != null &&
                      (price + delivery).toFixed(2) <= 8000 ? (
                        <>
                          <Typography
                            variant="body1"
                            align="left"
                            sx={{ fontSize: { xs: "12px", md: "initial" } }}
                          >
                            Frais de port
                          </Typography>
                          <Typography
                            variant="body1"
                            align="right"
                            sx={{ fontSize: { xs: "12px", md: "initial" } }}
                          >
                            <DeliveryCharge
                              setDelivery={setDelivery}
                              amount={price}
                              delivery={delivery}
                            />
                          </Typography>
                        </>
                      ) : (
                        <Typography
                          variant="body1"
                          align="left"
                          sx={{ fontSize: { xs: "12px", md: "initial" } }}
                        >
                          Retrait au guichet
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="body1"
                        align="left"
                        sx={{ fontSize: { xs: "12px", md: "initial" } }}
                      >
                        total
                      </Typography>
                      <Typography
                        variant="body1"
                        align="right"
                        sx={{ fontSize: { xs: "12px", md: "initial" } }}
                      >
                        {(price + delivery).toFixed(2)} Euro
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disableElevation
                    onClick={valider}
                    sx={{
                      backgroundColor: "#EEAC1F",
                      color: "#fff",
                      margin: { xs: "0 auto", md: "auto" },
                      fontSize: { xs: "10px", md: "initial" },
                      width: { xs: "15rem", md: "20rem" },
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#EEAC1F", // Optional: Add hover color if desired
                      },
                      "&:active": {
                        backgroundColor: "#EEAC1F", // Keep the same color when the button is clicked
                      },
                    }}
                  >
                    Valider ma commande
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setCartItems([]);
                      navigate("/panier-vide");
                    }}
                    size="large"
                    disableElevation
                    sx={{
                      margin: { xs: "0 auto", md: "auto" },
                      backgroundColor: "#EEEEEE",
                      color: "#000",
                      marginBottom: "1.5rem",
                      fontSize: { xs: "10px", md: "initial" },
                      width: { xs: "15rem", md: "20rem" },
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#EEEEEE", // Optional: Add hover color if desired
                      },
                      "&:active": {
                        backgroundColor: "#EEEEEE", // Keep the same color when the button is clicked
                      },
                    }}
                  >
                    VIDER LE PANIER
                  </Button>
                </Box>
              </FormControl>
            )}
          </Box>
          <AlertModal
            open={open}
            navigateToHome
            setOpen={setOpen}
            justText={true}
            text="Veuillez noter que le montant minimum pour toute commande est de 300€. Merci d'ajuster votre commande pour respecter ce minimum."
          />
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
