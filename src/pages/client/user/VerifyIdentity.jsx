import Layout from "../../../layout/client/Layout";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  Button,
  Alert,
} from "@mui/material";
import React from "react";

import { useFormik } from "formik";
import { useState } from "react";
import agent from "../../../agent";
import { getClaimValue } from "../../../auth/handleJWT";
import AuthenticationContext from "../../../auth/AuthenticationContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function VerifyIdentity() {
  const { claims } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (claims.length > 0) {
      const fetchData = async () =>
        await agent.account.getById(getClaimValue("id", claims));
      fetchData()
        .then((result) => {
          setData(result.data);
          const status = result.data.identityStatus;
          if (status) {
            if (status === "verified") {
              setErrorType("success");
              setError("Votre identité est vérifiée avec succès.");
            }
            if (status === "pending") {
              setErrorType("info");
              setError(
                "Votre identité est actuellement en cours de vérification."
              );
            }
            if (status === "rejected") {
              setErrorType("error");
              setError(
                "La vérification de votre identité n'a pas pu être effectuée avec les documents que vous avez fournis. Veuillez re-télécharger les documents nécessaires pour continuer le processus de vérification."
              );
            }
            if (status == "not verified") {
              setErrorType("warning");
              setError(
                "Votre identité n'a pas encore été validée. Pour la validation de votre compte, veuillez télécharger une pièce d’identité valide ainsi qu'un justificatif de domicile."
              );
            }
          } else {
            setErrorType("warning");
            setError(
              "Votre identité n'a pas encore été validée. Pour la validation de votre compte, veuillez télécharger une pièce d’identité valide ainsi qu'un justificatif de domicile."
            );
          }
        })
        .catch((error) => {});
    } else navigate("/connexion");
  }, [claims]);

  const [fileArray, setFileArray] = useState([]);
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("error");
  function uploadMultipleFiles(e) {
    if (!e.target.files[0]) return;
    formik.setFieldValue("files", [...formik.values.files, e.target.files[0]]);
    fileArray.push({
      url: URL.createObjectURL(e.target.files[0]),
      name: e.target.files[0].name,
    });
  }
  function RemoveImage(e) {
    const obj = {
      name: e.currentTarget.getAttribute("name"),
      url: e.currentTarget.getAttribute("url"),
    };
    if (!obj) return;
    const filteredUrl = formik.values.files.filter(
      (file) => file.name !== obj.name
    );
    formik.setFieldValue("files", filteredUrl);
    const filteredFilesURL = fileArray.filter((t) => t.url !== obj.url);
    setFileArray(filteredFilesURL);
  }
  const formik = useFormik({
    initialValues: {
      files: [],
    },
    onSubmit: async (values, helpers) => {
      try {
        var result = await agent.account.VerifyIdentity(
          values.files,
          getClaimValue("id", claims)
        );
        if (result.message === "Success") {
          setErrorType("info");
          setError("Votre identité est en cours de vérification.");
          setData({ ...data, identityStatus: "pending" });
        }
      } catch (err) {
        setErrorType("error");
        setError("Quelque chose s'est mal passé");
      }
    },
  });
  const store = useContextStore();
  return (
    <>
      {store.globalStoreClient.isLoadedBanner && data ? (
        <Layout>
          <h1 className="d-none"> Vérifier l'identité</h1>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 0rem 1rem" },
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontWeight: "600", textTransform: "uppercase" }}
              className="titleUnderline"
              pb={5}
            >
              Vérifier l'identité
            </Typography>
            <Box
              sx={{
                width: "100%",
                background: "#FFF",
                padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
                fontWeight: "600",
                fontSize: "1rem",
              }}
            >
              {data && (
                <>
                  <Alert
                    severity={errorType}
                    sx={{
                      margin: "0 0 2rem 0",
                      display: error.length > 0 ? "flex" : "none",
                    }}
                  >
                    {error}
                  </Alert>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group multi-preview">
                      <Grid container>
                        {(fileArray || []).map((obj) => (
                          <Grid
                            item
                            key={obj.url}
                            xs={6}
                            md={3}
                            sx={{ padding: "0 .5rem", position: "relative" }}
                          >
                            <RemoveCircleIcon
                              sx={{
                                position: "absolute",
                                display:
                                  data.identityStatus !== "pending"
                                    ? "block"
                                    : "none",
                                right: "0",
                                top: "-10px",
                                color: "red",
                                cursor: "pointer",
                              }}
                              url={obj.url}
                              name={obj.name}
                              onClick={RemoveImage}
                            />
                            <Card sx={{ maxWidth: 300 }}>
                              <CardMedia
                                sx={{ height: 140 }}
                                loading="lazy"
                                image={obj.url}
                                alt="..."
                              />
                            </Card>
                            <Box component="img" />
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                    <Box
                      sx={{
                        display:
                          errorType === "info" || errorType === "success"
                            ? "none"
                            : "flex",
                        justifyContent: "end",
                        gap: "15px",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="gold"
                        component="label"
                      >
                        Télécharger
                        <input
                          type="file"
                          onChange={uploadMultipleFiles}
                          multiple
                          hidden
                        />
                      </Button>

                      <Button
                        type="submit"
                        variant="contained"
                        color="gold"
                        disabled={!(formik.isValid && formik.dirty)}
                      >
                        Soumettre
                      </Button>
                    </Box>
                  </form>
                </>
              )}
            </Box>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
