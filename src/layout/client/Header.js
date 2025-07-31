import { Box, Typography } from "@mui/material";
import "../../css/layout.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState, useEffect, useReducer, useRef } from "react";
import AccountPopOver from "../../pages/client/about/AccountPopOver";
import { usePopover } from "../../hooks/usePopover";
import { isClient } from "../../auth/handleJWT";
import AuthenticationContext from "../../auth/AuthenticationContext";
import CartContext from "../../sharedComponents/CartContext";
import { observer } from "mobx-react";
import { useContextStore } from "../../stores/RootStoreContext";
import { styled } from "@mui/material/styles";
import NavigationMenu from "./NavigationMenu";

const initialState = {
  isBurgerBarOpened: false,
  isCourOpen: false,
  isAllertOpen: false,
  isSearchBarVisible: false,
  conf: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_BURGER_BAR":
      return { ...state, isBurgerBarOpened: !state.isBurgerBarOpened };
    case "TOGGLE_COUR_OPEN":
      return { ...state, isCourOpen: !state.isCourOpen, isAllertOpen: false };
    case "TOGGLE_ALLERT_OPEN":
      return { ...state, isAllertOpen: !state.isAllertOpen, isCourOpen: false };
    case "TOGGLE_SEARCH_BAR":
      return { ...state, isSearchBarVisible: !state.isSearchBarVisible };
    case "SET_CONF":
      return { ...state, conf: action.payload };
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
  const StyledImg = styled("img")({});

  useEffect(() => {
    const fetchConfiguration = async () =>
      store.globalStoreClient.loadTopBanner();
    fetchConfiguration().then((result) => {
      dispatch({ type: "SET_CONF", payload: result });
    });
    return () => { };
  }, [store.globalStoreClient]);

  //get width of bar
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setWidth(ref.current ? ref.current.offsetWidth : 0);
    });
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleToggleBurgerBar = () => {
    dispatch({ type: "TOGGLE_BURGER_BAR" });
  };

  const handleToggleCourOpen = () => {
    dispatch({ type: "TOGGLE_COUR_OPEN" });
  };

  const handleToggleAllertOpen = () => {
    dispatch({ type: "TOGGLE_ALLERT_OPEN" });
  };

  const handleToggleSearchBar = () => {
    dispatch({ type: "TOGGLE_SEARCH_BAR" });
  };

  return (
    <>
      {!store.globalStoreClient.isLoadingTopBanner && (
        <header>
          <Box
            sx={{
              position: { xs: "fixed", md: "initial", top: "0" },
              zIndex: 100,
            }}
          >
            <Box
              sx={{
                background: "#000",
                color: "#FFF",
                zIndex: "100",
                height: "1.5rem",
              }}
            >
              <div>{state.conf && state.conf.data && <marquee>{state.conf.data.offers}</marquee>}</div>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "1rem 0",
                position: { xs: "fixed", md: "initial" },
                zIndex: "100",
                width: "100%",
                background: "#eee",
              }}
            >
              <MenuIcon
                onClick={() => {
                  handleToggleBurgerBar(!state.isBurgerBarOpened);
                }}
                sx={{
                  display: { xs: "block", lg: "none" },
                  cursor: "pointer",
                  width: "4rem",
                  margin: "auto",
                  fontSize: { xs: "22px", sm: "28px" },
                }}
              />
              <Box
                sx={{
                  display: { lg: "flex" },
                  width: { lg: width },
                  justifyContent: "space-between",
                }}
              >
                <Link
                  to={"https://www.change-or-enligne.com/"}
                  title="Change et Or Bastille"
                >
                  <StyledImg
                    sx={{
                      width: "100%",
                      height: { xs: "80px", md: "120px" },
                      objectFit: "contain",
                      margin: { xs: "auto", sm: "initial" },
                      cursor: "pointer",
                    }}
                    height="120px"
                    width={"200px"}
                    alt="bureau de change en ligne"
                    src="/Bureau-de-change-en-ligne.webp"
                  />
                </Link>
                <Box
                  sx={{
                    display: { lg: "flex", xs: "none" },
                    margin: "auto 0",
                    gap: "20px",
                  }}
                >
                  <Box
                    display={"flex"}
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(
                        "https://maps.app.goo.gl/oc4pVS4hMJcxeQYC8?g_st=ic",
                        "_blank"
                      )
                    }
                    gap="5px"
                  >
                    <StyledImg
                      sx={{
                        height: "17px",
                        color: "white",
                        objectFit: "contain",
                      }}
                      alt="location"
                      src="/pinblack.png"
                    />
                    <Typography variant="body2">
                      18 Rue Saint-Antoine 75004 PARIS
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    gap="5px"
                    style={{ cursor: "pointer" }}
                    onClick={() => window.open("tel:0956041425")}
                  >
                    <StyledImg
                      sx={{
                        height: "17px",
                        color: "white",
                        objectFit: "contain",
                      }}
                      alt="phone number"
                      src="/phoneblack.png"
                    />
                    <Typography variant="body2">09 56 04 14 25</Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    gap="5px"
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate("/nous-contacter")}
                  >
                    <StyledImg
                      sx={{
                        height: "17px",
                        color: "white",
                        objectFit: "contain",
                      }}
                      alt="nous contacter"
                      src="/messageblack.png"
                    />
                    <Typography variant="body2">Nous Contacter</Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: { xs: "flex", lg: "none" },
                  gap: { xs: "5px", sm: "20px" },

                  margin: "auto",
                }}
              >
                <Box>
                  <SearchIcon
                    onClick={() =>
                      handleToggleSearchBar(!state.isSearchBarVisible)
                    }
                    sx={{
                      fontSize: { xs: "22px", sm: "28px" },
                      cursor: "pointer",
                    }}
                  />
                </Box>
                <Box>
                  <PersonOutlineIcon
                    onClick={() => {
                      isClient(claims)
                        ? accountPopover.handleOpen()
                        : navigate("/connexion");
                    }}
                    ref={accountPopover.anchorRef}
                    sx={{
                      fontSize: { xs: "21px", sm: "28px" },
                      position: "relative",
                    }}
                  ></PersonOutlineIcon>

                  <AccountPopOver
                    anchorEl={accountPopover.anchorRef.current}
                    open={accountPopover.open}
                    onClose={accountPopover.handleClose}
                  />
                </Box>

                <ShoppingCartIcon
                  onClick={() =>
                    navigate(cartItems.length > 0 ? "/panier" : "/panier-vide")
                  }
                  sx={{
                    fontSize: { xs: "21px", sm: "28px" },
                    display: { xs: "block", lg: "none" },
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            className={state.isBurgerBarOpened ? "openNav" : "displayNone"}
            sx={{
              overflowY: "scroll",
              zIndex: "10000",
              position: "fixed",
              borderRadius: "0 0 10px 10px",
              background: "#eeeeee",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "10px",
              }}
            >
              <CloseIcon
                sx={{ marginLeft: "auto" }}
                onClick={() => handleToggleBurgerBar(!state.isBurgerBarOpened)}
              />
              <Link
                to="/cours-des-devises"
                style={{
                  color: "#000",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Acheter des devises
              </Link>
              <Box sx={{ position: "relative" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#000",
                    textDecoration: "none",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                  onClick={() => {
                    handleToggleCourOpen();
                    // handleToggleAllertOpen();
                  }}
                >
                  Cours de l’or
                  {state.isCourOpen ? (
                    <KeyboardArrowDownIcon
                      sx={{ position: "relative", top: "7px", left: "4px" }}
                    />
                  ) : (
                    <KeyboardArrowUpIcon
                      sx={{ position: "relative", top: "7px", left: "4px" }}
                    />
                  )}
                </Typography>
                <Box
                  sx={{
                    display: state.isCourOpen ? "flex" : "none",
                    flexDirection: "column",
                    width: "auto",
                    textAlign: "left",
                    zIndex: "100",
                    flexDirection: "column",
                    gap: "15px",
                    marginTop: "15px",
                  }}
                >
                  <Link
                    to="/pieces-or-investissement"
                    style={{
                      color: "#000",
                      textDecoration: "none",
                      padding: "0 1rem",
                      fontWeight: "600",
                    }}
                  >
                    Achetez des pièces d’or d’investissement
                  </Link>
                  <Link
                    to="/lingots-lingotins-or"
                    style={{
                      color: "#000",
                      textDecoration: "none",
                      padding: "0 1rem",
                      fontWeight: "600",
                    }}
                  >
                    Achetez des lingots et lingotin d’or
                  </Link>
                  <Link
                    to="/pieces-or-collection"
                    style={{
                      color: "#000",
                      textDecoration: "none",
                      padding: "0 1rem",
                      fontWeight: "600",
                    }}
                  >
                    Achetez des pieces d’or de collection
                  </Link>
                  <Link
                    to="/pourquoi-investir-dans-or"
                    style={{
                      color: "#000",
                      textDecoration: "none",
                      padding: "0 1rem",
                      fontWeight: "600",
                    }}
                  >
                    Pourquoi investir dans l’or?
                  </Link>
                </Box>
              </Box>
              <Link
                to="/rachat-bijoux-or"
                style={{
                  color: "#000",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Rachat Bijoux en Or
              </Link>
              <Box sx={{ position: "relative" }}>
                <Typography
                  onClick={() => {
                    handleToggleAllertOpen();
                  }}
                  sx={{
                    color: "#000",
                    textDecoration: "none",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: { md: "1rem" },
                  }}
                >
                  Alerte Meilleur Taux
                  {state.isAllertOpen ? (
                    <KeyboardArrowDownIcon
                      sx={{ position: "relative", top: "7px", left: "4px" }}
                    />
                  ) : (
                    <KeyboardArrowUpIcon
                      sx={{ position: "relative", top: "7px", left: "4px" }}
                    />
                  )}
                </Typography>
                <Box
                  sx={{
                    display: state.isAllertOpen ? "flex" : "none",
                    width: "auto",
                    textAlign: "left",
                    flexDirection: "column",
                    gap: "20px",
                    flexDirection: "column",
                    marginTop: "15px",
                  }}
                >
                  <Link
                    to="/alerte-meilleur-taux-devises"
                    style={{
                      color: "#000",
                      textDecoration: "none",
                      padding: "0 1rem",
                      fontWeight: "600",
                    }}
                  >
                    Devises
                  </Link>
                  <Link
                    to="/alerte-meilleur-taux-or"
                    style={{
                      color: "#000",
                      textDecoration: "none",
                      padding: "0 1rem",
                      fontWeight: "600",
                    }}
                  >
                    Or d’investissement
                  </Link>
                </Box>
              </Box>
              <Link
                to="/Nouvelles"
                style={{
                  color: "#000",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Nouvelles
              </Link>
              <Link
                to="/faq-questions-frequentes"
                style={{
                  color: "#000",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                FAQ
              </Link>
            </Box>
          </Box>
          <NavigationMenu
            customRef={ref}
            isSearchBarVisible={state.isSearchBarVisible}
          />
        </header>
      )}
    </>
  );
});
