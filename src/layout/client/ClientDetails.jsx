import { useEffect, useState } from "react";
import { getClaimValue, isClient, logout } from "../../auth/handleJWT";
import { useContext } from "react";
import AuthenticationContext from "../../auth/AuthenticationContext";
import { Box, Button } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import CartContext from "../../sharedComponents/CartContext";
import { styled } from "@mui/material/styles";
export default function ClientDetails() {
  const { claims, update } = useContext(AuthenticationContext);
  const StyledImg = styled("img")({});
  const { cartItems } = useContext(CartContext);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    setUsername(getClaimValue("name", claims));
    let result = 0;
    cartItems.forEach((item) => {
      result += Number(item.euro);
    });
    setPrice(result.toFixed(2));
  }, [claims, cartItems]);

  const [username, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    update([]);
    navigate("/");
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {isClient(claims) ? (
        <div>
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            color="gold"
            sx={{
              minWidth: "9rem",
              height: "2.5rem",
            }}
          >
            {username}
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography
              sx={{ p: 2, cursor: "pointer" }}
              onClick={() => navigate("/historique-commandes")}
            >
              Historique de mes commandes
            </Typography>
            <Typography
              sx={{ p: 2, cursor: "pointer" }}
              onClick={() => navigate("/modifier-coordonnees")}
            >
              Modifier mes coordonnées
            </Typography>
            <Typography
              sx={{ p: 2, cursor: "pointer" }}
              onClick={() => navigate("/modifier-mot-passe")}
            >
              Modifier le mot de passe
            </Typography>

            <Typography
              sx={{ p: 2, cursor: "pointer" }}
              onClick={() => navigate("/verification-identité")}
            >
              Vérifier mon identité
            </Typography>
            <Typography sx={{ p: 2, cursor: "pointer" }} onClick={handleLogout}>
              Déconnecter
            </Typography>
          </Popover>
        </div>
      ) : (
        <Button
          variant="contained"
          color="gold"
          sx={{
            minWidth: "9rem",
          }}
          onClick={() => navigate("/connexion")}
        >
          <PersonOutlineIcon />
          CONNEXION
        </Button>
      )}
      <Button
        variant="contained"
        sx={{
          minWidth: "9rem",
        }}
        color="gold"
        onClick={() =>
          navigate(cartItems.length > 0 ? "/panier" : "/panier-vide")
        }
      >
        <StyledImg
          sx={{
            height: "22px",
            objectFit: "contain",
            cursor: "pointer",
            marginRight: "1rem",
          }}
          onClick={() => navigate("/")}
          alt="Cart"
          height="22px"
          width="22px"
          src="/cart.png"
        />
        {price} €
      </Button>
    </>
  );
}
