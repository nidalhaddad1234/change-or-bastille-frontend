import Layout from "../../../layout/client/Layout";
import React from "react";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function LegalMentions() {
  const store = useContextStore();
  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <h1 className="d-none">Mentions légales</h1>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            <Typography
              className="titleUnderline"
              variant="h2"
              sx={{ fontWeight: "700" }}
              pb={5}
            >
              Mentions légales
            </Typography>
            <Box
              sx={{
                width: "100%",
                background: "#FFF",
                padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
                fontWeight: "300",
                fontSize: "1rem",
              }}
            >
              <span style={{ fontWeight: "300" }}>
                Veuillez trouver ci-dessous les informations légales concernant
                Palm Exchange, exploitant le site: www.change-or-enligne.com
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Identification de l'entreprise:
              </span>{" "}
              Palm Exchange
              <br /> <br />
              <span style={{ fontWeight: "700" }}>Forme juridique:</span> SARL
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Adresse du siège social:
              </span>{" "}
              163 rue de rennes 75006 Paris
              <br /> <br />
              <span style={{ fontWeight: "700" }}>Numéro de téléphone:</span> 09
              56 04 14 25
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Adresse-mail de contact:
              </span>{" "}
              <Link
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                to="/nous-contacter"
              >
                contact@change-or-enligne.com
              </Link>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>Immatriculation:</span>{" "}
              Immatriculée au Registre du Commerce et des Sociétés de Paris sous
              le numéro : 481 423 143
              <br /> <br />
              <span style={{ fontWeight: "700" }}>Numéro de SIRET:</span> 481
              423 143 000 58
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Responsable de la publication:
              </span>{" "}
              Mansour Chadi
              <br /> <br />
              <span style={{ fontWeight: "700" }}>Hébergeur du site</span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>Nom:</span> Amazon web
              services
              <br /> <br />
              <span style={{ fontWeight: "700" }}>Adresse:</span> 31 Pl. des
              Corolles, 92400 Courbevoie, France
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Propriété intellectuelle
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                L'ensemble des éléments composant ce site, tels que les textes,
                images, graphismes, logos, icônes, sons et logiciels, est la
                propriété de Palm Exchange ou de ses partenaires. Toute
                reproduction, représentation, modification, publication ou
                adaptation de tout ou partie des éléments du site, quel que soit
                le moyen ou le procédé utilisé, est interdite sans
                l'autorisation écrite préalable de Palm Exchange.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Limitation de responsabilité
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Palm Exchange ne peut être tenue pour responsable des dommages
                directs ou indirects résultant de l'utilisation de ce site ou de
                l'impossibilité d'y accéder. Les informations contenues sur ce
                site sont fournies à titre indicatif et ne sauraient engager la
                responsabilité de Palm Exchange en cas d'erreur ou d'omission.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Politique de confidentialité
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Pour consulter notre politique de confidentialité, veuillez-vous
                rendre sur notre page{" "}
                <Link
                  to="/protection-donnees-personnelles"
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  (Protection des données personnelles).
                </Link>
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Conditions générales de vente
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Pour consulter nos conditions générales de vente, veuillez-vous
                rendre sur notre page{" "}
                <Link
                  to="/cgv"
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  (Conditions générales de vente).
                </Link>
              </span>
              <br /> <br />
            </Box>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
