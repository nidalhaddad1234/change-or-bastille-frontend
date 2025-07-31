import { Box, Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import * as Yup from "yup";
import { useFormik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import DialogTitle from "@mui/material/DialogTitle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AlertModal from "../../../sharedComponents/AlertModal";
import { Typography } from "@mui/material";
import React from "react";
import agent from "../../../agent";
import { useRef } from "react";

import { styled } from "@mui/material/styles";

export default function RateAlertComponent(props) {
  const { itemId, el } = props;
  const [open, setOpen] = React.useState(false);
  const [openDone, setOpenDone] = React.useState(false);
  const [token, setToken] = React.useState("");

  const StyledImg = styled("img")({});
  const reCaptcha = useRef();
  const formik = useFormik({
    initialValues: {
      email: "",
      price: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("").max(255).required(),
      price: Yup.number()
        .test(
          "not-zero",
          "Minting Start must be different from zero",
          (value) => value !== 0
        )
        .required(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setOpen(false);
        var result = await agent.reserves.add(
          values.email,
          values.price,
          el.type,
          el._id
        );
        if (result.message === "Success") {
          setOpenDone(true);
          formik.resetForm();
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.data });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setToken("");
    setOpen(false);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          item
          container
          xs={12}
          display="flex"
          sx={{ justifyContent: "space-between" }}
        >
          <Grid
            xs={4}
            item
            display="flex"
            sx={{
              textAlign: "start",
              flexDirection: { xs: "column", lg: "row" },
              gap: { lg: "1rem" },
            }}
          >
            <StyledImg
              sx={{
                width: { xs: "92px", md: "150px" },
                height: { xs: "70px", md: "100px" },
                objectFit: "contain",
                margin: { xs: "0", lg: "auto 0" },
              }}
              loading="lazy"
              alt={el.metalName}
              src={el.photo}
              height="100px"
              width="200px"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "Column",
                margin: "auto 0",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "10px", md: "initial" } }}
              >
                {el.metalName}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "10px", md: "initial" },
                  display: { xs: "none", lg: "block" },
                }}
              >
                {el.countryIssuing} – {el.weight} g – {el.diameter} mm
              </Typography>
            </Box>
          </Grid>
          <Grid xs={2} sx={{ margin: "auto" }} item>
            <Typography
              variant="body2"
              sx={{
                margin: "auto 0",
                textAlign: "start",
                fontWeight: "700",
                fontSize: { xs: "10px", md: "initial" },
              }}
            >
              {el.netSellPrice} €
            </Typography>
          </Grid>
          <Grid xs={2} item sx={{ margin: "auto", textAlign: "start" }}>
            <TextField
              size="small"
              sx={{
                width: { xs: "3rem", lg: "10rem" },
                margin: "auto",
              }}
              error={!!(formik.touched.price && formik.errors.price)}
              fullWidth
              name="price"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.price}
            />
          </Grid>
          <Grid xs={3} lg={2} item sx={{ margin: "auto", textAlign: "start" }}>
            <TextField
              size="small"
              sx={{ margin: "auto" }}
              error={!!(formik.touched.email && formik.errors.email)}
              fullWidth
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
            />
          </Grid>
          <Grid
            xs={2}
            item
            sx={{
              marginLeft: "auto",
              textAlign: "start",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <div>
              <Button
                variant="contained"
                sx={{
                  minWidth: { xs: "110px", md: "131px" },
                  fontSize: { xs: "10px", md: "initial" },
                  display: { xs: "none", lg: "block" },
                  margin: "auto",
                }}
                onClick={handleClickOpen}
                color="gold"
                disabled={!(formik.isValid && formik.dirty)}
              >
                M’ALERTER
              </Button>
              <Button
                variant="contained"
                sx={{
                  minWidth: { xs: "10px", md: "131px" },
                  display: "flex",
                  marginRight: "auto",
                  fontSize: { xs: "10px", md: "initial" },
                  display: { xs: "block", lg: "none" },
                }}
                onClick={handleClickOpen}
                disabled={!(formik.isValid && formik.dirty)}
                color="gold"
              >
                <NotificationsActiveIcon />
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <Typography>
                    Confirmez-vous votre souhait d’être alerté lorsque le taux
                    atteint ce prix?
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <ReCAPTCHA
                    ref={reCaptcha}
                    sitekey={process.env.REACT_APP_RECAPTCHA_SECRET}
                    onChange={(token) => {
                      if (token) setToken(token);
                    }}
                    onExpired={(e) => setToken("")}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    color="gold"
                    variant="contained"
                  >
                    Non
                  </Button>
                  <Button
                    autoFocus
                    color="gold"
                    variant="contained"
                    disabled={
                      !(formik.isValid && formik.dirty) || token.length === 0
                    }
                    onClick={() =>
                      formik.handleSubmit(formik.values, formik.helpers)
                    }
                    type="submit"
                  >
                    Oui
                  </Button>
                </DialogActions>
              </Dialog>
              <AlertModal
                open={openDone}
                text={"Alerte enregistrée avec succès"}
                disabled={!(formik.isValid && formik.dirty)}
                setOpen={setOpenDone}
              />
            </div>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
