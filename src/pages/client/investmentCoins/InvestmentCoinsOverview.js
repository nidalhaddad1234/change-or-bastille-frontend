import Layout from "../../../layout/client/Layout";
import Box from "@mui/material/Box";
import * as React from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";
import { useContextStore } from "../../../stores/RootStoreContext";

import { styled } from "@mui/material/styles";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { getFileName, getPriceValidUntil } from "../../../helpers";
export default observer(function InvestmentCoinsOverview() {
  const store = useContextStore();

  const StyledImg = styled("img")({});
  useEffect(() => {
    const fetchData = async () =>
      await store.metalsStoreClient.loadInvestments();
    fetchData().then((result) => {
      setResponse(result);
    });
    return () => {};
  }, []);
  const [response, setResponse] = useState([]);
  const [value, setValue] = React.useState(0);
  const date = new Date();
  const formattedDate = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const title = response.seo
    ? response.seo.title
    : `Achat en Ligne Pieces Or Investissement`;
  const description = response.seo
    ? response.seo.description
    : `Achetez des pièces d'or d'investissement au meilleur tarif du marché. Sécurisez votre avenir
       financier avec nos options de qualité.`;

  return (
    <>
      {response && response.data && response.data.length > 0 ? (
        <>
          <Helmet>
            <title>{title}</title>
            <link
              rel="canonical"
              href="https://www.change-or-enligne.com/pieces-or-investissement"
            />
            <meta name="description" content={description} />
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
                      url: `https://change-or-enligne.com/pieces-or-investissement/${product.metalName.replaceAll(
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
          </Helmet>
          <Layout>
            <h1 className="d-none">Achat en Ligne Pieces Or Investissement</h1>
            <Box
              sx={{
                padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
              }}
            >
              {value === 0 ? (
                <Typography
                  variant="h2"
                  className="titleUnderline"
                  sx={{ textTransform: "uppercase" }}
                >
                  Achetez des Pièces d’or d’investissement
                </Typography>
              ) : (
                <Typography
                  variant="h2"
                  className="titleUnderline"
                  sx={{ textTransform: "uppercase" }}
                >
                  Vendez des Pièces d’or d’investissement
                </Typography>
              )}

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

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: "30px",
                }}
              >
                <Button
                  variant="contained"
                  color={value === 0 ? "gold" : "black"}
                  onClick={(e) => handleChange(e, 0)}
                >
                  NOUS VENDONS
                </Button>
                <Button
                  variant="contained"
                  color={value === 1 ? "gold" : "black"}
                  onClick={(e) => handleChange(e, 1)}
                >
                  NOUS ACHETONS
                </Button>
              </Box>
              <Grid
                container
                sx={{
                  background: "white",
                  padding: { xs: "1rem", md: "1rem 3rem" },
                  margin: " 2rem 0",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontStyle: "italic", margin: "0 0 1rem 0 " }}
                >
                  {value === 0
                    ? "Les prix de ventes affichés sont nets, sans aucune commission à ajouter."
                    : "Veuillez noter que lors de la vente d'or d'investissement, une taxe sur les métaux précieux (TMP) de 11,50% sera déduite de la valeur totale de la transaction."}
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
                          {value === 0 ? "NOUS VENDONS" : "NOUS ACHETONS"}
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
                          {value == 0 ? el.netSellPrice : el.grossBuyPrice} €
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
                              `/pieces-or-investissement/${el.metalName.replaceAll(
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
                              `/pieces-or-investissement/${el.metalName.replaceAll(
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

                {value === 0 ? (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="p"
                      sx={{ margin: "3rem 0 0rem 0 ", fontWeight: "300" }}
                    >
                      Nos tarifs d'achat et de vente sont méticuleusement
                      calculés en fonction du prix de l'or à Londres, des cours
                      à Paris et de notre stock.
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ margin: "1rem 0 0rem 0 ", fontWeight: "300" }}
                    >
                      Pour toute commande de lingots ou lingotins supérieure à 8
                      000 €, nous vous invitons à les retirer directement à
                      notre agence parisienne pour votre sécurité et votre
                      tranquillité.
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ margin: "1rem 0 0rem 0 ", fontWeight: "300" }}
                    >
                      Soyez assuré que les prix de ventes affichés sont nets,
                      sans aucune commission à ajouter.
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ margin: "1rem 0 0rem 0 ", fontWeight: "300" }}
                    >
                      Nous mettons tout en œuvre pour garantir transparence et
                      satisfaction pour tous vos investissements en or.
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="p"
                      sx={{ margin: "3rem 0 0rem 0 ", fontWeight: "300" }}
                    >
                      Prenez rendez-vous pour vendre vos pièces et lingots d'or
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ margin: "1rem 0 0rem 0 ", fontWeight: "300" }}
                    >
                      Découvrez notre service d'achat d'or d'investissement et
                      prenez rendez-vous pour vendre vos pièces et lingots d'or
                      en toute sécurité, avec un paiement rapide et une
                      évaluation professionnelle.
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ margin: "1rem 0 0rem 0 ", fontWeight: "300" }}
                    >
                      Chez Change et Or Bastille, nous sommes spécialisés dans
                      l'achat d'or d'investissement, y compris les pièces d'or
                      et les lingots. Profitez de notre expertise et de nos prix
                      compétitifs pour vendre vos biens précieux en toute
                      sécurité et en toute confidentialité.
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ margin: "1rem 0 0rem 0 ", fontWeight: "300" }}
                    >
                      Pourquoi choisir Change et Or Bastille pour l'achat de
                      votre or d'investissement ?
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ margin: "1rem 0 0rem 0 ", fontWeight: "700" }}
                    >
                      Estimation professionnelle
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ margin: "0 0 0rem 0 ", fontWeight: "300" }}
                    >
                      Notre équipe d'experts évalue vos pièces et lingots d'or
                      en fonction de leur poids, de leur pureté et des cours
                      actuels de l'or, vous assurant une offre équitable et
                      transparente.
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ margin: "1rem 0 0rem 0 ", fontWeight: "700" }}
                    >
                      Sécurité et confidentialité
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ margin: "0 0 0rem 0 ", fontWeight: "300" }}
                    >
                      Nous comprenons l'importance de la sécurité et de la
                      confidentialité lors de la vente de votre or
                      d'investissement. C'est pourquoi nous vous proposons des
                      rendez-vous individuels, garantissant un environnement
                      discret et sûr pour la transaction.
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ margin: "1rem 0 0rem 0 ", fontWeight: "700" }}
                    >
                      Paiement rapide
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ margin: "0 0 0rem 0 ", fontWeight: "300" }}
                    >
                      Une fois que nous avons évalué et accepté votre or
                      d'investissement, nous procédons au paiement rapidement
                      par chèque ou virement bancaire, vous permettant de
                      profiter de votre argent sans attendre.
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ margin: "1rem 0 0rem 0 ", fontWeight: "300" }}
                    >
                      Pour prendre rendez-vous pour la vente de votre or
                      d'investissement, veuillez nous contacter par mail à{" "}
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
                      ou par téléphone au{" "}
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => window.open("tel:0956041425")}
                      >
                        09 56 04 14 25
                      </span>
                      . Notre équipe se fera un plaisir de vous accompagner tout
                      au long du processus et de répondre à toutes vos
                      questions.
                    </Typography>
                  </Box>
                )}
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
