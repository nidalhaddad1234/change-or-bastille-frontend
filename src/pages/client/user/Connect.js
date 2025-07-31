import Layout from "../../../layout/client/Layout";
import React, { Fragment } from "react";
import { Typography, Box, TextField, Button, Grid, Alert } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import agent from "../../../agent";
import { getClaims, logout, saveToken } from "../../../auth/handleJWT";
import AuthenticationContext from "../../../auth/AuthenticationContext";
import { useContext } from "react";
import { useState } from "react";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function Connect() {
  const { update } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const exists = /[?&]created=/.test(window.location.search);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Doit être une adresse e-mail valide")
        .max(255)
        .required("Champ obligatoire"),
      password: Yup.string().max(255).required("Champ obligatoire"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        var result = await agent.account.logIn(values.email, values.password);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        logout();
        setError("");
        saveToken(result.data);
        const claims = getClaims();
        update(claims);
        navigate("/");
      } catch (err) {
        setError("les informations d'identification invalides");
      }
    },
  });
  const store = useContextStore();
  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h5" sx={{ fontWeight: "700" }} pb={5}>
                CONNECTEZ-VOUS À VOTRE COMPTE
              </Typography>
              <Box
                sx={{
                  background: "#FFF",
                  padding: {
                    xs: "1rem",
                    md: "2rem",
                    paddingBottom: { sx: "4rem !important", lg: "" },
                  },
                }}
              >
                <Alert
                  severity="success"
                  sx={{
                    margin: "0 0 2rem 0",
                    display: exists ? "flex" : "none",
                  }}
                >
                  votre compte a été créé avec succès veuillez vous connecter
                  avec vos identifiants
                </Alert>
                <Alert
                  severity="error"
                  sx={{
                    margin: "2rem",
                    display: error.length > 0 ? "flex" : "none",
                  }}
                >
                  {error}
                </Alert>

                <Grid container spacing={2} sx={{ textAlign: "center" }}>
                  <Grid item xs={12}>
                    <TextField
                      error={!!(formik.touched.email && formik.errors.email)}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.email}
                      placeholder="Adresse E-mail"
                      sx={{
                        background: "#EEEEEE",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                        maxWidth: "40rem",
                      }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={
                        !!(formik.touched.password && formik.errors.password)
                      }
                      fullWidth
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.password}
                      placeholder="Mot de passe"
                      sx={{
                        background: "#EEEEEE",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                        maxWidth: "40rem",
                      }}
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/mot-passe-oublie"
                    >
                      Mot de passe oublié?
                    </Link>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disableElevation
                    fullWidth
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                    sx={{
                      backgroundColor: "#EEAC1F",
                      color: "#fff",
                      fontSize: "1rem",
                      boxShadow: "none",
                      width: "15rem",
                      "&:hover": {
                        backgroundColor: "#EEAC1F", // Optional: Add hover color if desired
                      },
                      "&:active": {
                        backgroundColor: "#EEAC1F", // Keep the same color when the button is clicked
                      },
                      maxWidth: "40rem",
                      margin: "auto",
                    }}
                  >
                    Connexion
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disableElevation
                    fullWidth
                    sx={{
                      backgroundColor: "#EEAC1F",
                      color: "#fff",
                      fontSize: "1rem",
                      width: "15rem",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#EEAC1F", // Optional: Add hover color if desired
                      },
                      "&:active": {
                        backgroundColor: "#EEAC1F", // Keep the same color when the button is clicked
                      },
                      maxWidth: "40rem",
                      margin: "auto",
                    }}
                    onClick={() => navigate("/creation-compte")}
                  >
                    CRÉEZ VOTRE COMPTE
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
