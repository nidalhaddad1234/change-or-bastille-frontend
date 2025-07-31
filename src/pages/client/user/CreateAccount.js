import Layout from "../../../layout/client/Layout";
import React, { useState, useRef } from "react";
import { countries } from "../../../helpers";
import MenuItem from "@mui/material/MenuItem";
import { Typography, Box, TextField, Button, Grid, Alert } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Select from "@mui/material/Select";
import * as Yup from "yup";
import { useFormik } from "formik";
import agent from "../../../agent";
import ReCAPTCHA from "react-google-recaptcha";
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function CreateAccount() {
  const [type, setType] = React.useState(2);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("error");
  const reCaptcha = useRef();
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const handleChange = (event) => {
    setType(event.target.value);
    formik.values.Civilite =
      event.target.value === 1
        ? "Mlle."
        : event.target.value === 2
          ? "Mme."
          : "M.";
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      company: "",
      phoneNumber: "",
      secondaryPhoneNumber: "",
      address: "",
      postalCode: "",
      municipality: "",
      password: "",
      confirmPassword: "",
      email: "",
      dateOfBirth: "1990-01-01",
      country: countries.find((x) => x.code === "FR"),
      Civilite: "Mme.",
    },
    validationSchema: Yup.object({
      country: Yup.object().required("Champ obligatoire"),
      name: Yup.string().max(255).required("Champ obligatoire"),
      lastName: Yup.string().max(255).required("Champ obligatoire"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Le numéro de téléphone doit contenir uniquement des chiffres")
        .min(10, "Le numéro de téléphone ne doit pas dépasser 10 chiffres")
        .required("Champ obligatoire"),
      secondaryPhoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Le numéro de téléphone doit contenir uniquement des chiffres")
        .min(10, "Le numéro de téléphone ne doit pas dépasser 10 chiffres"),
      address: Yup.string().max(255).required("Champ obligatoire"),
      postalCode: Yup.string().max(255).required("Champ obligatoire"),
      municipality: Yup.string().max(255).required("Champ obligatoire"),
      password: Yup.string()
        .required("Champ obligatoire")
        .min(8, "Le mot de passe doit comporter au moins 8 caractères"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          "Les mots de passe doivent correspondre"
        )
        .required("Champ obligatoire"),
      email: Yup.string()
        .email("Doit être un email valide")
        .max(255)
        .required("Champ obligatoir"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (!token) {
          setError("Vous devez vérifier le captcha");
          return;
        }
        setError("");
        setToken("");
        var result = await agent.account.Register(
          values.municipality,
          values.password,
          values.name,
          values.lastName,
          values.company,
          values.dateOfBirth,
          values.phoneNumber.replaceAll(" ", ""),
          values.secondaryPhoneNumber.replaceAll(" ", ""),
          values.address,
          values.postalCode,
          values.country.label,
          values.email,
          values.Civilite,
          token
        );
        if (result.message === "Success") {
          navigate("/connexion?created=true");
          setError("Success!");
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
          <h1 className="d-none">CREER VOTRE COMPTE</h1>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontWeight: "700" }}
              className="titleUnderline"
              pb={5}
            >
              CREER VOTRE COMPTE
            </Typography>
            <Box
              sx={{ background: "#fff", padding: "2rem", marginTop: "2rem" }}
            >
              <form onSubmit={formik.handleSubmit}>
                <Alert
                  severity={errorType}
                  sx={{
                    margin: "2rem 0",
                    display: error.length > 0 ? "flex" : "none",
                  }}
                >
                  {error}
                </Alert>
                <Grid container rowSpacing={2} columnSpacing={2}>
                  <Typography variant="body1" p={2}>
                    Informations personnelles
                  </Typography>
                  <Grid item xs={12} display={"flex"} sx={{ gap: "10px" }}>
                    <Typography sx={{ margin: "auto 0", fontWeight: "700" }}>
                      Civilite *
                    </Typography>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      size="small"
                      onChange={handleChange}
                      sx={{
                        background: "#EEEEEE",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                      }}
                    >
                      <MenuItem value={1}>Mlle.</MenuItem>
                      <MenuItem value={2}> Mme.</MenuItem>
                      <MenuItem value={3}> M.</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      fullWidth
                      name="name"
                      sx={{
                        background: "#EEEEEE",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                      }}
                      onBlur={formik.handleBlur}
                      size="small"
                      placeholder="Nom *"
                      onChange={formik.handleChange}
                      error={!!(formik.touched.name && formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      type="text"
                      value={formik.values.name}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      fullWidth
                      name="lastName"
                      onBlur={formik.handleBlur}
                      size="small"
                      sx={{
                        background: "#EEEEEE",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                      }}
                      placeholder="Prénom *"
                      onChange={formik.handleChange}
                      error={
                        !!(formik.touched.lastName && formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                      type="text"
                      value={formik.values.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      fullWidth
                      sx={{
                        background: "#EEEEEE",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                      }}
                      name="company"
                      onBlur={formik.handleBlur}
                      size="small"
                      placeholder="Société"
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.company}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={6}
                    display={"flex"}
                    sx={{ gap: "10px" }}
                  >
                    <Typography
                      sx={{
                        margin: "auto 0",
                        fontWeight: "600",
                        width: "210px",
                      }}
                    >
                      Date de naissance *
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        fullWidth
                        format="DD/MM/YYYY"
                        sx={{
                          background: "#EEEEEE",
                          "& .MuiFormHelperText-root": {
                            marginLeft: "0px",
                            marginTop: "0px",
                            marginRight: "0px",
                            background: "#FFF",
                          },
                          width: "100%",
                          "& > .MuiOutlinedInput-root": { height: "40px" },
                        }}
                        defaultValue={dayjs("1990-01-01")}
                        onChange={(e) =>
                          formik.setFieldValue(
                            "dateOfBirth",
                            dayjs(e.$d).format("MM/DD/YYYY")
                          )
                        }
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      fullWidth
                      name="phoneNumber"
                      onBlur={formik.handleBlur}
                      size="small"
                      placeholder="Téléphone portable * (ex:0612343217)"
                      error={
                        !!(
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                        )
                      }
                      helperText={
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                      }
                      onChange={formik.handleChange}
                      type="text"
                      sx={{
                        background: "#EEEEEE",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                      }}
                      value={formik.values.phoneNumber}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      fullWidth
                      name="secondaryPhoneNumber"
                      onBlur={formik.handleBlur}
                      size="small"
                      error={
                        !!(
                          formik.touched.secondaryPhoneNumber &&
                          formik.errors.secondaryPhoneNumber
                        )
                      }
                      helperText={
                        formik.touched.secondaryPhoneNumber &&
                        formik.errors.secondaryPhoneNumber
                      }
                      placeholder="Téléphone secondaire (ex:0612343217)"
                      onChange={formik.handleChange}
                      type="text"
                      sx={{
                        background: "#EEEEEE",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                      }}
                      value={formik.values.secondaryPhoneNumber}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" pt={6} pb={2}>
                      Adresse de livraison
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      fullWidth
                      name="address"
                      onBlur={formik.handleBlur}
                      size="small"
                      error={
                        !!(formik.touched.address && formik.errors.address)
                      }
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                      placeholder="Adresse *"
                      onChange={formik.handleChange}
                      type="text"
                      sx={{
                        background: "#EEEEEE",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                      }}
                      value={formik.values.address}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      fullWidth
                      name="postalCode"
                      onBlur={formik.handleBlur}
                      size="small"
                      sx={{
                        background: "#EEEEEE",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                      }}
                      error={
                        !!(
                          formik.touched.postalCode && formik.errors.postalCode
                        )
                      }
                      helperText={
                        formik.touched.postalCode && formik.errors.postalCode
                      }
                      placeholder="Code postale *"
                      onChange={formik.handleChange}
                      type="number"
                      value={formik.values.postalCode}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      fullWidth
                      name="municipality"
                      onBlur={formik.handleBlur}
                      size="small"
                      sx={{
                        background: "#EEEEEE",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                      }}
                      error={
                        !!(
                          formik.touched.municipality &&
                          formik.errors.municipality
                        )
                      }
                      helperText={
                        formik.touched.municipality &&
                        formik.errors.municipality
                      }
                      placeholder="Commune *"
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.municipality}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Autocomplete
                      id="country-select-demo"
                      options={countries}
                      onBlur={() => formik.setFieldTouched("country", true)}
                      autoHighlight
                      size="small"
                      readOnly
                      defaultValue={countries.find((x) => x.code === "FR")}
                      onChange={(e, value) => {
                        formik.setFieldValue("country", value);
                      }}
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            alt=""
                          />
                          {option.label} ({option.code}) +{option.phone}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Pays *"
                          sx={{
                            background: "#EEEEEE",
                            "& .MuiFormHelperText-root": {
                              marginLeft: "0px",
                              marginTop: "0px",
                              marginRight: "0px",
                              background: "#FFF",
                            },
                          }}
                          error={
                            !!(formik.errors.country && formik.touched.country)
                          }
                          helperText={
                            formik.touched.country && formik.errors.country
                          }
                          name="country"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password", // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" pt={6} pb={2}>
                      Information de connexion
                    </Typography>
                  </Grid>

                  <Grid item xs={12} lg={12}>
                    <TextField
                      fullWidth
                      name="email"
                      onBlur={formik.handleBlur}
                      size="small"
                      sx={{
                        background: "#EEEEEE",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                      }}
                      error={!!(formik.touched.email && formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      placeholder="Adresse-mail *"
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.email}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      fullWidth
                      name="password"
                      onBlur={formik.handleBlur}
                      size="small"
                      sx={{
                        background: "#EEEEEE",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                      }}
                      error={
                        !!(formik.touched.password && formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      placeholder="Mot de passe *"
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.password}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      fullWidth
                      sx={{
                        background: "#EEEEEE",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                      }}
                      name="confirmPassword"
                      onBlur={formik.handleBlur}
                      size="small"
                      error={
                        !!(
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                        )
                      }
                      helperText={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                      }
                      placeholder="Confirmation du mot de passe *"
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.confirmPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "3rem",
                        flexDirection: { xs: "column", md: "row" },
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
                        color="gold"
                        variant="contained"
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
                        ENREGISTRER
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
