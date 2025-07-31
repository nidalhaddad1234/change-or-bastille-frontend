import Layout from "../../../layout/client/Layout";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../../agent";
import { useParams } from "react-router-dom";
import AddCoinToCart from "../../../sharedComponents/AddCoinToCart";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";
import { useContextStore } from "../../../stores/RootStoreContext";

import { styled } from "@mui/material/styles";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { getPriceValidUntil } from "../../../helpers";
export default observer(function CollectionCoinOverview() {
  const store = useContextStore();
  const { id } = useParams();

  const StyledImg = styled("img")({});
  useEffect(() => {
    const fetchData = async () =>
      await store.metalsStoreClient.getbyIdCollections(id);
    fetchData()
      .then((result) => {
        setData(result);
      })
      .catch((error) => {});
    return () => {};
  }, [id]);
  const [count, setCount] = useState(1);
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
      ? `Achetez la pièce d'or ${data.metalName}, un joyau de collection rare. Authentique et historique. Paiement sécurisé, livraison soignée.`
      : "";

  return (
    <>
      {data ? (
        <>
          <Layout>
            <h1 className="d-none">PIÈCES DE COLLECTION</h1>
            <Box
              sx={{
                padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
              }}
            >
              <Typography variant="h2" className="titleUnderline">
                PIÈCES DE COLLECTION
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
                  href={`https://www.change-or-enligne.com/pieces-or-collection/${data.metalName.replaceAll(
                    " ",
                    "-",
                  )}/${data._id}`}
                />
              </Helmet>
              <Box
                sx={{
                  background: "#fff",
                  padding: "1rem",
                  marginBottom: "3rem",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "700" }}>
                  {data.metalName}
                </Typography>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    lg={4}
                    xl={3}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
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
                    <Grid
                      item
                      xs={6}
                      lg={4}
                      sx={{ margin: "auto 0", padding: "0 .2rem" }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "11px", md: "initial" } }}
                      >
                        date de frappe : {data.mintingEnd}
                      </Typography>
                      <Divider width="100%" sx={{ background: "#ffd06c" }} />
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "11px", md: "initial" },
                          height: "25px",
                        }}
                      >
                        {""}
                      </Typography>
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
                      sx={{
                        justifyContent: "space-between",
                        padding: "0 1rem",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "700", margin: "auto 0" }}
                      >
                        Nous vendons net
                      </Typography>
                      <Box sx={{ margin: "auto" }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "700", margin: "auto 0" }}
                        >
                          {data.netSellPrice}€
                        </Typography>
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
                        Total : {data.netSellPrice}€
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
        </>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
