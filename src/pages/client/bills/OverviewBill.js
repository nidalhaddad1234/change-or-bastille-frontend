import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Layout from "../../../layout/client/Layout";
import BillExchangeCalc from "./BillExchangeCalc";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useContextStore } from "../../../stores/RootStoreContext";
import { styled } from "@mui/material/styles";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { getPriceValidUntil } from "../../../helpers";
export default observer(function OverviewBill() {
  const { id } = useParams();
  const store = useContextStore();

  const StyledImg = styled("img")({});
  useEffect(() => {
    const fetchData = async () => await store.currenciesStoreClient.getbyId(id);
    fetchData()
      .then((result) => {
        setData(result);
      })
      .catch((error) => {});
    return () => {};
  }, [id]);

  function calculateEstimatedArrival() {
    const now = new Date();
    const options = { timeZone: "Europe/Paris" };
    const test = now.toLocaleString("en-US", options);
    const currentHour = new Date(test).getHours();

    // Function to add a specified number of business days to the current date
    function addWorkDays(startDate, days) {
      if (isNaN(days)) {
        return;
      }
      if (!(startDate instanceof Date)) {
        return;
      }
      // Get the day of the week as a number (0 = Sunday, 1 = Monday, .... 6 = Saturday)
      var dow = startDate.getDay();
      var daysToAdd = parseInt(days);
      // If the current day is Sunday add one day
      if (dow == 0) daysToAdd++;
      // If the start date plus the additional days falls on or after the closest Saturday calculate weekends
      if (dow + daysToAdd >= 6) {
        //Subtract days in current working week from work days
        var remainingWorkDays = daysToAdd - (5 - dow);
        //Add current working week's weekend
        daysToAdd += 2;
        if (remainingWorkDays > 5) {
          //Add two days for each working week by calculating how many weeks are included
          daysToAdd += 2 * Math.floor(remainingWorkDays / 5);
          //Exclude final weekend if remainingWorkDays resolves to an exact number of weeks
          if (remainingWorkDays % 5 == 0) daysToAdd -= 2;
        }
      }
      startDate.setDate(startDate.getDate() + daysToAdd);
      return startDate;
    }

    let estimatedArrivalDate;
    estimatedArrivalDate =
      currentHour < 15 || now.getDay() == 0 || now.getDay() == 6
        ? addWorkDays(now, 2)
        : addWorkDays(now, 3); // Add 2 business days

    var date = new Date(estimatedArrivalDate);

    //if sunday make it monday
    date.setDate(
      date.getDay() + 2 != 7 ? date.getDate() + 2 : date.getDate() + 3,
    );
    return (
      <span>
        <span
          style={{
            color: "#EEAC1F",
          }}
        >
          {estimatedArrivalDate
            .toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })
            .toString()}
        </span>{" "}
        et le{" "}
        <span
          style={{
            color: "#EEAC1F",
          }}
        >
          {date
            .toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })
            .toString()}
        </span>
      </span>
    );
  }

  const [data, setData] = useState();
  const date = new Date();
  const formattedDate = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const estimatedArrival = calculateEstimatedArrival();
  const title =
    data && data.title
      ? data.title
      : data
      ? `Achat ${data.currencyName} ${data.iso} en Ligne Livraison à domicile`
      : "";
  const description =
    data && data.description
      ? data.description
      : data
      ? `Changez vos euros en ${data.currencyName} ${data.iso} au meilleur taux. Livraison rapide et sécurisée en france métropolitaine`
      : "";
  return (
    <div>
      {data ? (
        <Layout>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link
              rel="canonical"
              href={`https://www.change-or-enligne.com/cours-des-devises/${data.currencyName.replaceAll(
                " ",
                "-",
              )}/${data._id}`}
            />

            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                name: `${data.currencyName} (${data.iso})`,
                image: `${data.bills[data.bills.length - 1].photo}`,
                description: description,
                brand: {
                  "@type": "Brand",
                  name: "Change et Or Bastille",
                },
                offers: {
                  "@type": "Offer",
                  name: `${data.currencyName} (${data.iso})`,
                  url: `${window.location.href}`,
                  price: `${1 * data.sellPrice}`,
                  priceValidUntil: getPriceValidUntil(),
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                  seller: {
                    "@type": "Organization",
                    name: "Change et Or Bastille",
                  },
                },
              })}
            </script>
          </Helmet>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            <h1 className="d-none">
              {data.currencyName} ({data.iso})
            </h1>

            <Typography variant="h2" className="titleUnderline">
              {data.currencyName} ({data.iso})
            </Typography>
            <Typography variant="body1" mt={2}>
              COURS DE VENTE DU {data.currencyName.toString().toUpperCase()}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "500", fontStyle: "italic" }}
            >
              Le {formattedDate}
            </Typography>
            <Box
              sx={{
                margin: "2rem 0",
                background: "#D9D9D9",
                padding: "1rem .5rem",
              }}
            >
              <BillExchangeCalc
                currencyName={data.currencyName}
                iso={data.iso}
                price={data.sellPrice}
                smallestBill={data.bills[0].name}
                id={data._id}
                moneyName={data.moneyName}
                isList={true}
                coefficienct={data.coefficient}
              />
            </Box>

            <Box
              sx={{
                flexDirection: "column",
                display: { xs: "flex", lg: "none" },
                gap: "10px",
                marginBottom: "1rem",
              }}
            >
              <Typography
                variant="Body1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "13px", sm: "initial" },
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "Start",
                }}
              >
                {data.coefficient ? (
                  <>
                    Taux de vente 1 € ={" "}
                    {parseFloat(
                      (1 / data.sellPrice) * data.coefficient,
                    ).toFixed(3)}{" "}
                    {data.iso}
                  </>
                ) : (
                  <>
                    Taux de vente 1 € ={" "}
                    {parseFloat(1 / data.sellPrice).toFixed(3)} {data.iso}
                  </>
                )}
              </Typography>
              <Typography
                variant="Body1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "13px", sm: "initial" },
                  textAlign: "Start",
                }}
              >
                {data.coefficienct ? (
                  <>
                    Vous achetez {1 * data.coefficienct} {data.iso} pour{" "}
                    {1 * data.sellPrice} €
                  </>
                ) : (
                  <>
                    Vous achetez 1 {data.iso} pour {1 * data.sellPrice} €
                  </>
                )}
              </Typography>
            </Box>
            <Box
              sx={{
                margin: "1rem 0",
                background: "#fff",
                padding: "1rem .5rem",
                border: "2px #d9d9d9 solid",
                borderRadius: "5px",
                display: "flex",
                gap: "15px",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <LocalShippingIcon
                  sx={{
                    color: "#EEAC1F",
                    fontSize: "1.8rem",
                    margin: "auto 0",
                  }}
                />
                <Typography
                  variant="h2"
                  sx={{
                    margin: "auto 0",
                    fontWeight: "700",
                    fontSize: {
                      xs: ".90rem !important",
                      md: "1rem !important",
                    },
                  }}
                >
                  Commandez dès maintenant et prévoyez la réception de votre
                  commande entre le {estimatedArrival}
                </Typography>

                {/* <AccessTimeIcon
                  sx={{
                    color: "#EEAC1F",
                    fontSize: "1.8rem",
                    margin: "auto 0",
                  }}
                /> */}
              </Box>
              {/* <DeliveryDiningIcon
                fontSize="large"
                sx={{
                  color: "#EEAC1F",
                }}
              /> */}
            </Box>
            <Typography variant="body1" mb={2}>
              {data.topText}
            </Typography>
            {data.bills
              .slice()
              .sort((a, b) => a.name - b.name) //
              .map((elm) => (
                <Box key={elm.name}>
                  <Typography variant="body1" mb={5} fontWeight={1000}>
                    {elm.description && elm.description}
                  </Typography>
                  <Box sx={{ display: "flex", gap: "2rem" }} mb={5}>
                    <StyledImg
                      sx={{
                        width: "45%",
                        height: {
                          xs: "100px",
                          sm: "150px",
                          md: "200px",
                          lg: "250px",
                          xl: "300px",
                        },
                      }}
                      height="350px"
                      width="500px"
                      alt={`Achat ${data.currencyName} ${data.iso}`}
                      src={elm.photo}
                      loading="lazy"
                    />
                    <StyledImg
                      sx={{
                        width: "45%",
                        height: {
                          xs: "100px",
                          sm: "150px",
                          md: "200px",
                          lg: "250px",
                          xl: "300px",
                        },
                      }}
                      height="350px"
                      width="500px"
                      loading="lazy"
                      alt={`Achat ${data.currencyName} ${data.iso}`}
                      src={elm.photo2}
                    />
                    <Box component="img" />
                  </Box>
                </Box>
              ))}
            <Typography variant="body1" mb={2}>
              {data.bottomText}
            </Typography>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </div>
  );
});
