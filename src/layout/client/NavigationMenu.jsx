import ClientDetails from "./ClientDetails";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";
import "../../css/layout.css";
import agent from "../../agent";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SearchAutoComplete from "./SearchAutoComplete";
import { styled } from "@mui/material/styles";

// Styled components for better design
const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundImage: "url('/gold-background.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  minHeight: "500px",
  position: "relative",
  marginTop: { xs: "130px", md: "0" },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
    zIndex: 1,
  },
}));

const FloatingContactButtons = styled(Box)(({ theme }) => ({
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  right: "20px",
  bottom: { xs: "100px", md: "50%" },
  zIndex: 10001,
  transform: { md: "translateY(50%)" },
}));

const ContactButton = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #EEAC1F 0%, #E69500 100%)",
  padding: "12px",
  borderRadius: "50%",
  cursor: "pointer",
  boxShadow: "0 6px 20px rgba(238, 172, 31, 0.4)",
  transition: "all 0.3s ease-in-out",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    transform: "scale(1.1) translateY(-2px)",
    boxShadow: "0 8px 30px rgba(238, 172, 31, 0.6)",
    background: "linear-gradient(135deg, #FFD700 0%, #FFC700 100%)",
  },
}));

const ContactIcon = styled("img")(({ theme }) => ({
  height: "24px",
  width: "24px",
  objectFit: "contain",
  filter: "brightness(0) invert(1)",
}));

const DesktopNavBar = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translateX(-50%)",
  background: "rgba(240, 240, 240, 0.95)",
  backdropFilter: "blur(10px)",
  padding: "1rem 2rem",
  borderRadius: "12px",
  display: { xs: "none", lg: "flex" },
  alignItems: "center",
  gap: { md: "2rem", lg: "3rem" },
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  border: "1px solid rgba(255,255,255,0.2)",
  minWidth: "800px",
  justifyContent: "space-between",
}));

const NavLinksContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: { md: "1.5rem", lg: "2rem" },
}));

const NavLink = styled(Link)(({ theme, isActive }) => ({
  color: "#333",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: { md: "12px", lg: "14px", xl: "16px" },
  padding: "8px 12px",
  borderRadius: "8px",
  position: "relative",
  transition: "all 0.3s ease-in-out",
  background: isActive ? "rgba(255,215,0,0.1)" : "transparent",
  borderBottom: isActive ? "2px solid #FFD700" : "2px solid transparent",
  "&:hover": {
    color: "#FFD700",
    background: "rgba(255,215,0,0.1)",
    transform: "translateY(-1px)",
  },
}));

const DropdownContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  margin: "auto 0",
}));

const DropdownTrigger = styled(Typography)(({ theme, isActive }) => ({
  color: "#333",
  fontWeight: 600,
  fontSize: { md: "12px", lg: "14px", xl: "16px" },
  cursor: "pointer",
  padding: "8px 12px",
  borderRadius: "8px",
  transition: "all 0.3s ease-in-out",
  background: isActive ? "rgba(255,215,0,0.1)" : "transparent",
  borderBottom: isActive ? "2px solid #FFD700" : "2px solid transparent",
  "&:hover": {
    color: "#FFD700",
    background: "rgba(255,215,0,0.1)",
  },
}));

const DropdownMenu = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#fff",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
  minWidth: "280px",
  zIndex: 1000,
  opacity: 0,
  visibility: "hidden",
  transition: "all 0.3s ease-in-out",
  marginTop: "8px",
  ".alertBoxPopUp:hover &": {
    opacity: 1,
    visibility: "visible",
  },
}));

