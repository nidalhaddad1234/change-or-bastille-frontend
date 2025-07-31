import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import routes from "./route-config";
import AuthenticationContext from "./auth/AuthenticationContext";
import { getClaims, isAdmin, isClient } from "./auth/handleJWT";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import CartContext from "./sharedComponents/CartContext";
import LoadingMain from "./sharedComponents/utilities/LoadingMain";
import { useContextStore } from "./stores/RootStoreContext";

function App() {
  const cartFromLocalStorage =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("cart"))) ||
    [];
  const [claims, setClaims] = useState([]);
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);
  const store = useContextStore();

  useEffect(() => {
    var result = async () => await store.globalStoreClient.loadTopBanner();
    result();
    const claimsResult = getClaims();
    setClaims(claimsResult);
  }, []);
  useEffect(() => {
    if (claims.length > 0) {
      // This just shows if the user is loggedIn
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const checkIfNotAuthorized = (route) => {
    return (
      (route.isAdmin && !isAdmin(claims)) ||
      (route.isClient && !isClient(claims))
    );
  };

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
        xxl: 1840,
      },
    },
    typography: {
      fontFamily: "Poppins, sans-serif", // Default font family
      h6: {
        fontFamily: "Libre Baskerville, sans-serif", // Font family for h1 variant
      },
      fontWeightBold: true,
    },

    palette: {
      primaryAdmin: {
        main: "rgb(99, 102, 241)",
        contrastText: "#fff",
      },
      danger: {
        main: "#dc3545",
        contrastText: "#fff",
      },
      secondaryAdmin: {
        main: "#1C2437",
        contrastText: "#fff",
      },
      customGrey: {
        main: "#333333",
      },
      customLighGrey: {
        main: "#EEEEEE",
      },
      gold: {
        main: "#EEAC1F",
        contrastText: "#fff",
      },
      backgroundColor: {
        main: "#F8F8F8",
      },
      black: {
        main: "#333",
        contrastText: "#fff",
      },
    },
  });

  return (
    <>
      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
        <CartContext.Provider value={{ cartItems, setCartItems: setCartItems }}>
          <ThemeProvider theme={theme}>
            <Suspense fallback={<LoadingMain fullHeight />}>
              <Routes>
                {routes.map(
                  (route) =>
                    !checkIfNotAuthorized(route) && (
                      <Route
                        path={route.path}
                        key={route.path}
                        element={<route.component />}
                      />
                    )
                )}
              </Routes>
            </Suspense>

            <ToastContainer
              theme="colored"
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </ThemeProvider>
        </CartContext.Provider>
      </AuthenticationContext.Provider>
    </>
  );
}

export default App;
