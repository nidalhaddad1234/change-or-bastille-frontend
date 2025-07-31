import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useContextStore } from "../../../stores/RootStoreContext";
import Layout from "../../../layout/client/Layout";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";

import { styled } from "@mui/material/styles";
export default observer(function NewsDetails() {
  const { id } = useParams();
  const store = useContextStore();

  const StyledImg = styled("img")({});
  useEffect(() => {
    const fetchData = async () => await store.newsStoreClient.getbyId(id);
    fetchData()
      .then((result) => {
        setData(result);
      })
      .catch((error) => {});
    return () => {};
  }, []);
  const [data, setData] = useState();

  return (
    <>
      {data ? (
        <>
          <Layout>
            <h1 className="d-none">LES NOUVELLES</h1>

            <Box
              sx={{
                padding: { md: "3rem 10rem", xs: "3rem 1rem 3rem 1rem" },
              }}
            >
              <Typography variant="h2" className="titleUnderline">
                LES NOUVELLES
              </Typography>
              {data && (
                <Box sx={{ background: "#fff", padding: "2rem" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#EEAC1F",
                      fontSize: { xs: "13px", md: "initial" },
                    }}
                  >
                    {new Date(data.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </Typography>
                  <StyledImg
                    sx={{
                      height: "auto",
                      maxWidth: { xs: "18rem", lg: "30rem" },
                      width: "auto",
                      objectFit: "contain",
                      display: "flex",
                      margin: "1rem 0",
                    }}
                    height="300px"
                    width="600px"
                    loading="lazy"
                    alt={data.title}
                    src={data.photo}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "700",
                      fontSize: { xs: "15px", md: "initial" },
                    }}
                  >
                    {data.title}
                  </Typography>

                  <Box
                    sx={{
                      fontSize: { xs: "13px", md: "initial" },
                      marginTop: "1rem",
                      fontWeight: "300",
                    }}
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  />
                </Box>
              )}
            </Box>
          </Layout>
        </>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
