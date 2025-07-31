import Layout from "../../../layout/client/Layout";
import LoadingData from "../../../sharedComponents/LoadingData";
import React, { useContext, useEffect, useRef } from "react";
import {
  Typography,
  Box,
  FormControl,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import CartContext from "../../../sharedComponents/CartContext";
import { getCountryCode } from "../../../helpers";
import { useNavigate } from "react-router-dom";
import agent from "../../../agent";
import DeliveryCharge from "./DeliveryCharge";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import UserDeliveryInfo from "./UserDeliveryInfo";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function ContinueToPayment() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [price, setPrice] = useState();
  const [delivery, setDelivery] = useState(0);
  const [formData, setFormData] = useState();
  const [confirmEffectif, setConfirmEffectif] = useState(false);
  const [confirmGeneral, setConfirmGeneral] = useState(false);
  const [selectedValue, setSelectedValue] = useState("CARTE BANCAIRE");

  const navigate = useNavigate();
  useEffect(() => {
    if (!cartItems) return;

    updateCartItems(cartItems).then(() => {
      let result = 0;
      cartItems.forEach((item) => {
        result += Number(item.euro);
      });
      setPrice(result);
      if (delivery === undefined) return;
      dataForm(result).then((result) => {
        setFormData(result.data);
      });
    });
  }, [delivery]);
  const dataForm = async (result) => {
    return await agent.orders.createOrderFormData(
      (result + delivery).toFixed(2)
    );
  };
  const updateCartItems = async (cartItems) => {
    const updatedCartItems = await Promise.all(
      cartItems.map(async (item) => {
        if (item.exchangeFrom) {
          var result = await agent.currencies.getCurrencyById(item.id);

          var finalPrice =
            item.coefficient.length > 0
              ? (
                  (result.data.sellPrice * item.exchangeFrom) /
                  Number(item.coefficient)
                ).toFixed(2)
              : (result.data.sellPrice * item.exchangeFrom).toFixed(2);
          return {
            ...item,
            price: result.data.sellPrice,
            euro: finalPrice,
          };
        } else {
          var result = await agent.metals.getMetalById(item.id);
          return { ...item, euro: result.data.netSellPrice };
        }
      })
    );

    setCartItems(updatedCartItems);
  };

  const handleSubmit = async (e) => {
    try {
      var result = await agent.orders.add(
        cartItems,
        selectedValue,
        formData.MAC,
        (price + delivery).toFixed(2),
        formData.reference,
        delivery
      );
      if (result.message === "Success") {
        if (selectedValue === "CARTE BANCAIRE")
          // Trigger a click event on the button
          await formRef.current.submit();
        else {
          var sendEmailResult = await agent.orders.sendManualOrderEmail(
            result.data._id
          );
          if (sendEmailResult.message === "Success")
            navigate(`/commande-terminee/${formData.reference}/virement?`);
        }
        setCartItems([]);
      }
    } catch (e) {}
  };
  const formRef = useRef(null);
  const store = useContextStore();
  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <h1 className="d-none">PANIER</h1>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            {cartItems.length > 0 ? (
              <>
                <Typography
                  variant="h2"
                  sx={{ fontWeight: "700" }}
                  className="titleUnderline"
                  pb={5}
                >
                  PANIER
                </Typography>
                <FormControl
                  sx={{
                    width: "100%",
                    background: "#FFF",
                    padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
                  }}
                >
                  {delivery != null && (price + delivery).toFixed(2) <= 8000 ? (
                    <>
                      <Typography
                        variant="h7"
                        sx={{
                          fontWeight: "700",
                          fontFamily: "Work Sans, sans-serif",
                        }}
                        pb={2}
                      >
                        ADRESSE DE LIVRAISON
                      </Typography>
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: "300",
                          fontFamily: "Work Sans, sans-serif",
                        }}
                        pb={5}
                      >
                        <UserDeliveryInfo />
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      variant="h7"
                      sx={{
                        fontWeight: "700",
                        fontFamily: "Work Sans, sans-serif",
                      }}
                      pb={2}
                    >
                      Retrait au guichet 18 rue Saint-Antoine 75004 Paris
                    </Typography>
                  )}
                  {delivery != null &&
                    (price + delivery).toFixed(2) <= 8000 && (
                      <Box sx={{ display: "flex", margin: "auto" }} pb={5}>
                        <Button
                          variant="contained"
                          color="gold"
                          onClick={() => navigate("/modifier-coordonnees")}
                        >
                          MODIFIER VOTRE ADRESSE
                        </Button>
                      </Box>
                    )}
                  <Typography
                    variant="h7"
                    sx={{
                      fontWeight: "700",
                      fontFamily: "Work Sans, sans-serif",
                    }}
                    pb={2}
                  >
                    RECAPITULATIF
                  </Typography>
                  <Grid container sx={{ marginBottom: { xs: 3, md: 0 } }}>
                    {cartItems.map((item) => (
                      <Grid
                        item
                        key={item.id}
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          <Box sx={{ marginRight: "5px" }}>
                            <Box
                              component="img"
                              loading="lazy"
                              sx={{
                                width: { xs: "6rem", md: "6rem" },
                                height: "auto",
                                objectFit: "scale-down",
                                margin: { xs: "auto", md: "initial" },
                              }}
                              height="30px"
                              width="50px"
                              alt="The house from the offer."
                              src={
                                item.photo
                                  ? item.photo
                                  : `https://flagsapi.com/${getCountryCode(
                                      item.iso.toUpperCase()
                                    )}/flat/64.png`
                              }
                              srcSet={
                                item.photo
                                  ? item.photo
                                  : `https://flagsapi.com/${getCountryCode(
                                      item.iso.toUpperCase()
                                    )}/flat/64.png`
                              }
                            />
                          </Box>
                          <Typography
                            sx={{
                              textAlign: "center",
                              margin: "auto",
                              fontSize: { xs: "12px", md: "initial" },
                            }}
                          >
                            {item.exchangeFrom
                              ? item.exchangeFrom
                              : item.currencyName}{" "}
                            {item.exchangeFrom && item.iso}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              margin: "auto",
                              fontSize: { xs: "12px", md: "initial" },
                            }}
                          >
                            {item.quantity &&
                              item.euro / item.quantity +
                                " * " +
                                item.quantity +
                                " = "}{" "}
                            {item.euro} Euro
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid container mt={2} pb={5}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {delivery != null &&
                        (price + delivery).toFixed(2) <= 8000 ? (
                          <>
                            <Typography
                              variant="body1"
                              align="left"
                              sx={{ fontSize: { xs: "12px", md: "initial" } }}
                            >
                              Frais de port
                            </Typography>
                            <Typography
                              variant="body1"
                              align="right"
                              sx={{ fontSize: { xs: "12px", md: "initial" } }}
                            >
                              <DeliveryCharge
                                setDelivery={setDelivery}
                                amount={price}
                                delivery={delivery}
                              />
                            </Typography>
                          </>
                        ) : (
                          <Typography
                            variant="body1"
                            align="left"
                            sx={{ fontSize: { xs: "12px", md: "initial" } }}
                          >
                            Retrait au guichet
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="body1"
                          align="left"
                          sx={{ fontSize: { xs: "12px", md: "initial" } }}
                        >
                          total
                        </Typography>
                        <Typography
                          variant="body1"
                          align="right"
                          sx={{ fontSize: { xs: "12px", md: "initial" } }}
                        >
                          {(price + delivery).toFixed(2)} Euro
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Typography
                    variant="h7"
                    sx={{
                      fontWeight: "700",
                      fontFamily: "Work Sans, sans-serif",
                    }}
                    pb={2}
                  >
                    MOYEN DE PAIEMENT
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column" }} mb={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedValue === "CARTE BANCAIRE"}
                          onChange={(e) => setSelectedValue(e.target.value)}
                          value="CARTE BANCAIRE"
                        />
                      }
                      label="CARTE BANCAIRE"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedValue === "VIREMENT"}
                          onChange={(e) => setSelectedValue(e.target.value)}
                          value="VIREMENT"
                        />
                      }
                      label="VIREMENT"
                    />
                  </Box>
                  <Typography
                    variant="h7"
                    sx={{
                      fontWeight: "700",
                      fontFamily: "Work Sans, sans-serif",
                    }}
                    mb={1}
                  >
                    BÉNÉFICIAIRE EFFECTIF
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      sx={{
                        marginBottom: "2rem",
                      }}
                      control={
                        <Checkbox
                          checked={confirmEffectif}
                          onChange={(e) => setConfirmEffectif(e.target.checked)}
                          value="CARTE BANCAIRE"
                        />
                      }
                      label=" Je déclare être le seul bénéficiaire effectif de cette opération"
                    />
                  </Box>
                  <Typography
                    variant="h7"
                    sx={{
                      fontWeight: "700",
                      fontFamily: "Work Sans, sans-serif",
                    }}
                    mb={1}
                  >
                    CONDITIONS GÉNÉRALES
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      sx={{
                        marginBottom: "2rem",
                      }}
                      control={
                        <Checkbox
                          checked={confirmGeneral}
                          onChange={(e) => {
                            setConfirmGeneral(e.target.checked);
                          }}
                          value="CARTE BANCAIRE"
                        />
                      }
                      label="En cochant cette case, je confirme avoir pris connaissance et accepté les conditions générales de vente, ainsi que               les obligations liées à la lutte contre le blanchiment d'argent et le financement du terrorisme. Je comprends également qu'une copie recto-verso de ma carte d'identité ou de mon passeport, ainsi qu'un justificatif de domicile datant de moins de six mois sont requis pour finaliser ma commande."
                    />

                    {delivery != null &&
                    (price + delivery).toFixed(2) <= 8000 ? (
                      <Typography sx={{ fontWeight: "700" }} mb={2}>
                        Veuillez noter que pour des raisons de sécurité et de
                        conformité, nous devons vérifier votre identité avant
                        d'expédier votre commande. Vous serez invité à
                        télécharger une copie de votre pièce d'identité et un
                        justificatif de domicile dans votre espace client. Votre
                        commande ne sera pas expédiée avant que ces documents
                        n'aient été vérifiés et approuvés. Nous vous remercions
                        de votre compréhension et de votre coopération.
                      </Typography>
                    ) : (
                      <Typography sx={{ fontWeight: "700" }} mb={2}>
                        Votre commande dépasse 8000€. Pour des raisons de
                        sécurité et afin de garantir la meilleure expérience à
                        nos clients, l'option de livraison à domicile n'est pas
                        disponible pour les commandes d'une telle valeur. Nous
                        vous invitons à retirer votre commande directement à
                        notre guichet dans notre agence. Nous vous assurons un
                        service sécurisé et personnalisé. Merci de
                        votre compréhension.
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <form
                      ref={formRef}
                      style={{ margin: "auto" }}
                      method="post"
                      action="https://p.monetico-services.com/paiement.cgi"
                    >
                      {formData &&
                        Object.entries(formData).map(([key, value]) => {
                          return (
                            <input
                              key={key}
                              type="hidden"
                              name={key}
                              value={value}
                            />
                          );
                        })}
                      <LoadingData isObject={true} data={formData}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSubmit}
                          size="large"
                          disabled={!confirmEffectif || !confirmGeneral}
                          disableElevation
                          sx={{
                            backgroundColor: "#EEAC1F",
                            color: "#fff",

                            fontSize: { xs: "10px", md: "initial" },
                            width: { xs: "15rem", md: "20rem" },
                            boxShadow: "none",
                            "&:hover": {
                              backgroundColor: "#EEAC1F", // Optional: Add hover color if desired
                            },
                            "&:active": {
                              backgroundColor: "#EEAC1F", // Keep the same color when the button is clicked
                            },
                          }}
                        >
                          PAYER
                        </Button>
                        <Button type="submit" sx={{ display: "none" }} />
                      </LoadingData>
                    </form>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setCartItems([]);
                        navigate("/panier-vide");
                      }}
                      size="large"
                      disableElevation
                      sx={{
                        margin: { xs: "0 auto", md: "auto" },
                        backgroundColor: "#EEEEEE",
                        color: "#000",
                        marginBottom: "1.5rem",
                        fontSize: { xs: "10px", md: "initial" },
                        width: { xs: "15rem", md: "20rem" },
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#EEEEEE", // Optional: Add hover color if desired
                        },
                        "&:active": {
                          backgroundColor: "#EEEEEE", // Keep the same color when the button is clicked
                        },
                      }}
                    >
                      MODIFIER MON PANIER
                    </Button>
                  </Box>
                </FormControl>
              </>
            ) : (
              <LoadingMain />
            )}
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
