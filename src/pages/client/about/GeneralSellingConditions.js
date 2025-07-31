import Layout from "../../../layout/client/Layout";
import React from "react";
import { Typography, Box } from "@mui/material";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function GeneralSellingConditions() {
  const store = useContextStore();
  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <h1 className="d-none">Conditions générales de vente</h1>
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
              Conditions générales de vente
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
                {" "}
                Les présentes conditions générales de vente (CGV) s'appliquent à
                toutes les transactions effectuées sur le site
                www.change-or-enligne.com, exploité par Palm Exchange. En
                passant une commande sur notre site, vous acceptez sans réserve
                les présentes CGV.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Produits et disponibilité
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Les produits proposés à la vente sur notre site sont des devises
                et des pièces d'or d'investissement. Nous nous efforçons de
                garantir la disponibilité des produits, mais il peut arriver que
                certains articles soient temporairement en rupture de stock.
                Dans ce cas, nous vous informerons par mail et vous proposerons
                une solution alternative ou un remboursement.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>Prix</span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Les prix des produits sont indiqués en euros, toutes taxes
                comprises (TTC). Ils sont susceptibles d'être modifiés à tout
                moment en fonction des fluctuations du marché. Les prix affichés
                sur le site au moment de la commande sont ceux qui s'appliquent
                à la transaction.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>Commande</span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Pour passer une commande, vous devez remplir le formulaire en
                ligne et fournir les informations requises, y compris une copie
                de votre pièce d'dentité et un justificatif de domicile. Minimum
                de commande est 300€, maximum de commande est 8000€. Votre
                commande ne sera considérée comme définitive qu'après réception
                du paiement.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>Paiement</span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Le paiement des commandes peut être effectué par carte bancaire
                ou par virement bancaire. Les informations de paiement sont
                traitées de manière sécurisée conformément à notre politique de
                sécurité des paiements en ligne.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Préparation des commandes
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Pour assurer l’exactitude de vos commandes et maintenir un
                niveau de service élevé, nous vous informons que la préparation
                des commandes est réalisée sous surveillance vidéo. Cette mesure
                est mise en place pour garantir la qualité de nos services et
                éviter toute erreur possible. Veuillez noter que toutes les
                vidéos sont traitées en conformité avec nos politiques de
                confidentialité et de sécurité.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>Livraison</span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                La livraison des commandes est effectuée par la poste en valeur
                déclarée avec assurance et accusé de réception. Le délai de
                livraison estimé est de 3 à 5 jours ouvrable. Pour plus
                d'informations sur notre processus de livraison, veuillez
                consulter notre page délai de livraison.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Partage des données pour sollicitation d’avis
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Lorsque vous passez une commande, nous partageons certaines de
                vos données, à savoir votre adresse mail, votre nom, votre
                prénom et la référence de votre commande, avec notre partenaire
                ‘Avis Vérifiés’. Ceci afin de vous inviter à laisser un avis sur
                notre service. Votre retour est primordial pour nous aider à
                améliorer continuellement notre service. Nous tenons à préciser
                que ce partage de données est effectué dans le strict respect
                des réglementations en vigueur, notamment le RGPD, garantissant
                ainsi la protection et la confidentialité de vos
                informations personnelles.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>Droit de rétractation</span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Conformément à la législation française, vous disposez d'un
                délai de rétractation de 14 jours à compter de la réception de
                votre commande pour exercer votre droit de rétractation sans
                avoir à justifier de motifs ni à payer de pénalités. Pour
                exercer ce droit, vous devez nous informer par écrit (courrier
                ou mail) de votre décision de vous rétracter. Les frais de
                retour des produits sont à votre charge.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>Responsabilité</span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Palm Exchange s’engage à respecter toutes ses obligations contractuelles, sauf en cas d’événements de force majeure clairement définis par la loi, tels que des catastrophes naturelles, des grèves, ou des actes législatifs. En dehors de ces cas exceptionnels, nous assumerons la responsabilité pour toute non-exécution ou mauvaise exécution de nos services. Nous ne nous dégageons pas de notre responsabilité en cas de problèmes techniques prévisibles ou de fautes de notre part, y compris les erreurs de traitement des commandes client comme une adresse de livraison incorrecte, sauf si ces erreurs sont directement attribuables à des informations erronées fournies par le client.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Protection des données personnelles
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Nous nous engageons à protéger vos données personnelles
                conformément à notre politique de protection des données
                personnelles.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Droit à l’inscription sur la liste d’opposition au démarchage téléphonique
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Conformément à l’article L.223-2 du Code de la consommation, Palm Exchange informe ses clients qu’ils disposent du droit de s’inscrire gratuitement sur la liste d’opposition au démarchage téléphonique. Cette inscription est destinée à interdire à tout professionnel de vous démarcher téléphoniquement, à l’exception de ceux avec lesquels vous avez déjà établi des relations contractuelles préexistantes.
                <br />
                Si des données téléphoniques sont collectées par Palm Exchange lors de la réservation ou l’achat de nos produits et services, nous vous informerons clairement de votre droit à vous inscrire sur cette liste. Cette information sera fournie au moment du recueil de vos coordonnées téléphoniques et sera réitérée, de manière claire et compréhensible, dans tout contrat que vous concluez avec nous.
                <br />
                Pour vous inscrire sur la liste d’opposition au démarchage téléphonique ou obtenir plus d’informations à ce sujet, vous pouvez visiter le site Bloctel, qui est le service officiel mis en place par les autorités françaises.
                <br />
                Il est important de noter que cette inscription n’empêche pas la réception de communications téléphoniques de la part d’autres entités non commerciales, telles que les sondages, les appels de charité ou les informations provenant de services publics.
                <br />
                Cette section respecte les exigences légales tout en informant clairement les clients de leurs droits et de la manière de les exercer.
              </span>
              <br /> <br />
              <span style={{ fontWeight: "700" }}>
                Médiation des litiges de consommation
              </span>
              <br /> <br />
              <span style={{ fontWeight: "300" }}>
                Conformément aux articles L. 612-1 et L. 612-2 du Code de la consommation, tout consommateur a le droit de recourir gratuitement à un médiateur de la consommation pour la résolution amiable d’un litige qui l’opposerait à un professionnel. Ce droit est accordé si le consommateur a déjà tenté de résoudre son litige directement auprès de notre service client par une réclamation écrite, dans un délai inférieur à un an suivant cette réclamation.
                <br />
                Palm Exchange a adhéré à Le Centre de la Médiation de la Consommation de Conciliateurs de Justice, un service de médiation reconnu par la Commission d’évaluation et de contrôle de la médiation de la consommation. Pour contacter ce médiateur, vous pouvez utiliser les moyens suivants :
                <br />
                Adresse postale: 49 Rue de Ponthieu, 75008 Paris
                <br />
                Site web: <a href="www.cm2c.net">www.cm2c.net</a>
                <br />
                Email: <a href="cm2c@cm2c.net">cm2c@cm2c.net</a>
                <br />
                La saisine du médiateur doit être effectuée par écrit, en fournissant tous les détails nécessaires à l’examen de votre dossier.
                <br />
                Par ailleurs, la Commission européenne offre une plateforme de résolution en ligne des litiges qui aide à soumettre les réclamations issues d’achats en ligne aux médiateurs nationaux compétents. Cette plateforme est accessible ici: <a href="https://ec.europa.eu/consumers/odr/">https://ec.europa.eu/consumers/odr/</a>.
                <br />
                Pour toute transaction effectuée, les conflits relatifs à l’interprétation ou à l’exécution de ces conditions seront soumis aux tribunaux compétents de Paris, auxquels compétence exclusive est attribuée. Les lois applicables sont exclusivement les lois françaises.
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
