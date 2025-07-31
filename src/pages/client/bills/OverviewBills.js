import React, { useEffect, useState } from "react";
import Layout from "../../../layout/client/Layout";
import { Typography, Box, Grid, Divider } from "@mui/material";
import BillExchangeCalc from "./BillExchangeCalc";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { Helmet } from "react-helmet-async";
import { observer } from "mobx-react";
import { useContextStore } from "../../../stores/RootStoreContext";
import { getPriceValidUntil } from "../../../helpers";

export default observer(function OverviewBills() {
  const store = useContextStore();
  useEffect(() => {
    const fetchData = async () =>
      await store.currenciesStoreClient.loadCurrencies();
    fetchData().then((result) => {
      setResponse(result);
    });
    return () => {};
  }, []);

  const [response, setResponse] = useState([]);
  const date = new Date();
  const formattedDate = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const title = response.seo
    ? response.seo.title
    : `Achat devises en ligne Bureau de Change en Ligne`;
  const description = response.seo
    ? response.seo.description
    : `Acheter des devises essentielles et exotiques au meilleur prix. Paiement sécurisé et livraison
           assurée. Consultez nos taux.`;
  return (
    <>
      {response && response.data && response.data.length > 0 ? (
        <>
          <Helmet>
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                itemListElement: response.data.map((product, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Product",
                    name: `${product.currencyName} (${product.iso})`,
                    image: `${product.bills[product.bills.length - 1].photo}`,
                    description: product.description,
                    brand: {
                      "@type": "Brand",
                      name: "Change et Or Bastille",
                    },
                    offers: {
                      "@type": "Offer",
                      price: `${1 * product.sellPrice}`,
                      name: `${product.currencyName} (${product.iso})`,
                      url: `https://www.change-or-enligne.com/cours-des-devises/${product.currencyName.replaceAll(
                        " ",
                        "-",
                      )}/${product._id}`,
                      priceCurrency: "EUR",
                      priceValidUntil: getPriceValidUntil(),
                      availability: "https://schema.org/InStock",
                      seller: {
                        "@type": "Organization",
                        name: "Change et Or Bastille",
                      },
                    },
                  },
                })),
              })}
            </script>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link
              rel="canonical"
              href="https://www.change-or-enligne.com/cours-des-devises"
            />
          </Helmet>
          <Layout>
            <Box
              sx={{
                padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
              }}
            >
              <h1 className="d-none">
                Achat devises en ligne Bureau de Change en Ligne
              </h1>
              <Typography
                variant="h2"
                sx={{ fontWeight: "600", textTransform: "uppercase" }}
                className="titleUnderline"
                pb={5}
              >
                Acheter des devises
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", fontStyle: "italic" }}
                pb={5}
              >
                Le {formattedDate}
              </Typography>
              <Typography variant="p" sx={{ fontWeight: "500" }}>
                Nous engageons à vous offrir les meilleurs taux pour vos achats
                de devises en ligne.
              </Typography>
              <br />
              <Typography variant="p" sx={{ fontWeight: "500" }}>
                Notre cours est clair et Nets, sans commission à ajouter.
              </Typography>
              <br />
              <Typography variant="p" sx={{ fontWeight: "500" }}>
                Pour toutes vos commandes en ligne, le montant minimum est de
                300€ et le maximum est de 8000€.
              </Typography>
              <br />
              <Typography variant="p" sx={{ fontWeight: "500" }}>
                Le délai de la livraison est de 48 à 72 heures, à compter de
                l’expédition de la commande.
              </Typography>
              <Grid container sx={{ marginTop: "2rem" }}>
                <Grid item xs={12}>
                  {response.data.map((el) => (
                    <Box key={el._id}>
                      <BillExchangeCalc
                        currencyName={el.currencyName}
                        iso={el.iso}
                        moneyName={el.moneyName}
                        smallestBill={el.bills[0].name}
                        price={el.sellPrice}
                        id={el._id}
                        isList={true}
                        redirect={true}
                        coefficienct={el.coefficient}
                      />
                      <Divider
                        sx={{
                          width: "100%",
                          borderColor: "#000",
                        }}
                      />
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Layout>
        </>
      ) : (
        <>
          <LoadingMain fullHeight={true} />
        </>
      )}
    </>
  );
});
