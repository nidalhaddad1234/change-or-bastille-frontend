import { Box, Typography, Autocomplete, TextField, Paper, Button } from "@mui/material";
import "../../css/layout.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState, useEffect, useReducer, useRef, useCallback } from "react";
import AccountPopOver from "../../pages/client/about/AccountPopOver";
import { usePopover } from "../../hooks/usePopover";
import { isClient } from "../../auth/handleJWT";
import AuthenticationContext from "../../auth/AuthenticationContext";
import CartContext from "../../sharedComponents/CartContext";
import { observer } from "mobx-react";
import { useContextStore } from "../../stores/RootStoreContext";
import { styled } from "@mui/material/styles";
import NavigationMenu from "./NavigationMenu.jsx";
import SearchAutoComplete from "./SearchAutoComplete.jsx";

// Styled components matching the live website structure
const HeaderContainer = styled("header")(({ theme }) => ({
  position: "relative",
  zIndex: 1000,
}));

const MarqueeContainer = styled(Box)(({ theme }) => ({
  background: "#000",
  color: "#FFF",
  height: "1.5rem",
  overflow: "hidden",
  zIndex: 100,
  "& marquee": {
    height: "100%",
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    fontWeight: 400,
  },
}));

const MainHeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  background: "#eee",
  position: { xs: "fixed", md: "relative" },
  top: { xs: "1.5rem", md: "auto" },
  left: 0,
  right: 0,
  zIndex: 100,
  minHeight: "80px",
  boxShadow: { xs: "0 2px 8px rgba(0,0,0,0.1)", md: "none" },
}));

const MobileMenuIcon = styled(MenuIcon)(({ theme }) => ({
  display: { xs: "block", lg: "none" },
  cursor: "pointer",
  fontSize: "28px",
  color: "#333",
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: "#FFD700",
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flex: { xs: 1, lg: "none" },
  justifyContent: { xs: "center", lg: "flex-start" },
}));

const LogoImage = styled("img")(({ theme }) => ({
  height: { xs: "60px", md: "80px", lg: "120px" },
  width: "auto",
  objectFit: "contain",
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const ContactInfoContainer = styled(Box)(({ theme }) => ({
  display: { xs: "none", lg: "flex" },
  alignItems: "center",
  gap: "20px",
  margin: "auto 0",
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  padding: "8px",
  borderRadius: "8px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    background: "rgba(255,215,0,0.1)",
    transform: "translateY(-1px)",
  },
}));

const ContactIcon = styled("img")(({ theme }) => ({
  height: "18px",
  width: "18px",
  objectFit: "contain",
}));

const ContactText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 500,
  color: "#333",
  whiteSpace: "nowrap",
}));

const ActionButtonsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: { xs: "8px", sm: "15px" },
}));

const ActionButton = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  padding: "8px",
  borderRadius: "50%",
  transition: "all 0.3s ease-in-out",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    background: "rgba(255,215,0,0.2)",
    transform: "scale(1.1)",
  },
  "& .MuiSvgIcon-root": {
    fontSize: { xs: "22px", sm: "28px" },
    color: "#333",
  },
}));

const MobileNavContainer = styled(Box)(({ theme, isOpen }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  zIndex: 10000,
  display: isOpen ? "block" : "none",
}));

const MobileNavContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  maxHeight: "90vh",
  overflowY: "auto",
  background: "#fff",
  borderRadius: "0 0 20px 20px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  padding: "1rem",
}));

const NavCloseButton = styled(CloseIcon)(({ theme }) => ({
  marginLeft: "auto",
  cursor: "pointer",
  fontSize: "28px",
  color: "#333",
  marginBottom: "1rem",
  "&:hover": {
    color: "#FFD700",
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: "#333",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "16px",
  padding: "12px 0",
  display: "block",
  borderBottom: "1px solid #f0f0f0",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    color: "#FFD700",
    paddingLeft: "10px",
  },
}));

const DropdownToggle = styled(Typography)(({ theme }) => ({
  color: "#333",
  fontWeight: 600,
  fontSize: "16px",
  cursor: "pointer",
  padding: "12px 0",
  borderBottom: "1px solid #f0f0f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: "#FFD700",
  },
}));

const DropdownContent = styled(Box)(({ theme, isOpen }) => ({
  display: isOpen ? "block" : "none",
  paddingLeft: "20px",
  marginTop: "8px",
  borderLeft: "2px solid #FFD700",
}));

const DropdownLink = styled(Link)(({ theme }) => ({
  color: "#666",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "14px",
  padding: "8px 0",
  display: "block",
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: "#FFD700",
  },
}));