const DropdownLink = styled(Link)(({ theme, isActive }) => ({
  color: "#333",
  textDecoration: "none",
  padding: "12px 16px",
  display: "block",
  fontSize: "14px",
  background: isActive ? "#f5f5f5" : "transparent",
  transition: "all 0.3s ease-in-out",
  borderLeft: isActive ? "3px solid #FFD700" : "3px solid transparent",
  "&:hover": {
    background: "#f8f9fa",
    color: "#FFD700",
    borderLeftColor: "#FFD700",
    paddingLeft: "20px",
  },
  "&:first-of-type": {
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },
  "&:last-of-type": {
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "15px",
}));

const SearchPaper = styled(Paper)(({ theme }) => ({
  padding: "4px 8px",
  display: "flex",
  alignItems: "center",
  width: { lg: 250, xl: 320 },
  height: "40px",
  borderRadius: "10px",
  border: "2px solid transparent",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    borderColor: "#FFD700",
    boxShadow: "0 4px 12px rgba(255,215,0,0.2)",
  },
  "&:focus-within": {
    borderColor: "#FFD700",
    boxShadow: "0 0 0 3px rgba(255,215,0,0.1)",
  },
}));

const HeroTextContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "2rem",
  left: "50%",
  transform: "translateX(-50%)",
  textAlign: "center",
  zIndex: 2,
  color: "white",
  maxWidth: "600px",
  padding: "0 1rem",
}));

const MobileSearchContainer = styled(Paper)(({ theme, isVisible }) => ({
  position: "absolute",
  bottom: "6rem",
  left: "50%",
  transform: "translateX(-50%)",
  width: "90%",
  maxWidth: "400px",
  zIndex: 3,
  borderRadius: "12px",
  display: isVisible ? "block" : "none",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
}));

