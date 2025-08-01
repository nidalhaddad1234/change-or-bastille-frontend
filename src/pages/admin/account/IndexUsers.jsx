import Layout from "../../../layout/admin/Layout";
import { Button, Box, Typography } from "@mui/material";
import CustomTable from "../../../sharedComponents/tableFiltering/customTable/CustomTable";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import InfoIcon from "@mui/icons-material/Info";
import { useContextStore } from "../../../stores/RootStoreContext";
import Loading from "../../../sharedComponents/utilities/Loading";
import { Helmet } from "react-helmet";
export default observer(function IndexUsers() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const store = useContextStore();

  const { isLoading } = store.currenciesStore;
  useEffect(() => {
    const fetchData = async () => {
      store.usersStore
        .loadUsers(false)
        .then((result) => {
          if (Array.isArray(result)) {
            const keysToDelete = [
              "_id",
              "__v",
              "password",
              "dateOfBirth",
              "company",
              "email",
              "secondPhone",
              "address",
              "town",
              "postalCode",
              "portablePhone",
              "civilite",
              "country",
              "updatedAt",
              "identityPhotos",
            ];
            result = result.map((item) => {
              item.createdAt = dayjs(item.createdAt).format("MM/DD/YYYY");

              return item;
            });
            let transformedData = result.map((obj) => {
              obj.identityStatus = obj.identityStatus
                ? obj.identityStatus
                : "not Verified";

              const objCopy = { ...obj };
              const id = objCopy._id;
              keysToDelete.forEach((key) => delete objCopy[key]);
              return {
                ...objCopy,
                button: (
                  <Box>
                    <Button
                      size="small"
                      onClick={() => navigate("/admin/users/identity/" + id)}
                    >
                      <VerifiedIcon sx={{ fontSize: "20px", color: "green" }} />
                    </Button>
                    <Button
                      size="small"
                      onClick={() => navigate("/admin/users/" + id)}
                    >
                      <InfoIcon sx={{ fontSize: "20px" }} />
                    </Button>
                  </Box>
                ),
              };
            });
            transformedData = transformedData.filter((x) => x.role == "client");
            setData(transformedData);
          }
        })
        .catch((error) => {
          // Handle the error here
        });
    };

    fetchData();
  }, []);
  return (
    <Layout>
      <Helmet>
        <title>Users | admin panel</title>
      </Helmet>
      {isLoading && !data ? (
        <Loading />
      ) : (
        <Box sx={{ px: 8, py: 6 }}>
          <Box
            marginBottom={5}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Users</Typography>
            {/* <Button
              variant="contained"
              color="primaryAdmin"
              sx={{ borderRadius: 2 }}
              size="small"
              onClick={() => navigate("create")}
            >
              {" "}
              <AddIcon sx={{ marginRight: 1 }} />
              Add
            </Button> */}
          </Box>
          <Box>
            {!data && !isLoading && <div>There are no data to display</div>}
            <div style={{ display: "flex", justifyContent: "center" }}>
              {data && <CustomTable tempArray={data} Csv={true} />}
            </div>
          </Box>
        </Box>
      )}
    </Layout>
  );
});