// State management
const initialState = {
  isBurgerBarOpened: false,
  isCourOpen: false,
  isAlertOpen: false,
  isSearchBarVisible: false,
  conf: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_BURGER_BAR":
      return { ...state, isBurgerBarOpened: !state.isBurgerBarOpened };
    case "TOGGLE_COUR_OPEN":
      return { ...state, isCourOpen: !state.isCourOpen, isAlertOpen: false };
    case "TOGGLE_ALERT_OPEN":
      return { ...state, isAlertOpen: !state.isAlertOpen, isCourOpen: false };
    case "TOGGLE_SEARCH_BAR":
      return { ...state, isSearchBarVisible: !state.isSearchBarVisible };
    case "SET_CONF":
      return { ...state, conf: action.payload };
    case "CLOSE_ALL":
      return { ...state, isBurgerBarOpened: false, isCourOpen: false, isAlertOpen: false };
    default:
      return state;
  }
}

export default observer(function Header() {
  const accountPopover = usePopover();
  const [state, dispatch] = useReducer(reducer, initialState);
  const store = useContextStore();
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { claims } = useContext(AuthenticationContext);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  // Fetch configuration data
  const fetchConfiguration = useCallback(async () => {
    try {
      const result = await store.globalStoreClient.loadTopBanner();
      dispatch({ type: "SET_CONF", payload: result });
    } catch (error) {
      console.error("Error loading header configuration:", error);
    }
  }, [store.globalStoreClient]);

  useEffect(() => {
    fetchConfiguration();
  }, [fetchConfiguration]);

  // Get width of header for layout calculations
  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      setWidth(ref.current ? ref.current.offsetWidth : 0);
    });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // Event handlers
  const handleToggleBurgerBar = () => {
    dispatch({ type: "TOGGLE_BURGER_BAR" });
  };

  const handleToggleCourOpen = () => {
    dispatch({ type: "TOGGLE_COUR_OPEN" });
  };

  const handleToggleAlertOpen = () => {
    dispatch({ type: "TOGGLE_ALERT_OPEN" });
  };

  const handleToggleSearchBar = () => {
    dispatch({ type: "TOGGLE_SEARCH_BAR" });
  };

  const handleContactClick = (type) => {
    switch (type) {
      case "location":
        window.open("https://maps.app.goo.gl/oc4pVS4hMJcxeQYC8?g_st=ic", "_blank");
        break;
      case "phone":
        window.open("tel:0956041425");
        break;
      case "contact":
        navigate("/nous-contacter");
        break;
      default:
        break;
    }
  };

  const handleAccountClick = () => {
    if (isClient(claims)) {
      accountPopover.handleOpen();
    } else {
      navigate("/connexion");
    }
  };

  const handleCartClick = () => {
    navigate(cartItems.length > 0 ? "/panier" : "/panier-vide");
  };

  const getTotalCartValue = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity || 0), 0).toFixed(2);
  };

  // Close mobile menu when clicking outside
  const handleMobileNavClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch({ type: "TOGGLE_BURGER_BAR" });
    }
  };

  if (store.globalStoreClient.isLoadingTopBanner) {
    return null;
  }

  return (
    <HeaderContainer>
      {/* Marquee Banner */}
      <MarqueeContainer>
        {state.conf?.data?.offers && (
          <marquee>
            {state.conf.data.offers}
          </marquee>
        )}
      </MarqueeContainer>

      {/* Main Header */}
      <MainHeaderContainer ref={ref}>
        {/* Mobile Menu Icon */}
        <MobileMenuIcon onClick={handleToggleBurgerBar} />

        {/* Logo Section */}
        <LogoContainer>
          <Link to="/" title="Change et Or Bastille">
            <LogoImage
              alt="bureau de change en ligne"
              src="/Bureau-de-change-en-ligne.webp"
              onError={(e) => {
                e.target.src = '/placeholder-logo.png';
              }}
            />
          </Link>
        </LogoContainer>

        {/* Contact Information (Desktop) */}
        <ContactInfoContainer>
          <ContactItem onClick={() => handleContactClick("location")}>
            <ContactIcon alt="location" src="/pinblack.png" />
            <ContactText>18 Rue Saint-Antoine 75004 PARIS</ContactText>
          </ContactItem>

          <ContactItem onClick={() => handleContactClick("phone")}>
            <ContactIcon alt="phone number" src="/phoneblack.png" />
            <ContactText>09 56 04 14 25</ContactText>
          </ContactItem>

          <ContactItem onClick={() => handleContactClick("contact")}>
            <ContactIcon alt="nous contacter" src="/messageblack.png" />
            <ContactText>Nous Contacter</ContactText>
          </ContactItem>
        </ContactInfoContainer>

        {/* Search Component (Desktop) */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', flex: 1, justifyContent: 'center', maxWidth: '400px', mx: 2 }}>
          <SearchAutoComplete />
        </Box>

        {/* Action Buttons */}
        <ActionButtonsContainer>
          {/* Search Icon (Mobile) */}
          <ActionButton 
            sx={{ display: { xs: "flex", lg: "none" } }}
            onClick={handleToggleSearchBar}
          >
            <SearchIcon />
          </ActionButton>

          {/* User Account */}
          <ActionButton onClick={handleAccountClick} ref={accountPopover.anchorRef}>
            <PersonOutlineIcon />
          </ActionButton>

          {/* Shopping Cart */}
          <ActionButton onClick={handleCartClick}>
            <ShoppingCartIcon />
          </ActionButton>

          {/* Account Popover */}
          <AccountPopOver
            anchorEl={accountPopover.anchorRef.current}
            open={accountPopover.open}
            onClose={accountPopover.handleClose}
          />
        </ActionButtonsContainer>
      </MainHeaderContainer>

      {/* Mobile Search Overlay */}
      {state.isSearchBarVisible && (
        <MobileNavContainer isOpen={state.isSearchBarVisible} onClick={() => dispatch({ type: 'TOGGLE_SEARCH_BAR' })}>
          <MobileNavContent onClick={(e) => e.stopPropagation()}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>Recherche</Typography>
              <NavCloseButton onClick={() => dispatch({ type: 'TOGGLE_SEARCH_BAR' })} />
            </Box>
            <SearchAutoComplete 
              onClose={() => dispatch({ type: 'TOGGLE_SEARCH_BAR' })}
              sx={{ width: '100%', maxWidth: 'none' }}
            />
          </MobileNavContent>
        </MobileNavContainer>
      )}

      {/* Mobile Navigation Overlay */}
      <MobileNavContainer isOpen={state.isBurgerBarOpened} onClick={handleMobileNavClick}>
        <MobileNavContent onClick={(e) => e.stopPropagation()}>
          <NavCloseButton onClick={handleToggleBurgerBar} />

          {/* Navigation Links */}
          <NavLink to="/cours-des-devises" onClick={() => dispatch({ type: "CLOSE_ALL" })}>
            Acheter des devises
          </NavLink>

          {/* Cours de l'or Dropdown */}
          <DropdownToggle onClick={handleToggleCourOpen}>
            Cours de l'or
            {state.isCourOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </DropdownToggle>
          <DropdownContent isOpen={state.isCourOpen}>
            <DropdownLink to="/pieces-or-investissement" onClick={() => dispatch({ type: "CLOSE_ALL" })}>
              Achetez des pièces d'or d'investissement
            </DropdownLink>
            <DropdownLink to="/lingots-lingotins-or" onClick={() => dispatch({ type: "CLOSE_ALL" })}>
              Achetez des lingots et lingotin d'or
            </DropdownLink>
            <DropdownLink to="/pieces-or-collection" onClick={() => dispatch({ type: "CLOSE_ALL" })}>
              Achetez des pièces d'or de collection
            </DropdownLink>
            <DropdownLink to="/pourquoi-investir-dans-or" onClick={() => dispatch({ type: "CLOSE_ALL" })}>
              Pourquoi investir dans l'or?
            </DropdownLink>
          </DropdownContent>

          <NavLink to="/rachat-bijoux-or" onClick={() => dispatch({ type: "CLOSE_ALL" })}>
            Rachat Bijoux en Or
          </NavLink>

          {/* Alerte Meilleur Taux Dropdown */}
          <DropdownToggle onClick={handleToggleAlertOpen}>
            Alerte Meilleur Taux
            {state.isAlertOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </DropdownToggle>
          <DropdownContent isOpen={state.isAlertOpen}>
            <DropdownLink to="/alerte-meilleur-taux-devises" onClick={() => dispatch({ type: "CLOSE_ALL" })}>
              Devises
            </DropdownLink>
            <DropdownLink to="/alerte-meilleur-taux-or" onClick={() => dispatch({ type: "CLOSE_ALL" })}>
              Or d'investissement
            </DropdownLink>
          </DropdownContent>

          <NavLink to="/Nouvelles" onClick={() => dispatch({ type: "CLOSE_ALL" })}>
            Nouvelles
          </NavLink>

          <NavLink to="/faq-questions-frequentes" onClick={() => dispatch({ type: "CLOSE_ALL" })}>
            FAQ
          </NavLink>
        </MobileNavContent>
      </MobileNavContainer>

      {/* Navigation Menu Component */}
      <NavigationMenu
        customRef={ref}
        isSearchBarVisible={state.isSearchBarVisible}
      />
    </HeaderContainer>
  );
});
