import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { logout } from "../../auth/handleJWT";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClaims, getClaimValue } from "../../auth/handleJWT";
import AuthenticationContext from "../../auth/AuthenticationContext";
export default function AccountPopOver(props) {
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(getClaimValue("username", claims));
  }, []);

  const { anchorEl, onClose, open } = props;
  const { update, claims } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const handleSignOut = useCallback(() => {
    onClose?.();
    logout();
    const claims = getClaims();
    update(claims);
    navigate("/admin");
  }, [onClose]);
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
        <Box
          sx={{
            py: 1.5,
            px: 2,
          }}
        >
          <Typography variant="overline">Account</Typography>
          <Typography color="text.secondary" variant="body2">
            {username}
          </Typography>
        </Box>
        <Divider />
        <MenuList
          disablePadding
          dense
          sx={{
            p: "8px",
            "& > *": {
              borderRadius: 1,
            },
          }}
        >
          <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
