import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LockIcon from "@mui/icons-material/Lock";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
export default function Encouragment() {
  const navigate = useNavigate();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  }));
  const StyledImg = styled("img")({});
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid
        item
        xs={12}
        sm={6}
        lg={3}
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/cours-des-devises")}
      >
        <Item>
          <Box sx={{ padding: "1rem", display: "flex" }}>
            <StyledImg
              sx={{
                height: "auto",
                height: "4rem",
                color: "white",
                padding: "1rem",
                width: "100%",
                objectFit: "contain",
                cursor: "pointer",
              }}
              alt="Achat devises étrangères en ligne"
              src="/devises.webp"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              minHeight: { xs: "4rem", sm: "7rem", lg: "13rem", xl: "7rem" },
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
              Plus de 50 devises sont disponibles en boutique et en ligne avec
              choix des coupures
            </Typography>
          </Box>
          <Box sx={{ height: ".5rem", background: "#EEAC1F" }}></Box>
        </Item>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        lg={3}
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/nous-contacter")}
      >
        <Item>
          <Box sx={{ padding: "1rem", display: "flex" }}>
            <StyledImg
              sx={{
                height: "auto",
                height: "4rem",
                color: "white",
                padding: "1rem",
                width: "100%",
                objectFit: "contain",
                cursor: "pointer",
              }}
              alt="Achat devises étrangères à Paris"
              src="/2.webp"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              minHeight: { xs: "4rem", sm: "7rem", lg: "13rem", xl: "7rem" },
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
              Achetez vos devises directement en magasin, avec ou sans
              réservation. Contactez-nous par téléphone ou email pour réserver.
            </Typography>
          </Box>
          <Box sx={{ height: ".5rem", background: "#EEAC1F" }}></Box>
        </Item>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        lg={3}
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/delais-livraison")}
      >
        <Item>
          <Box sx={{ padding: "1rem", display: "flex" }}>
            <StyledImg
              sx={{
                height: "auto",
                height: "4rem",
                color: "white",
                padding: "1rem",
                width: "100%",
                objectFit: "contain",
                cursor: "pointer",
              }}
              alt="Achat devises en ligne avec livraison à domicile"
              src="/3.webp"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              minHeight: { xs: "4rem", sm: "7rem", lg: "13rem", xl: "7rem" },
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
              Livraison Assurée 48-72h dans toute la France Métropolitaine
            </Typography>
          </Box>
          <Box sx={{ height: ".5rem", background: "#EEAC1F" }}></Box>
        </Item>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        lg={3}
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/nous-contacter")}
      >
        <Item>
          {" "}
          <Box sx={{ padding: "1rem", display: "flex" }}>
            <StyledImg
              sx={{
                height: "auto",
                height: "4rem",
                color: "white",
                padding: "1rem",
                width: "100%",
                objectFit: "contain",
                cursor: "pointer",
              }}
              alt="vendre des devises étrangères à Paris"
              src="/4.webp"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              minHeight: { xs: "4rem", sm: "7rem", lg: "13rem", xl: "7rem" },
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
              Nous rachetons presque toute les devises ayant cours légal.
              Contactez-nous pour négocier le Meilleur taux du marché
            </Typography>
          </Box>
          <Box sx={{ height: ".5rem", background: "#EEAC1F" }}></Box>
        </Item>
      </Grid>
    </Grid>
  );
}
