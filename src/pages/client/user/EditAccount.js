import Layout from "../../../layout/client/Layout";
import React, { useContext, useEffect, useState } from "react";
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
import { DatePicker } from "@mui/x-date-pickers";
import agent from "../../../agent";
import Loading from "../../../sharedComponents/utilities/Loading";
import { getClaimValue } from "../../../auth/handleJWT";
import AuthenticationContext from "../../../auth/AuthenticationContext";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function EditAccount() {
  const store = useContextStore();
  const [type, setType] = React.useState(2);
  const { claims } = useContext(AuthenticationContext);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("error");
  const handleChange = (event) => {
    setType(event.target.value);
    formik.setFieldValue(
      "civilite",
      event.target.value === 1
        ? "Mlle."
        : event.target.value === 2
          ? "Mme."
          : "M."
    );
  };
  useEffect(() => {
    if (claims.length > 0) {
      const fetchData = async () =>
        await agent.account.getById(getClaimValue("id", claims));
      fetchData()
        .then((result) => {
          setData(result.data);
          setType(
            result.data.civilite === "Mlle."
              ? 1
              : result.data.civilite === "Mme."
                ? 2
                : 3
          );
        })
        .catch((error) => { });
    }

    return () => { };
  }, [claims]);
  const [data, setData] = useState();
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: data ? data.firstName : "",
      lastName: data ? data.lastName : "",
      company: data ? data.company : "",
      phoneNumber: data ? data.portablePhone : "",
      secondaryPhoneNumber: data ? data.secondPhone : "",
      address: data ? data.address : "",
      postalCode: data ? data.postalCode : "",
      municipality: data ? data.town : "",
      dateOfBirth: data && data.dateOfBirth,
      country: data
        ? countries.find((x) => x.label == data.country)
        : countries.find((x) => x.code === "FR"),
      civilite: data ? data.civilite : "",
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
    }),
    onSubmit: async (values, helpers) => {
      try {
        setError("");
        var result = await agent.account.editAccount(
          values.municipality,
          values.name,
          values.lastName,
          values.company,
          values.dateOfBirth,
          values.phoneNumber.replaceAll(" ", ""),
          values.secondaryPhoneNumber.replaceAll(" ", ""),
          values.address,
          values.postalCode,
          values.country.label,
          values.civilite,
          getClaimValue("id", claims)
        );
        if (result.message === "Success") {
          setError("informations mises à jour avec succès!");
          setErrorType("success");
        } else {
          setError(result.data);
          setErrorType("error");
        }
      } catch (error) {
        setErrorType("error");
        setError(error.response.data.data);
      }
      try {
      } catch (err) { }
    },
  });

  return (
    <>
      {store.globalStoreClient.isLoadedBanner && data ? (
        <Layout>
          <h1 className="d-none">MODIFIER VOS COORDONNÉES</h1>

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
              MODIFIER VOS COORDONNÉES
            </Typography>

            {!data ? (
              <Loading />
            ) : (
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
                        Civilité *
                      </Typography>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        name="civilite"
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
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>Mlle..</MenuItem>
                        <MenuItem value={2}> Mme.</MenuItem>
                        <MenuItem value={3}> M.</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <TextField
                        fullWidth
                        name="name"
                        onBlur={formik.handleBlur}
                        size="small"
                        placeholder="Nom *"
                        sx={{
                          background: "#EEEEEE",
                          "& .MuiFormHelperText-root": {
                            marginLeft: "0px",
                            marginTop: "0px",
                            marginRight: "0px",
                            background: "#FFF",
                          },
                        }}
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
                        name="company"
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
                            width: "100%",
                            "& > .MuiOutlinedInput-root": { height: "40px" },
                            background: "#EEEEEE",
                            "& .MuiFormHelperText-root": {
                              marginLeft: "0px",
                              marginTop: "0px",
                              marginRight: "0px",
                              background: "#FFF",
                            },
                          }}
                          value={dayjs(formik.values.dateOfBirth)}
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
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                        }
                        sx={{
                          background: "#EEEEEE",
                          "& .MuiFormHelperText-root": {
                            marginLeft: "0px",
                            marginTop: "0px",
                            marginRight: "0px",
                            background: "#FFF",
                          },
                        }}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.phoneNumber}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <TextField
                        fullWidth
                        name="secondaryPhoneNumber"
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
                          !!(formik.touched.address && formik.errors.address)
                        }
                        helperText={
                          formik.touched.address && formik.errors.address
                        }
                        placeholder="Adresse *"
                        onChange={formik.handleChange}
                        type="text"
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
                            formik.touched.postalCode &&
                            formik.errors.postalCode
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
                        sx={{
                          background: "#EEEEEE",
                          "& .MuiFormHelperText-root": {
                            marginLeft: "0px",
                            marginTop: "0px",
                            marginRight: "0px",
                            background: "#FFF",
                          },
                        }}
                        name="municipality"
                        onBlur={formik.handleBlur}
                        size="small"
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
                        sx={{
                          background: "#EEEEEE",
                          "& .MuiFormHelperText-root": {
                            marginLeft: "0px",
                            marginTop: "0px",
                            marginRight: "0px",
                            background: "#FFF",
                          },
                        }}
                        defaultValue={countries.find((x) => x.code === "FR")}
                        onBlur={() => formik.setFieldTouched("country", true)}
                        autoHighlight
                        readOnly
                        size="small"
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
                            sx={{
                              background: "#EEEEEE",
                              "& .MuiFormHelperText-root": {
                                marginLeft: "0px",
                                marginTop: "0px",
                                marginRight: "0px",
                                background: "#FFF",
                              },
                            }}
                            placeholder="Pays *"
                            error={
                              !!(
                                formik.errors.country && formik.touched.country
                              )
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
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "end" }}
                    >
                      <Button
                        color="gold"
                        type="submit"
                        variant="contained"
                      >
                        ENREGISTRER LES MODIFICATIONS
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            )}
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
