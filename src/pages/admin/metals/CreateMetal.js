import Layout from "../../../layout/admin/Layout";
import * as Yup from "yup";
import { Box, Grid } from "@mui/material";
import { useFormik } from "formik";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { countries } from "../../../helpers";
import Select from "@mui/material/Select";
import React from "react";
import {
  Button,
  Card,
  Typography,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import agent from "../../../agent";
import { useContextStore } from "../../../stores/RootStoreContext";
export default function CreateMetal() {
  const navigate = useNavigate();
  const store = useContextStore();
  const [type, setType] = React.useState(2);
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const formik = useFormik({
    initialValues: {
      metalName: "",
      weight: 0,
      diameter: "",
      purity: 0,
      mintingStart: "",
      mintingEnd: "",
      fabricant: "",
      textInfo: "",
      netSellPrice: 0,
      grossBuyPrice: 0,
      countryIssuing: null,
      isVisable: false,
      isFeatured: false,
      title: "",
      description: "",
    },
    validationSchema:
      type === 2
        ? Yup.object({
          title: Yup.string(),
          description: Yup.string(),
          metalName: Yup.string().max(255).required("Metal name is required"),
          textInfo: Yup.string().required("Text info is required"),
          countryIssuing: Yup.object().required("Issure country is required"),
          weight: Yup.number()
            .test(
              "not-zero",
              "Weight must be different from zero",
              (value) => value !== 0
            )
            .required("Weight is required"),
          diameter: Yup.string().matches(/^[0-9]+$/, "Must be only digits"),
          purity: Yup.number()
            .test(
              "not-zero",
              "Purity must be different from zero",
              (value) => value !== 0
            )
            .required("Purity is required"),
          mintingStart: Yup.string()
            .matches(/^[0-9]+$/, "Must be only digits")
            .max(4, "number must be less than 5 digits")
            .test(
              "not-zero",
              "Minting Start must be different from zero",
              (value) => value !== 0
            )
            .required("Minting Start is required"),
          mintingEnd: Yup.string()
            .matches(/^[0-9]+$/, "Must be only digits")
            .max(4, "number must be less than 5 digits")
            .test(
              "not-zero",
              "Minting End must be different from zero",
              (value) => value !== 0
            )
            .required("Minting End is required"),
          netSellPrice: Yup.number()
            .test(
              "not-zero",
              "Net Sell Price must be different from zero",
              (value) => value !== 0
            )
            .required("Net Sell Price is required"),
          grossBuyPrice: Yup.number()
            .test(
              "not-zero",
              "Gross Buy Price must be different from zero",
              (value) => value !== 0
            )
            .required("Gross Buy Price is required"),
        })
        : type === 1
          ? Yup.object({
            title: Yup.string(),
            description: Yup.string(),
            metalName: Yup.string().max(255).required("Metal name is required"),
            textInfo: Yup.string().required("Text info is required"),
            countryIssuing: Yup.object().required("Required"),
            weight: Yup.number()
              .test(
                "not-zero",
                "Weight must be different from zero",
                (value) => value !== 0
              )
              .required("Weight is required"),
            diameter: Yup.string().matches(/^[0-9]+$/, "Must be only digits"),
            purity: Yup.number()
              .test(
                "not-zero",
                "Purity must be different from zero",
                (value) => value !== 0
              )
              .required("Purity is required"),
            netSellPrice: Yup.number()
              .test(
                "not-zero",
                "Net Sell Price must be different from zero",
                (value) => value !== 0
              )
              .required("Net Sell Price is required"),
            grossBuyPrice: Yup.number()
              .test(
                "not-zero",
                "Gross Buy Price must be different from zero",
                (value) => value !== 0
              )
              .required("Gross Buy Price is required"),
            fabricant: Yup.string()
              .max(255)
              .required("Gross Buy Price  required"),
          })
          : Yup.object({
            title: Yup.string(),
            description: Yup.string(),
            metalName: Yup.string().max(255).required("Metal name is required"),
            textInfo: Yup.string().required("Text info is required"),
            countryIssuing: Yup.object().required("Issure country is required"),
            weight: Yup.number()
              .test(
                "not-zero",
                "Weight must be different from zero",
                (value) => value !== 0
              )
              .required("Weight is required"),
            diameter: Yup.string().matches(/^[0-9]+$/, "Must be only digits"),
            purity: Yup.number()
              .test(
                "not-zero",
                "Purity must be different from zero",
                (value) => value !== 0
              )
              .required("Purity is required"),
            mintingStart: Yup.string()
              .matches(/^[0-9]+$/, "Must be only digits")
              .max(4, "number must be less than 5 digits")
              .test(
                "not-zero",
                "Minting Start must be different from zero",
                (value) => value !== 0
              )
              .required("Minting Start is required"),
            mintingEnd: Yup.string()
              .matches(/^[0-9]+$/, "Must be only digits")
              .max(4, "number must be less than 5 digits")
              .test(
                "not-zero",
                "Minting End must be different from zero",
                (value) => value !== 0
              )
              .required("Minting End is required"),
            netSellPrice: Yup.number()
              .test(
                "not-zero",
                "Net Sell Price must be different from zero",
                (value) => value !== 0
              )
              .required("Net Sell Price is required"),
          }),
    onSubmit: async (values, helpers) => {
      try {
        var metal = {
          ...values,
          countryIssuing: values.countryIssuing.label,
          photo: values.metalName,
          type:
            type === 2
              ? "Piece D'investissment"
              : type === 1
                ? "Lingots/Lingotin"
                : "Piece De Collection",
        };
        var result = await agent.metals.Create(
          metal.metalName,
          metal.weight,
          metal.diameter,
          metal.purity,
          metal.mintingStart,
          metal.mintingEnd,
          metal.countryIssuing,
          metal.photo,
          metal.textInfo,
          metal.netSellPrice,
          metal.grossBuyPrice,
          metal.fabricant,
          metal.isVisable,
          metal.type,
          metal.isFeatured,
          metal.title,
          metal.description
        );

        store.metalStore.addMetal(result.data);
        navigate("/admin/metals");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.data });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Layout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 6,
          px: 8,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Card
            sx={{
              boxShadow:
                "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
            }}
          >
            <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
              <CardHeader subheader="Create metal" title="Metals" />
              <Box sx={{ margin: "auto 0" }}>
                <FormControlLabel
                  sx={{ marginLeft: "auto" }}
                  control={
                    <Checkbox
                      name="isFeatured"
                      checked={formik.values.isFeatured}
                      onChange={(e) =>
                        formik.setFieldValue("isFeatured", e.target.checked)
                      }
                    />
                  }
                  label="Is Featured"
                />
                <FormControlLabel
                  sx={{ marginLeft: "auto" }}
                  control={
                    <Checkbox
                      name="isVisable"
                      checked={formik.values.isVisable}
                      onChange={(e) =>
                        formik.setFieldValue("isVisable", e.target.checked)
                      }
                    />
                  }
                  label="Is Visible"
                />
              </Box>
            </Box>

            <Divider
              sx={{
                borderColor: "rgb(242, 244, 247)",
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} display="flex" gap="1rem" flexDirection={"column"}>
                  <Typography variant="h2" fontSize={'1.30rem'} fontWeight={500}>SEO</Typography>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={!!(formik.touched.title && formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.title}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={!!(formik.touched.description && formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h2" fontSize={'1.30rem'} fontWeight={500}>Form Details</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{ margin: " -8px 0px" }}
                      id="demo-simple-select-label"
                    >
                      Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="Age"
                      size="small"
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>Lingots/Lingotin</MenuItem>
                      <MenuItem value={2}>Piece D'investissment</MenuItem>
                      <MenuItem value={3}>Piece De Collection</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Metal Name"
                    name="metalName"
                    onBlur={formik.handleBlur}
                    size="small"
                    onChange={formik.handleChange}
                    error={
                      !!(formik.touched.metalName && formik.errors.metalName)
                    }
                    helperText={
                      formik.touched.metalName && formik.errors.metalName
                    }
                    type="text"
                    value={formik.values.metalName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Weight in (g)"
                    name="weight"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.weight && formik.errors.weight)}
                    helperText={formik.touched.weight && formik.errors.weight}
                    size="small"
                    type="number"
                    value={formik.values.weight}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Diameter in (mm)"
                    name="diameter"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={
                      !!(formik.touched.diameter && formik.errors.diameter)
                    }
                    helperText={
                      formik.touched.diameter && formik.errors.diameter
                    }
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.diameter}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Purity in (%)"
                    size="small"
                    name="purity"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.purity && formik.errors.purity)}
                    helperText={formik.touched.purity && formik.errors.purity}
                    type="number"
                    value={formik.values.purity}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: type === 2 || type === 3 ? "block" : "none" }}
                >
                  <TextField
                    fullWidth
                    label="Minting Start"
                    size="small"
                    name="mintingStart"
                    type={"number"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.touched.mintingStart &&
                        formik.errors.mintingStart
                      )
                    }
                    helperText={
                      formik.touched.mintingStart && formik.errors.mintingStart
                    }
                    value={formik.values.mintingStart}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: type === 2 || type === 3 ? "block" : "none" }}
                >
                  <TextField
                    fullWidth
                    label="Minting End"
                    size="small"
                    name="mintingEnd"
                    type={"number"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(formik.touched.mintingEnd && formik.errors.mintingEnd)
                    }
                    helperText={
                      formik.touched.mintingEnd && formik.errors.mintingEnd
                    }
                    value={formik.values.mintingEnd}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Net Sell Price"
                    size="small"
                    name="netSellPrice"
                    type={"number"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.touched.netSellPrice &&
                        formik.errors.netSellPrice
                      )
                    }
                    helperText={
                      formik.touched.netSellPrice && formik.errors.netSellPrice
                    }
                    value={formik.values.netSellPrice}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: type === 3 ? "none" : "block" }}
                >
                  <TextField
                    fullWidth
                    label="Gross Buy Price"
                    size="small"
                    name="grossBuyPrice"
                    type={"number"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.touched.grossBuyPrice &&
                        formik.errors.grossBuyPrice
                      )
                    }
                    helperText={
                      formik.touched.grossBuyPrice &&
                      formik.errors.grossBuyPrice
                    }
                    value={formik.values.grossBuyPrice}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: type === 1 ? "block" : "none" }}
                >
                  <TextField
                    fullWidth
                    label="Fabricant"
                    size="small"
                    name="fabricant"
                    type={"text"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(formik.touched.fabricant && formik.errors.fabricant)
                    }
                    helperText={
                      formik.touched.fabricant && formik.errors.fabricant
                    }
                    value={formik.values.fabricant}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    id="country-select-demo"
                    options={countries}
                    onBlur={() =>
                      formik.setFieldTouched("countryIssuing", true)
                    }
                    autoHighlight
                    size="small"
                    onChange={(e, value) => {
                      formik.setFieldValue("countryIssuing", value);
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
                        label="Country Issuing"
                        error={
                          !!(
                            formik.errors.countryIssuing &&
                            formik.touched.countryIssuing
                          )
                        }
                        helperText={
                          formik.touched.countryIssuing &&
                          formik.errors.countryIssuing
                        }
                        name="countryIssuing"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Text Info"
                    size="small"
                    name="textInfo"
                    type={"text"}
                    multiline
                    rows={7}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(formik.touched.textInfo && formik.errors.textInfo)
                    }
                    helperText={
                      formik.touched.textInfo && formik.errors.textInfo
                    }
                    value={formik.values.textInfo}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider
              sx={{
                borderColor: "rgb(242, 244, 247)",
              }}
            />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                type="submit"
                color={"primaryAdmin"}
                disabled={!(formik.isValid && formik.dirty)}
              >
                Update
              </Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </Layout>
  );
}
