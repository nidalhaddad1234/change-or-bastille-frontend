import Layout from "../../../layout/admin/Layout";
import * as Yup from "yup";
import { Box, Grid } from "@mui/material";
import { useFormik } from "formik";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RichTextEditor from "../../../sharedComponents/RichTextEditor";
import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import agent from "../../../agent";
import { useContextStore } from "../../../stores/RootStoreContext";
export default function CreateNews() {
  const navigate = useNavigate();
  const store = useContextStore();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      isVisible: false,
    },
    validationSchema: Yup.object({
      title: Yup.string().max(255).required("News title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        var news = {
          ...values,
        };
        var result = await agent.news.Create(
          news.title,
          news.description,
          news.isVisible
        );
        store.newsStore.addNews(result.data);
        navigate("/admin/news");
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
              <CardHeader subheader="Create news" title="News"></CardHeader>
              <Box sx={{ margin: "auto 0" }}>
                <FormControlLabel
                  sx={{ marginLeft: "auto" }}
                  control={
                    <Checkbox
                      name="isVisible"
                      checked={formik.values.isFeatured}
                      onChange={(e) =>
                        formik.setFieldValue("isVisible", e.target.checked)
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
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="News Title"
                    name="title"
                    onBlur={formik.handleBlur}
                    size="small"
                    onChange={formik.handleChange}
                    error={!!(formik.touched.title && formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    type="text"
                    value={formik.values.title}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.touched.description && formik.errors.description
                      )
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    size="small"
                    value={formik.values.description}
                  /> */}
                  <RichTextEditor
                    formik={formik}
                    name={"description"}
                    value={formik.values.description}
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
