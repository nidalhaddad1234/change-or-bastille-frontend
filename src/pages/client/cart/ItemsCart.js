import Layout from "../../../layout/client/Layout";
import React, { Fragment } from "react";
import { Typography, Box, FormControl, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function ItemsCart() {
  const navigate = useNavigate();
  const store = useContextStore();
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
              className="titleUnderline"
              sx={{ fontWeight: "700" }}
              pb={5}
            >
              PANIER
            </Typography>
            <Fragment>
              <FormControl
                sx={{
                  width: "100%",
                  background: "#FFF",
                  padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
                }}
              >
                <Typography variant="h7" sx={{ fontWeight: "300" }} pb={5}>
                  Votre panier est vide.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item width={{ xs: "100%", md: "50%" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disableElevation
                      onClick={() => navigate("/cours-des-devises")}
                      sx={{
                        backgroundColor: "#EEAC1F",
                        color: "#fff",
                        fontSize: "1rem",
                        width: "100%",
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#EEAC1F", // Optional: Add hover color if desired
                        },
                        "&:active": {
                          backgroundColor: "#EEAC1F", // Keep the same color when the button is clicked
                        },
                      }}
                    >
                      Acheter des devises
                    </Button>
                  </Grid>
                  <Grid item width={{ xs: "100%", md: "50%" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disableElevation
                      onClick={() => navigate("/pieces-or-investissement")}
                      sx={{
                        backgroundColor: "#EEAC1F",
                        color: "#fff",
                        fontSize: "1rem",
                        width: "100%",
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#EEAC1F", // Optional: Add hover color if desired
                        },
                        "&:active": {
                          backgroundColor: "#EEAC1F", // Keep the same color when the button is clicked
                        },
                      }}
                    >
                      Acheter des pièces d’or d’investissement
                    </Button>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                  <Grid item width={{ xs: "100%", md: "50%" }}>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/lingots-lingotins-or")}
                      color="primary"
                      size="large"
                      disableElevation
                      sx={{
                        backgroundColor: "#EEAC1F",
                        color: "#fff",
                        fontSize: "1rem",
                        width: "100%",
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#EEAC1F", // Optional: Add hover color if desired
                        },
                        "&:active": {
                          backgroundColor: "#EEAC1F", // Keep the same color when the button is clicked
                        },
                      }}
                    >
                      Acheter des lingots et lingotins d’or
                    </Button>
                  </Grid>
                  <Grid item width={{ xs: "100%", md: "50%" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disableElevation
                      onClick={() => navigate("/pieces-or-collection")}
                      sx={{
                        backgroundColor: "#EEAC1F",
                        color: "#fff",
                        fontSize: "1rem",
                        width: "100%",
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#EEAC1F", // Optional: Add hover color if desired
                        },
                        "&:active": {
                          backgroundColor: "#EEAC1F", // Keep the same color when the button is clicked
                        },
                      }}
                    >
                      Acheter des pièces d’or de collection
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Fragment>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
