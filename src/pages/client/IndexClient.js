import Layout from "../../layout/client/Layout";
import React, { Fragment, lazy, useEffect, useState } from "react";
import { Typography, Grid, Box, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";
import { useContextStore } from "../../stores/RootStoreContext";
import { styled } from "@mui/material/styles";
import LoadingMain from "../../sharedComponents/utilities/LoadingMain";
import { getFileName } from "../../helpers";

const Product = lazy(() => import("./bills/Product"));
const TradingViewWidget = lazy(() =>
  import("../../sharedComponents/TradingViewWidget"),
);
const BillExchangeCalcFeatured = lazy(() =>
  import("./bills/BillExcahngeCalcFeatured"),
);
const WidgetRating = lazy(() => import("../../sharedComponents/WidgetRating"));
const Encouragment = lazy(() => import("../../sharedComponents/Encouragment"));
const Statement = lazy(() => import("../../sharedComponents/Statement"));
const CustomCarousel = lazy(() =>
  import("../../sharedComponents/CustomCarousel"),
);
const CarouselRating = lazy(() =>
  import("../../sharedComponents/CarouselRating"),
);

export default observer(function IndexClient() {
  const StyledImg = styled("img")({});
  const store = useContextStore();
  useEffect(() => {
    const fetchGlobalData = async () =>
      await store.globalStoreClient.loadIndexPage();
    fetchGlobalData().then((result) => {
      const featuredCurrencies = result.currencies;
      const featuredMetals = result.metals;
      const featuredNews = result.news;

      //handl news result
      var slicedArray = featuredNews.slice(0, 3);
      setNews(slicedArray);

      //handle currencies result
      setFeaturedCurrencies(featuredCurrencies);

      //handle metals result
      const investmentCoins = [];
      const collectionCoins = [];
      const lingots = [];
      featuredMetals.map((el) => {
        if (el.type === "Piece D'investissment") investmentCoins.push(el);
        else if (el.type === "Lingots/Lingotin") lingots.push(el);
        else collectionCoins.push(el);
      });
      setPieceDorDinvestisment(investmentCoins);
      setPieceDorDeCollection(collectionCoins);
      setlingotLingotin(lingots);
    });
  }, []);
  const navigate = useNavigate();
  const [pieceDorDinvestisment, setPieceDorDinvestisment] = useState([]);
  const [pieceDorDeCollection, setPieceDorDeCollection] = useState([]);
  const [lingotLingotin, setlingotLingotin] = useState([]);
  const [featuredCurrencies, setFeaturedCurrencies] = useState([]);
  const [news, setNews] = useState([]);

  const pieceDorDinvestismentProduct = pieceDorDinvestisment.map((item) => (
    <Product
      key={item._id}
      id={item._id}
      name={item.metalName}
      type={item.type}
      url={getFileName(item.photo)}
      price={item.netSellPrice}
    />
  ));
  const pieceDorDeCollectionProduct = pieceDorDeCollection.map((item) => (
    <Product
      key={item._id}
      id={item._id}
      name={item.metalName}
      type={item.type}
      url={getFileName(item.photo)}
      price={item.netSellPrice}
    />
  ));
  const lingotLingotinProduct = lingotLingotin.map((item) => (
    <Product
      key={item._id}
      id={item._id}
      name={item.metalName}
      type={item.type}
      url={getFileName(item.photo)}
      price={item.netSellPrice}
    />
  ));

  return (
    <>
      {store.globalStoreClient.mainSeo && (
        <Helmet>
          <title>{store.globalStoreClient.mainSeo.title}</title>
          <meta
            name="keywords"
            content={store.globalStoreClient.mainSeo.description}
          />
          <link rel="canonical" href="https://www.change-or-enligne.com/" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Change et Or Bastille",
              url: "https://www.change-or-enligne.com",
              logo: "/Bureau-de-change-en-ligne.webp",
              telephone: "+33952277248",
              description: store.globalStoreClient.mainSeo.description,
              address: {
                "@type": "PostalAddress",
                streetAddress: "18 rue Saint-Antoine",
                addressLocality: "Paris, France",
                postalCode: "75004",
                addressCountry: "FR",
                addressCountry: "FR",
              },
              sameAs: [
                "https://www.instagram.com/change_or_enligne",
                "https://www.linkedin.com/company/change-or-en-ligne/about/",
              ],
            })}
          </script>
        </Helmet>
      )}
      {store.globalStoreClient.isLoadingTopBanner ||
      store.globalStoreClient.isLoading ? (
        <LoadingMain fullHeight={true} />
      ) : (
        <>
          <Layout>
            <WidgetRating />
            <h1 className="d-none">Change et Or Bastille</h1>
            <Box
              sx={{
                padding: {
                  md: "3rem 10rem 0rem 10rem",
                  xs: "3rem 1rem 0rem 1rem",
                },
                background: "#EEEEEE",
              }}
            >
              <Typography
                variant="h2"
                className="titleUnderline"
                sx={{ fontWeight: "600", textTransform: "uppercase" }}
                pb={5}
              >
                Acheter des dEVISES
              </Typography>
              <Grid
                container
                columnSpacing={{ lg: 2 }}
                rowSpacing={{ xs: 2, lg: 0 }}
              >
                {featuredCurrencies.length > 0 &&
                  featuredCurrencies.map((element, index) => (
                    <Fragment key={element._id}>
                      <Grid
                        item
                        xs={12}
                        lg={6}
                        sx={{
                          display: { xs: "flex", xl: "initial" },
                          justifyContent: "center",
                        }}
                      >
                        <BillExchangeCalcFeatured
                          currencyName={element.currencyName}
                          moneyName={element.moneyName}
                          id={element._id}
                          iso={element.iso}
                          redirect={true}
                          smallestBill={element.bills[0].name}
                          price={element.sellPrice}
                          coefficienct={element.coefficient}
                        />
                      </Grid>
                      {index % 2 != 0 && (
                        <Divider
                          sx={{
                            justifyContent: "center",
                            width: "100%",
                            display: { xs: "none", lg: "block" },
                            borderColor: "#000",
                          }}
                        />
                      )}
                      <Divider
                        sx={{
                          justifyContent: "center",
                          width: "100%",
                          display: { xs: "block", lg: "none" },
                          borderColor: "#000",
                        }}
                      />
                    </Fragment>
                  ))}
                <Box
                  sx={{
                    padding: ".25rem 0",
                    background: "#333",
                    borderRadius: "5px",
                    width: "100%",
                    marginTop: "1rem",
                    display: "flex",
                  }}
                >
                  <Link
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      fontWeight: 200,
                      margin: "auto",
                    }}
                    to="/cours-des-devises"
                  >
                    Afficher tous nos cours des devises
                  </Link>
                </Box>
              </Grid>
            </Box>
            <Box
              sx={{
                padding: {
                  md: "3rem 10rem 0rem 10rem",
                  xs: "3rem 1rem 0rem 1rem",
                },
              }}
            >
              <Encouragment />
            </Box>
            <Box
              sx={{
                padding: {
                  md: "3rem 10rem 0rem 10rem",
                  xs: "3rem 1rem 0rem 1rem",
                },
              }}
            >
              <Typography
                variant="h2"
                className="titleUnderline"
                sx={{ fontWeight: "600", textTransform: "uppercase" }}
                pb={5}
              >
                Achetez des pieces D'or D'investissement
              </Typography>

              <CustomCarousel>{pieceDorDinvestismentProduct}</CustomCarousel>
            </Box>
            <Box
              sx={{
                padding: {
                  md: "3rem 10rem 0rem 10rem",
                  xs: "3rem 1rem 0rem 1rem",
                },
              }}
            >
              <Typography
                variant="h2"
                className="titleUnderline"
                sx={{ fontWeight: "600", textTransform: "uppercase" }}
                pb={5}
              >
                Achetez des lingots et Lingotin d'or
              </Typography>
              <CustomCarousel>{lingotLingotinProduct}</CustomCarousel>
            </Box>
            <Box
              sx={{
                padding: {
                  md: "3rem 10rem 2rem 10rem",
                  xs: "3rem 1rem 2rem 1rem",
                },
              }}
            >
              <Typography
                variant="h2"
                className="titleUnderline"
                sx={{ fontWeight: "600", textTransform: "uppercase" }}
                pb={5}
              >
                Achetez des pieces D'or de collection
              </Typography>
              <CustomCarousel>{pieceDorDeCollectionProduct}</CustomCarousel>
            </Box>
            <Box
              bgcolor={"backgroundColor.main"}
              sx={{
                padding: { md: "2rem 10rem", xs: "3rem 1rem 2rem 1rem" },
              }}
            >
              <CarouselRating />
            </Box>
            <Box
              bgcolor={"backgroundColor.main"}
              sx={{
                padding: {
                  md: "2rem 10rem 2rem 10rem",
                  xs: "3rem 1rem 0rem 1rem",
                },
              }}
            >
              <Statement />
            </Box>
            <Box bgcolor={"backgroundColor.main"}>
              <Box
                sx={{
                  padding: {
                    md: "0 10rem 2rem 10rem",
                    xs: "3rem 1rem 0rem 1rem",
                  },
                }}
              >
                <Typography
                  className="titleUnderline"
                  variant="h2"
                  sx={{ fontWeight: "700" }}
                  pb={5}
                >
                  LES NOUVELLES
                </Typography>
                <Grid container rowSpacing={5}>
                  <Grid
                    item
                    xs={12}
                    lg={6}
                    container
                    pr={{ xs: 0, lg: 5, xl: 7 }}
                  >
                    {news.map((el) => (
                      <Grid item xs={12} key={el._id}>
                        <Grid
                          item
                          sx={{ paddingRight: "1rem" }}
                          lg={12}
                          xs={12}
                        >
                          <Box sx={{ display: "flex", gap: "15px" }}>
                            <Box position={"relative"}>
                              <StyledImg
                                className="image-container"
                                sx={{
                                  objectFit: { xs: "scale-down", lg: "cover" },
                                  height: "9rem",
                                  width: "12rem",
                                }}
                                height="200px"
                                width="500px"
                                loading="lazy"
                                alt="Gold"
                                src={getFileName(el.photo)}
                              />
                              <Box
                                className="hover-clickable"
                                onClick={() => navigate("/Nouvelles/" + el._id)}
                              ></Box>
                            </Box>

                            <Box>
                              <Typography
                                color="gold.main"
                                sx={{
                                  fontWeight: "700",
                                  fontSize: { xs: "12px", md: "initial" },
                                }}
                              >
                                {new Date(el.createdAt).toLocaleDateString(
                                  "fr-FR",
                                  {
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                  },
                                )}
                              </Typography>
                              <Link
                                style={{
                                  fontWeight: "700",
                                  fontSize: { xs: "12px", md: "initial" },
                                  textDecoration: "none",
                                  color: "#000",
                                }}
                                to={"/Nouvelles/" + el._id}
                                className="hover-text"
                              >
                                {el.title}
                              </Link>
                            </Box>
                          </Box>
                          <Divider
                            sx={{
                              width: "100%",
                              borderColor: "#000",
                              height: "10px",
                              margin: "0 0",
                            }}
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography
                      variant="h3"
                      className={"title"}
                      sx={{ fontWeight: "600", fontSize: "1.5rem" }}
                      pb={2}
                    >
                      COURS DE L’OR EN TEMPS RÉEL
                    </Typography>
                    <Typography pb={2}>Graphique du cours de l'or</Typography>
                    <Box>
                      <TradingViewWidget />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Layout>
        </>
      )}
    </>
  );
});
