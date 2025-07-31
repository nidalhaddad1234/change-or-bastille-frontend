import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { saveToken, getClaims, isAdmin, getClaimValue, logout } from "../../../auth/handleJWT";
import AuthenticationContext from "../../../auth/AuthenticationContext";
import { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import agent from "../../../agent";
export default function Signin() {
  const { update } = useContext(AuthenticationContext);
  useEffect(() => {
    const claimsResult = getClaims();
    if (claimsResult.length > 0 && isAdmin(claimsResult))
      navigate("/admin/overview");
    return () => { };
  }, []);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        var result = await agent.account.logIn(values.email, values.password);
        saveToken(result.data);
        const claims = getClaims();
        if (getClaimValue("role", claims) === "admin") {
          update(claims);
          navigate("/admin/overview");
        }
        else {
          logout();
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: "Invalid credentials" });
          helpers.setSubmitting(false);
        }

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
          <title>Login | admin panel</title>
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
                <Typography variant="h4">Login</Typography>
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
                  <TextField
                    error={
                      !!(formik.touched.password && formik.errors.password)
                    }
                    fullWidth
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                <Box sx={{ mt: 3 }}>
                  <Link
                    to="/admin/forgotpassword"
                    style={{
                      textDecoration: "none",
                      color: "rgb(99, 102, 241)",
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  color={"primaryAdmin"}
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
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
