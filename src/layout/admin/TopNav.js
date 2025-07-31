import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AccountPopOver from "./AccountPopOver";
import { usePopover } from "../../hooks/usePopover";

export default function TopNav(props) {
  const drawerWidth = 280;
  const accountPopover = usePopover();
  return (
    <>
      <props.AppBar position="fixed" open={props.open}>
        <Toolbar
          style={{
            background: "white",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {props.burgerBarVisible && (
            <IconButton
              aria-label="open drawer"
              onClick={props.handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(props.open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* <Typography variant="h6" color="grey" noWrap component="div">
            Panel v0.0
          </Typography> */}
          <Avatar
            onClick={accountPopover.handleOpen}
            ref={accountPopover.anchorRef}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
            }}
            src="/assets/avatars/avatar-anika-visser.png"
          />
        </Toolbar>
        <AccountPopOver
          anchorEl={accountPopover.anchorRef.current}
          open={accountPopover.open}
          onClose={accountPopover.handleClose}
        />
      </props.AppBar>
    </>
  );
}
