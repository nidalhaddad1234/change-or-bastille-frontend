import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
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

// Styled components matching the design system
const PageContainer = styled(Box)(({ theme }) => ({
  padding: { 
    xs: "2rem 1rem", 
    md: "3rem 2rem", 
    lg: "4rem 10rem" 
  },
  marginTop: { xs: "140px", md: "0" }, // Account for fixed header on mobile
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  textTransform: "uppercase",
  marginBottom: theme.spacing(4),
  position: "relative",
  fontSize: { xs: "1.5rem", md: "2rem" },
  color: "#333",
  "&.titleUnderline::after": {
    content: '""',
    position: "absolute",
    bottom: "-15px",
    left: "0",
    width: "100px",
    height: "4px",
    backgroundColor: "#FFD700",
    borderRadius: "2px",
  },
}));

const CalculatorContainer = styled(Box)(({ theme }) => ({
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  overflow: "hidden",
  border: "1px solid #e0e0e0",
}));

const TableHeader = styled(Grid)(({ theme }) => ({
  background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
  height: "4rem",
  display: "flex",
  alignItems: "center",
  borderBottom: "2px solid #ddd",
  fontWeight: 600,
}));

const TableRow = styled(Grid)(({ theme, isAlternate, isTotal }) => ({
  height: "4rem",
  display: "flex",
  alignItems: "center",
  background: isTotal 
    ? "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)" 
    : isAlternate 
    ? "#fafafa" 
    : "#fff",
  borderBottom: "1px solid #e0e0e0",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    background: isTotal ? undefined : "#f0f8ff",
    transform: isTotal ? undefined : "translateX(2px)",
  },
}));

const TableCell = styled(Grid)(({ theme, align = "left" }) => ({
  margin: "auto 0",
  padding: theme.spacing(0, 1),
  "& .MuiTypography-root": {
    fontSize: { xs: "12px", md: "14px", lg: "16px" },
    textAlign: align,
    fontWeight: align === "center" ? 500 : 400,
    color: "#333",
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  width: "120px",
  margin: "0 auto",
  "& .MuiInputBase-root": {
    borderRadius: "8px",
    backgroundColor: "#fff",
    border: "2px solid #e0e0e0",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      borderColor: "#FFD700",
    },
    "&.Mui-focused": {
      borderColor: "#FFD700",
      boxShadow: "0 0 0 3px rgba(255,215,0,0.1)",
    },
  },
  "& .MuiInputBase-input": {
    textAlign: "center",
    fontWeight: "600",
    fontSize: "14px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  margin: "3rem 0",
  padding: "2rem",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  border: "1px solid #f0f0f0",
}));

const HeroImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "400px",
  objectFit: "cover",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const ContactLink = styled(Link)(({ theme }) => ({
  color: "#1976d2",
  textDecoration: "none",
  fontWeight: 600,
  borderBottom: "2px solid transparent",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    color: "#FFD700",
    borderBottomColor: "#FFD700",
  },
}));

const PhoneLink = styled("span")(({ theme }) => ({
  color: "#1976d2",
  cursor: "pointer",
  fontWeight: 600,
  borderBottom: "2px solid transparent",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    color: "#FFD700",
    borderBottomColor: "#FFD700",
  },
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.1rem",
  color: "#333",
  marginBottom: "1rem",
  borderLeft: "4px solid #FFD700",
  paddingLeft: "1rem",
}));

const FeatureList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  "& > div": {
    padding: "1rem",
    background: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#e3f2fd",
      borderColor: "#FFD700",
      transform: "translateX(4px)",
    },
  },
}));

const ErrorAlert = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: "3rem 2rem",
  minHeight: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  margin: "2rem 0",
}));

