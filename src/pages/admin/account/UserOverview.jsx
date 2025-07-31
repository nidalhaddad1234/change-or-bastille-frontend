import Layout from "../../../layout/admin/Layout";
import {
  Button,
  Box,
  Typography,
  Card,
  CardHeader,
  Autocomplete,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useContextStore } from "../../../stores/RootStoreContext";
import { countries } from "../../../helpers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import Select from "@mui/material/Select";
import Loading from "../../../sharedComponents/utilities/Loading";

export default function UserOverview() {
  const store = useContextStore();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(null);
  const [type, setType] = React.useState(2);

  const { id } = useParams();
  useEffect(() => {
    async function getUser() {
      var result = await store.userStore.getUserbyId(id);
      if (result === undefined) navigate("/admin/users");
      setSelectedValue(result);
      setType(
        result.civilite === "Mlle." ? 1 : result.civilite === "Mme." ? 2 : 3
      );
    }
    getUser();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedValue ? selectedValue.firstName : "",
      lastName: selectedValue ? selectedValue.lastName : "",
      company: selectedValue ? selectedValue.company : "",
      phoneNumber: selectedValue ? selectedValue.portablePhone : "",
      secondaryPhoneNumber: selectedValue ? selectedValue.secondPhone : "",
      address: selectedValue ? selectedValue.address : "",
      postalCode: selectedValue ? selectedValue.postalCode : "",
      municipality: selectedValue ? selectedValue.town : "",
      dateOfBirth: selectedValue && selectedValue.dateOfBirth,
      country: selectedValue
        ? countries.find((x) => x.label == selectedValue.country)
        : countries.find((x) => x.code === "FR"),
      civilite: selectedValue ? selectedValue.civilite : "",
    },
  });
  return (
    <Layout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: { xs: 0, lg: 6 },
          px: { xs: 0, lg: 8 },
        }}
      >
        <Card
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
          }}
        >
          <Box>
            <CardHeader subheader="User overview" title="Users"></CardHeader>
            {!selectedValue ? (
              <Loading />
            ) : (
              <Box sx={{ background: "#fff", padding: "2rem" }}>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container rowSpacing={2} columnSpacing={2}>
                    <Typography variant="body1" p={2}>
                      Informations personnelles
                    </Typography>
                    <Grid item xs={12} display={"flex"} sx={{ gap: "10px" }}>
                      <Typography sx={{ margin: "auto 0", fontWeight: "700" }}>
                        Civilité*
                      </Typography>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        size="small"
                        readOnly
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
                        InputProps={{
                          readOnly: true,
                        }}
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
                        InputProps={{
                          readOnly: true,
                        }}
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
                        InputProps={{
                          readOnly: true,
                        }}
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
                          readOnly
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
                        InputProps={{
                          readOnly: true,
                        }}
                        placeholder="Téléphone portable *"
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
                        InputProps={{
                          readOnly: true,
                        }}
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
                        placeholder="Téléphone secondaire"
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
                        InputProps={{
                          readOnly: true,
                        }}
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
                        InputProps={{
                          readOnly: true,
                        }}
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
                        InputProps={{
                          readOnly: true,
                        }}
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
                        disabled={true}
                      >
                        ENREGISTRER LES MODIFICATIONS
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </Layout>
  );
}
