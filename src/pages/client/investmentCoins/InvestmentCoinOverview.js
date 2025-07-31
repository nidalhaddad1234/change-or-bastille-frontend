import Layout from "../../../layout/client/Layout";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import IncrementDecrement from "../../../sharedComponents/IncrementDecrement";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddCoinToCart from "../../../sharedComponents/AddCoinToCart";
import { Helmet } from "react-helmet-async";
import { observer } from "mobx-react";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { styled } from "@mui/material/styles";
import { getPriceValidUntil } from "../../../helpers";
export default observer(function InvestmentCoinOverview() {
  const { id } = useParams();

  const StyledImg = styled("img")({});
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const store = useContextStore();

  useEffect(() => {
    const fetchData = async () =>
      await store.metalsStoreClient.getbyIdInvestment(id);
    fetchData()
      .then((result) => {
        setData(result);
      })
      .catch((error) => {});
    return () => {};
  }, [id]);
  const [data, setData] = useState();
  const title =
    data && data.title
      ? data.title
      : data
      ? `Achat ${data.metalName} Or en Ligne`
      : "";
  const description =
    data && data.description
      ? data.description
      : data
      ? `Achat pièce d’or ${data.metalName} en ligne au meilleur Prix. Investissement sûr. Paiement sécurisé et livraison assurée.`
      : "";

  return (
    <>
      {data ? (
        <Layout>
          <h1 className="d-none">PIÈCES D’OR D’INVESTISSMENT</h1>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            <Typography variant="h2" className="titleUnderline">
              PIÈCES D’OR D’INVESTISSMENT
            </Typography>
            <Helmet>
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Product",
                  name: `${data.metalName}`,
                  image: `${data.photo}`,
                  description: description,
                  brand: {
                    "@type": "Brand",
                    name: "Change et Or Bastille",
                  },
                  offers: {
                    "@type": "Offer",
                    name: `${data.metalName}`,
                    url: `${window.location.href}`,
                    price: `${data.netSellPrice}`,
                    priceValidUntil: getPriceValidUntil(),
                    priceCurrency: "EUR",
                    availability: "https://schema.org/InStock",
                    seller: {
                      "@type": "Organization",
                      name: "Change et Or Bastille",
                    },
                  },
                })}
              </script>
              <title>{title}</title>
              <meta name="description" content={description} />
              <link
                rel="canonical"
                href={`https://www.change-or-enligne.com/pieces-or-investissement/${data.metalName.replaceAll(
                  " ",
                  "-",
                )}/${data._id}`}
              />
            </Helmet>
            <Box
              sx={{ background: "#fff", padding: "1rem", marginBottom: "3rem" }}
            >
              <Typography variant="body2" sx={{ fontWeight: "700" }}>
                {data.metalName}
              </Typography>
              <Grid container>
                <Grid item xs={12} lg={4} xl={3} sx={{ display: "flex" }}>
                  <StyledImg
                    sx={{
                      width: "auto",
                      height: "150px",
                      padding: "1rem 0",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                    height="100px"
                    width="200px"
                    loading="lazy"
                    alt={data.metalName}
                    src={data.photo}
                  />
                </Grid>
                <Grid item xs={12} lg={8} container sx={{ display: "flex" }}>
                  <Grid
                    item
                    xs={6}
                    lg={4}
                    sx={{ margin: "auto 0", padding: "0 .2rem " }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "11px", md: "initial" } }}
                    >
                      Poids : {data.weight}g
                    </Typography>
                    <Divider width="100%" sx={{ background: "#ffd06c" }} />
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "11px", md: "initial" } }}
                    >
                      Diamètre : {data.diameter}mm
                    </Typography>
                    <Divider width="100%" sx={{ background: "#ffd06c" }} />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    lg={4}
                    sx={{ margin: "auto 0", padding: "0 .2rem " }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "11px", md: "initial" } }}
                    >
                      Pureté/titre : {data.purity}%
                    </Typography>
                    <Divider width="100%" sx={{ background: "#ffd06c" }} />
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "11px", md: "initial" } }}
                    >
                      Pays d’émission :{" "}
                      {data.countryIssuing.indexOf(",") > -1
                        ? data.countryIssuing.substring(
                            0,
                            data.countryIssuing.indexOf(","),
                          )
                        : data.countryIssuing}
                    </Typography>
                    <Divider width="100%" sx={{ background: "#ffd06c" }} />
                  </Grid>
                  <Grid container item xs={12} lg={4} sx={{ margin: "auto 0" }}>
                    <Grid item xs={6} lg={12} sx={{ padding: "0 .2rem " }}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "11px", md: "initial" } }}
                      >
                        Début de frappe : {data.mintingStart}
                      </Typography>
                      <Divider width="100%" sx={{ background: "#ffd06c" }} />
                    </Grid>
                    <Grid item xs={6} lg={12} sx={{ padding: "0 .2rem " }}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "11px", md: "initial" } }}
                      >
                        Fin de Frappe : {data.mintingEnd}
                      </Typography>
                      <Divider width="100%" sx={{ background: "#ffd06c" }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box
                sx={{
                  background: "#EEEEEE",
                  padding: "1rem 0",
                  marginTop: { xs: "2rem", lg: "initial" },
                }}
              >
                <Grid
                  container
                  display={"flex"}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Grid
                    item
                    xs={12}
                    lg={6}
                    display={"flex"}
                    sx={{ justifyContent: "space-between", padding: "0 1rem" }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "700", margin: "auto 0" }}
                    >
                      Nous vendons Prix unitaire net {data.netSellPrice}€
                    </Typography>
                    <Box sx={{ margin: "auto" }}>
                      <IncrementDecrement count={count} setCount={setCount} />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={6}
                    display={"flex"}
                    sx={{
                      justifyContent: "space-between",
                      padding: "0 1rem",
                      margin: { xs: "1rem 0" },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "700", margin: "auto" }}
                    >
                      Total : {data.netSellPrice * count}€
                    </Typography>
                    <AddCoinToCart
                      id={data._id}
                      totalPrice={data.netSellPrice * count}
                      quantity={count}
                      name={data.metalName}
                      photo={data.photo}
                    />
                  </Grid>
                </Grid>
                <Box m={3}>
                  <Divider sx={{ width: "100%", background: "#ffd06c" }} />
                </Box>
                <Box
                  display={"flex"}
                  sx={{ justifyContent: "space-between", margin: "0 1rem" }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "700", margin: "auto 0" }}
                  >
                    Nous achetons Prix unitaire brut {data.grossBuyPrice}€
                  </Typography>
                  <Button
                    color="gold"
                    variant="contained"
                    onClick={() => navigate("/nous-contacter")}
                  >
                    PRENDRE RDV
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  margin: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <div className="font-lighter">{data.textInfo}</div>
              </Box>
            </Box>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}{" "}
      ;
    </>
  );
});
