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
import { useState } from "react";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function ForgotPassword() {
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("error");
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Doit être une adresse e-mail valide")
        .max(255)
        .required("Champ obligatoire"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setError("");
        setErrorType("error");
        var result = await agent.account.forgotPasswordEmail(values.email);
        setError(
          "Un e-mail de réinitialisation a été envoyé à votre adresse mail. Veuillez consulter votre boîte de réception."
        );
        setErrorType("success");
        formik.resetForm();
      } catch (err) {
        setError("les informations invalides");
      }
    },
  });
  const store = useContextStore();
  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <h1 className="d-none">MOT DE PASSE OUBLIÉ</h1>

          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            <Typography
              className="titleUnderline"
              variant="h2"
              sx={{ fontWeight: "700" }}
              pb={5}
            >
              MOT DE PASSE OUBLIÉ
            </Typography>
            <Fragment>
              <FormControl
                sx={{
                  width: "100%",
                  background: "#FFF",
                  padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
                }}
              >
                <form onSubmit={formik.handleSubmit}>
                  <Typography variant="body1" sx={{ fontWeight: "300" }} pb={2}>
                    Si vous n'arrivez pas à accéder à votre compte ou si vous
                    avez oublié votre mot de passe, veuillez renseigner votre
                    adresse e-mail ci-dessous. Nous vous enverrons un lien de
                    réinitialisation à cette adresse.
                  </Typography>
                  <Alert
                    severity={errorType}
                    sx={{
                      marginBottom: "2rem",
                      display: error.length > 0 ? "flex" : "none",
                    }}
                  >
                    {error}
                  </Alert>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <TextField
                      error={!!(formik.touched.email && formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.email}
                      placeholder="Adresse E-mail"
                      sx={{
                        background: "#EEEEEE",
                        width: { xs: "20rem", lg: "40rem" },

                        margin: "auto",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                      }}
                      size="small"
                    />
                    <Grid xs={12} sx={{ margin: "auto" }} item>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disableElevation
                        type="submit"
                        disabled={!(formik.isValid && formik.dirty)}
                        sx={{
                          width: { xs: "20rem", lg: "40rem" },
                          backgroundColor: "#EEAC1F",
                          color: "#fff",
                          margin: "1rem",
                          width: { xs: "initial", md: "25rem" },
                          fontSize: { xs: ".8rem", lg: "1rem" },
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#EEAC1F", // Optional: Add hover color if desired
                          },
                          "&:active": {
                            backgroundColor: "#EEAC1F", // Keep the same color when the button is clicked
                          },
                        }}
                      >
                        ENVOYER
                      </Button>
                    </Grid>
                  </Box>
                </form>
              </FormControl>
            </Fragment>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
