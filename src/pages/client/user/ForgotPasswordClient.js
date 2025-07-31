import Layout from "../../../layout/client/Layout";
import React, { Fragment } from "react";
import {
  Typography,
  Box,
  FormControl,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import agent from "../../../agent";
import { getClaimValue } from "../../../auth/handleJWT";
import { useContext } from "react";
import AuthenticationContext from "../../../auth/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function ForgotPasswordClient() {
  const { claims } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("error");
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password1: "",
      password2: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().max(255).required("Champ obligatoire"),
      password1: Yup.string()
        .required("Champ obligatoire")
        .min(8, "Le mot de passe doit comporter au moins 8 caractères"),
      password2: Yup.string()
        .oneOf(
          [Yup.ref("password1"), null],
          "Les mots de passe doivent correspondre"
        )
        .required("Champ obligatoire"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setErrorType("");
        setErrorType("error");

        var result = await agent.account.resetPassword(
          values.currentPassword,
          values.password1,
          getClaimValue("username", claims)
        );
        setError("Mot de passe modifié avec succès");
        setErrorType("success");
        formik.resetForm();
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
          <h1 className="d-none">MODIFIER LE MOT DE PASSE</h1>

          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Typography
                variant="h2"
                sx={{ fontWeight: "700" }}
                className="titleUnderline"
                pb={5}
              >
                MODIFIER LE MOT DE PASSE
              </Typography>

              <Fragment>
                <FormControl
                  sx={{
                    width: "100%",
                    background: "#FFF",
                    padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
                  }}
                >
                  <Alert
                    severity={errorType}
                    sx={{
                      margin: "2rem",
                      display: error.length > 0 ? "flex" : "none",
                    }}
                  >
                    {error}
                  </Alert>

                  <Grid
                    container
                    spacing={2}
                    sx={{
                      padding: {
                        sm: "0",
                        md: "0 5rem",
                        lg: "0 10rem",
                        xl: "0 30rem",
                      },
                    }}
                  >
                    <Grid item xs={12}>
                      <TextField
                        error={
                          !!(
                            formik.touched.currentPassword &&
                            formik.errors.currentPassword
                          )
                        }
                        fullWidth
                        helperText={
                          formik.touched.currentPassword &&
                          formik.errors.currentPassword
                        }
                        name="currentPassword"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.currentPassword}
                        placeholder="Mot de passe actuel"
                        sx={{
                          background: "#EEEEEE",
                          "& .MuiFormHelperText-root": {
                            marginLeft: "0px",
                            marginTop: "0px",
                            marginRight: "0px",
                            background: "#FFF",
                          },
                        }}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={
                          !!(
                            formik.touched.password1 && formik.errors.password1
                          )
                        }
                        fullWidth
                        helperText={
                          formik.touched.password1 && formik.errors.password1
                        }
                        name="password1"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password1}
                        placeholder="Nouveau mot de passe"
                        sx={{
                          background: "#EEEEEE",
                          "& .MuiFormHelperText-root": {
                            marginLeft: "0px",
                            marginTop: "0px",
                            marginRight: "0px",
                            background: "#FFF",
                          },
                        }}
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        error={
                          !!(
                            formik.touched.password2 && formik.errors.password2
                          )
                        }
                        fullWidth
                        helperText={
                          formik.touched.password2 && formik.errors.password2
                        }
                        name="password2"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password2}
                        placeholder="Confirmation du mot de passe"
                        sx={{
                          background: "#EEEEEE",
                          "& .MuiFormHelperText-root": {
                            marginLeft: "0px",
                            marginTop: "0px",
                            marginRight: "0px",
                            background: "#FFF",
                          },
                        }}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    xs={12}
                    item
                    sx={{
                      margin: "auto",
                      padding: {
                        sm: "0",
                        md: "0 5rem",
                        lg: "0 10rem",
                        xl: "0 30rem",
                      },
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                      disabled={!(formik.isValid && formik.dirty)}
                      sx={{
                        backgroundColor: "#EEAC1F",
                        color: "#fff",
                        width: { xs: "initial", md: "25rem" },
                        margin: "1rem 0",
                        fontSize: "1rem",
                        textTransform: "capitalize",
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#EEAC1F", // Optional: Add hover color if desired
                        },
                        "&:active": {
                          backgroundColor: "#EEAC1F", // Keep the same color when the button is clicked
                        },
                      }}
                    >
                      ENREGISTRER UN NOUVEAU MOT DE PASSE
                    </Button>
                  </Grid>
                </FormControl>
              </Fragment>
            </form>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
