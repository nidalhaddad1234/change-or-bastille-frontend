import Layout from "../../../layout/admin/Layout";
import * as Yup from "yup";
import { Box, Grid } from "@mui/material";
import { useFormik } from "formik";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
import agent from "../../../agent";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react";
import RichTextEditor from "../../../sharedComponents/RichTextEditor";
export default observer(function UpdateNews() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    async function getNews() {
      var result = await store.newStore.getbyId(id);
      if (result === undefined) navigate("/admin/news");
      setData(result);
    }
    getNews();
  }, []);
  const store = useContextStore();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: data ? data.title : "",
      description: data ? data.description : "",
      isVisible: data ? data.isVisible : false,
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
        var result = await agent.news.Edit(
          news.title,
          news.description,
          news.isVisible,
          id
        );
        store.newStore.updateNews(result.data, id);
        navigate("/admin/news");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.data });
        helpers.setSubmitting(false);
      }
    },
  });
  const Delete = async () => {
    try {
      await agent.news.Delete(id);
      store.newStore.removeNews(id);
      navigate("/admin/news");
    } catch (err) {}
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
        <form onSubmit={formik.handleSubmit}>
          <Card
            sx={{
              boxShadow:
                "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
            }}
          >
            <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
              <CardHeader subheader="Update news" title="News"></CardHeader>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ margin: "auto 0" }}>
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
                <Box sx={{ margin: "auto", marginRight: "1rem" }}>
                  <Button
                    variant="contained"
                    color="danger"
                    sx={{
                      display: "flex",
                      margin: "auto",
                    }}
                    onClick={() => Delete()}
                  >
                    Delete
                  </Button>
                </Box>
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
                    multiline
                    rows={7}
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
                <Grid item xs={12} md={6} sx={{}}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ marginRight: "1rem" }}
                  >
                    Upload File
                    <input
                      type="file"
                      name="file"
                      onChange={(event) => {
                        const img = event.currentTarget.files[0];
                        // formik.setFieldValue("file", image); // Set the value of the image field
                        setFile(img);
                      }}
                      hidden
                    />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      agent.news.uploadNewsImage(file, id);
                    }}
                    disabled={file === undefined}
                  >
                    Confirm
                  </Button>
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
});
