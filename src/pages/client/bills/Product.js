import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
export default function Product(props) {
  const StyledImg = styled("img")({});
  const navigate = useNavigate();
  return (
    <swiper-slide>
      <Card
        sx={{
          maxWidth: { xs: "26rem", sm: "250px", xl: "20rem" },
          margin: "0 1.5rem 0 0 ",
        }}
        onClick={() => {
          navigate(
            props.type === "Piece D'investissment"
              ? `/pieces-or-investissement/${props.name.replaceAll(" ", "-")}/${
                  props.id
                }`
              : props.type === "Lingots/Lingotin"
              ? `/lingots-lingotins-or/${props.name.replaceAll(" ", "-")}/${
                  props.id
                }`
              : `/pieces-or-collection/${props.name.replaceAll(" ", "-")}/${
                  props.id
                }`
          );
        }}
      >
        <CardActionArea sx={{ padding: " 1rem" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <StyledImg
              height="150px"
              width={"250px"}
              sx={{
                objectFit: "contain",
                fontFamily: "Poppins, sans-serif",
                maxWidth: "100%",
              }}
              loading="lazy"
              src={props.url}
              alt={props.name}
            />
          </Box>

          <CardContent>
            <Box
              sx={{
                minHeight: "7rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                gutterBottom
                variant="h6"
                textAlign={"center"}
                component="div"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: { xs: "15px", md: "1rem" },
                }}
              >
                {props.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                textAlign={"center"}
                component="div"
                sx={{
                  margin: "0 0",
                  fontWeight: "700",
                  fontSize: { xs: "15px", md: "1rem" },
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {props.price} €
              </Typography>
            </Box>

            <Link
              style={{
                display: "flex",
                justifyContent: "center",
                textDecoration: "none",
                borderRadius: "8px",
                marginTop: ".5rem",
                color: "#fff",
                padding: ".5rem",
                background: "#EEAC1F",
                fontSize: "1rem",
                fontFamily: "Work Sans, sans-serif",
              }}
              to={
                props.type === "Piece D'investissment"
                  ? `/pieces-or-investissement/${props.name.replaceAll(
                      " ",
                      "-"
                    )}/${props.id}`
                  : props.type === "Lingots/Lingotin"
                  ? `/lingots-lingotins-or/${props.name.replaceAll(" ", "-")}/${
                      props.id
                    }`
                  : `/pieces-or-collection/${props.name.replaceAll(" ", "-")}/${
                      props.id
                    }`
              }
            >
              DÉTAILS
            </Link>
          </CardContent>
        </CardActionArea>
      </Card>
    </swiper-slide>
  );
}
