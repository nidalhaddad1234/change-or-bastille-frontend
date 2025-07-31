import { Box, Typography } from "@mui/material";
import Layout from "../../../layout/client/Layout";
import CarouselRating from "../../../sharedComponents/CarouselRating";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
export default observer(function AvisClient() {
  const store = useContextStore();
  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <h1 className="d-none">Avis Clients</h1>
          <Box
            sx={{
              padding: { md: "3rem 10rem", xs: "3rem 1rem 3rem 1rem" },
            }}
          >
            <Typography
              variant="h2"
              className="titleUnderline"
              sx={{ fontWeight: "600", textTransform: "uppercase" }}
              pb={5}
            >
              Avis Clients
            </Typography>
            <Box>
              <CarouselRating />
            </Box>
          </Box>
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
