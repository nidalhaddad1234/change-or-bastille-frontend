import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext, useState } from "react";
import { getCountryCode } from "../../../helpers";
import { useNavigate } from "react-router-dom";
import CartContext from "../../../sharedComponents/CartContext";
import ShoppingCartModal from "../../../sharedComponents/ShoppingCartModal";

export default function BillExchangeCalc(props) {
  const {
    currencyName,
    moneyName,
    iso,
    price,
    isList,
    id,
    redirect,
    coefficienct,
    smallestBill,
  } = props;
  const [euro, setEuro] = useState(1 * price);

  const navigate = useNavigate();

  const [exchangeFrom, setExchangeFrom] = useState(
    coefficienct ? 1 * coefficienct : 1
  );

  const addToCart = (product) => {
    navigate("/panier-article/" + product.id + "/" + exchangeFrom);
  };

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          margin: "auto",
          justifyContent: "center",
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
        <Grid xs={2} md={2} lg={1} xl={0.7} item sx={{ display: "flex" }}>
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
              iso.toUpperCase()
            )}/flat/64.png`}
            srcSet={`https://flagsapi.com/${getCountryCode(
              iso.toUpperCase()
            )}/flat/64.png`}
            alt={`${moneyName.replaceAll(" ", "-")} - ${currencyName.replaceAll(
              " ",
              "-"
            )} - ${iso.toUpperCase()}`}
          />
        </Grid>
        <Grid
          item
          sx={{
            display: { xs: "none", sm: "flex" },
          }}
          sm={3}
          md={4}
          lg={2}
        >
          <Typography
            variant="body1"
            sx={{
              minWidth: { xl: "130px", sx: "auto" },
              fontSize: "14px",
              lineHeight: { xs: "13px", xl: "40px" },
              fontWeight: 700,
              margin: "auto 0",
              textAlign: "Start",
            }}
          >
            {currencyName}
          </Typography>
        </Grid>

        {isList && (
          <>
            <Grid
              xs={2.5}
              md={2}
              sx={{
                display: { xs: "none", lg: "flex" },
              }}
              item
            >
              <Typography
                variant="Body1"
                sx={{
                  margin: "auto 0",
                  fontWeight: 700,
                  fontSize: { xs: "13px", xl: "initial" },
                }}
              >
                NOUS VENDONS
              </Typography>
            </Grid>
            <Grid
              xs={2.5}
              md={2}
              sx={{
                display: { xs: "none", lg: "flex" },
              }}
              item
            >
              <Box
                sx={{
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="Body1"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "13px", xl: "initial" },
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "Start",
                  }}
                >
                  {coefficienct ? (
                    <>
                      1 € = {parseFloat((1 / price) * coefficienct).toFixed(3)}{" "}
                      {iso}
                    </>
                  ) : (
                    <>
                      1 € = {parseFloat(1 / price).toFixed(3)} {iso}
                    </>
                  )}
                </Typography>
                <Typography
                  variant="Body1"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "13px", xl: "initial" },
                    textAlign: "Start",
                  }}
                >
                  {coefficienct ? (
                    <>
                      {1 * coefficienct} {iso} = {1 * price} €
                    </>
                  ) : (
                    <>
                      1 {iso} = {1 * price} €
                    </>
                  )}
                </Typography>
              </Box>
            </Grid>
          </>
        )}

        <Grid
          md={5}
          xs={10}
          sm={6}
          item
          sx={{
            display: "flex",
            gap: { xs: "5px", sm: "15px" },
            justifyContent: "Center",
          }}
        >
          <Box sx={{ display: "flex", gap: { xs: "5px", sm: "15px" } }}>
            <TextField
              value={exchangeFrom}
              type="text"
              sx={{
                width: { xs: "80px", xl: "120px" },
                "& .MuiInputBase-root": { background: "#fff" },
              }}
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
              sx={{
                width: { xs: "80px", xl: "120px" },
                "& .MuiInputBase-root": { background: "#fff" },
              }}
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
    </>
  );
}
