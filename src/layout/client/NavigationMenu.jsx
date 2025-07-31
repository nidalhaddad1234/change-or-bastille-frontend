import ClientDetails from "./ClientDetails";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import "../../css/layout.css";
import agent from "../../agent";
import { useState, useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import SearchAutoComplete from "./SearchAutoComplete";
import { styled } from "@mui/material/styles";
export default function NavigationMenu(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const StyledImg = styled("img")({});
  const [options, setOptions] = useState([]);
  const [text, setText] = useState("");
  const handleChange = async (e) => {
    try {
      var result = await agent.metals.Search(e.target.value);
      setOptions(result.data);
    } catch (er) {}
  };

  const isCourGold = () => {
    return (
      location.pathname.indexOf("pieces-or-collection") > 0 ||
      location.pathname.indexOf("pourquoi-investir-dans-or") > 0 ||
      location.pathname.indexOf("lingots-lingotins-or") > 0 ||
      location.pathname.indexOf("pieces-or-investissement") > 0
    );
  };

  const allertActive = () => {
    return (
      location.pathname.indexOf("alerte-meilleur-taux-devises") > 0 ||
      location.pathname.indexOf("alerte-meilleur-taux-or") > 0
    );
  };
  const handleChangeSelectedItem = (e) => {
    const type = e.target.getAttribute("type");
    const id = e.target.getAttribute("itemId");
    if (id === null) return;
    navigate(
      type === "Piece D'investissment"
        ? `/pieces-or-investissement/${e.target.innerText.replaceAll(
            " ",
            "-",
          )}/${id}`
        : type === "Piece De Collection"
        ? `/pieces-or-collection/${e.target.innerText.replaceAll(
            " ",
            "-",
          )}/${id}`
        : type === "bills"
        ? `/cours-des-devises/${e.target.innerText.replaceAll(" ", "-")}/${id}`
        : `/lingots-lingotins-or/${e.target.innerText.replaceAll(
            " ",
            "-",
          )}/${id}`,
    );
  };
  return (
    <Box
      className="hero-image"
      alt="Meilleur bureau de change en ligne"
      sx={{ marginTop: { xs: "10rem", md: "0" } }}
    >
      <Box className="overlay"></Box>
      <Box
        sx={{
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          right: "1rem",
          bottom: { xs: "10rem", md: "50%" },
          zIndex: "10001",
        }}
      >
        <Box
          sx={{
            background: "#EEAC1F",
            padding: "8px",
            display: "flex",
            margin: "auto",
            borderRadius: "100%",
            cursor: "pointer",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          <StyledImg
            sx={{
              objectFit: "scale-down",
              height: "22px",
            }}
            height="22px"
            width="22px"
            alt="phone"
            src="/phone.png"
            onClick={() => window.open("tel:0956041425")}
          />
        </Box>
        <Box
          sx={{
            background: "#EEAC1F",
            padding: "8px",
            display: "flex",
            margin: "auto",
            borderRadius: "100%",
            cursor: "pointer",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          <StyledImg
            height="22px"
            width="22px"
            sx={{
              objectFit: "scale-down",
              height: "25px",
            }}
            alt="message"
            src="/message.png"
            onClick={() => navigate("/nous-contacter")}
          />
        </Box>
      </Box>
      <Box
        className="TopBar"
        ref={props.customRef}
        sx={{
          position: "absolute",
          display: { xs: "none", lg: "flex" },
          top: "10%",
          background: "#F0F0F0",
          padding: "1rem 1rem",
          fontSize: { md: "10px", lg: "12px", xl: "15px" },
          gap: { sm: "2rem !important", md: "5rem" },
          lineHeight: "40px",
          textAlign: "center",
        }}
      >
        <Box display={"flex"} sx={{ gap: "15px" }}>
          <Link
            to="/cours-des-devises"
            className={
              location.pathname == "/cours-des-devises" ? "linkUnderline" : ""
            }
            style={{ color: "#000", textDecoration: "none", fontWeight: "600" }}
          >
            Acheter des devises
          </Link>
          <Box
            sx={{ position: "relative", margin: "auto" }}
            className="alertBoxPopUp"
          >
            <Typography
              variant="body2"
              sx={{
                color: "#000",
                textDecoration: "none",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: { md: "10px", lg: "12px", xl: "15px" },
              }}
              className={isCourGold() ? "linkUnderlineText" : ""}
            >
              Cours de l’or
            </Typography>
            <Box
              sx={{
                display: "none",
                width: "300px",
                textAlign: "left",
                position: "absolute",
                background: "#F0F0F0",
                border: "1px solid #cfcfcf",
                flexDirection: "column",
                fontSize: "13px",
              }}
            >
              <Link
                to="/pieces-or-investissement"
                style={{
                  color: "#000",
                  textDecoration: "none",
                  padding: "0 1rem",
                  background:
                    location.pathname == "/pieces-or-investissement"
                      ? "#dfdfdf"
                      : "",
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
                  background:
                    location.pathname == "/lingots-lingotins-or"
                      ? "#dfdfdf"
                      : "",
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
                  background:
                    location.pathname == "/pieces-or-collection"
                      ? "#dfdfdf"
                      : "",
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
                  background:
                    location.pathname == "/pourquoi-investir-dans-or"
                      ? "#dfdfdf"
                      : "",
                }}
              >
                Pourquoi investir dans l’or?
              </Link>
            </Box>
          </Box>

          <Link
            to="/rachat-bijoux-or"
            className={
              location.pathname == "/rachat-bijoux-or" ? "linkUnderline" : ""
            }
            style={{ color: "#000", textDecoration: "none", fontWeight: "600" }}
          >
            Rachat Bijoux en Or
          </Link>
          <Box
            sx={{ position: "relative", margin: "auto" }}
            className="alertBoxPopUp"
          >
            <Typography
              sx={{
                color: "#000",
                textDecoration: "none",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: { md: "10px", lg: "12px", xl: "15px" },
              }}
              className={allertActive() ? "linkUnderlineText" : ""}
            >
              Alerte Meilleur Taux
            </Typography>
            <Box
              sx={{
                display: "none",
                width: "180px",
                fontSize: "13px",
                textAlign: "left",
                position: "absolute",
                background: "#F0F0F0",
                border: "1px solid #cfcfcf",
                flexDirection: "column",
              }}
            >
              <Link
                to="/alerte-meilleur-taux-devises"
                style={{
                  color: "#000",
                  textDecoration: "none",
                  padding: "0 1rem",
                  background:
                    location.pathname == "/alerte-meilleur-taux-devises"
                      ? "#dfdfdf"
                      : "",
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
                  background:
                    location.pathname == "/alerte-meilleur-taux-or"
                      ? "#dfdfdf"
                      : "",
                }}
              >
                Or d’investissement
              </Link>
            </Box>
          </Box>
          <Link
            to="/Nouvelles"
            style={{ color: "#000", textDecoration: "none", fontWeight: "600" }}
            className={location.pathname == "/Nouvelles" ? "linkUnderline" : ""}
          >
            Nouvelles
          </Link>
          <Link
            to="/faq-questions-frequentes"
            style={{ color: "#000", textDecoration: "none", fontWeight: "600" }}
            className={
              location.pathname == "/faq-questions-frequentes"
                ? "linkUnderline"
                : ""
            }
          >
            FAQ
          </Link>
        </Box>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              width: { lg: 222, xl: 300 },
              height: "36px",
            }}
          >
            <SearchAutoComplete
              options={options}
              handleChangeSelectedItem={handleChangeSelectedItem}
              text={text}
              handleChange={handleChange}
              setText={setText}
            />
          </Paper>
          <ClientDetails />
        </Box>
      </Box>
      <Box className="hero-text">
        <Paper
          component="form"
          sx={{
            width: "100%",
            bottom: "8rem",
            display: props.isSearchBarVisible ? "block" : "none",
            position: "absolute",
          }}
        >
          <SearchAutoComplete
            options={options}
            handleChangeSelectedItem={handleChangeSelectedItem}
            text={text}
            handleChange={handleChange}
            setText={setText}
          />
        </Paper>
        <Typography
          fontStyle={"italic"}
          variant="h6"
          sx={{ fontSize: { xs: "13px", sm: "25px" } }}
        >
          Le Monde à votre Portée, L’Or entre vos Mains
        </Typography>
      </Box>
    </Box>
  );
}
