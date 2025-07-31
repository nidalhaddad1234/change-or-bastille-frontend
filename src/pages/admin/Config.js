import Layout from "../../layout/admin/Layout";
import * as Yup from "yup";
import { Box, Grid } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import agent from "../../agent";
import { observer } from "mobx-react";
export default observer(function Config() {
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    async function getNews() {
      var result = await agent.configuration.list();

      setData(result.data);
    }
    getNews();
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      carrates14: data ? data.carrates14 : "",
      carrates18: data ? data.carrates18 : "",
      carrates22: data ? data.carrates22 : "",
      offers: data ? data.offers : "",
    },
    validationSchema: Yup.object({
      carrates14: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .test(
          "not-zero",
          "Minting Start must be different from zero",
          (value) => value !== 0
        )
        .required("Required"),
      carrates18: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .test(
          "not-zero",
          "Minting Start must be different from zero",
          (value) => value !== 0
        )
        .required("Required"),
      carrates22: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .test(
          "not-zero",
          "Minting Start must be different from zero",
          (value) => value !== 0
        )
        .required("Required"),
      offers: Yup.string().required("Required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        var result = async () =>
          await agent.configuration.Edit(
            values.offers,
            values.carrates22,
            values.carrates18,
            values.carrates14,
            data._id
          );
        result().then((result) => {
          setData(result.data);
        });
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
              <CardHeader title="Configuration"></CardHeader>
            </Box>

            <Divider
              sx={{
                borderColor: "rgb(242, 244, 247)",
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Carrates 14"
                    name="carrates14"
                    onBlur={formik.handleBlur}
                    size="small"
                    onChange={formik.handleChange}
                    error={
                      !!(formik.touched.carrates14 && formik.errors.carrates14)
                    }
                    helperText={
                      formik.touched.carrates14 && formik.errors.carrates14
                    }
                    type="text"
                    value={formik.values.carrates14}
                  />
                </Grid>
                <Grid item xs={0} md={6}></Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Carrates 18"
                    name="carrates18"
                    onBlur={formik.handleBlur}
                    size="small"
                    onChange={formik.handleChange}
                    error={
                      !!(formik.touched.carrates18 && formik.errors.carrates18)
                    }
                    helperText={
                      formik.touched.carrates18 && formik.errors.carrates18
                    }
                    type="text"
                    value={formik.values.carrates18}
                  />
                </Grid>
                <Grid item xs={0} md={6}></Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Carrates 22"
                    name="carrates22"
                    onBlur={formik.handleBlur}
                    size="small"
                    onChange={formik.handleChange}
                    error={
                      !!(formik.touched.carrates22 && formik.errors.carrates22)
                    }
                    helperText={
                      formik.touched.carrates22 && formik.errors.carrates22
                    }
                    type="text"
                    value={formik.values.carrates22}
                  />
                </Grid>
                <Grid item xs={0} md={6}></Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Offers"
                    name="offers"
                    multiline
                    rows={7}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.offers && formik.errors.offers)}
                    helperText={formik.touched.offers && formik.errors.offers}
                    size="small"
                    value={formik.values.offers}
                  />
                </Grid>
                <Grid item xs={0} md={6}></Grid>
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
});
