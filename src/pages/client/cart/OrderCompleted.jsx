import { Alert, Button } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../../helpers";
import Layout from "../../../layout/client/Layout";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
export default observer(function OrderCompleted() {
  const { id, virement } = useParams();
  const navigate = useNavigate();
  const store = useContextStore();
  const sendTo = "AW-11314892976/d6ewCNHpytoYELChrpMq";
  useEffect(() => {
    var consent = getCookie("consent");
    debugger;
    if (
      store.globalStoreClient.isLoadedBanner &&
      (consent == null || consent === "true")
    ) {
      loadConversion();
    }
    return () => {};
  }, [store.globalStoreClient.isLoadedBanner]);

  const loadConversion = () => {
    debugger;
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      debugger;
      window.dataLayer.push(arguments);
    }
    gtag("config", "AW-11314892976");
    gtag("event", "conversion", { send_to: sendTo, transaction_id: id });

    // gtag("event", "conversion", {
    //   send_to: sendTo,
    //   transaction_id: id,
    // });
  };

  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            <Box
              sx={{
                width: "100%",
                background: "#FFF",
                padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
                fontWeight: "600",
                fontSize: "1rem",
              }}
            >
              {virement ? (
                <Alert
                  severity={"info"}
                  sx={{
                    margin: "0 0 2rem 0",
                    fontSize: "1rem",
                  }}
                >
                  Merci pour votre commande ! Nous allons vous envoyer un e-mail
                  contenant notre RIB afin que vous puissiez procéder au
                  paiement par virement bancaire. Veuillez consulter votre boîte
                  de réception pour les détails.
                </Alert>
              ) : (
                <Alert
                  severity="success"
                  sx={{
                    margin: "0 0 2rem 0",
                    fontSize: "1rem",
                  }}
                >
                  Merci pour votre commande ! Nous sommes ravis de vous compter
                  parmi nos clients. Votre commande a été reçue et est
                  actuellement en cours de traitement. Vous recevrez un email de
                  confirmation avec les détails de votre commande très
                  prochainement. Si vous avez besoin de suivre votre commande ou
                  si vous avez des questions, n'hésitez pas à nous contacter.
                  Avez-vous besoin d'aide? Pour toute question ou assistance,
                  notre équipe de support client est là pour vous aider.
                  Contactez-nous à contact@change-or-enligne.com ou au 09 56
                  04 14 25 Restez informé: Pour les dernières nouvelles et
                  offres, suivez-nous sur nos réseaux sociaux et abonnez-vous à
                  notre newsletter. Nous espérons que vous serez pleinement
                  satisfait de votre achat et nous vous remercions de faire
                  confiance à Change et Or Bastille. À très bientôt !
                </Alert>
              )}
              <Box
                sx={{ display: "flex", justifyContent: "center", gap: "15px" }}
              >
                <Button
                  color="gold"
                  variant="contained"
                  onClick={() => navigate("/")}
                >
                  Fermer
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => navigate("/verification-identité")}
                >
                  Vérifier mon identité
                </Button>
              </Box>
            </Box>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
