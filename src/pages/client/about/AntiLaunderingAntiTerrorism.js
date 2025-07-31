import Layout from "../../../layout/client/Layout";
import React from "react";
import { Typography, Box } from "@mui/material";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function AntiLaunderingAntiTerrorism() {
  const store = useContextStore();
  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <h1 className="d-none">
            LUTTE CONTRE BALNCHIMENT D'ARGENT ET FINANCEMENT DU TERRORISME
          </h1>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontWeight: "700" }}
              className="titleUnderline"
              pb={5}
            >
              LUTTE CONTRE BALNCHIMENT D'ARGENT ET FINANCEMENT DU TERRORISME
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
              <span style={{ fontWeight: "700" }}>
                Vérification d'dentité: Pourquoi avons-nous besoin de votre
                pièce d'identité?
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Chez Change et Or Bastille, nous nous engageons à respecter les
                lois et réglementations en vigueur en France pour assurer la
                sécurité de nos clients et lutter contre le blanchiment d'argent
                et le financement du terrorisme. Conformément à la législation
                française, nous sommes tenus de vérifier l'identité de nos
                clients lors de la réalisation de transactions d'achat de
                devises ou d'or.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Quelles sont nos obligations?
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                En tant qu'entreprise opérant dans le secteur des devises et des
                métaux précieux, nous sommes soumis à la réglementation
                française en matière de lutte contre le blanchiment d'argent et
                le financement du terrorisme. Cela signifie que nous devons
                mettre en place des procédures de vérification d'identité pour
                nos clients et conserver des registres de ces vérifications.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Quels documents sont acceptés?
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Pour vérifier votre identité, nous vous demandons de fournir une
                copie numérique ou une photo de l'un des documents d'identité
                suivants:
              </span>
              <br />
              <br />
              <span style={{ fontWeight: "300" }}>
                Carte nationale d'identité (recto et verso)
              </span>
              <br />
              <span style={{ fontWeight: "300" }}>
                Passeport (pages contenant vos informations personnelles et
                votre photo)
              </span>
              <br />
              <span style={{ fontWeight: "300" }}>
                Titre de séjour (recto et verso)
              </span>
              <br />
              <span style={{ fontWeight: "300" }}>
                Veuillez noter que le document doit être en cours de validité et
                lisible.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Comment fournir votre pièce d'identité?
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Lorsque vous effectuez un achat en ligne, vous serez invité à
                télécharger une copie numérique ou une photo de votre pièce
                d'identité au moment de la commande et un justificatif de
                domicile. Les informations fournies seront traitées en toute
                confidentialité et conformément à notre politique de protection
                des données personnelles.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Confidentialité et sécurité
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Nous comprenons que la protection de vos données personnelles
                est importante. Chez Change et Or Bastille, nous nous engageons
                à respecter la confidentialité de vos informations et à les
                protéger en utilisant des mesures de sécurité appropriées. Vos
                données ne seront utilisées que dans le cadre des obligations
                légales et réglementaires et ne seront pas partagées avec des
                tiers sans votre consentement, sauf si cela est requis par la
                loi.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                En respectant ces exigences, nous contribuons à assurer la
                sécurité et la transparence de nos opérations, tout en
                protégeant nos clients et en respectant nos obligations légales.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Décret n°2012-1125 du 3 octobre 2012 et l'article R561-10
                modifiant les seuils de l'opération change manuel au premier
                euro dès que le client n'est pas présent physiquement pendant la
                transaction.
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
