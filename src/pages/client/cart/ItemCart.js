import Layout from "../../../layout/client/Layout";
import React, { useContext, useEffect } from "react";
import {
  Typography,
  Box,
  FormControl,
  Button,
  ButtonBase,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";
import agent from "../../../agent";
import { useParams } from "react-router-dom";
import CartContext from "../../../sharedComponents/CartContext";
import ShoppingCartModal from "../../../sharedComponents/ShoppingCartModal";
import { getCountryCode } from "../../../helpers";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function ItemCart() {
  const { id, quantity } = useParams();
  const { cartItems, setCartItems } = useContext(CartContext);
  const store = useContextStore();
  useEffect(() => {
    const fetchData = async () => await agent.currencies.getCurrencyById(id);
    fetchData()
      .then((result) => {
        const sortedBills = result.data.bills.sort((a, b) => a.name - b.name);
        const exchangeFrom = quantity;
        setRoundedNumber(
          Math.ceil(exchangeFrom / sortedBills[0].name) * sortedBills[0].name
        ); // Round up to the nearest multiple of the smallest bill
        setData(result.data);
      })
      .catch((error) => {});
    return () => {};
  }, []);
  const [data, setData] = useState();
  const [roundedNumber, setRoundedNumber] = useState();
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Petites Coupures");

  const addToCart = () => {
    const product = {};

    const exist = cartItems.find((x) => x.id === data._id);

    product.exchangeFrom = roundedNumber;
    product.euro = (
      data.coefficient
        ? (roundedNumber * data.sellPrice) / data.coefficient
        : roundedNumber * data.sellPrice
    ).toFixed(3);
    product.currencyName = data.currencyName;
    product.iso = data.iso;
    product.price = data.sellPrice;
    product.id = data._id;
    product.coefficient = data.coefficient;
    product.description = description;
    product.denominations = selectedValue;
    if (exist) {
      var filteredOldItem = cartItems.filter((x) => x.id !== product.id);
      setCartItems([...filteredOldItem, product]);
    } else {
      setCartItems([...cartItems, { ...product }]);
    }
    setOpen(true);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;

    if (selectedValue === value) {
      setSelectedValue("");
    } else {
      setSelectedValue(value);
    }
  };

  return (
    <>
      {store.globalStoreClient.isLoadedBanner && data ? (
        <Layout>
          {data ? (
            <Box
              sx={{
                padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
              }}
            >
              <h1 className="d-none">
                {data.currencyName} ({data.iso})
              </h1>

              <Typography
                variant="h2"
                sx={{ fontWeight: "700" }}
                className="titleUnderline"
                pb={5}
              >
                {data.currencyName} ({data.iso})
              </Typography>
              <FormControl
                sx={{
                  width: "100%",
                  background: "#FFF",
                  padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4} md={4}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={3} md={3} sx={{ display: "flex" }}>
                        <img
                          loading="lazy"
                          style={{
                            margin: "auto",
                            height: "30px",
                            width: "50px",
                            objectFit: "cover",
                          }}
                          height="30px"
                          width="50px"
                          src={`https://flagsapi.com/${getCountryCode(
                            data.iso.toUpperCase()
                          )}/flat/64.png`}
                          srcSet={`https://flagsapi.com/${getCountryCode(
                            data.iso.toUpperCase()
                          )}/flat/64.png`}
                          alt=""
                        />
                      </Grid>
                      <Grid sx={{ margin: "auto" }} item xs={12} sm={7} md={7}>
                        <Typography sx={{ textAlign: "center" }}>
                          Etats-Unis {data.currencyName}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: { xs: "none", md: "flex" },
                        flexDirection: "column",
                        margin: "auto",
                      }}
                    >
                      <Typography
                        variant="Body1"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "13px", xl: "initial" },
                        }}
                      >
                        {data.coefficient ? (
                          <>
                            1 € ={" "}
                            {parseFloat(
                              (1 / data.sellPrice) * data.coefficient
                            ).toFixed(3)}{" "}
                            {data.iso}
                          </>
                        ) : (
                          <>
                            1 € = {parseFloat(1 / data.sellPrice).toFixed(3)}{" "}
                            {data.iso}
                          </>
                        )}
                      </Typography>
                      <Typography
                        variant="Body1"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "13px", xl: "initial" },
                        }}
                      >
                        {data.coefficient ? (
                          <>
                            {1 * data.coefficient} {data.iso} ={" "}
                            {1 * data.sellPrice} €
                          </>
                        ) : (
                          <>
                            1 {data.iso} = {1 * data.sellPrice} €
                          </>
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography>
                      {data.coefficient
                        ? (
                            (roundedNumber * data.sellPrice) /
                            data.coefficient
                          ).toFixed(3)
                        : (roundedNumber * data.sellPrice).toFixed(2)}
                      € = {roundedNumber} {data.iso}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography pt={5} pb={2} sx={{ fontWeight: "700" }}>
                  Coupures disponibles
                </Typography>
                <Grid container>
                  {data.bills.map((elm) => (
                    <ButtonBase
                      key={elm.name}
                      sx={{ display: "block", padding: 2 }}
                    >
                      <Typography variant="body1">
                        {elm.name} {data.iso}
                      </Typography>
                    </ButtonBase>
                  ))}
                </Grid>
                <Typography pt={5} pb={2} sx={{ fontWeight: "700" }}>
                  Choix de coupures
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedValue === "Petites Coupures"}
                        onChange={handleCheckboxChange}
                        value="Petites Coupures"
                      />
                    }
                    label="Petites Coupures"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedValue === "Coupures panachées"}
                        onChange={handleCheckboxChange}
                        value="Coupures panachées"
                      />
                    }
                    label="Coupures panachées"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedValue === "Grosses coupures"}
                        onChange={handleCheckboxChange}
                        value="Grosses coupures"
                      />
                    }
                    label="Grosses coupures"
                  />
                </FormGroup>

                <TextField
                  id="outlined-multiline-static"
                  multiline
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  sx={{
                    margin: "1rem 0",
                    padding: ".2rem",
                    background: "#EEEEEE",
                    textAlign: { xs: "center", md: "initial" },
                  }}
                  placeholder="Note : préciser les coupures souhaitées"
                />
                <Box sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => addToCart()}
                    disableElevation
                    sx={{
                      backgroundColor: "#EEAC1F",
                      color: "#fff",
                      marginBottom: "1.5rem",
                      margin: "auto",
                      fontSize: "1rem",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#EEAC1F", // Optional: Add hover color if desired
                      },
                      "&:active": {
                        backgroundColor: "#EEAC1F", // Keep the same color when the button is clicked
                      },
                    }}
                  >
                    AJOUTER AU PANIER
                  </Button>
                </Box>
              </FormControl>
              <ShoppingCartModal open={open} setOpen={setOpen} />
            </Box>
          ) : (
            <LoadingMain />
          )}
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
