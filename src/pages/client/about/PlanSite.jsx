import Layout from "../../../layout/client/Layout";
import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function PlanSite() {
  const store = useContextStore();
  const dataArray = [
    {
      name: "Acheter des devises en ligne",
      value: "Cours des devises",
      link: "/cours-des-devises",
    },
    {
      name: "Achetez pièces or en ligne",
      value: "Pièces d’or d’investissement",
      link: "/pieces-or-investissement",
    },
    {
      name: "Achetez Lingot et lingotins en ligne",
      value: "Lingots et lingotins",
      link: "/lingots-lingotins-or",
    },
    {
      name: "Pièces d’or de collection",
      value: "Pièces d’or de collection",
      link: "/pieces-or-collection",
    },
    {
      name: "Pourquoi investir dans l’or",
      value: "Pourquoi investir dans l’or",
      link: "/pourquoi-investir-dans-or",
    },
    {
      name: "Rachat Bijoux en Or",
      value: "Rachat bijoux en Or",
      link: "/rachat-bijoux-or",
    },
    {
      name: "Alerte Meilleur Taux",
      value: "Alerte meilleur taux",
      link: "/alerte-meilleur-taux-devises",
    },
    { name: "Nouvelles", value: "Nouvelles", link: "/Nouvelles" },
    { name: "Mon compte", value: "Connexion", link: "/connexion" },
    { name: "Mon Panier", value: "chart", link: "/panier" },
    { name: "Cours de l’or en temps réel", value: "home page", link: "/" },
    {
      name: "Qui sommes-nous ?",
      value: "Qui sommes-nous ?",
      link: "/qui-sommes-nous",
    },
    {
      name: "Achat en ligne sécurisé",
      value: "Achat en ligne sécurisé",
      link: "/achat-enligne-securise",
    },
    {
      name: "Délais de Livraison",
      value: "Délais de Livraison",
      link: "/delais-livraison",
    },
    { name: "Adresse", value: "Adresse", link: "/adresse" },
    {
      name: "Nous contacter",
      value: "Nous contacter",
      link: "/nous-contacter",
    },
    {
      name: "Mentions légales",
      value: "Mentions légales",
      link: "/mentions-legales",
    },
    {
      name: "Conditions générales de vente",
      value: "conditions générales de vente",
      link: "/cgv",
    },
    {
      name: "Protection des données personnelles",
      value: "Protection des données personnelles",
      link: "/protection-donnees-personnelles",
    },
    {
      name: "Lutte contre le blanchiment d’argent et le financement de terrorisme",
      value:
        "Lutte contre le blanchiment d’argent et le financement de terrorisme",
      link: "/lutte-contre-blanchiment-argent-et-financement-terrorisme",
    },
    { name: "Cookies", value: "cookies", link: "/cookies" },
    {
      name: "Convertisseur en ligne",
      value: "Cours des devises",
      link: "/cours-des-devises",
    },
    {
      name: "Change devises en ligne",
      value: "Cours des devises",
      link: "/cours-des-devises",
    },
    {
      name: "Achat d’or en ligne",
      value: "Pièces d’or d’investissement",
      link: "/pieces-or-investissement",
    },
    { name: "Cours de l’or en direct", value: "home page", link: "/" },
    {
      name: "Euro dollars",
      value: "Dollars Américains",
      link: "/cours-des-devises/Dollars-Américains/649160d202cc3070b7554ceb",
    },
    {
      name: "Euro livres",
      value: "Livres Sterling",
      link: "/cours-des-devises/Livres-Sterling/6491bcf827bd90f21b5edc28",
    },
    {
      name: "Euro Yen",
      value: "Yen japonais",
      link: "/cours-des-devises/Yen-japonais/649b1c6a890aed1ea27163f3",
    },
    {
      name: "Euro Francs Suisse",
      value: "Francs Suisse",
      link: "/cours-des-devises/Francs-Suisse/64a42c25b5276869c4c5e44c",
    },
    {
      name: "20 Francs Napoléon OR",
      value: "20 Francs Napoléon",
      link: "/pieces-or-investissement/20-Francs-Napoléon-OR/64a98124b5276869c4c5e9fa",
    },
    {
      name: "20 Francs Marianne OR",
      value: "20 Francs Marianne",
      link: "/pieces-or-investissement/20-Francs-Marianne-OR/64a97f42b5276869c4c5e9dd",
    },
    {
      name: "20 Dollars Américains OR",
      value: "20 Dollars Américains",
      link: "/pieces-or-investissement/20-Dollars-Américains-OR/64aa64f3b5276869c4c5ea5f",
    },
    { name: "Souverain OR", value: "Souverain", link: "" },
  ];

  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <h1 className="d-none">Plan Du Site</h1>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            <Typography
              variant="h2"
              className="titleUnderline"
              sx={{ fontWeight: "700" }}
              pb={5}
            ></Typography>
            <Grid
              sx={{
                width: "100%",
                background: "#FFF",
                padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
              }}
            >
              <Box style={{ fontWeight: "300", fontSize: "1rem" }}>
                {dataArray.map((el) => (
                  <Box sx={{ display: "flex", gap: "10px", padding: ".2rem" }}>
                    <Link
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                      to={el.link}
                    >
                      {el.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
