import Layout from "../../../layout/client/Layout";
import Box from "@mui/material/Box";
import * as React from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Helmet } from "react-helmet-async";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { observer } from "mobx-react";
import { useContextStore } from "../../../stores/RootStoreContext";

import { styled } from "@mui/material/styles";
import { getFileName, getPriceValidUntil } from "../../../helpers";
export default observer(function CollectionCoinsOverview() {
  const store = useContextStore();
  useEffect(() => {
    const fetchData = async () =>
      await store.metalsStoreClient.loadCollections();
    fetchData().then((result) => {
      setResponse(result);
    });
    return () => {};
  }, []);

  const StyledImg = styled("img")({});
  const [response, setResponse] = useState([]);
  const date = new Date();
  const formattedDate = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const title = response.seo
    ? response.seo.title
    : `Achat en Ligne Pieces Or de Collection`;
  const description = response.seo
    ? response.seo.description
    : `Parcourez notre collection exclusive de pièces d'or rares et historiques. Un trésor
         d'opportunités pour les collectionneurs et investisseurs.`;
  const navigate = useNavigate();

  return (
    <>
      {response && response.data && response.data.length > 0 ? (
        <>
          <Helmet>
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                itemListElement: response.data.map((product, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Product",
                    name: `${product.metalName}`,
                    image: `${product.photo}`,
                    description: product.description,
                    brand: {
                      "@type": "Brand",
                      name: "Change et Or Bastille",
                    },
                    offers: {
                      "@type": "Offer",
                      name: `${product.metalName}`,
                      url: `https://change-or-enligne.com/pieces-or-collection/${product.metalName.replaceAll(
                        " ",
                        "-",
                      )}/${product._id}`,
                      price: `${product.netSellPrice}`,
                      priceValidUntil: getPriceValidUntil(),
                      priceCurrency: "EUR",
                      availability: "https://schema.org/InStock",
                      seller: {
                        "@type": "Organization",
                        name: "Change et Or Bastille",
                      },
                    },
                  },
                })),
              })}
            </script>
            <title>{title}</title>
            <link
              rel="canonical"
              href="https://www.change-or-enligne.com/pieces-or-collection"
            />
            <meta name="description" content={description} />
          </Helmet>
          <Layout>
            <h1 className="d-none">Achat en Ligne Pieces Or de Collection</h1>
            <Box
              sx={{
                padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
              }}
            >
              <Typography
                variant="h2"
                className="titleUnderline"
                sx={{ textTransform: "uppercase" }}
              >
                Achetez des Pièces d’or de collection
                {/* PIÈCES DE COLLECTION */}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", fontStyle: "italic" }}
                mt={5}
                mb={5}
              >
                Le {formattedDate}
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
                maxHeight: "40px",
                marginRight: "1rem",
                marginBottom: { xs: "1rem", lg: "0" },
              }}
              placeholder="ADRESSE E-MAIL"
            ></TextField>
            <Button variant="contained" sx={{ maxHeight: "38px" }} color="gold">
              JE M’INSCRIS
            </Button>
          </Grid>
        </Grid> */}

              <Box sx={{ width: "100%", display: "flex", gap: "30px" }}>
                <Button variant="contained" color={"gold"}>
                  NOUS VENDONS
                </Button>
              </Box>
              <Grid
                container
                sx={{
                  background: "white",
                  padding: { xs: "0", md: "1rem 3rem" },
                  margin: " 2rem 0",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontStyle: "italic", margin: "0 0 1rem 0 " }}
                >
                  Les prix de ventes affichés sont nets, sans aucune commission
                  à ajouter.
                </Typography>
                {response.data.map((el) => (
                  <React.Fragment key={el._id}>
                    <Grid container>
                      <Grid item xs={12} md={2} lg={3} xl={1.6}>
                        <StyledImg
                          sx={{
                            width: { xs: "100%", md: "70px", lg: "150px" },
                            height: { xs: "7rem", md: "80px", lg: "100px" },
                            objectFit: "contain",
                            padding: { xs: "0", md: "0 1rem" },
                            margin: { xs: "1rem auto", sm: "initial" },
                          }}
                          height="100px"
                          width="200px"
                          loading="lazy"
                          alt={`Achat ${el.metalName} or`}
                          src={getFileName(el.photo)}
                        />
                      </Grid>
                      <Grid item xs={4} md={2} xl={3} sx={{ display: "flex" }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "Column",
                            margin: "auto 0",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: {
                                xs: "10px",
                                md: "12px",
                                lg: "initial",
                              },
                            }}
                          >
                            {el.metalName}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: {
                                xs: "10px",
                                md: "12px",
                                lg: "initial",
                              },
                              display: { xs: "none", md: "block" },
                            }}
                          >
                            {el.countryIssuing} – {el.weight} g – {el.diameter}{" "}
                            mm
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={3} sx={{ display: "flex" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            margin: "auto",
                            fontWeight: "700",
                            fontSize: { xs: "10px", md: "12px", lg: "initial" },
                          }}
                        >
                          {"NOUS VENDONS"}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} sx={{ display: "flex" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            margin: "auto",
                            fontWeight: "700",
                            fontSize: { xs: "10px", md: "12px", lg: "initial" },
                          }}
                        >
                          {el.netSellPrice} €
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        md={2}
                        sx={{ display: "flex", justifyContent: "end" }}
                      >
                        <Button
                          variant="contained"
                          color="gold"
                          onClick={() =>
                            navigate(
                              `/pieces-or-collection/${el.metalName.replaceAll(
                                " ",
                                "-",
                              )}/${el._id}`,
                            )
                          }
                          sx={{
                            maxHeight: "3rem",
                            margin: "auto",
                            display: { xs: "none", md: "block" },
                            fontSize: "1rem",
                            fontFamily: "Work Sans, sans-serif",
                          }}
                        >
                          DÉTAILS
                        </Button>
                        <Button
                          variant="contained"
                          color="gold"
                          onClick={() =>
                            navigate(
                              `/pieces-or-collection/${el.metalName.replaceAll(
                                " ",
                                "-",
                              )}/${el._id}`,
                            )
                          }
                          sx={{
                            maxHeight: "30px",
                            margin: "auto",
                            minWidth: "1rem",
                            display: { xs: "flex", md: "none" },
                            fontSize: "1rem",
                            fontFamily: "Work Sans, sans-serif",
                          }}
                        >
                          <ReadMoreIcon />
                        </Button>
                      </Grid>
                    </Grid>
                    <Divider
                      sx={{
                        width: "100%",
                        borderColor: "#000",
                        height: "10px",
                      }}
                    />
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </Layout>
        </>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
