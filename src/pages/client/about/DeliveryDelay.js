import Layout from "../../../layout/client/Layout";
import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function DeliveryDelay() {
  const store = useContextStore();
  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <h1 className="d-none">DÉLAI DE LIVRAISON</h1>
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
            >
              DÉLAI DE LIVRAISON
            </Typography>
            <Grid
              sx={{
                width: "100%",
                background: "#FFF",
                padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
              }}
            >
              <Box style={{ fontWeight: "300", fontSize: "1rem" }}>
                Chez Change et Or Bastille, nous nous engageons à vous offrir un
                service de livraison rapide et sécurisé. Nous comprenons que
                vous attendez avec impatience de recevoir vos commandes, et nous
                mettons tout en œuvre pour vous les livrer dans les meilleurs
                délais.
                <br />
                <br />
                Voici le processus de livraison que nous suivons pour vous
                assurer une expérience client satisfaisante
                <br />
                <br />
                <span style={{ fontWeight: "700" }}>
                  Confirmation de commande{" "}
                </span>
                <br />
                <br />
                Une fois que vous avez passé une commande sur notre site, vous
                recevrez un mail automatique de confirmation contenant les
                détails de votre commande.
                <br />
                <br />
                <span style={{ fontWeight: "700" }}>
                  Préparation et expédition
                </span>
                <br />
                <br />
                Nous préparons et expédions votre commande dès que possible,
                généralement dans les 24 heures suivant la réception du paiement
                et de la vérification de votre pièce d'identité.
                <br />
                <br />
                Pour ce qui est de l'achat d'or, veuillez noter que le délai
                d'expédition peut varier en fonction de la disponibilité de nos
                stocks. L'expédition de l'or peut prendre entre 2 jours et
                jusqu'à 3 semaines. Nous vous assurons que nous mettons tout en
                œuvre pour vous livrer le plus rapidement possible et nous vous
                tiendrons informé du statut de votre commande à chaque étape.
                <br />
                <br />
                <span style={{ fontWeight: "700" }}>Envoi par la poste</span>
                <br />
                <br />
                Nous envoyons vos commandes par la poste en valeur déclarée avec
                assurance et accusé de réception. Cette méthode garantit la
                sécurité et le suivi de votre colis tout au long de son
                acheminement.
                <br />
                <br />
                <span style={{ fontWeight: "700" }}> Mail de suivi </span>
                <br />
                <br />
                Après l'expédition de votre commande, nous vous enverrons un
                mail contenant le numéro de suivi de votre colis. Vous pourrez
                ainsi suivre l'état de la livraison en temps réel sur le site de
                la poste.
                <br />
                <br />
                <span style={{ fontWeight: "700" }}> Facture </span>
                <br />
                <br />
                Une fois que votre commande est expédiée, nous vous enverrons
                également un mail contenant la facture correspondante.
                <br />
                <br />
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "600", fontSize: "1rem" }}
                >
                  Délai estimé de livraison
                </Typography>
                <br />
                Le délai de livraison estimé pour vos commandes est de 2 à 5
                jours ouvrable. Veuillez noter que ce délai peut varier en
                fonction de facteurs indépendants de notre volonté, tels que les
                conditions météorologiques, les retards de la poste ou les jours
                fériés. Nous vous tiendrons informé de tout changement éventuel
                concernant le délai de livraison.
                <br />
                <br />
                Nous vous remercions de votre confiance et nous sommes à votre
                disposition pour répondre à toutes vos questions ou
                préoccupations concernant la livraison. N'hésitez pas à nous
                contacter à{" "}
                <Link
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  to="/nous-contacter"
                >
                  contact@change-or-enligne.com
                </Link>{" "}
                si vous avez besoin d'assistance.
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
