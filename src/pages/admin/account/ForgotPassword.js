import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import agent from "../../../agent";

export default function Forgotpassword() {
  const formik = useFormik({
    initialValues: {
      email: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // var result = await agent.account.logIn(values.email, values.password);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.data });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Box
        sx={{
          background: "#1C2437",
          height: "100vh",
        }}
      >
        <Helmet>
          <title>Forgot password</title>
        </Helmet>
        <Box
          sx={{
            flex: "1 1 auto",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              background: "white",
              borderRadius: 1,
              maxWidth: 400,
              padding: 2,
              marginTop: "10%",
              width: "100%",
            }}
          >
            <div>
              <Stack spacing={1} sx={{ mb: 3 }}>
                <Typography variant="h6">Forgot Password</Typography>
              </Stack>

              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  disabled={!(formik.isValid && formik.dirty)}
                  color={"primaryAdmin"}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
              </form>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
}
