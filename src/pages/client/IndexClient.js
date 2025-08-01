import Layout from "../../layout/client/Layout";
import React, { Fragment, lazy, useEffect, useState, useCallback } from "react";
import { Typography, Grid, Box, Divider, Card, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";
import { useContextStore } from "../../stores/RootStoreContext";
import { styled } from "@mui/material/styles";
import LoadingMain from "../../sharedComponents/utilities/LoadingMain";
import { getFileName } from "../../helpers";

// Lazy loaded components for better performance
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
const CurrencyMarquee = lazy(() => 
  import("../../sharedComponents/CurrencyMarquee")
);

// Styled components matching live website design

const ServiceCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease-in-out",
  border: "1px solid #f0f0f0",
  background: "#fff",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
    borderColor: "#FFD700",
    "& .service-icon": {
      transform: "scale(1.1)",
    },
  },
}));

const ServiceIcon = styled("img")({
  width: "80px",
  height: "80px",
  marginBottom: "1rem",
  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
  transition: "transform 0.3s ease-in-out",
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  textTransform: "uppercase",
  marginBottom: theme.spacing(4),
  textAlign: "center",
  position: "relative",
  color: "#333",
  "&.titleUnderline::after": {
    content: '""',
    position: "absolute",
    bottom: "-15px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100px",
    height: "4px",
    backgroundColor: "#FFD700",
    borderRadius: "2px",
  },
}));

const StyledImg = styled("img")({
  transition: "transform 0.3s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const ViewAllButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #333 0%, #555 100%)",
  color: "#fff",
  fontWeight: 500,
  borderRadius: "8px",
  padding: "12px 2rem",
  marginTop: "2rem",
  width: "100%",
  textTransform: "none",
  fontSize: "1rem",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    background: "linear-gradient(135deg, #555 0%, #777 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: { 
    xs: "2rem 1rem", 
    md: "3rem 2rem", 
    lg: "4rem 10rem" 
  },
}));

const FirstSection = styled(Box)(({ theme }) => ({
  padding: { 
    xs: "1rem 1rem", 
    md: "2rem 2rem", 
    lg: "3rem 10rem" 
  },
  marginTop: { xs: "500px", md: "450px" }, // Account for hero section height
}));

const NewsCard = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "15px",
  marginBottom: "2rem",
  padding: "1rem",
  borderRadius: "12px",
  background: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
  },
}));

const ErrorAlert = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: "3rem 2rem",
  minHeight: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  margin: "2rem",
}));