export default observer(function Bijoux() {
  const store = useContextStore();

  // State management
  const [calculatorValues, setCalculatorValues] = useState({
    carats22: 0,
    carats18: 0,
    carats14: 0,
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data fetching with error handling
  const fetchConfiguration = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await store.globalStoreClient.loadTopBanner();
      
      if (!result) {
        throw new Error('Aucune donnée reçue du serveur');
      }
      
      setResponse(result);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [store.globalStoreClient]);

  useEffect(() => {
    fetchConfiguration();
  }, [fetchConfiguration]);

  // Calculator handlers
  const handleCalculatorChange = (type, value) => {
    const numValue = parseFloat(value) || 0;
    setCalculatorValues(prev => ({
      ...prev,
      [type]: numValue
    }));
  };

  // Calculate totals
  const calculateTotal = () => {
    if (!response?.data) return 0;
    return (
      calculatorValues.carats22 * response.data.carrates22 +
      calculatorValues.carats18 * response.data.carrates18 +
      calculatorValues.carats14 * response.data.carrates14
    ).toFixed(2);
  };

  // SEO data
  const seoData = {
    title: response?.seo?.title || "Rachat Bijoux en Or et Ancien Or - Change et Or Bastille",
    description: response?.seo?.description || "Vendez vos anciens bijoux en or avec Change et Or Bastille. Bénéficiez d'offres compétitives et d'un service transparent et sécurisé",
  };

  if (loading) {
    return <LoadingMain fullHeight />;
  }

  if (error) {
    return (
      <Layout>
        <PageContainer>
          <ErrorAlert>
            <Typography variant="h4" color="error" gutterBottom>
              Erreur de chargement
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {error}
            </Typography>
            <Button 
              variant="contained" 
              onClick={fetchConfiguration}
              sx={{ 
                background: "#FFD700", 
                color: "#000",
                "&:hover": { background: "#FFC700" }
              }}
            >
              Réessayer
            </Button>
          </ErrorAlert>
        </PageContainer>
      </Layout>
    );
  }

  if (!response?.data) {
    return <LoadingMain fullHeight />;
  }

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <link
          rel="canonical"
          href="https://www.change-or-enligne.com/rachat-bijoux-or"
        />
        <meta name="description" content={seoData.description} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="service" />
        <meta property="og:url" content="https://www.change-or-enligne.com/rachat-bijoux-or" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "ItemList",
            name: seoData.title,
            description: seoData.description,
            itemListElement: [
              {
                "@type": "Product",
                name: "22 Carats Bijoux",
                material: "Gold",
                caratPercentage: 917,
                image: "https://www.change-or-enligne.com/rachat-bijoux-en-or.webp",
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
                image: "https://www.change-or-enligne.com/rachat-bijoux-en-or.webp",
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
                image: "https://www.change-or-enligne.com/rachat-bijoux-en-or.webp",
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

      <Layout>
        <h1 className="d-none">Rachat Bijoux en Or et Ancien Or</h1>

        <PageContainer>
          <SectionTitle variant="h1" className="titleUnderline">
            Rachat bijoux en or
          </SectionTitle>

          {/* Calculator Section */}
          <CalculatorContainer>
            {/* Header */}
            <TableHeader container>
              <TableCell xs={3} component="div">
                <Typography variant="subtitle1" fontWeight={600}>Nom</Typography>
              </TableCell>
              <TableCell xs={3} component="div" align="center">
                <Typography variant="subtitle1" fontWeight={600}>Prix par gramme</Typography>
              </TableCell>
              <TableCell xs={3} component="div" align="center">
                <Typography variant="subtitle1" fontWeight={600}>Poids en gramme</Typography>
              </TableCell>
              <TableCell xs={3} component="div" align="center">
                <Typography variant="subtitle1" fontWeight={600}>Montant estimé</Typography>
              </TableCell>
            </TableHeader>

            {/* 22 Carats Row */}
            <TableRow container isAlternate>
              <TableCell xs={3} component="div">
                <Typography>22 Carats Bijoux gramme or 917%</Typography>
              </TableCell>
              <TableCell xs={3} component="div" align="center">
                <Typography fontWeight={600} color="primary">
                  {response.data.carrates22}€ / Gramme
                </Typography>
              </TableCell>
              <TableCell xs={3} component="div" align="center">
                <CustomTextField
                  size="small"
                  type="number"
                  value={calculatorValues.carats22}
                  onChange={(e) => handleCalculatorChange('carats22', e.target.value)}
                  inputProps={{ min: 0, step: 0.1 }}
                />
              </TableCell>
              <TableCell xs={3} component="div" align="center">
                <Typography fontWeight={600} color="success.main">
                  {(calculatorValues.carats22 * response.data.carrates22).toFixed(2)} €
                </Typography>
              </TableCell>
            </TableRow>

            {/* 18 Carats Row */}
            <TableRow container>
              <TableCell xs={3} component="div">
                <Typography>18 Carats Bijoux gramme or 750%</Typography>
              </TableCell>
              <TableCell xs={3} component="div" align="center">
                <Typography fontWeight={600} color="primary">
                  {response.data.carrates18}€ / Gramme
                </Typography>
              </TableCell>
              <TableCell xs={3} component="div" align="center">
                <CustomTextField
                  size="small"
                  type="number"
                  value={calculatorValues.carats18}
                  onChange={(e) => handleCalculatorChange('carats18', e.target.value)}
                  inputProps={{ min: 0, step: 0.1 }}
                />
              </TableCell>
              <TableCell xs={3} component="div" align="center">
                <Typography fontWeight={600} color="success.main">
                  {(calculatorValues.carats18 * response.data.carrates18).toFixed(2)} €
                </Typography>
              </TableCell>
            </TableRow>

            {/* 14 Carats Row */}
            <TableRow container isAlternate>
              <TableCell xs={3} component="div">
                <Typography>14 Carats Bijoux gramme or 585%</Typography>
              </TableCell>
              <TableCell xs={3} component="div" align="center">
                <Typography fontWeight={600} color="primary">
                  {response.data.carrates14}€ / Gramme
                </Typography>
              </TableCell>
              <TableCell xs={3} component="div" align="center">
                <CustomTextField
                  size="small"
                  type="number"
                  value={calculatorValues.carats14}
                  onChange={(e) => handleCalculatorChange('carats14', e.target.value)}
                  inputProps={{ min: 0, step: 0.1 }}
                />
              </TableCell>
              <TableCell xs={3} component="div" align="center">
                <Typography fontWeight={600} color="success.main">
                  {(calculatorValues.carats14 * response.data.carrates14).toFixed(2)} €
                </Typography>
              </TableCell>
            </TableRow>

            {/* Total Row */}
            <TableRow container isTotal>
              <TableCell xs={9} component="div" align="right">
                <Typography variant="h6" fontWeight={700} color="success.dark">
                  Estimation de votre Revente
                </Typography>
              </TableCell>
              <TableCell xs={3} component="div" align="center">
                <Typography variant="h6" fontWeight={700} color="success.dark">
                  {calculateTotal()} €
                </Typography>
              </TableCell>
            </TableRow>
          </CalculatorContainer>

          {/* Content Sections */}
          <ContentSection>
            <EncouragmentRachatBijoux />
            
            <Box sx={{ margin: "2rem 0" }}>
              <HeroImage
                loading="lazy"
                alt="rachat bijoux en or"
                src="/rachat-bijoux-en-or.webp"
                onError={(e) => {
                  e.target.src = '/placeholder-gold.jpg';
                }}
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Introduction */}
              <Box>
                <SectionHeader variant="h2">
                  Transformez Vos Trésors Oubliés en Argent
                </SectionHeader>
                <Typography variant="h3" sx={{ fontWeight: 600, fontSize: "1rem", marginBottom: "1rem" }}>
                  Vous avez des bijoux en or que vous ne portez plus?
                </Typography>
                <Typography paragraph sx={{ lineHeight: 1.7 }}>
                  Que ce soient d'anciens bijoux, des pièces vieillies, cassées, de l'or dentaire ou même des montres en or, 
                  nous sommes là pour transformer ces trésors oubliés en argent liquide. Chez Change et Or Bastille, nous 
                  comprenons la valeur sentimentale et matérielle de vos bijoux en or, et nous nous engageons à vous offrir 
                  le meilleur prix du marché.
                </Typography>
                <Typography paragraph sx={{ lineHeight: 1.7 }}>
                  Profitez de notre expertise et de nos prix compétitifs pour tirer le meilleur parti de vos biens précieux.
                </Typography>
              </Box>

              {/* How it works */}
              <Box>
                <SectionHeader variant="h2">
                  Comment Ça Marche?
                </SectionHeader>
                <Typography paragraph sx={{ marginBottom: "1.5rem", lineHeight: 1.7 }}>
                  La procédure est simple, transparente et conçue pour votre commodité:
                </Typography>

                <FeatureList>
                  <Box>
                    <Typography fontWeight={600} gutterBottom>
                      1. Évaluation en Ligne
                    </Typography>
                    <Typography>
                      Utilisez notre calculatrice en ligne pour estimer approximativement la valeur de vos bijoux. 
                      Cette première étape vous donne une idée de ce que vous pouvez attendre de la vente.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={600} gutterBottom>
                      2. Prenez un Rendez-Vous
                    </Typography>
                    <Typography>
                      Contactez-nous par téléphone ou e-mail pour fixer un rendez-vous. 
                      Nous sommes flexibles et prêts à nous adapter à votre emploi du temps.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={600} gutterBottom>
                      3. Expertise Professionnelle
                    </Typography>
                    <Typography>
                      Notre équipe d'experts évalue vos bijoux en or en fonction de leur poids, de leur pureté 
                      et des cours actuels de l'or, vous assurant une offre équitable et transparente.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={600} gutterBottom>
                      4. Paiement Immédiat
                    </Typography>
                    <Typography>
                      Une fois que nous avons évalué et accepté vos bijoux en or, nous procédons au paiement 
                      rapidement et efficacement, vous permettant de profiter de votre argent sans attendre. 
                      (Chèque ou virement bancaire).
                    </Typography>
                  </Box>
                </FeatureList>
              </Box>

              {/* Why choose us */}
              <Box>
                <SectionHeader variant="h2">
                  Pourquoi Nous Choisir?
                </SectionHeader>

                <FeatureList>
                  <Box>
                    <Typography fontWeight={600} gutterBottom>
                      Expertise et Confiance
                    </Typography>
                    <Typography>
                      Avec des années d'expérience dans le rachat d'or, nous garantissons une évaluation 
                      juste et professionnelle de vos bijoux.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={600} gutterBottom>
                      Transparence
                    </Typography>
                    <Typography>
                      Aucun frais caché. Nous vous expliquons chaque étape du processus.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={600} gutterBottom>
                      Paiement Sécurisé et Rapide
                    </Typography>
                    <Typography>
                      Nous comprenons l'importance de la sécurité et de la rapidité dans les transactions financières.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={600} gutterBottom>
                      Service Personnalisé
                    </Typography>
                    <Typography>
                      Chaque client est unique, et nous nous engageons à offrir une expérience personnalisée et satisfaisante.
                    </Typography>
                  </Box>
                </FeatureList>
              </Box>

              {/* Contact section */}
              <Box>
                <SectionHeader variant="h2">
                  Prêt à Vendre Vos Bijoux en Or?
                </SectionHeader>
                <Typography paragraph sx={{ lineHeight: 1.7 }}>
                  Pour prendre rendez-vous pour le rachat de vos bijoux en or, veuillez nous contacter par mail à{" "}
                  <ContactLink to="/nous-contacter">
                    contact@change-or-enligne.com
                  </ContactLink>{" "}
                  ou par téléphone au{" "}
                  <PhoneLink onClick={() => window.open("tel:0956041425")}>
                    09 56 04 14 25
                  </PhoneLink>.
                </Typography>
                <Typography paragraph sx={{ lineHeight: 1.7 }}>
                  Notre équipe se fera un plaisir de vous accompagner tout au long du processus et de répondre 
                  à toutes vos questions. Ne laissez pas vos anciens bijoux en or dormir dans un tiroir - 
                  contactez Change et Or Bastille dès aujourd'hui et transformez-les en argent liquide.
                </Typography>
              </Box>
            </Box>
          </ContentSection>
        </PageContainer>
      </Layout>
    </>
  );
});