export default function NavigationMenu(props) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State management
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Search functionality
  const handleSearchChange = useCallback(async (event) => {
    const value = event.target.value;
    setSearchText(value);
    
    if (value.length > 2) {
      try {
        const result = await agent.metals.Search(value);
        setOptions(result.data || []);
      } catch (error) {
        console.error("Search error:", error);
        setOptions([]);
      }
    } else {
      setOptions([]);
    }
  }, []);

  // Navigation helpers
  const isCourGold = useCallback(() => {
    return [
      "/pieces-or-collection",
      "/pourquoi-investir-dans-or", 
      "/lingots-lingotins-or",
      "/pieces-or-investissement"
    ].some(path => location.pathname.includes(path));
  }, [location.pathname]);

  const isAlertActive = useCallback(() => {
    return [
      "/alerte-meilleur-taux-devises",
      "/alerte-meilleur-taux-or"
    ].some(path => location.pathname.includes(path));
  }, [location.pathname]);

  // Handle search item selection
  const handleChangeSelectedItem = useCallback((event) => {
    const type = event.target.getAttribute("type");
    const id = event.target.getAttribute("itemId");
    const name = event.target.innerText;
    
    if (!id) return;
    
    const formattedName = name.replaceAll(" ", "-");
    let url;
    
    switch (type) {
      case "Piece D'investissment":
        url = `/pieces-or-investissement/${formattedName}/${id}`;
        break;
      case "Piece De Collection":
        url = `/pieces-or-collection/${formattedName}/${id}`;
        break;
      case "bills":
        url = `/cours-des-devises/${formattedName}/${id}`;
        break;
      default:
        url = `/lingots-lingotins-or/${formattedName}/${id}`;
    }
    
    navigate(url);
  }, [navigate]);

  // Contact handlers
  const handlePhoneClick = () => {
    window.open("tel:0956041425");
  };

  const handleContactClick = () => {
    navigate("/nous-contacter");
  };

  return (
    <HeroContainer className="hero-image" alt="Meilleur bureau de change en ligne">
      {/* Floating Contact Buttons */}
      <FloatingContactButtons>
        <ContactButton onClick={handlePhoneClick}>
          <ContactIcon
            alt="phone"
            src="/phone.png"
            onError={(e) => {
              e.target.src = '/placeholder-phone.png';
            }}
          />
        </ContactButton>
        
        <ContactButton onClick={handleContactClick}>
          <ContactIcon
            alt="message"
            src="/message.png"
            onError={(e) => {
              e.target.src = '/placeholder-message.png';
            }}
          />
        </ContactButton>
      </FloatingContactButtons>

      {/* Desktop Navigation Bar */}
      <DesktopNavBar ref={props.customRef} className="TopBar">
        <NavLinksContainer>
          <NavLink 
            to="/cours-des-devises"
            isActive={location.pathname === "/cours-des-devises"}
          >
            Acheter des devises
          </NavLink>

          {/* Cours de l'or Dropdown */}
          <DropdownContainer className="alertBoxPopUp">
            <DropdownTrigger isActive={isCourGold()}>
              Cours de l'or
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownLink 
                to="/pieces-or-investissement"
                isActive={location.pathname === "/pieces-or-investissement"}
              >
                Achetez des pièces d'or d'investissement
              </DropdownLink>
              <DropdownLink 
                to="/lingots-lingotins-or"
                isActive={location.pathname === "/lingots-lingotins-or"}
              >
                Achetez des lingots et lingotin d'or
              </DropdownLink>
              <DropdownLink 
                to="/pieces-or-collection"
                isActive={location.pathname === "/pieces-or-collection"}
              >
                Achetez des pièces d'or de collection
              </DropdownLink>
              <DropdownLink 
                to="/pourquoi-investir-dans-or"
                isActive={location.pathname === "/pourquoi-investir-dans-or"}
              >
                Pourquoi investir dans l'or?
              </DropdownLink>
            </DropdownMenu>
          </DropdownContainer>

          <NavLink 
            to="/rachat-bijoux-or"
            isActive={location.pathname === "/rachat-bijoux-or"}
          >
            Rachat Bijoux en Or
          </NavLink>

          {/* Alerte Meilleur Taux Dropdown */}
          <DropdownContainer className="alertBoxPopUp">
            <DropdownTrigger isActive={isAlertActive()}>
              Alerte Meilleur Taux
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownLink 
                to="/alerte-meilleur-taux-devises"
                isActive={location.pathname === "/alerte-meilleur-taux-devises"}
              >
                Devises
              </DropdownLink>
              <DropdownLink 
                to="/alerte-meilleur-taux-or"
                isActive={location.pathname === "/alerte-meilleur-taux-or"}
              >
                Or d'investissement
              </DropdownLink>
            </DropdownMenu>
          </DropdownContainer>

          <NavLink 
            to="/Nouvelles"
            isActive={location.pathname === "/Nouvelles"}
          >
            Nouvelles
          </NavLink>

          <NavLink 
            to="/faq-questions-frequentes"
            isActive={location.pathname === "/faq-questions-frequentes"}
          >
            FAQ
          </NavLink>
        </NavLinksContainer>

        {/* Search and User Actions */}
        <SearchContainer>
          <SearchPaper elevation={0}>
            <SearchAutoComplete
              options={options}
              handleChangeSelectedItem={handleChangeSelectedItem}
              text={searchText}
              handleChange={handleSearchChange}
              setText={setSearchText}
            />
          </SearchPaper>
          <ClientDetails />
        </SearchContainer>
      </DesktopNavBar>

      {/* Mobile Search Bar */}
      <MobileSearchContainer isVisible={props.isSearchBarVisible} elevation={3}>
        <SearchAutoComplete
          options={options}
          handleChangeSelectedItem={handleChangeSelectedItem}
          text={searchText}
          handleChange={handleSearchChange}
          setText={setSearchText}
        />
      </MobileSearchContainer>

      {/* Hero Text */}
      <HeroTextContainer className="hero-text">
        <Typography
          variant="h1"
          sx={{ 
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            fontWeight: 700,
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            marginBottom: 2,
            lineHeight: 1.2,
          }}
        >
          Le Monde à votre Portée, L'Or entre vos Mains
        </Typography>
        <Typography
          variant="h2"
          sx={{ 
            fontSize: { xs: "1rem", sm: "1.2rem" },
            fontWeight: 300,
            opacity: 0.9,
            textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
          }}
        >
          Bureau de change et métaux précieux en ligne
        </Typography>
      </HeroTextContainer>
    </HeroContainer>
  );
}
