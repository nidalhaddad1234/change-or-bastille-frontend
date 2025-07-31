import { Box, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout/client/Layout";
import { lazy } from "react";
import LoadingMain from "../../sharedComponents/utilities/LoadingMain";
import { Helmet } from "react-helmet-async";
import { observer } from "mobx-react";
import { styled } from "@mui/material/styles";
import { useContextStore } from "../../stores/RootStoreContext";
import { getPriceValidUntil } from "../../helpers";
const EncouragmentRachatBijoux = lazy(() =>
  import("../../sharedComponents/EncouragmentRachatBijoux"),
);
export default observer(function Bijoux() {
  const StyledImg = styled("img")({});

  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);
  const [response, setResponse] = useState();
  const store = useContextStore();
  useEffect(() => {
    const fetchConfiguration = async () =>
      await store.globalStoreClient.loadTopBanner();
    fetchConfiguration().then((result) => {
      setResponse(result);
    });
    return () => {};
  }, []);
  const title =
    response && response.seo
      ? response.seo.title
      : `Rachat Bijoux en Or et Ancien Or`;
  const description =
    response && response.seo
      ? response.seo.description
      : `Vendez vos anciens bijoux en or avec Change et Or Bastille. Bénéficiez d'offres compétitives et d'un service transparent et sécurisé`;
  return (
    <>
      {response && response.data ? (
        <>
          <Layout>
            <Helmet>
              <title>{title}</title>
              <link
                rel="canonical"
                href="https://www.change-or-enligne.com/rachat-bijoux-or"
              />
              <meta name="description" content={description} />
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "http://schema.org",
                  "@type": "ItemList",
                  name: title,
                  description: description,
                  itemListElement: [
                    {
                      "@type": "Product",
                      name: "22 Carats Bijoux",
                      material: "Gold",
                      caratPercentage: 917,
                      image:
                        "https://www.change-or-enligne.com/rachat-bijoux-en-or.webp",
                      offers: {
                        "@type": "Offer",
                        price: response.data.carrates22,
                        priceValidUntil: getPriceValidUntil(),
                        priceCurrency: "EUR",
                        availability: "http://schema.org/InStock",
                      },
                    },
                    {
                      "@type": "Product",
                      name: "18 Carats Bijoux",
                      material: "Gold",
                      caratPercentage: 750,
                      image:
                        "https://www.change-or-enligne.com/rachat-bijoux-en-or.webp",
                      offers: {
                        "@type": "Offer",
                        price: response.data.carrates18,
                        priceValidUntil: getPriceValidUntil(),
                        priceCurrency: "EUR",
                        availability: "http://schema.org/InStock",
                      },
                    },
                    {
                      "@type": "Product",
                      name: "14 Carats Bijoux",
                      material: "Gold",
                      caratPercentage: 585,
                      image:
                        "https://www.change-or-enligne.com/rachat-bijoux-en-or.webp",
                      offers: {
                        "@type": "Offer",
                        price: response.data.carrates14,
                        priceValidUntil: getPriceValidUntil(),
                        priceCurrency: "EUR",
                        availability: "http://schema.org/InStock",
                      },
                    },
                  ],
                })}
              </script>
            </Helmet>

            <h1 className="d-none">Rachat Bijoux en Or et Ancien Or</h1>

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
                Rachat bijoux en or
              </Typography>
              <Box sx={{ background: "#fff" }}>
                <Grid container sx={{ height: "4rem", display: "flex" }}>
                  <Grid
                    item
                    xs={3}
                    sx={{ margin: "auto", padding: "0 0 0 1rem" }}
                  >
                    <Typography
                      sx={{ fontSize: { xs: "11px", lg: "initial" } }}
                    >
                      Nom
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ margin: "auto" }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", lg: "initial" },
                        textAlign: "center",
                      }}
                    >
                      Prix par gramme
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ margin: "auto" }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", lg: "initial" },
                        textAlign: "center",
                      }}
                    >
                      Poids en gramme
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ margin: "auto" }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", lg: "initial" },
                        textAlign: "center",
                      }}
                    >
                      Montant estimé
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{
                    background: "#F8F8F8",
                    height: "4rem",
                    display: "flex",
                  }}
                >
                  <Grid
                    item
                    xs={3}
                    sx={{ margin: "auto", padding: "0 0 0 1rem" }}
                  >
                    <Typography
                      sx={{ fontSize: { xs: "11px", lg: "initial" } }}
                    >
                      22 Carats Bijoux gramme or 917%
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ margin: "auto" }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", lg: "initial" },
                        textAlign: "center",
                      }}
                    >
                      {response.data.carrates22}€ / Gramme
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ margin: "auto", display: "flex" }}>
                    <TextField
                      size="small"
                      sx={{ width: "100px", margin: "auto" }}
                      type="number"
                      value={first}
                      onChange={(e) => setFirst(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3} sx={{ margin: "auto" }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", lg: "initial" },
                        textAlign: "center",
                      }}
                    >
                      {first * response.data.carrates22} €
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ height: "4rem", display: "flex" }}>
                  <Grid
                    item
                    xs={3}
                    sx={{ margin: "auto", padding: "0 0 0 1rem" }}
                  >
                    <Typography
                      sx={{ fontSize: { xs: "11px", lg: "initial" } }}
                    >
                      18 Carats Bijoux gramme or 750%
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ margin: "auto" }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", lg: "initial" },
                        textAlign: "center",
                      }}
                    >
                      {response.data.carrates18}€ / Gramme{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ margin: "auto", display: "flex" }}>
                    <TextField
                      size="small"
                      sx={{ width: "100px", margin: "auto" }}
                      type="number"
                      value={second}
                      onChange={(e) => setSecond(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3} sx={{ margin: "auto" }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", lg: "initial" },
                        textAlign: "center",
                      }}
                    >
                      {second * response.data.carrates18} €
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{
                    background: "#F8F8F8",
                    height: "4rem",
                    display: "flex",
                  }}
                >
                  <Grid
                    item
                    xs={3}
                    sx={{ margin: "auto", padding: "0 0 0 1rem" }}
                  >
                    <Typography
                      sx={{ fontSize: { xs: "11px", lg: "initial" } }}
                    >
                      14 Carats Bijoux gramme or 585%
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ margin: "auto" }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", lg: "initial" },
                        textAlign: "center",
                      }}
                    >
                      {response.data.carrates14}€ / Gramme
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ margin: "auto", display: "flex" }}>
                    <TextField
                      size="small"
                      sx={{ width: "100px", margin: "auto" }}
                      type="number"
                      value={third}
                      onChange={(e) => setThird(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3} sx={{ margin: "auto" }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", lg: "initial" },
                        textAlign: "center",
                      }}
                    >
                      {third * response.data.carrates14} €
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ height: "4rem", display: "flex" }}>
                  <Grid
                    item
                    xs={9}
                    sx={{
                      margin: "auto",
                      textAlign: "end",
                      padding: "0rem 2rem",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: { xs: "11px", lg: "initial" } }}
                    >
                      Estimation de votre Revente
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ margin: "auto" }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", lg: "initial" },
                        textAlign: "center",
                      }}
                    >
                      {first * response.data.carrates22 +
                        second * response.data.carrates18 +
                        third * response.data.carrates14}{" "}
                      €
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box
                sx={{
                  margin: "2rem 0rem 0 0rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <EncouragmentRachatBijoux />
                <StyledImg
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    height: "300px",
                  }}
                  height="300px"
                  width={"100px"}
                  loading="lazy"
                  alt="rachat bijoux en or"
                  src="/rachat-bijoux-en-or.webp"
                />
                <Box
                  sx={{
                    margin: "2rem 0rem 0 0rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "700", fontSize: "16px" }}
                  >
                    Transformez Vos Trésors Oubliés en Argent
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "700", fontSize: "16px" }}
                  >
                    Vous avez des bijoux en or que vous ne portez plus?
                  </Typography>

                  <div style={{ fontWeight: "400" }}>
                    Que ce soient d'anciens bijoux, des pièces vieillies,
                    cassées, de l'or dentaire ou même des montres en or, nous
                    sommes là pour transformer ces trésors oubliés en argent
                    liquide.
                    <br /> Chez Change et Or Bastille, nous comprenons la valeur
                    sentimentale et matérielle de vos bijoux en or, et nous nous
                    engageons à vous offrir le meilleur prix du marché.
                  </div>

                  <div style={{ fontWeight: "400" }}>
                    Profitez de notre expertise et de nos prix compétitifs pour
                    tirer le meilleur parti de vos biens précieux.
                  </div>

                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "700", fontSize: "16px" }}
                  >
                    Comment Ça Marche?
                  </Typography>

                  <div style={{ fontWeight: "400" }}>
                    La procédure est simple, transparente et conçue pour votre
                    commodité:
                  </div>

                  <div
                    style={{
                      fontWeight: "400",
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    <div>
                      <strong>Évaluation en Ligne:</strong> Utilisez notre
                      calculatrice en ligne pour estimer approximativement la
                      valeur de vos bijoux. Cette première étape vous donne une
                      idée de ce que vous pouvez attendre de la vente.
                    </div>
                    <div>
                      <strong>Prenez un Rendez-Vous:</strong> Contactez-nous par
                      téléphone ou e-mail pour fixer un rendez-vous. Nous sommes
                      flexibles et prêts à nous adapter à votre emploi du temps.
                    </div>
                    <div>
                      <strong>Expertise Professionnelle:</strong> Notre équipe
                      d’experts évalue vos bijoux en or en fonction de leur
                      poids, de leur pureté et des cours actuels de l’or, vous
                      assurant une offre équitable et transparente.
                    </div>
                    <div>
                      <strong>Paiement Immédiat:</strong> Une fois que nous
                      avons évalué et accepté vos bijoux en or, nous procédons
                      au paiement rapidement et efficacement, vous permettant de
                      profiter de votre argent sans attendre. (Chèque ou
                      virement bancaire).
                    </div>
                  </div>

                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "700", fontSize: "16px" }}
                  >
                    Pourquoi Nous Choisir?
                  </Typography>

                  <div
                    style={{
                      fontWeight: "400",
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    <div>
                      <strong>Expertise et Confiance:</strong> Avec des années
                      d'expérience dans le rachat d'or, nous garantissons une
                      évaluation juste et professionnelle de vos bijoux.
                    </div>
                    <div>
                      <strong>Transparence:</strong> Aucun frais caché. Nous
                      vous expliquons chaque étape du processus.
                    </div>
                    <div>
                      <strong>Paiement Sécurisé et Rapide:</strong> Nous
                      comprenons l'importance de la sécurité et de la rapidité
                      dans les transactions financières.
                    </div>
                    <div>
                      <strong>Service Personnalisé:</strong> Chaque client est
                      unique, et nous nous engageons à offrir une expérience
                      personnalisée et satisfaisante.
                    </div>
                  </div>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "700", fontSize: "16px" }}
                  >
                    Prêt à Vendre Vos Bijoux en Or?
                  </Typography>

                  <div style={{ fontWeight: "400" }}>
                    Pour prendre rendez-vous pour le rachat de vos bijoux en or,
                    veuillez nous contacter par mail à{" "}
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
                      09 56 04 14 25.
                    </span>
                    <br />
                    Notre équipe se fera un plaisir de vous accompagner tout au
                    long du processus et de répondre à toutes vos questions.
                    <br /> Ne laissez pas vos anciens bijoux en or dormir dans
                    un tiroir - contactez Change et Or Bastille dès aujourd’hui
                    et transformez-les en argent liquide.
                  </div>
                </Box>
              </Box>
            </Box>
          </Layout>
        </>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
