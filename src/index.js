import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./sharedComponents/utilities/ErrorBoundary";
import { RootStoreContext, rootStore } from "./stores/RootStoreContext";
import ScrollToTop from "./sharedComponents/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RootStoreContext.Provider value={rootStore}>
    <BrowserRouter>
      <ErrorBoundary errorUI={<>There was an error</>}>
        <HelmetProvider>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </HelmetProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </RootStoreContext.Provider>
);
