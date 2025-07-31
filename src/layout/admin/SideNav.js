import { items } from "./config";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { Box, Divider, Drawer, SvgIcon, Typography } from "@mui/material";

export default function SideNav(props) {
  const pageName = window.location.pathname;
  const navigate = useNavigate();
  const listItems = items.map((item) => (
    <ListItem key={item.title}>
      <ListItemButton
        onClick={() => {
          navigate(item.path);
        }}
        style={
          pageName === item.path || pageName.includes(item.path)
            ? {
                padding: "0",
                background: "rgba(255, 255, 255, 0.04)",
                borderRadius: "8px",
              }
            : { padding: "0" }
        }
        sx={{
          "& .css-1ymlif8-MuiListItemIcon-root": {
            minWidth: 35,
          },
        }}
      >
        <ListItemIcon
          sx={{
            color:
              pageName === item.path || pageName.includes(item.path)
                ? "rgb(99, 102, 241)"
                : "rgb(157, 164, 174)",
            padding: "0 15px",
            minWidth: "32px",
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          sx={{
            color:
              (pageName === item.path || pageName.includes(item.path)) &&
              "white",
          }}
        ></ListItemText>
      </ListItemButton>
    </ListItem>
  ));

  return (
    <>
      <Drawer
        sx={{
          width: props.drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "rgb(28, 37, 54)",
            color: "rgb(157, 164, 174)",
            width: props.drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={props.open}
      >
        <props.DrawerHeader
          style={{ display: "flex", flexDirection: "column", margin: 20 }}
        >
          <Box
            sx={{
              width: "100%",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.76)",
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: "12px",
            }}
          >
            <img
              src="/Bureau-de-change-en-ligne.webp"
              srcSet="/Bureau-de-change-en-ligne.webp"
              loading="lazy"
              height={100}
              width={200}
            />
          </Box>

          <Box
            sx={{
              width: "100%",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: "12px",
            }}
          >
            <div>
              <Typography color="inherit" variant="subtitle1">
                Admin Panel
              </Typography>
              <Typography color="neutral.400" variant="body2">
                Development
              </Typography>
            </div>
            <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}>
              <UnfoldMoreIcon />
            </SvgIcon>
          </Box>
        </props.DrawerHeader>
        <Divider />
        <List>{listItems}</List>
        <Divider />
      </Drawer>
    </>
  );
}
