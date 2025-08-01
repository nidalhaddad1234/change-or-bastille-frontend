import { Button, Grid, TextField, Typography, Paper } from "@mui/material";
import { Box } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState, useCallback } from "react";
import { getCountryCode } from "../../../helpers";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

// Styled components for better design
const ExchangeCard = styled(Paper)(({ theme, isRedirect }) => ({
  padding: "1.5rem",
  borderRadius: "12px",
  background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
  border: "2px solid #e9ecef",
  cursor: isRedirect ? "pointer" : "default",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  "&:hover": isRedirect ? {
    borderColor: "#FFD700",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    background: "linear-gradient(145deg, #fffef7, #f8f9fa)",
  } : {},
}));

const FlagImage = styled("img")(({ theme }) => ({
  height: "40px",
  width: "60px",
  objectFit: "cover",
  borderRadius: "4px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const CurrencyName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: "#333",
  fontSize: { xs: "14px", sm: "16px", lg: "14px", xl: "16px" },
  textAlign: "left",
  lineHeight: 1.2,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    background: "#fff",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "14px",
    border: "2px solid #e9ecef",
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
    fontWeight: 600,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

const CurrencyLabel = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 700,
  color: "#666",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "40px",
  height: "40px",
  background: "#f8f9fa",
  borderRadius: "8px",
  border: "1px solid #e9ecef",
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  fontWeight: 600,
  textTransform: "uppercase",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0 4px 12px rgba(255,215,0,0.3)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(255,215,0,0.4)",
  },
}));

const ExchangeSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: { xs: "8px", sm: "15px" },
  flexWrap: "wrap",
  [theme.breakpoints.down('sm')]: {
    justifyContent: "center",
  },
}));

