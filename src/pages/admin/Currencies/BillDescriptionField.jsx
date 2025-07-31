import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import agent from "../../../agent";
import { useContextStore } from "../../../stores/RootStoreContext";
export default function BillDescritionField(props) {
  const store = useContextStore();

  const { el, id } = props;
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();
  const [photo, setPhoto] = useState();
  const [photo2, setPhoto2] = useState();

  const formik = useFormik({
    initialValues: {
      description: el.description ? el.description : "",
      photo: el.photo,
      photo2: el.photo2,
      name: el.name ? el.name : el,
    },

    onSubmit: async (values, helpers) => {
      try {
        var result = await agent.currencies.upadteBillDetails(
          id,
          values,
          image,
          image2,
        );
        store.currenciesStore.updateCurrency(result.data, id);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.data });
        helpers.setSubmitting(false);
      }
    },
  });
  const onFileSelected = (e) => {
    var selectedFile = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      setPhoto(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
    setImage(e.currentTarget.files[0]);
  };
  const onFileSelected2 = (e) => {
    var selectedFile = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      setPhoto2(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
    setImage2(e.currentTarget.files[0]);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <CardMedia
            component="img"
            height="140"
            image={
              photo
                ? photo
                : formik.values.photo
                ? formik.values.photo
                : "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
            }
            alt="Bill"
          />
          <CardMedia
            component="img"
            height="140"
            image={
              photo2
                ? photo2
                : formik.values.photo2
                ? formik.values.photo2
                : "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
            }
            alt="Bill"
          />
          <CardContent>
            <Box
              display="flex"
              sx={{ justifyContent: "space-between", margin: "1rem 0" }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {el.name ? el.name : el}
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Button variant="contained" component="label">
                  Upload image 1
                  <input
                    type="file"
                    name="file"
                    onChange={onFileSelected}
                    hidden
                  />
                </Button>
                <Button variant="contained" component="label">
                  Upload image 2
                  <input
                    type="file"
                    name="file"
                    onChange={onFileSelected2}
                    hidden
                  />
                </Button>
              </Box>
            </Box>

            <TextField
              fullWidth
              label="Description"
              size="small"
              name="description"
              multiline
              rows={2}
              type={"text"}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                !!(formik.touched.description && formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              value={formik.values.description}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={!formik.dirty && !photo && !photo2}
              sx={{ margin: "1rem 0", float: "right" }}
            >
              Submit
            </Button>
          </CardContent>
        </Box>
      </form>
    </Card>
  );
}
