import Layout from "../../../layout/admin/Layout";
import * as Yup from "yup";
import { Box, Grid } from "@mui/material";
import { useFormik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import agent from "../../../agent";
import { useContextStore } from "../../../stores/RootStoreContext";
export default function UpdateCurrency() {
  const store = useContextStore();
  useEffect(() => {
    async function getCurrency() {
      var result = await store.currenciesStore.getbyId(id);
      if (result === undefined) navigate("/admin/currencies");
      formik.setValues({
        moneyName: result.moneyName,
        currencyName: result.currencyName,
        iso: result.iso,
        sellPrice: result.sellPrice,
        bills: result.bills.map((el) => el.name.replace(" ", "")).join(","),
        topText: result.topText,
        bottomText: result.bottomText,
        coefficient: result.coefficient,
        isVisible: result.isVisible,
        isFeatured: result.isFeatured,
        title: result.title,
        description: result.description
      });
      setOriginalBills(
        result.bills.map((el) => {
          return { ...el, name: el.name.replace(" ", "") };
        })
      );
    }

    getCurrency();
  }, []);
  const [originalBills, setOriginalBills] = useState();

  const addBill = () => {
    var context = formik.values;
    if (newBill.length === 0) return;
    var newVal =
      context.bills.length === 0
        ? newBill.toString()
        : context.bills + ", " + newBill;
    setNewBill("");
    formik.setFieldValue("bills", newVal.toString());
  };
  const removeBill = () => {
    var context = formik.values;
    var originalBillsValue = context.bills;
    var newVal =
      context.bills.length === 0
        ? newBill.toString()
        : originalBillsValue.substring(0, originalBillsValue.lastIndexOf(","));
    formik.setFieldValue("bills", newVal.toString());
  };
  const navigate = useNavigate();

  const { id } = useParams();
  const [newBill, setNewBill] = useState("");
  const formik = useFormik({
    initialValues: {
      moneyName: "",
      currencyName: "",
      iso: "",
      sellPrice: 0,
      bills: "",
      topText: "",
      bottomText: "",
      coefficient: "",
      title: "",
      description: "",
      isVisible: false,
      isFeatured: false,
    },
    validationSchema: Yup.object({
      title: Yup.string(),
      description: Yup.string(),
      moneyName: Yup.string().max(255).required("Money name is required"),
      currencyName: Yup.string().max(255).required("Currency name is required"),
      iso: Yup.string().max(3).required("Iso is required"),
      bills: Yup.string()
        .max(255)
        .required("Bills are required")
        .test(
          "not-zero",
          "Bills must be different from zero",
          (value) => value !== 0
        ),
      sellPrice: Yup.number().required("Sell price is required"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        let billValues = values.bills.replace(" ", "").split(",");
        let currencyBills = billValues.map((value) => {
          return { name: value };
        });
        if (originalBills) {
          currencyBills = currencyBills.map((el) => {
            const index = originalBills.findIndex(
              (obj) => obj.name === el.name
            );
            return index > -1 ? originalBills[index] : el;
          });
        }
        var bills = { ...values, bills: currencyBills };
        await agent.currencies.Edit(
          bills.iso,
          bills.moneyName,
          bills.currencyName,
          bills.bills,
          bills.sellPrice,
          id,
          bills.isVisible,
          bills.topText,
          bills.bottomText,
          bills.coefficient,
          bills.isFeatured,
          bills.title,
          bills.description
        );

        await agent.reserves.newPriceUpdate(id, bills.sellPrice);
        store.currenciesStore.updateCurrency(bills, id);
        navigate("/admin/currencies");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.data });
        helpers.setSubmitting(false);
      }
    },
  });

  function handleClick(event) {
    event.preventDefault();
    navigate("/admin/currencies");
  }

  const Delete = async () => {
    try {
      await agent.currencies.Delete(id);
      store.currenciesStore.removeCurrency(id);
      navigate("/admin/currencies");
    } catch (err) { }
  };
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
        <div
          role="presentation"
          onClick={handleClick}
          style={{ margin: "20px 0" }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/admin/currencies">
              Currencies
            </Link>
            <Typography color="text.primary">Update</Typography>
          </Breadcrumbs>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Card
            sx={{
              boxShadow:
                "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
            }}
          >
            <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
              <CardHeader subheader="Create currency" title="Currency" />
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
                      name="isVisible"
                      checked={formik.values.isVisible}
                      onChange={(e) =>
                        formik.setFieldValue("isVisible", e.target.checked)
                      }
                    />
                  }
                  label="Is Visible"
                />
              </Box>
            </Box>
            <Button
              variant="contained"
              color="danger"
              sx={{
                display: "flex",
                marginLeft: "auto",
                marginRight: "1rem",
                marginBottom: "1rem",
              }}
              onClick={() => Delete()}
            >
              Delete
            </Button>

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
                  <TextField
                    fullWidth
                    label="Country Name"
                    name="moneyName"
                    onBlur={formik.handleBlur}
                    size="small"
                    onChange={formik.handleChange}
                    error={
                      !!(formik.touched.moneyName && formik.errors.moneyName)
                    }
                    helperText={
                      formik.touched.moneyName && formik.errors.moneyName
                    }
                    type="text"
                    value={formik.values.moneyName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Currency Name"
                    name="currencyName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.touched.currencyName &&
                        formik.errors.currencyName
                      )
                    }
                    helperText={
                      formik.touched.currencyName && formik.errors.currencyName
                    }
                    size="small"
                    type="text"
                    value={formik.values.currencyName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="ISO"
                    name="iso"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={!!(formik.touched.iso && formik.errors.iso)}
                    helperText={formik.touched.iso && formik.errors.iso}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.iso}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Sell Price"
                    size="small"
                    name="sellPrice"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(formik.touched.sellPrice && formik.errors.sellPrice)
                    }
                    helperText={
                      formik.touched.sellPrice && formik.errors.sellPrice
                    }
                    type="number"
                    value={formik.values.sellPrice}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Coefficient"
                    size="small"
                    name="coefficient"
                    type={"text"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.touched.coefficient && formik.errors.coefficient
                      )
                    }
                    helperText={
                      formik.touched.coefficient && formik.errors.coefficient
                    }
                    value={formik.values.coefficient}
                  />
                </Grid>
                <Grid container item xs={12} md={6} spacing={2}>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      label="Bills"
                      size="small"
                      InputProps={{
                        readOnly: true,
                        disabled: true,
                      }}
                      name="bills"
                      type={"text"}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={!!(formik.touched.bills && formik.errors.bills)}
                      helperText={formik.touched.bills && formik.errors.bills}
                      value={formik.values.bills}
                    />
                  </Grid>
                  <Grid item xs={6} md={6} display="flex">
                    <TextField
                      type="text"
                      size="small"
                      onChange={(e) => {
                        setNewBill(e.target.value);
                      }}
                      value={newBill}
                    />
                    <Button
                      variant="contained"
                      onClick={addBill}
                      color={"primaryAdmin"}
                      sx={{ height: "39px", marginLeft: "5px" }}
                    >
                      <AddIcon></AddIcon>
                    </Button>
                    <Button
                      variant="contained"
                      onClick={removeBill}
                      color={"primaryAdmin"}
                      sx={{
                        height: "39px",
                        width: "5px",
                        marginLeft: "5px",
                      }}
                    >
                      <RemoveIcon></RemoveIcon>
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Top Text"
                    size="small"
                    name="topText"
                    multiline
                    rows={7}
                    type={"text"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.topText && formik.errors.topText)}
                    helperText={formik.touched.topText && formik.errors.topText}
                    value={formik.values.topText}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Bottom Text"
                    size="small"
                    name="bottomText"
                    multiline
                    rows={7}
                    type={"text"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(formik.touched.bottomText && formik.errors.bottomText)
                    }
                    helperText={
                      formik.touched.bottomText && formik.errors.bottomText
                    }
                    value={formik.values.bottomText}
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
