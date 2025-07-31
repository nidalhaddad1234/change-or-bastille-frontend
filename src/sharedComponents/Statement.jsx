import { Box, Typography } from "@mui/material";

export default function Statement() {
  return (
    <>
      <Box>
        <Box
          sx={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontSize: "1rem !important",
              fontWeight: "bold !important",
            }}
          >
            Commandez en ligne des devises, pièces d'or d'investissement et
            lingots d'or directement depuis Change et Or Bastille, votre bureau
            de Change en ligne de confiance, et bénéficiez des meilleurs taux.
          </Typography>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontSize: "1rem !important",
              fontWeight: "bold !important",
            }}
          >
            Livraison assurée partout en France métropolitaine.
          </Typography>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontSize: "1rem !important",
              fontWeight: "bold !important",
            }}
          >
            Nos prix sont nets, sans aucune commission supplémentaire.
          </Typography>
        </Box>
        <Box sx={{ height: ".5rem", background: "#EEAC1F" }}></Box>
      </Box>
    </>
  );
}
