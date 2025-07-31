import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../../../auth/AuthenticationContext";
import { getClaimValue, logout } from "../../../auth/handleJWT";
export default function AccountPopOver(props) {
  const { update, claims } = useContext(AuthenticationContext);

  const handleLogout = () => {
    logout();
    update([]);
    navigate("/");
  };
  const { anchorEl, onClose, open } = props;
  const navigate = useNavigate();

  return (
    <>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        onClose={onClose}
        open={open}
        PaperProps={{ sx: { width: 200 } }}
      >
        <Divider />
        <MenuList
          disablePadding
          dense
          sx={{
            "& > *": {
              borderRadius: 1,
            },
          }}
        >
          <Typography
            sx={{ p: 2, cursor: "pointer", fontSize: "12px" }}
            onClick={() => navigate("/historique-commandes")}
          >
            Historique de mes commandes
          </Typography>
          <Typography
            sx={{ p: 2, cursor: "pointer", fontSize: "12px" }}
            onClick={() => navigate("/modifier-coordonnees")}
          >
            Modifier mes coordonnées
          </Typography>
          <Typography
            sx={{ p: 2, cursor: "pointer", fontSize: "12px" }}
            onClick={() => navigate("/modifier-mot-passe")}
          >
            Modifier le mot de passe
          </Typography>
          <Typography
            sx={{ p: 2, cursor: "pointer", fontSize: "12px" }}
            onClick={() => navigate("/verification-identité")}
          >
            Vérifier mon identité
          </Typography>

          <Typography
            sx={{ p: 2, cursor: "pointer", fontSize: "12px" }}
            onClick={handleLogout}
          >
            Déconnecter
          </Typography>
        </MenuList>
      </Popover>
    </>
  );
}
