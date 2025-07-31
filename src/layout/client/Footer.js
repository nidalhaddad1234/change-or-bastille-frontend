import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../../css/layout.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import AlertModal from "../../sharedComponents/AlertModal";
import agent from "../../agent";
import TidioChat from "../../sharedComponents/TidioChat";
export default function Footer() {
  const [open, setOpen] = React.useState(false);
  const [openDone, setOpenDone] = React.useState(false);
  const [token, setToken] = React.useState("");
  const StyledImg = styled("img")({});
  const reCaptcha = useRef();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("").max(255).required(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setOpen(false);
        var result = await agent.news.addToNewsLetter(values.email);
        if (result.message === "Success") {
          formik.resetForm();
          setOpenDone(true);
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.data });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  var currentYear = new Date().getFullYear();
  const handleClose = () => {
    setToken("");
    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    <footer style={{ background: "#eeeeee" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.2357886402096!2d2.3663632!3d48.853714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671693ae1047f%3A0xca17f3751823036!2sChange%20et%20Or%20Bastille%20-%20Le%20Marais%20-%20Bureau%20de%20Change%20Par%20Palm%20Exchange!5e0!3m2!1sen!2slb!4v1714238010528!5m2!1sen!2slb"
        width={1920}
        height={400}
        style={{ border: 0, margin: "auto", maxWidth: "100%" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <Box sx={{ margin: { md: "3rem 10rem", sm: "3rem .5rem" } }} mt={5}>
        <Grid container rowSpacing={5}>
          <Grid
            item
            xs={12}
            sm={4}
            lg={5}
            xl={7}
            sx={{
              paddingTop: "1rem !important",
              padding: "0 1rem",
              // display: { xl: "flex" },
            }}
          >
            <StyledImg
              sx={{
                height: "auto",
                width: { xs: "100%", sm: "100%" },
                maxWidth: { xs: "20rem" },
                objectFit: "contain",
                cursor: "pointer",
              }}
              height="200px"
              title="https://www.change-or-enligne.com/"
              width="300px"
              onClick={() => navigate("/")}
              alt="bureau de change en ligne"
              src="/Bureau-de-change-en-ligne.webp"
            />
            <Box
              sx={{
                margin: { xl: "auto" },
                marginLeft: { xs: "12px !important", lg: "0" },
                maxWidth: "35rem",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: "1rem !important",
                    sm: "12px !important",
                    md: "1rem !important",
                  },
                  fontWeight: "500",
                }}
              >
                Change et Or Bastille Par Palm Exchange, votre bureau de change
                en ligne et à Paris, spécialisé dans la vente et l’achat de
                devises au meilleur prix. Livraison en France Métropolitaine.
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  marginTop: "1rem",
                  fontSize: "1rem",
                  fontWeight: "700",
                }}
              >
                Suivez-nous
              </Typography>
              <Box sx={{ display: "flex", gap: "5px" }}>
                <InstagramIcon
                  sx={{
                    cursor: "pointer",
                    color: "#EEAC1F",
                    fontSize: "2.5rem",
                  }}
                  onClick={() =>
                    window.open(
                      "https://instagram.com/change_or_enligne?igshid=OGQ5ZDc2ODk2ZA==",
                      "_blank",
                    )
                  }
                />
                <LinkedInIcon
                  sx={{
                    cursor: "pointer",
                    color: "#EEAC1F",
                    fontSize: "2.5rem",
                  }}
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/company/change-or-en-ligne/about/",
                      "_blank",
                    )
                  }
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            sx={{
              paddingTop: { xs: "0 !important", md: "1rem !important" },
              display: "flex",
              flexDirection: { xs: "column", sm: "column-Reverse" },
              justifyContent: "center",
              padding: "0 2rem",
            }}
            item
            xs={12}
            sm={8}
            lg={7}
            xl={5}
          >
            <Box
              sx={{
                marginTop: "1rem",
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: { xs: "1rem", md: "0" },
                  flexDirection: { xs: "column" },
                }}
              >
                <Box
                  sx={{ display: "flex", gap: "10px", cursor: "pointer" }}
                  onClick={() =>
                    window.open(
                      "https://maps.app.goo.gl/oc4pVS4hMJcxeQYC8?g_st=ic",
                      "_blank",
                    )
                  }
                >
                  <StyledImg
                    sx={{
                      height: "22px",
                      color: "white",
                      objectFit: "contain",
                    }}
                    alt="location"
                    src="/pingold.png"
                  />
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: {
                        xs: "1rem !important",
                        sm: "12px !important",
                        md: "1rem !important",
                      },
                      marginTop: "auto",
                    }}
                  >
                    <Link
                      style={{
                        color: "Black",
                        fontWeight: "500",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                    >
                      18 Rue Saint-Antoine 75004 PARIS
                    </Link>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <StyledImg
                    sx={{
                      height: "22px",
                      color: "white",
                      objectFit: "contain",
                    }}
                    alt="phone number"
                    src="/phonegold.png"
                  />
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: {
                        xs: "1rem !important",
                        sm: "12px !important",
                        md: "1rem !important",
                      },
                      marginTop: "auto",
                    }}
                  >
                    <span
                      style={{ fontWeight: "500", cursor: "pointer" }}
                      onClick={() => window.open("tel:0956041425")}
                    >
                      {" "}
                      09 56 04 14 25
                    </span>
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <StyledImg
                    sx={{
                      height: "22px",
                      color: "white",
                      objectFit: "contain",
                    }}
                    alt="nous contacter"
                    src="/messagegold.png"
                  />
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: {
                        xs: "1rem !important",
                        sm: "12px !important",
                        md: "1rem !important",
                      },
                      marginTop: "auto",
                    }}
                  >
                    <Link
                      style={{
                        color: "Black",
                        fontWeight: "500",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                      to="/nous-contacter"
                    >
                      contact@change-or-enligne.com{" "}
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  padding: { xs: "0rem 1rem 0 0", sm: "0" },
                }}
              >
                <Typography
                  sx={{ fontWeight: "600", size: "25px", marginBottom: "1rem" }}
                >
                  ABONNEZ-VOUS À NOTRE NEWSLETTERS
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: "15px",
                  }}
                >
                  <TextField
                    size="small"
                    placeholder="ADRESSE E-MAIL"
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                    sx={{
                      background: "white",
                      width: { lg: "20rem", xl: "23rem" },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    color="gold"
                    sx={{ minWidth: "8rem" }}
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    JE M’ABONNE
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  padding: { xs: "1rem 0rem 0rem 0" },
                  flexBasis: "auto !important",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: {
                      xs: "center !important",
                      sm: "Start !important",
                    },
                    padding: { md: "1rem 0rem", xs: "0rem 1rem" },
                    gap: { xs: "1rem", sm: "2rem" },
                  }}
                >
                  <StyledImg
                    sx={{
                      objectFit: "contain",
                      height: { xs: "4rem", lg: "4rem" },
                      width: { xs: "4rem", lg: "7rem" },
                    }}
                    height="200px"
                    width={"300px"}
                    loading="lazy"
                    alt="Credit Mutuel"
                    src="/payment1.webp"
                  />
                  <StyledImg
                    sx={{
                      objectFit: "contain",
                      height: { xs: "4rem", lg: "3.5rem" },
                      width: { xs: "4rem", lg: "7rem" },
                    }}
                    height="200px"
                    width={"300px"}
                    loading="lazy"
                    alt="OB"
                    src="/payment2.webp"
                  />
                  <StyledImg
                    sx={{
                      objectFit: "contain",
                      height: { xs: "4rem", lg: "3.5rem" },
                      width: { xs: "4rem", lg: "7rem" },
                    }}
                    height="200px"
                    width={"300px"}
                    loading="lazy"
                    alt="Master Card"
                    src="/payment3.webp"
                  />
                  <StyledImg
                    sx={{
                      objectFit: "contain",
                      height: { xs: "4rem", lg: "3.5rem" },
                      width: { xs: "5rem", lg: "7rem" },
                    }}
                    height="200px"
                    width={"300px"}
                    loading="lazy"
                    alt="Visa"
                    src="/payment4.webp"
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          background: "#333333",
          marginTop: { sm: "40px", xs: "40px" },
          padding: { xs: "2rem .5rem ", md: "2rem 10rem " },
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: { xs: "center", lg: "initial" },
            fontSize: { xs: "7px", md: "12px", lg: "15px" },
          }}
        >
          <Grid item xs={4}>
            <Link
              style={{ color: "#fff", textDecoration: "none" }}
              to="/qui-sommes-nous"
            >
              Qui sommes-nous?
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link
              style={{ color: "#fff", textDecoration: "none" }}
              to="/avis-client"
            >
              Avis Clients
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link
              style={{ color: "#fff", textDecoration: "none" }}
              to="/achat-enligne-securise"
            >
              Achat en ligne sécurisé
            </Link>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: { xs: "center", lg: "initial" },
            fontSize: { xs: "7px", md: "12px", lg: "15px" },
          }}
        >
          <Grid item xs={4}>
            <Link
              style={{ color: "#fff", textDecoration: "none" }}
              to="/delais-livraison"
            >
              Délais de Livraison
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link
              style={{ color: "#fff", textDecoration: "none" }}
              to="/adresse"
            >
              Adresse
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link
              style={{ color: "#fff", textDecoration: "none" }}
              to="/nous-contacter"
            >
              Nous contacter
            </Link>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "start",
            color: "#fff",
            fontSize: { xs: "7px", md: "12px", lg: "15px" },
            justifyContent: { xs: "center", lg: "initial" },
          }}
        >
          <Grid item xs={4}>
            <Link
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
              to="/mentions-legales"
            >
              Mentions légales
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
              to="/cgv"
            >
              Conditions générales de vente
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
              to="/protection-donnees-personnelles"
            >
              Protection des données personnelles
            </Link>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "start",
            color: "#fff",
            fontSize: { xs: "7px", md: "12px", lg: "15px" },
            justifyContent: { xs: "center", lg: "initial" },
          }}
        >
          <Grid item xs={4}>
            <Link
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
              to="/lutte-contre-blanchiment-argent-et-financement-terrorisme"
            >
              LCB/FT
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
              to="/cookies"
            >
              Cookies
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
              to="/plan-site"
            >
              Plan du site
            </Link>
          </Grid>
        </Grid>
      </Box>

      <Typography
        sx={{
          padding: { md: ".5rem 10rem", sm: ".5rem .5rem" },
        }}
        color={"gold.main"}
      >
        COPYRIGHT @{currentYear}
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography>
            Confirmez-vous votre souhait de vous inscrire à notre newsletter?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ReCAPTCHA
            ref={reCaptcha}
            sitekey={process.env.REACT_APP_RECAPTCHA_SECRET}
            onChange={(token) => {
              if (token) setToken(token);
            }}
            onExpired={(e) => setToken("")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="gold" variant="contained">
            Non
          </Button>
          <Button
            autoFocus
            color="gold"
            variant="contained"
            disabled={!(formik.isValid && formik.dirty) || token.length === 0}
            onClick={() => formik.handleSubmit(formik.values, formik.helpers)}
            type="submit"
          >
            Oui
          </Button>
        </DialogActions>
      </Dialog>
      <TidioChat />

      <AlertModal
        open={openDone}
        text={"Merci de vous être inscrit à notre newsletter"}
        disabled={!(formik.isValid && formik.dirty)}
        setOpen={setOpenDone}
      />
    </footer>
  );
}
