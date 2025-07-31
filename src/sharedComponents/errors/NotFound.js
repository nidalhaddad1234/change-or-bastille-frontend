import { Box, Button, Link, Typography } from "@mui/material";
import Layout from "../../layout/client/Layout";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    // <Layout>

    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: "10rem",
              color: "rgb(238, 172, 31)",
              lineHeight: "0.9 ",
            }}
          >
            404
          </Typography>
          <Box sx={{ border: "1px dashed black" }}></Box>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", fontSize: "1.5rem" }}
          >
            {" "}
            Rien ici
          </Typography>
          <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              color="gold"
              sx={{
                minWidth: "9rem",
                height: "2.5rem",
              }}
            >
              ne va à la sécurité ?
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>

    // </Layout>
  );
}
