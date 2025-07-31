import Layout from "../../../layout/client/Layout";
import React, { Fragment, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import {
  Typography,
  Box,
  FormControl,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import agent from "../../../agent";
import ReCAPTCHA from "react-google-recaptcha";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";

export default observer(function Contact() {
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("error");
  const [token, setToken] = useState("");

  const reCaptcha = useRef();
  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      email: "",
      object: "",
      subject: "",
    },
    validationSchema: Yup.object({
      lastName: Yup.string().max(255).required("Champ obligatoire"),
      firstName: Yup.string().max(255).required("Champ obligatoire"),
      email: Yup.string()
        .email("Doit être une adresse e-mail valide")
        .max(255)
        .required("Champ obligatoire"),
      object: Yup.string().max(255).required("Champ obligatoire"),
      subject: Yup.string().max(255).required("Champ obligatoire"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (!token) {
          setError("Vous devez vérifier le captcha");
          return;
        }
        setError("");
        setToken("");
        var result = await agent.account.Submit(
          values.firstName,
          values.lastName,
          values.email,
          values.object,
          values.subject,
          token
        );
        if (result.message === "Success") {
          setError("Votre message a été envoyé avec succès.");
          setErrorType("success");
        } else {
          setError(result.data);
          setErrorType("error");
        }
        formik.resetForm();
        reCaptcha.current.reset();
      } catch (error) {
        setErrorType("error");
        reCaptcha.current.reset();
        setToken("");
        setError(error.response.data.data);
      }
    },
  });
  const store = useContextStore();

  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <h1 className="d-none">Nous Contacter Change et Or Bastille</h1>
          <Helmet>
            <meta
              name="description"
              content="Contactez Change et Or Bastille pour toutes questions ou assistance. Nous sommes là pour
          vous aider avec vos transactions de devises et d'or."
            />
            <title>Nous Contacter Change et Or Bastille</title>
            <link
              rel="canonical"
              href="https://www.change-or-enligne.com/nous-contacter"
            />
          </Helmet>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            <Typography
              variant="h2"
              className="titleUnderline"
              sx={{ fontWeight: "600", textTransform: "uppercase" }}
              pb={5}
            >
              Nous Contacter
            </Typography>
            <Fragment>
              <form onSubmit={formik.handleSubmit}>
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
                      margin: "2rem 0",
                      display: error.length > 0 ? "flex" : "none",
                    }}
                  >
                    {error}
                  </Alert>

                  <TextField
                    error={
                      !!(formik.touched.lastName && formik.errors.lastName)
                    }
                    fullWidth
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    name="lastName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.lastName}
                    placeholder="Nom"
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

                  <TextField
                    error={
                      !!(formik.touched.firstName && formik.errors.firstName)
                    }
                    fullWidth
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                    name="firstName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.firstName}
                    placeholder="Prénom"
                    sx={{
                      background: "#EEEEEE",
                      marginTop: "2rem",
                      "& .MuiFormHelperText-root": {
                        marginLeft: "0px",
                        marginTop: "0px",
                        marginRight: "0px",
                        background: "#FFF",
                      },
                    }}
                    size="small"
                  />

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
                      marginTop: "2rem",
                      "& .MuiFormHelperText-root": {
                        marginLeft: "0px",
                        marginTop: "0px",
                        marginRight: "0px",
                        background: "#FFF",
                      },
                    }}
                    size="small"
                  />

                  <TextField
                    error={!!(formik.touched.object && formik.errors.object)}
                    fullWidth
                    helperText={formik.touched.object && formik.errors.object}
                    name="object"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.object}
                    placeholder="Objet"
                    sx={{
                      background: "#EEEEEE",
                      marginTop: "2rem",
                      "& .MuiFormHelperText-root": {
                        marginLeft: "0px",
                        marginTop: "0px",
                        marginRight: "0px",
                        background: "#FFF",
                      },
                    }}
                    size="small"
                  />

                  <TextField
                    error={!!(formik.touched.subject && formik.errors.subject)}
                    fullWidth
                    multiline
                    rows={4}
                    helperText={formik.touched.subject && formik.errors.subject}
                    name="subject"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.subject}
                    placeholder="Sujet"
                    sx={{
                      background: "#EEEEEE",
                      marginTop: "2rem",
                      "& .MuiFormHelperText-root": {
                        marginLeft: "0px",
                        marginTop: "0px",
                        marginRight: "0px",
                        background: "#FFF",
                      },
                    }}
                    size="small"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "3rem",
                    }}
                  >
                    <ReCAPTCHA
                      ref={reCaptcha}
                      sitekey={process.env.REACT_APP_RECAPTCHA_SECRET}
                      onChange={(token) => {
                        if (token) setError("");
                        setToken(token);
                      }}
                      onExpired={(e) => setToken("")}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disableElevation
                      disabled={!(formik.isValid && formik.dirty)}
                      type="submit"
                      sx={{
                        backgroundColor: "#EEAC1F",
                        color: "#fff",
                        marginTop: "2rem",
                        width: "10rem",
                        fontSize: "1rem",
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#EEAC1F", // Optional: Add hover color if desired
                        },
                        "&:active": {
                          backgroundColor: "#EEAC1F", // Keep the same color when the button is clicked
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </FormControl>
              </form>
            </Fragment>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
