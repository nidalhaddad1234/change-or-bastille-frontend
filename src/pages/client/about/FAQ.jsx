import Layout from "../../../layout/client/Layout";
import React from "react";
import { Typography, Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useContextStore } from "../../../stores/RootStoreContext";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { observer } from "mobx-react";
export default observer(function FAQ() {
  const store = useContextStore();
  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <>
          <Helmet>
            <meta
              name="description"
              content="Parcourez notre FAQ pour des réponses claires sur l’achat/vente de devises et d’or. Faites
          des transactions éclairées et en toute confiance chez nous."
            />
            <title>Questions Fréquentes Change et Or Bastille</title>
            <link
              rel="canonical"
              href="https://www.change-or-enligne.com/faq-questions-frequentes"
            />
          </Helmet>
          <Layout>
            <h1 className="d-none">
              Questions Fréquentes Change et Or Bastille
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
                FAQ - Questions Fréquement Posées
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  background: "#FFF",
                  padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
                  fontWeight: "600",
                  fontSize: "1rem",
                }}
              >
                <Box style={{ fontWeight: "300", fontSize: "1rem" }}>
                  <Typography sx={{ fontWeight: "700" }}>
                    Comment passer une commande ?
                  </Typography>
                  <br />
                  <Typography>
                    Création de compte: Inscrivez-vous sur notre site.
                  </Typography>
                  <Typography>
                    Vérification d’identité: Téléchargez une pièce
                    d&#39;identité et un justificatif de domicile pour
                    validation.
                  </Typography>
                  <Typography>
                    Ajouter au panier: Sélectionnez les produits que vous
                    souhaitez Achetez.
                  </Typography>
                  <Typography>
                    Valider la commande: Suivez les étapes de validation.
                  </Typography>
                  <Typography>
                    Paiement: Vous pouvez payer par carte bleue, vous serez
                    redirigé vers une page bancaire
                  </Typography>
                  <Typography>
                    sécurisée. Ou par virement, un mail contenant notre RIB vous
                    sera envoyé.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Quels sont les frais de livraison ?
                  </Typography>
                  <br />
                  <Typography>
                    Les frais de livraison dépendent du montant total de votre
                    commande.
                  </Typography>
                  <Typography>
                    Ces frais seront clairement indiqués dans votre panier avant
                    la finalisation de la commande.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Quels sont les délais de livraison ?
                  </Typography>
                  <br />
                  <Typography>
                    Après expédition de votre commande, le délai de livraison
                    est généralement de 48 à 72 heures.
                  </Typography>
                  <Typography>
                    Nous nous engageons à vous livrer dans les meilleurs délais
                    pour assurer votre satisfaction.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Puis-je choisir le type de coupures ?
                  </Typography>
                  <br />
                  <Typography>
                    Oui, lors de la finalisation de votre commande, vous avez le
                    choix entre des petites coupures, des coupures panachées ou
                    des grosses coupures. Vous pouvez également spécifier vos
                    préférences dans la section &#39;Notes&#39; de votre
                    commande.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Où livrez-vous ?
                  </Typography>
                  <br />
                  <Typography>
                    Nous livrons en France métropolitaine.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Pourquoi dois-je fournir une pièce d&#39;identité ?
                  </Typography>
                  <br />
                  <Typography>
                    Cette mesure est en place pour se conformer aux lois sur la
                    lutte contre le blanchiment d&#39;argent et le financement
                    de terrorisme.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Est-ce sécurisé d&#39;Achetez en ligne chez vous ?
                  </Typography>
                  <br />
                  <Typography>
                    Oui, toutes les transactions sont sécurisées et cryptées
                    pour votre protection. Nous respectons les normes de
                    sécurité les plus strictes pour protéger vos informations
                    personnelles.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Comment suivre ma commande ?
                  </Typography>
                  <br />
                  <Typography>
                    Une fois votre commande expédiée, vous recevrez un e-mail
                    contenant les informations de suivi qui vous permettront de
                    suivre votre commande en temps réel.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Quelles sont les options de paiement ?
                  </Typography>
                  <br />
                  <Typography>
                    Nous acceptons les paiements par carte bleue et par virement
                    bancaire. Pour le paiement par virement, un RIB vous sera
                    envoyé par e-mail.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Acceptez-vous les cartes American Express ?
                  </Typography>
                  <br />
                  <Typography>
                    Nous n&#39;acceptons pas les cartes American Express. Nous
                    acceptons uniquement les cartes VISA et MASTERCARD.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Comment puis-je vous contacter pour un service clientèle ?
                  </Typography>
                  <br />
                  <Typography>
                    Vous pouvez nous contacter via notre formulaire en ligne,
                    par téléphone, ou par e-mail. Nous nous efforçons de
                    répondre dans les plus brefs délais.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Où peut-on utiliser les dollars américains ?
                  </Typography>
                  <br />
                  <Typography>
                    Changez vos euros en dollars américains principalement pour
                    des voyages aux États-Unis. De plus, le dollar est
                    couramment accepté en Amérique du Sud, en Afrique et au
                    Moyen- Orient.
                  </Typography>
                  <Typography>
                    Certains pays préfèrent des billets récents et en bon état.
                    Chez Change et Or Bastille, nous fournissons exclusivement
                    des billets neufs de dollars, et ce, aux meilleurs tarifs.
                    De plus, nous offrons une vaste sélection de coupures pour
                    répondre à tous vos besoins.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Si je pars à l&#39;étranger, est-il préférable de changer en
                    devises étrangères avant de voyager ?
                  </Typography>
                  <br />
                  <Typography>
                    Il est effectivement recommandé de convertir vos euros en
                    devises étrangères avant votre départ.
                  </Typography>
                  <Typography>
                    Chez Change et Or Bastille, nous offrons une grande variété
                    de devises à des tarifs compétitifs.
                  </Typography>
                  <Typography>
                    De plus, nous garantissons une livraison rapide et
                    sécurisée.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Y a-t-il des frais supplémentaires sur les taux affichés ?
                  </Typography>
                  <br />
                  <Typography>
                    Les taux que nous affichons sont nets, sans aucun frais
                    additionnel.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Puis-je échanger les billets et les pièces restants après
                    mon voyage ?
                  </Typography>
                  <br />
                  <Typography>
                    Nous rachetons uniquement les billets à notre bureau à
                    Paris.
                  </Typography>
                  <Typography>
                    Malheureusement, nous n&#39;acceptons pas les pièces de
                    monnaie.
                  </Typography>
                  <Typography>
                    Si vous avez acquis les devises via notre site, nous vous
                    proposons un taux préférentiel lors de la revente.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Comment puis-je être alerté des meilleurs taux ?
                  </Typography>
                  <br />
                  <Typography>
                    Vous pouvez vous inscrire à notre service &#39;Alerte
                    Meilleur Taux&#39; pour être notifié par e-mail lorsque les
                    taux atteignent votre prix souhaité.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Pourquoi les pièces reçues ne sont-elles pas scellées ?
                  </Typography>
                  <br />
                  <Typography>
                    Certaines pièces d&#39;investissement et de collection ne
                    nécessitent pas d&#39;être scellées. Le fait qu&#39;elles ne
                    soient pas scellées ne remet pas en question leur
                    authenticité.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Comment savoir si les pièces en or reçues ne sont pas
                    fausses ?
                  </Typography>
                  <br />
                  <Typography>
                    Tous nos produits sont expertisés par nos soins, forts de 20
                    ans d&#39;expérience dans le métier. Vous recevrez également
                    une facture attestant de l&#39;authenticité de vos pièces
                    d&#39;or.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    J&#39;ai des pièces d&#39;or, puis-je les vendre en ligne ?
                  </Typography>
                  <br />
                  <Typography>
                    La vente en ligne n&#39;est pas disponible pour les pièces
                    d&#39;or. Cependant, vous pouvez consulter nos prix
                    d&#39;achat sur le site et prendre rendez-vous pour
                    effectuer la vente directement dans notre bureau.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "700" }}>
                    Y a-t-il une taxe lors de la vente d&#39;or ?
                  </Typography>
                  <br />
                  <Typography>
                    Lorsque vous vendez des pièces d&#39;or, des taxes
                    s&#39;appliquent : TMP de 11.50% ou le TPV à 36,20% sur la
                    plus-value. Cette dernière bénéficie d&#39;un abattement de
                    5% dès la 3ème année de détention et d&#39;une exonération
                    totale après 22 ans. Ces allègements ne sont possibles que
                    si vous présentez des justificatifs datés et nominatifs.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Layout>
        </>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
