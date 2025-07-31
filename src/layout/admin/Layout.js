import SideNav from "./SideNav";
import TopNav from "./TopNav";
import MuiAppBar from "@mui/material/AppBar";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useEffect, useRef } from "react";

import UseWindowSize from "../../sharedComponents/UseWindowSize";

const drawerWidth = 280;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [burgerBarVisible, setBurgerBarVisible] = React.useState(false);
  const filterRef = useRef(null);
  const { children } = props;
  let Pagewidth = 0;
  function ShowWindowDimensions(props) {
    const [width, height] = UseWindowSize();
    Pagewidth = width;
  }
  ShowWindowDimensions();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (Pagewidth < 600 && Pagewidth !== 0) {
      setOpen(false);
      setBurgerBarVisible(true);
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      setOpen(true);
      setBurgerBarVisible(false);
      document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [Pagewidth]);

  const handleOutsideClick = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopNav
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        AppBar={AppBar}
        burgerBarVisible={burgerBarVisible}
      />
      <div ref={filterRef}>
        <SideNav
          DrawerHeader={DrawerHeader}
          drawerWidth={drawerWidth}
          handleDrawerClose={handleDrawerClose}
          open={open}
        />
      </div>

      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
