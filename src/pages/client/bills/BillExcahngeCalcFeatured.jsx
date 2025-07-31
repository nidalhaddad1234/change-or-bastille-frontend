import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { getCountryCode } from "../../../helpers";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";

export default function BillExchangeCalcFeatured(props) {
  const {
    currencyName,
    iso,
    price,
    id,
    redirect,
    coefficienct,
    smallestBill,
    moneyName,
  } = props;
  const [euro, setEuro] = useState(1 * price);
  const StyledImg = styled("img")({});
  const navigate = useNavigate();

  const [exchangeFrom, setExchangeFrom] = useState(
    coefficienct ? 1 * coefficienct : 1
  );

  const addToCart = (product) => {
    navigate("/panier-article/" + product.id + "/" + exchangeFrom);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            padding: { sm: "1rem 8rem", md: "1rem" },
          }}
          className={redirect && "hover-highlight"}
          onClick={(e) => {
            redirect &&
              !(e.target.tagName.toUpperCase() == "INPUT") &&
              !(e.target.tagName.toUpperCase() == "BUTTON") &&
              !(e.target.tagName.toUpperCase() == "PATH") &&
              !(e.target.tagName.toUpperCase() == "SVG") &&
              navigate(
                "/cours-des-devises/" +
                  currencyName.replaceAll(" ", "-") +
                  "/" +
                  id
              );
          }}
        >
          <Grid
            xs={2}
            sm={4}
            lg={3}
            xl={3}
            item
            sx={{ display: "flex", gap: { sm: "10px" } }}
          >
            <StyledImg
              loading="lazy"
              sx={{
                margin: "auto",
                height: "30px",
                width: { xs: "50px", sm: "80px" },
                objectFit: "none",
              }}
              alt={`${moneyName.replaceAll(
                " ",
                "-"
              )} - ${currencyName.replaceAll(" ", "-")} - ${iso.toUpperCase()}`}
              height="30px"
              width="50px"
              src={`https://flagsapi.com/${getCountryCode(
                iso.toUpperCase()
              )}/flat/64.png`}
              srcSet={`https://flagsapi.com/${getCountryCode(
                iso.toUpperCase()
              )}/flat/64.png`}
            />
            <Typography
              variant="body1"
              sx={{
                minWidth: { xs: "130px", lg: "70px", xl: "130px" },
                maxWidth: { lg: "70px", xl: "auto" },
                fontSize: { xs: "14px", lg: "12px", xl: "14px" },
                lineHeight: { xs: "13px", xl: "40px" },
                display: { xs: "none", sm: "flex" },
                fontWeight: 700,
                margin: "auto 0",
                textAlign: "Start",
              }}
            >
              {currencyName}
            </Typography>
          </Grid>

          <Grid
            xs={10}
            sm={8}
            lg={9}
            item
            sx={{ display: "flex", gap: { xs: "5px", sm: "15px" } }}
          >
            <Box sx={{ display: "flex", gap: { xs: "5px", sm: "15px" } }}>
              <TextField
                value={exchangeFrom}
                type="text"
                sx={{ width: { xs: "80px", xl: "120px" }, background: "#fff" }}
                size="small"
                onClick={(e) =>
                  e.target.setSelectionRange(0, e.target.value.length)
                }
                onChange={(event) => {
                  if (isNaN(event.target.value)) {
                    return;
                  }
                  setExchangeFrom(event.target.value);
                  setEuro(
                    coefficienct
                      ? (event.target.value * price) / coefficienct
                      : event.target.value * price
                  );
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "14px",
                  lineHeight: "40px",
                  fontWeight: 700,
                  textAlign: "center",
                  width: "2rem",
                }}
              >
                {iso}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: { xs: "2px", sm: "15px" } }}>
              <TextField
                value={euro}
                size="small"
                type="text"
                sx={{ width: { xs: "80px", xl: "120px" }, background: "#fff" }}
                onClick={(e) =>
                  e.target.setSelectionRange(0, e.target.value.length)
                }
                onChange={(event) => {
                  if (isNaN(event.target.value)) {
                    return;
                  }
                  setEuro(event.target.value);
                  setExchangeFrom(
                    coefficienct
                      ? (event.target.value / price) * coefficienct
                      : event.target.value / price
                  );
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "14px",
                  lineHeight: "40px",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                €
              </Typography>
            </Box>
            <Button
              sx={{
                display: { xs: "none", xl: "block" },
                fontSize: { md: "8px", lg: "8px", xxl: "initial" },
              }}
              variant="contained"
              onClick={() =>
                addToCart({
                  currencyName: currencyName,
                  iso: iso,
                  price: price,
                  id: id,
                  coefficienct: coefficienct,
                  euro: euro,
                  exchangeFrom: exchangeFrom,
                  smallesBill: smallestBill,
                })
              }
              color={"gold"}
            >
              AJOUTER AU PANIER
            </Button>
            <Button
              sx={{ display: { xl: "none", xs: "block" }, maxHeight: "2.5rem" }}
              variant="contained"
              onClick={() =>
                addToCart({
                  currencyName: currencyName,
                  iso: iso,
                  price: price,
                  id: id,
                  coefficienct: coefficienct,
                  euro: euro,
                  exchangeFrom: exchangeFrom,
                  smallesBill: smallestBill,
                })
              }
              color={"gold"}
            >
              <ShoppingCartIcon />
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
