import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalculateIcon from "@mui/icons-material/Calculate";
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaymentIcon from "@mui/icons-material/Payment";

export default function EncouragmentRachatBijoux() {
  const navigate = useNavigate();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  }));
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={6} lg={3} sx={{ cursor: "pointer" }}>
        <Item>
          {/* <Box
            component="img"
            sx={{
              height: { xs: "3.5rem" },
              width: "4rem",
              margin: "auto",
            }}
            alt="achat devises en ligne"
            src="/50exchange.png"
          /> */}
          <Box sx={{ padding: "1rem", display: "flex" }}>
            <Box
              sx={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                alignItems: "center",
              }}
            >
              <CalculateIcon
                sx={{
                  height: "3rem",
                  stroke: "#000000",
                  strokeWidth: "0.3px",
                  color: "white",
                  padding: "1rem",
                  width: "3.5rem",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              minHeight: { xs: "4rem", lg: "7rem", xl: "4rem" },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                margin: "0 auto",
                color: "#000",
                padding: "0 2rem 1rem 2rem",
                textAlign: "center",
              }}
            >
              Évaluation en Ligne
            </Typography>
          </Box>
          <Box sx={{ height: ".5rem", background: "#EEAC1F" }}></Box>
        </Item>
      </Grid>
      <Grid item xs={12} sm={6} lg={3} sx={{ cursor: "pointer" }}>
        <Item>
          <Box sx={{ padding: "1rem", display: "flex" }}>
            <Box
              sx={{
                width: "60px",
                height: "60px",

                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                alignItems: "center",
              }}
            >
              {/* <Box
                component="img"
                sx={{
                  height: { xs: "3.5rem" },
                  width: "4rem",
                  margin: "auto",
                }}
                alt="achat en ligne devises et d’or en livraison"
                src="/fastdelivery.png"
              /> */}
              <CalendarMonthIcon
                sx={{
                  height: "3rem",
                  stroke: "#000000",
                  strokeWidth: "0.3px",
                  color: "white",
                  padding: "1rem",
                  width: "4rem",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              minHeight: { xs: "4rem", lg: "7rem", xl: "4rem" },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                margin: "0 auto",
                color: "#000",
                padding: "0 2rem 1rem 2rem",
                textAlign: "center",
              }}
            >
              Prenez un Rendez-vous
            </Typography>
          </Box>
          <Box sx={{ height: ".5rem", background: "#EEAC1F" }}></Box>
        </Item>
      </Grid>
      <Grid item xs={12} sm={6} lg={3} sx={{ cursor: "pointer" }}>
        <Item>
          <Box sx={{ padding: "1rem", display: "flex" }}>
            <Box
              sx={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                alignItems: "center",
              }}
            >
              <SearchIcon
                sx={{
                  height: "3rem",
                  color: "white",
                  stroke: "#000000",
                  strokeWidth: "0.3px",
                  padding: "1rem",
                  width: "6rem",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              minHeight: { xs: "4rem", lg: "7rem", xl: "4rem" },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                margin: "0 auto",
                color: "#000",
                padding: "0 2rem 1rem 2rem",
                textAlign: "center",
              }}
            >
              Expertise Professionnelle
            </Typography>
          </Box>
          <Box sx={{ height: ".5rem", background: "#EEAC1F" }}></Box>
        </Item>
      </Grid>
      <Grid item xs={12} sm={6} lg={3} sx={{ cursor: "pointer" }}>
        <Item>
          {" "}
          <Box sx={{ padding: "1rem", display: "flex" }}>
            <Box
              sx={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                alignItems: "center",
              }}
            >
              {/* <Box
                component="img"
                sx={{
                  height: { xs: "3.5rem" },
                  width: "5rem",
                  margin: "auto",
                }}
                alt="bureau de change en ligne securise"
                src="/securePayment.png"
              /> */}
              <PaymentIcon
                sx={{
                  stroke: "#000000",
                  strokeWidth: "0.3px",
                  height: "3rem",
                  color: "white",
                  padding: "1rem",
                  width: "3rem",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              minHeight: { xs: "4rem", lg: "7rem", xl: "4rem" },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                margin: "0 auto",
                color: "#000",
                padding: "0 2rem 1rem 2rem",
                textAlign: "center",
              }}
            >
              Paiement immédiat
            </Typography>
          </Box>
          <Box sx={{ height: ".5rem", background: "#EEAC1F" }}></Box>
        </Item>
      </Grid>
    </Grid>
  );
}