export default function BillExchangeCalcFeatured(props) {
  const {
    currencyName,
    iso,
    price,
    id,
    redirect,
    coefficienct,
    smallestBill,
    moneyName,
  } = props;

  const navigate = useNavigate();
  
  // State management
  const [exchangeFrom, setExchangeFrom] = useState(
    coefficienct ? 1 * coefficienct : 1
  );
  const [euro, setEuro] = useState(1 * price);

  // Calculate exchange rate
  const calculateEuro = useCallback((fromValue) => {
    return coefficienct 
      ? (fromValue * price) / coefficienct 
      : fromValue * price;
  }, [price, coefficienct]);

  const calculateFromCurrency = useCallback((euroValue) => {
    return coefficienct 
      ? (euroValue / price) * coefficienct 
      : euroValue / price;
  }, [price, coefficienct]);

  // Input handlers
  const handleFromCurrencyChange = (event) => {
    const value = event.target.value;
    
    // Allow empty string for better UX
    if (value === '') {
      setExchangeFrom('');
      setEuro('');
      return;
    }
    
    // Validate numeric input
    if (isNaN(value) || value < 0) return;
    
    setExchangeFrom(value);
    setEuro(calculateEuro(value).toFixed(2));
  };

  const handleEuroChange = (event) => {
    const value = event.target.value;
    
    // Allow empty string for better UX
    if (value === '') {
      setEuro('');
      setExchangeFrom('');
      return;
    }
    
    // Validate numeric input
    if (isNaN(value) || value < 0) return;
    
    setEuro(value);
    setExchangeFrom(calculateFromCurrency(value).toFixed(2));
  };

  // Navigation handler
  const handleCardClick = (event) => {
    if (!redirect) return;
    
    // Prevent navigation when clicking on interactive elements
    const nonClickableElements = ['INPUT', 'BUTTON', 'PATH', 'SVG'];
    if (nonClickableElements.includes(event.target.tagName.toUpperCase())) {
      return;
    }
    
    navigate(`/cours-des-devises/${currencyName.replaceAll(" ", "-")}/${id}`);
  };

  // Add to cart handler
  const addToCart = useCallback(() => {
    const product = {
      currencyName,
      iso,
      price,
      id,
      coefficienct,
      euro: parseFloat(euro) || 0,
      exchangeFrom: parseFloat(exchangeFrom) || 0,
      smallestBill,
    };
    
    navigate(`/panier-article/${id}/${exchangeFrom}`);
  }, [currencyName, iso, price, id, coefficienct, euro, exchangeFrom, smallestBill, navigate]);

  // Input selection handler
  const handleInputClick = (event) => {
    event.target.setSelectionRange(0, event.target.value.length);
  };

  // Get flag URL with error handling
  const getFlagUrl = () => {
    try {
      const countryCode = getCountryCode(iso.toUpperCase());
      return `https://flagsapi.com/${countryCode}/flat/64.png`;
    } catch (error) {
      console.warn(`Could not get flag for ${iso}:`, error);
      return '/placeholder-flag.png';
    }
  };

  const handleFlagError = (event) => {
    event.target.src = '/placeholder-flag.png';
  };

  return (
    <ExchangeCard 
      elevation={0} 
      isRedirect={redirect}
      onClick={handleCardClick}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Currency Info Section */}
        <Grid item xs={12} sm={4} lg={3}>
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 2,
            justifyContent: { xs: "center", sm: "flex-start" }
          }}>
            <FlagImage
              loading="lazy"
              alt={`${moneyName?.replaceAll(" ", "-")} - ${currencyName?.replaceAll(" ", "-")} - ${iso?.toUpperCase()}`}
              src={getFlagUrl()}
              onError={handleFlagError}
            />
            <CurrencyName
              variant="body1"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {currencyName || 'Devise'}
            </CurrencyName>
          </Box>
        </Grid>

        {/* Exchange Calculator Section */}
        <Grid item xs={12} sm={8} lg={9}>
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            alignItems: "center"
          }}>
            {/* From Currency Input */}
            <ExchangeSection>
              <StyledTextField
                value={exchangeFrom}
                type="number"
                size="small"
                placeholder="0.00"
                inputProps={{ 
                  min: 0, 
                  step: 0.01,
                  style: { textAlign: 'center' }
                }}
                sx={{ width: { xs: "100px", lg: "120px" } }}
                onClick={handleInputClick}
                onChange={handleFromCurrencyChange}
              />
              <CurrencyLabel>
                {iso?.toUpperCase() || 'CUR'}
              </CurrencyLabel>
            </ExchangeSection>

            {/* Exchange Arrow or Equal Sign */}
            <Typography 
              variant="h6" 
              sx={{ 
                color: "#666", 
                fontWeight: 700,
                display: { xs: "none", md: "block" }
              }}
            >
              =
            </Typography>

            {/* Euro Input */}
            <ExchangeSection>
              <StyledTextField
                value={euro}
                type="number"
                size="small"
                placeholder="0.00"
                inputProps={{ 
                  min: 0, 
                  step: 0.01,
                  style: { textAlign: 'center' }
                }}
                sx={{ width: { xs: "100px", lg: "120px" } }}
                onClick={handleInputClick}
                onChange={handleEuroChange}
              />
              <CurrencyLabel>
                €
              </CurrencyLabel>
            </ExchangeSection>

            {/* Add to Cart Buttons */}
            <Box>
              {/* Desktop Button */}
              <AddToCartButton
                sx={{ display: { xs: "none", lg: "flex" } }}
                variant="contained"
                color="gold"
                onClick={addToCart}
                disabled={!exchangeFrom || exchangeFrom <= 0}
              >
                Ajouter au panier
              </AddToCartButton>

              {/* Mobile Button */}
              <AddToCartButton
                sx={{ 
                  display: { xs: "flex", lg: "none" },
                  minWidth: "48px",
                  width: "48px",
                  height: "40px"
                }}
                variant="contained"
                color="gold"
                onClick={addToCart}
                disabled={!exchangeFrom || exchangeFrom <= 0}
              >
                <ShoppingCartIcon fontSize="small" />
              </AddToCartButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ExchangeCard>
  );
}
