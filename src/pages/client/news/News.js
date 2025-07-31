import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import Layout from "../../../layout/client/Layout";
import { styled } from "@mui/material/styles";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";
import { getFileName } from "../../../helpers";
import { useContextStore } from "../../../stores/RootStoreContext";

export default observer(function News() {
  const navigate = useNavigate();
  const store = useContextStore();

  const StyledImg = styled("img")({});
  useEffect(() => {
    const fetchData = async () => await store.newsStoreClient.loadNews();
    fetchData()
      .then((result) => {
        setData(result);
      })
      .catch((error) => { });
    return () => { };
  }, []);
  const [data, setData] = useState();
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Découvrez les dernières actualités et tendances du marché de l'or et des devises. Conseils et
          analyses pour vos investissements."
        />
        <title>Nouvelles Change et Or Bastille</title>
        <link
          rel="canonical"
          href="https://www.change-or-enligne.com/Nouvelles"
        />
      </Helmet>

      {data && data.length > 0 ? (
        <Layout>
          <h1 className="d-none">Nouvelles Change et Or Bastille</h1>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 3rem 1rem" },
            }}
          >
            <Typography variant="h2" className="titleUnderline">
              Nouvelles
            </Typography>
            <>
              <Box sx={{ background: "#fff", padding: "2rem" }}>
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  gap={2}
                >
                  {data.map((el) => (
                    <Fragment key={el._id}>
                      <Grid item xs={12} display="flex" sx={{ gap: "10px" }}>
                        {/* <StyledImg
                          sx={{
                            height: { xs: "50px", md: "100px" },
                            width: { xs: "75px", md: "150px" },
                            objectFit: "contain",
                            margin: { xs: "auto", sm: "initial" },
                          }}
                          height="100px"
                          width="150px"
                          alt={el.title}
                          src={el.photo}
                        /> */}
                        <StyledImg
                          sx={{
                            objectFit: { xs: "scale-down", lg: "cover" },
                            height: "9rem",
                            width: "12rem",
                          }}
                          height="200px"
                          width="500px"
                          loading="lazy"
                          alt={el.title}
                          src={getFileName(el.photo)}
                        />
                        <Box sx={{ margin: "auto 0" }}>
                          <Typography
                            sx={{
                              color: "#EEAC1F",
                              fontSize: { xs: "10px", md: "initial" },
                            }}
                          >
                            {new Date(el.createdAt).toLocaleDateString(
                              "fr-FR",
                              {
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                              }
                            )}
                          </Typography>
                          <Typography
                            sx={{ fontSize: { xs: "10px", md: "initial" } }}
                          >
                            {el.title}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            marginLeft: "auto ",
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={() => navigate("/Nouvelles/" + el._id)}
                            sx={{
                              minWidth: { xs: "110px", md: "131px" },
                              fontSize: {
                                xs: "10px",
                                lg: "13px",
                                xl: "initial",
                              },
                              display: { xs: "none", md: "block" },
                            }}
                            color="gold"
                          >
                            Lire la suite
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => navigate("/Nouvelles/" + el._id)}
                            sx={{
                              display: { xs: "block", md: "none" },
                              height: "2rem",
                              margin: "0",
                            }}
                            color="gold"
                          >
                            <ReadMoreIcon
                              sx={{ fontSize: "1.2rem", margin: "auto" }}
                            />
                          </Button>
                        </Box>
                      </Grid>
                      <Divider width="100%" sx={{ background: "#000000" }} />
                    </Fragment>
                  ))}
                </Grid>
              </Box>
            </>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
