import {
  Box,
  Button,
  Container,
  Unstable_Grid2 as Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Helmet } from "react-helmet";
import DeleteIcon from '@mui/icons-material/Delete';
import Layout from "../../layout/admin/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import agent from "../../agent";
import CustomTable from "../../sharedComponents/tableFiltering/customTable/CustomTable";
import Loading from "../../sharedComponents/utilities/Loading";
import Swal from "sweetalert2";
import InfoIcon from '@mui/icons-material/Info';
export default function Overview() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [orders, setOrders] = useState(null);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
  }));
  const handleDelete = async (id, orderNumber) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      await agent.orders.deleteOrder(id);
      setOrders(prevOrders => prevOrders.filter(order => order.orderNumber !== orderNumber));
      await Swal.fire({
        title: "Deleted!",
        text: "Order deleted.",
        icon: "success"
      });
    }

  }
  useEffect(() => {
    const fetchData = async () => {
      agent.reserves
        .list()
        .then((result) => {
          if (Array.isArray(result.data)) {
            const keysToDelete = ["_id", "createdAt", "updatedAt", "__v"];
            const transformedData = result.data.map((obj) => {
              const objCopy = { ...obj };
              keysToDelete.forEach((key) => delete objCopy[key]);
              return {
                button: (
                  <Link
                    sx={{ textDecoration: "none", cursor: "pointer" }}
                    size="small"
                    onClick={() =>
                      navigate(
                        objCopy["type"] === "currency"
                          ? "/admin/currencies/update/" + objCopy["typeId"]
                          : "/admin/metals/update/" + objCopy["typeId"]
                      )
                    }
                  >
                    {objCopy["name"]}
                  </Link>
                ),
                ...objCopy,
                desiredPrice: objCopy.desiredPrice + " €",
              };
            });

            // Loop through each object and delete the specified key
            transformedData.forEach((obj) => {
              delete obj["name"];
              delete obj["typeId"];
            });
            setData(transformedData);
          }
        })
        .catch((error) => {
          // Handle the error here
        });
    };
    const fetchOrders = async () => {
      agent.orders
        .list()
        .then((result) => {
          if (Array.isArray(result.data)) {
            const keysToDelete = [
              "updatedAt",
              "__v",
              "Items",
              "paymentType",
              "mac",
            ];
            const transformedData = result.data.map((obj) => {
              const objCopy = { ...obj };
              keysToDelete.forEach((key) => delete objCopy[key]);
              return {
                ...objCopy,
                amount: objCopy.amount + " €",
                createdAt: new Date(objCopy["createdAt"]).toLocaleDateString(),
                button: (
                  <Box display={'flex'} gap={'10px'}>
                    <IconButton
                      onClick={() => navigate("/admin/orders/" + objCopy["_id"])}
                    >
                      <InfoIcon sx={{ color: "rgb(48, 133, 214)" }} />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#C70000" }}
                      onClick={() => handleDelete(objCopy["_id"], objCopy["orderNumber"])}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ),
              };
            });
            // Loop through each object and delete the specified key
            transformedData.forEach((obj) => {
              delete obj["userId"];
              delete obj["_id"];
            });

            setOrders(transformedData);
          }
        })
        .catch((error) => {
          // Handle the error here
        });
    };
    fetchOrders();
    fetchData();
  }, []);
  return (
    <Layout>
      <Helmet>
        <title>Overview | admin panel</title>
      </Helmet>
      <Box sx={{ px: 8, py: 6 }}>
        {!orders || !data ? (
          <Box margin={5}>
            <Loading auto={true} />
          </Box>
        ) : (
          <>
            <Box
              marginBottom={5}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography variant="h5">Overview</Typography>
            </Box>
            <Box component="main">
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <Item item="true">
                    <>
                      <Box
                        marginBottom={5}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "Work Sans,sans-serif",
                            margin: "0 .5em ",
                          }}
                        >
                          Orders
                        </Typography>
                      </Box>

                      {!orders ? (
                        <Box margin={5}>
                          <Loading auto={true} />
                        </Box>
                      ) : orders.length == 0 ? (
                        <div>There are no data to display</div>
                      ) : (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <CustomTable tempArray={orders} Csv={true} />
                        </div>
                      )}
                    </>
                  </Item>
                </Grid>
                {/* <Grid xs={4}>
                  <Item item="true">xs=4</Item>
                </Grid> */}

                <Grid xs={12}>
                  <Item item="true">
                    <>
                      <Box
                        marginBottom={5}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "Work Sans,sans-serif",
                            margin: "0 .5em ",
                          }}
                        >
                          Allerte Meilleur
                        </Typography>
                      </Box>
                      {!data ? (
                        <Box margin={5}>
                          <Loading auto={true} />
                        </Box>
                      ) : data.length == 0 ? (
                        <div>There are no data to display</div>
                      ) : (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <CustomTable tempArray={data} Csv={true} />
                        </div>
                      )}
                    </>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
}