export default observer(function IndexClient() {
  const store = useContextStore();
  const navigate = useNavigate();

  // State management with better organization
  const [pageData, setPageData] = useState({
    investmentCoins: [],
    collectionCoins: [],
    goldBars: [],
    featuredCurrencies: [],
    news: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Services data matching live website exactly
  const services = [
    {
      icon: "/devises.webp",
      title: "Plus de 50 devises disponibles",
      description: "Plus de 50 devises sont disponibles en boutique et en ligne avec choix des coupures",
    },
    {
      icon: "/2.webp", 
      title: "Achat en magasin et en ligne",
      description: "Achetez vos devises directement en magasin, avec ou sans réservation. Contactez-nous par téléphone ou email pour réserver.",
    },
    {
      icon: "/3.webp",
      title: "Livraison assurée 48-72h",
      description: "Livraison Assurée 48-72h dans toute la France Métropolitaine",
    },
    {
      icon: "/4.webp",
      title: "Rachat de devises",
      description: "Nous rachetons presque toute les devises ayant cours légal. Contactez-nous pour négocier le Meilleur taux du marché",
    },
  ];

  // Optimized data fetching with better error handling
  const fetchGlobalData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await store.globalStoreClient.loadIndexPage();
      
      if (!result) {
        throw new Error('Aucune donnée reçue du serveur');
      }

      // Process news data
      const featuredNews = Array.isArray(result.news) ? result.news.slice(0, 3) : [];
      
      // Process currencies data
      const currencies = Array.isArray(result.currencies) ? result.currencies : [];
      
      // Process and categorize metals data
      const featuredMetals = Array.isArray(result.metals) ? result.metals : [];
      const categorizedMetals = {
        investmentCoins: [],
        collectionCoins: [],
        goldBars: [],
      };
      
      featuredMetals.forEach((metal) => {
        if (metal.type === "Piece D'investissment") {
          categorizedMetals.investmentCoins.push(metal);
        } else if (metal.type === "Lingots/Lingotin") {
          categorizedMetals.goldBars.push(metal);
        } else {
          categorizedMetals.collectionCoins.push(metal);
        }
      });
      
      // Update state with processed data
      setPageData({
        news: featuredNews,
        featuredCurrencies: currencies,
        ...categorizedMetals,
      });
      
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setError(error.message);
      
      // Set empty state to prevent crashes
      setPageData({
        news: [],
        featuredCurrencies: [],
        investmentCoins: [],
        collectionCoins: [],
        goldBars: [],
      });
    } finally {
      setLoading(false);
    }
  }, [store.globalStoreClient]);

  useEffect(() => {
    fetchGlobalData();
  }, [fetchGlobalData]);

  // Product rendering functions
  const renderProducts = (items, type = "default") => {
    return items.map((item) => (
      <Product
        key={item._id}
        id={item._id}
        name={item.metalName}
        type={item.type}
        url={getFileName(item.photo)}
        price={item.netSellPrice}
      />
    ));
  };

  // Loading state
  if (store.globalStoreClient.isLoadingTopBanner || store.globalStoreClient.isLoading || loading) {
    return <LoadingMain fullHeight={true} />;
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <ErrorAlert>
          <Typography variant="h4" color="error" gutterBottom>
            Erreur de chargement
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            onClick={fetchGlobalData}
            sx={{ 
              background: "#FFD700", 
              color: "#000",
              "&:hover": { background: "#FFC700" }
            }}
          >
            Réessayer
          </Button>
        </ErrorAlert>
      </Layout>
    );
  }

  return (
    <>
      {/* SEO and Meta Tags */}
      {store.globalStoreClient.mainSeo && (
        <Helmet>
          <title>{store.globalStoreClient.mainSeo.title}</title>
          <meta
            name="description"
            content={store.globalStoreClient.mainSeo.description}
          />
          <meta
            name="keywords"
            content={store.globalStoreClient.mainSeo.keywords || store.globalStoreClient.mainSeo.description}
          />
          <link rel="canonical" href="https://www.change-or-enligne.com/" />
          <meta property="og:title" content={store.globalStoreClient.mainSeo.title} />
          <meta property="og:description" content={store.globalStoreClient.mainSeo.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.change-or-enligne.com/" />
          <meta property="og:image" content="/Bureau-de-change-en-ligne.webp" />
          
          {/* Structured Data */}
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
                addressLocality: "Paris",
                addressRegion: "Île-de-France",
                postalCode: "75004",
                addressCountry: "FR",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00"
              },
              sameAs: [
                "https://www.instagram.com/change_or_enligne",
                "https://www.linkedin.com/company/change-or-en-ligne/about/",
              ],
            })}
          </script>
        </Helmet>
      )}

      <Layout>
        {/* Currency Marquee at the very top */}
        <React.Suspense fallback={<div />}>
          <CurrencyMarquee />
        </React.Suspense>
        
        <WidgetRating />
        
        {/* Hidden H1 for SEO */}
        <h1 className="d-none">Change et Or Bastille - Bureau de Change en Ligne</h1>
        
        {/* Hero section is now handled by NavigationMenu component */}

        {/* Currency Exchange Section */}
        <Box sx={{ background: "#f8f9fa" }}>
          <FirstSection>
            <SectionTitle variant="h2" className="titleUnderline">
              Acheter des devises
            </SectionTitle>
            
            <Grid container spacing={3}>
              {pageData.featuredCurrencies.map((element, index) => (
                <Fragment key={element._id}>
                  <Grid item xs={12} lg={6}>
                    <Box sx={{ 
                      display: "flex", 
                      justifyContent: "center",
                      height: "100%"
                    }}>
                      <BillExchangeCalcFeatured
                        currencyName={element.currencyName}
                        moneyName={element.moneyName}
                        id={element._id}
                        iso={element.iso}
                        redirect={true}
                        smallestBill={element.bills?.[0]?.name || ""}
                        price={element.sellPrice}
                        coefficient={element.coefficient}
                      />
                    </Box>
                  </Grid>
                  {(index + 1) % 2 === 0 && index < pageData.featuredCurrencies.length - 1 && (
                    <Grid item xs={12}>
                      <Divider sx={{ borderColor: "#ddd", margin: "1rem 0" }} />
                    </Grid>
                  )}
                </Fragment>
              ))}
              
              <Grid item xs={12}>
                <ViewAllButton component={Link} to="/cours-des-devises">
                  Afficher tous nos cours des devises
                </ViewAllButton>
              </Grid>
            </Grid>
          </FirstSection>
        </Box>

        {/* Services Section */}
        <ContentSection sx={{ background: "#fff" }}>
          <SectionTitle variant="h2" className="titleUnderline">
            Nos Services
          </SectionTitle>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <ServiceCard>
                  <ServiceIcon
                    className="service-icon"
                    src={service.icon}
                    alt={service.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {service.description}
                  </Typography>
                </ServiceCard>
              </Grid>
            ))}
          </Grid>
        </ContentSection>

        {/* Encouragement Section */}
        <ContentSection sx={{ background: "#f8f9fa" }}>
          <Encouragment />
        </ContentSection>

        {/* Investment Gold Coins Section */}
        {pageData.investmentCoins.length > 0 && (
          <ContentSection sx={{ background: "#fff" }}>
            <SectionTitle variant="h2" className="titleUnderline">
              Pièces d'or d'investissement
            </SectionTitle>
            <CustomCarousel>
              {renderProducts(pageData.investmentCoins)}
            </CustomCarousel>
          </ContentSection>
        )}

        {/* Gold Bars Section */}
        {pageData.goldBars.length > 0 && (
          <ContentSection sx={{ background: "#f8f9fa" }}>
            <SectionTitle variant="h2" className="titleUnderline">
              Lingots et lingotins d'or
            </SectionTitle>
            <CustomCarousel>
              {renderProducts(pageData.goldBars)}
            </CustomCarousel>
          </ContentSection>
        )}

        {/* Collection Gold Coins Section */}
        {pageData.collectionCoins.length > 0 && (
          <ContentSection sx={{ background: "#fff" }}>
            <SectionTitle variant="h2" className="titleUnderline">
              Pièces d'or de collection
            </SectionTitle>
            <CustomCarousel>
              {renderProducts(pageData.collectionCoins)}
            </CustomCarousel>
          </ContentSection>
        )}

        {/* Reviews Section */}
        <Box sx={{ background: "#f8f9fa", padding: { md: "3rem 2rem", xs: "3rem 1rem" } }}>
          <CarouselRating />
        </Box>

        {/* Statement Section */}
        <ContentSection sx={{ background: "#e8f5e9" }}>
          <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 600, 
              marginBottom: 3,
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              lineHeight: 1.4,
              color: "#2e7d32"
            }}>
              Commandez en ligne des devises, pièces d'or d'investissement et lingots d'or directement depuis Change et Or Bastille
            </Typography>
            <Grid container spacing={2} sx={{ marginBottom: 3 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 500, 
                  fontSize: "1rem",
                  color: "#333"
                }}>
                  ✓ Livraison assurée partout en France métropolitaine
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 500, 
                  fontSize: "1rem",
                  color: "#333"
                }}>
                  ✓ Prix nets, sans commission supplémentaire
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 500, 
                  fontSize: "1rem",
                  color: "#333"
                }}>
                  ✓ Bureau de change de confiance
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Statement />
        </ContentSection>

        {/* News and Trading View Section */}
        <Box sx={{ background: "#fff" }}>
          <ContentSection>
            <Grid container spacing={6}>
              {/* News Section */}
              <Grid item xs={12} lg={6}>
                <SectionTitle variant="h2" className="titleUnderline" sx={{ textAlign: "left" }}>
                  Les Nouvelles
                </SectionTitle>
                
                {pageData.news.map((article) => (
                  <NewsCard key={article._id}>
                    <Box sx={{ position: "relative", flexShrink: 0 }}>
                      <StyledImg
                        sx={{
                          objectFit: "cover",
                          height: "120px",
                          width: "160px",
                          borderRadius: 2,
                        }}
                        loading="lazy"
                        alt={article.title}
                        src={getFileName(article.photo)}
                        onError={(e) => {
                          e.target.src = '/placeholder-news.jpg';
                        }}
                        onClick={() => navigate("/Nouvelles/" + article._id)}
                      />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#FFD700",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                        }}
                      >
                        {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </Typography>
                      <Typography
                        variant="h6"
                        component={Link}
                        to={"/Nouvelles/" + article._id}
                        sx={{
                          fontWeight: 600,
                          textDecoration: "none",
                          color: "#333",
                          display: "block",
                          marginTop: 1,
                          lineHeight: 1.3,
                          "&:hover": {
                            color: "#FFD700",
                          },
                        }}
                      >
                        {article.title}
                      </Typography>
                      {article.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ 
                            marginTop: 1,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {article.description}
                        </Typography>
                      )}
                    </Box>
                  </NewsCard>
                ))}
              </Grid>
              
              {/* Trading View Section */}
              <Grid item xs={12} lg={6}>
                <SectionTitle variant="h2" className="titleUnderline" sx={{ textAlign: "left" }}>
                  Cours de l'or en temps réel
                </SectionTitle>
                <Typography variant="body1" paragraph sx={{ color: "#666" }}>
                  Suivez l'évolution du cours de l'or en direct
                </Typography>
                <Box sx={{ 
                  background: "#f8f9fa", 
                  borderRadius: 2, 
                  overflow: "hidden",
                  minHeight: "400px"
                }}>
                  <TradingViewWidget />
                </Box>
              </Grid>
            </Grid>
          </ContentSection>
        </Box>
      </Layout>
    </>
  );
});
