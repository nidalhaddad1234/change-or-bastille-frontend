import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

// Styled components for better design
const ProductCard = styled(Card)(({ theme }) => ({
  maxWidth: { xs: "280px", sm: "250px", xl: "20rem" },
  margin: "0 1.5rem 0 0",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease-in-out",
  border: "1px solid #f0f0f0",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
    borderColor: "#FFD700",
    "& .product-image": {
      transform: "scale(1.05)",
    },
    "& .details-button": {
      background: "linear-gradient(135deg, #FFD700 0%, #FFC700 100%)",
      transform: "scale(1.02)",
    },
  },
}));

const ProductImage = styled("img")(({ theme }) => ({
  height: "150px",
  width: "250px",
  objectFit: "contain",
  fontFamily: "Poppins, sans-serif",
  maxWidth: "100%",
  transition: "transform 0.3s ease-in-out",
  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.1))",
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins, sans-serif",
  fontSize: { xs: "14px", md: "1rem" },
  fontWeight: 500,
  textAlign: "center",
  color: "#333",
  lineHeight: 1.3,
  marginBottom: "0.5rem",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));

const ProductPrice = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: { xs: "16px", md: "1.1rem" },
  fontFamily: "Poppins, sans-serif",
  textAlign: "center",
  color: "#2e7d32",
  marginBottom: "1rem",
}));

const DetailsButton = styled(Link)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
  borderRadius: "8px",
  marginTop: "0.5rem",
  color: "#fff",
  padding: "0.75rem 1rem",
  background: "linear-gradient(135deg, #EEAC1F 0%, #E69500 100%)",
  fontSize: "0.9rem",
  fontFamily: "Work Sans, sans-serif",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0 2px 8px rgba(238, 172, 31, 0.3)",
  "&:hover": {
    background: "linear-gradient(135deg, #FFD700 0%, #FFC700 100%)",
    color: "#333",
    transform: "scale(1.02)",
    boxShadow: "0 4px 12px rgba(255, 215, 0, 0.4)",
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "150px",
  background: "linear-gradient(145deg, #f8f9fa, #e9ecef)",
  borderRadius: "8px",
  margin: "0.5rem",
  overflow: "hidden",
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  minHeight: "8rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export default function Product(props) {
  const navigate = useNavigate();

  // Generate product URL based on type
  const getProductUrl = (type, name, id) => {
    const formattedName = name.replaceAll(" ", "-");
    
    switch (type) {
      case "Piece D'investissment":
        return `/pieces-or-investissement/${formattedName}/${id}`;
      case "Lingots/Lingotin":
        return `/lingots-lingotins-or/${formattedName}/${id}`;
      default:
        return `/pieces-or-collection/${formattedName}/${id}`;
    }
  };

  const productUrl = getProductUrl(props.type, props.name, props.id);

  const handleCardClick = () => {
    navigate(productUrl);
  };

  const handleImageError = (e) => {
    e.target.src = '/placeholder-product.jpg';
    e.target.alt = 'Image non disponible';
  };

  // Format price
  const formatPrice = (price) => {
    if (!price) return 'Prix sur demande';
    return `${parseFloat(price).toFixed(2)} €`;
  };

  return (
    <swiper-slide>
      <ProductCard onClick={handleCardClick}>
        <CardActionArea sx={{ padding: "1rem", height: "100%" }}>
          <ImageContainer>
            <ProductImage
              className="product-image"
              loading="lazy"
              src={props.url}
              alt={props.name || 'Produit'}
              onError={handleImageError}
            />
          </ImageContainer>

          <CardContent sx={{ padding: "1rem 0.5rem" }}>
            <ContentContainer>
              <Box>
                <ProductTitle
                  variant="h6"
                  component="div"
                  title={props.name}
                >
                  {props.name || 'Nom non disponible'}
                </ProductTitle>
                
                <ProductPrice
                  variant="h6"
                  component="div"
                >
                  {formatPrice(props.price)}
                </ProductPrice>
              </Box>

              <DetailsButton
                className="details-button"
                to={productUrl}
                onClick={(e) => e.stopPropagation()} // Prevent double navigation
              >
                Voir Détails
              </DetailsButton>
            </ContentContainer>
          </CardContent>
        </CardActionArea>
      </ProductCard>
    </swiper-slide>
  );
}
