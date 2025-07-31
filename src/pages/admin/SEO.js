import Layout from "../../layout/admin/Layout";
import * as Yup from "yup";
import { Box, Grid } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

import { getIn } from "formik";
import {
  Button,
  Card,
  CardActions,
  Typography,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import agent from "../../agent";
import { observer } from "mobx-react";
export default observer(function SEO() {
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    async function getSeoData() {
      var result = await agent.seo.getAllSeo();

      setData(result);
    }
    getSeoData();
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      main: data ? data.main : { title: "", description: "" },
      rachatBijoux: data ? data.rachatBijoux : { title: "", description: "" },
      bills: data ? data.bills : { title: "", description: "" },
      investment: data ? data.investment : { title: "", description: "" },
      collection: data ? data.collection : { title: "", description: "" },
      ingot: data ? data.ingot : { title: "", description: "" },
    },
    validationSchema: Yup.object({
      main: Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
      }),
      rachatBijoux: Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
      }),
      bills: Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
      }),
      investment: Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
      }),
      collection: Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
      }),
      ingot: Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
      }),
    }),
    onSubmit: async (values, helpers) => {
      try {
        var result = async () =>
          await agent.seo.upSert(
            values.main,
            values.rachatBijoux,
            values.bills,
            values.investment,
            values.collection,
            values.ingot,
          );
        result().then((result) => {});
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
              <CardHeader title="Pages Seo"></CardHeader>
            </Box>

            <Divider
              sx={{
                borderColor: "rgb(242, 244, 247)",
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  gap="1rem"
                  flexDirection={"column"}
                >
                  <Typography
                    variant="h2"
                    fontSize={"1.30rem"}
                    fontWeight={500}
                  >
                    Main Page
                  </Typography>
                  <TextField
                    fullWidth
                    label="Title"
                    name="main.title"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={
                      !!getIn(formik.touched, "main.title") &&
                      !!getIn(formik.errors, "main.title")
                    }
                    helperText={
                      getIn(formik.touched, "main.title") &&
                      getIn(formik.errors, "main.title")
                    }
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.main.title}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    name="main.description"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={
                      !!getIn(formik.touched, "main.description") &&
                      !!getIn(formik.errors, "main.description")
                    }
                    helperText={
                      getIn(formik.touched, "main.description") &&
                      getIn(formik.errors, "main.description")
                    }
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.main.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  gap="1rem"
                  flexDirection={"column"}
                >
                  <Typography
                    variant="h2"
                    fontSize={"1.30rem"}
                    fontWeight={500}
                  >
                    Rachat Bijoux Page
                  </Typography>
                  <TextField
                    fullWidth
                    label="Title"
                    name="rachatBijoux.title"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={
                      !!getIn(formik.touched, "rachatBijoux.title") &&
                      !!getIn(formik.errors, "rachatBijoux.title")
                    }
                    helperText={
                      getIn(formik.touched, "rachatBijoux.title") &&
                      getIn(formik.errors, "rachatBijoux.title")
                    }
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.rachatBijoux.title}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    name="rachatBijoux.description"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={
                      !!getIn(formik.touched, "rachatBijoux.description") &&
                      !!getIn(formik.errors, "rachatBijoux.description")
                    }
                    helperText={
                      getIn(formik.touched, "rachatBijoux.description") &&
                      getIn(formik.errors, "rachatBijoux.description")
                    }
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.rachatBijoux.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  gap="1rem"
                  flexDirection={"column"}
                >
                  <Typography
                    variant="h2"
                    fontSize={"1.30rem"}
                    fontWeight={500}
                  >
                    Bills
                  </Typography>
                  <TextField
                    fullWidth
                    label="Title"
                    name="bills.title"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={
                      !!getIn(formik.touched, "bills.title") &&
                      !!getIn(formik.errors, "bills.title")
                    }
                    helperText={
                      getIn(formik.touched, "bills.title") &&
                      getIn(formik.errors, "bills.title")
                    }
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.bills.title}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    name="bills.description"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={
                      !!getIn(formik.touched, "bills.description") &&
                      !!getIn(formik.errors, "bills.description")
                    }
                    helperText={
                      getIn(formik.touched, "bills.description") &&
                      getIn(formik.errors, "bills.description")
                    }
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.bills.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  gap="1rem"
                  flexDirection={"column"}
                >
                  <Typography
                    variant="h2"
                    fontSize={"1.30rem"}
                    fontWeight={500}
                  >
                    Investment Coins
                  </Typography>
                  <TextField
                    fullWidth
                    label="Title"
                    name="investment.title"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={
                      !!getIn(formik.touched, "investment.title") &&
                      !!getIn(formik.errors, "investment.title")
                    }
                    helperText={
                      getIn(formik.touched, "investment.title") &&
                      getIn(formik.errors, "investment.title")
                    }
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.investment.title}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    name="investment.description"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={
                      !!getIn(formik.touched, "investment.description") &&
                      !!getIn(formik.errors, "investment.description")
                    }
                    helperText={
                      getIn(formik.touched, "investment.description") &&
                      getIn(formik.errors, "investment.description")
                    }
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.investment.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  gap="1rem"
                  flexDirection={"column"}
                >
                  <Typography
                    variant="h2"
                    fontSize={"1.30rem"}
                    fontWeight={500}
                  >
                    Collection Coins
                  </Typography>
                  <TextField
                    fullWidth
                    label="Title"
                    name="collection.title"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={
                      !!getIn(formik.touched, "collection.title") &&
                      !!getIn(formik.errors, "collection.title")
                    }
                    helperText={
                      getIn(formik.touched, "collection.title") &&
                      getIn(formik.errors, "collection.title")
                    }
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.collection.title}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    name="collection.description"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={
                      !!getIn(formik.touched, "collection.description") &&
                      !!getIn(formik.errors, "collection.description")
                    }
                    helperText={
                      getIn(formik.touched, "collection.description") &&
                      getIn(formik.errors, "collection.description")
                    }
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.collection.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  gap="1rem"
                  flexDirection={"column"}
                >
                  <Typography
                    variant="h2"
                    fontSize={"1.30rem"}
                    fontWeight={500}
                  >
                    Ingot
                  </Typography>
                  <TextField
                    fullWidth
                    label="Title"
                    name="ingot.title"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={
                      !!getIn(formik.touched, "ingot.title") &&
                      !!getIn(formik.errors, "ingot.title")
                    }
                    helperText={
                      getIn(formik.touched, "ingot.title") &&
                      getIn(formik.errors, "ingot.title")
                    }
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.ingot.title}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    name="ingot.description"
                    onBlur={formik.handleBlur}
                    size="small"
                    error={
                      !!getIn(formik.touched, "ingot.description") &&
                      !!getIn(formik.errors, "ingot.description")
                    }
                    helperText={
                      getIn(formik.touched, "ingot.description") &&
                      getIn(formik.errors, "ingot.description")
                    }
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.ingot.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            </CardContent>
            <Divider
              sx={{
                borderColor: "rgb(242, 244, 247)",
              }}
            />
            <CardActions sx={{ justifyContent: "end" }}>
              <Button
                variant="contained"
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                color={"primaryAdmin"}
              >
                Update
              </Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </Layout>
  );
});
