import Layout from "../../../layout/admin/Layout";
import {
  Button,
  Box,
  Typography,
  CardHeader,
  Card,
  Grid,
  Select,
  MenuItem,
  Link,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { observer } from "mobx-react";
import { useContextStore } from "../../../stores/RootStoreContext";
import Loading from "../../../sharedComponents/utilities/Loading";
import { Helmet } from "react-helmet";
import agent from "../../../agent";
import { getCountryCode } from "../../../helpers";
export default observer(function OrderDetails() {
  const store = useContextStore();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState();
  const [type, setType] = useState(2);
  const [paymentType, setPaymentType] = useState();
  const [paymentTypeNumber, setPaymentTypeNumber] = useState(2);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [value, setValue] = useState("");

  const { id } = useParams();
  useEffect(() => {
    async function getOrder() {
      var result = await agent.orders.getOrderById(id);
      if (result === undefined) navigate("/admin/overview");
      setSelectedValue(result.data);
      setValue(result.data.status);
      setType(
        result.data.status === "Not Proccessed"
          ? 1
          : result.data.status === "Preparing"
          ? 2
          : result.data.status === "Delivering"
          ? 3
          : result.data.status === "Delivered"
          ? 4
          : 5
      );
      setPaymentType(result.data.paymentStatus);
      setPaymentTypeNumber(
        result.data.paymentStatus === "Not Proccessed"
          ? 1
          : result.data.paymentStatus === "Paid"
          ? 2
          : 3
      );
    }
    getOrder();
  }, []);

  const handleChange = (event) => {
    setType(event.target.value);
    setValue(
      event.target.value === 1
        ? "Not Proccessed"
        : event.target.value === 2
        ? "Preparing"
        : event.target.value === 3
        ? "Delivering"
        : event.target.value === 4
        ? "Delivered"
        : "Canceled"
    );
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentTypeNumber(event.target.value);
    setPaymentType(
      event.target.value === 1
        ? "Not Proccessed"
        : event.target.value === 2
        ? "Paid"
        : "Not Paid"
    );
  };
  const handleSubmit = async (e) => {
    try {
      var result = await agent.orders.updateOrderStatus(
        value,
        id,
        trackingNumber
      );
      if (result.message === "Success") {
      }
    } catch (er) {}
  };
  const handlePaymentStatusUpdate = async (e) => {
    try {
      var result = await agent.orders.updatePaymentStatus(paymentType, id);
      if (result.message === "Success") {
      }
    } catch (ex) {}
  };
  return (
    <>
      <Layout>
        <Helmet>
          <title>Order Details | admin panel</title>
        </Helmet>
        {!selectedValue ? (
          <Loading />
        ) : (
          <Box sx={{ px: { xs: 0, lg: 8 }, py: { xs: 0, lg: 6 } }}>
            <Card
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
              }}
            >
              <Box
                marginBottom={1}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <CardHeader
                  subheader={"Order Details"}
                  title="Orders"
                ></CardHeader>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", gap: "10px", margin: "1rem" }}>
                    <Typography sx={{ margin: "auto" }}>
                      Order Status:
                    </Typography>
                    <Select
                      value={type}
                      size="small"
                      sx={{
                        background: "#EEEEEE",
                        height: "2rem",
                        margin: "auto",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                      }}
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>Not Proccessed</MenuItem>
                      <MenuItem value={2}>Preparing</MenuItem>
                      <MenuItem value={3}>Delivering</MenuItem>
                      <MenuItem value={4}>Delivered</MenuItem>
                      <MenuItem value={5}>Canceled</MenuItem>
                    </Select>
                    <Button
                      sx={{ height: "2rem", margin: "auto" }}
                      variant="contained"
                      type="submit"
                      disabled={type === 3 && trackingNumber.length === 0}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Box>
                  <TextField
                    value={trackingNumber}
                    size="small"
                    sx={{
                      display: type === 3 ? "block" : "none",
                      marginLeft: "auto",
                      marginRight: "1rem",
                    }}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    label="Tracking Number"
                  />
                  <Box
                    sx={{ display: "flex", gap: "10px", marginRight: "auto" }}
                  >
                    <Typography sx={{ margin: "auto" }}>
                      Payment Status:
                    </Typography>
                    <Select
                      value={paymentTypeNumber}
                      size="small"
                      readOnly={selectedValue.paymentType !== "VIREMENT"}
                      sx={{
                        background: "#EEEEEE",
                        height: "2rem",
                        margin: "auto",
                        "& .MuiFormHelperText-root": {
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginRight: "0px",
                          background: "#FFF",
                        },
                      }}
                      onChange={handlePaymentTypeChange}
                    >
                      <MenuItem value={1}>Not Proccessed</MenuItem>
                      <MenuItem value={2}>Paid</MenuItem>
                      <MenuItem value={3}>Not Paid</MenuItem>
                    </Select>
                    <Button
                      sx={{
                        height: "2rem",
                        margin: "auto",
                        marginRight: "1rem",
                        display:
                          selectedValue.paymentType !== "VIREMENT"
                            ? "none"
                            : "block",
                      }}
                      variant="contained"
                      type="submit"
                      onClick={handlePaymentStatusUpdate}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  background: "#FFF",
                  padding: { xs: "2rem 0.3rem 2rem 0.3rem", md: "2rem" },
                }}
              >
                {selectedValue && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "start",

                        cursor: "pointer",
                      }}
                    >
                      <PersonIcon sx={{ cursor: "pointer" }} color="primary" />
                      <Link
                        sx={{ textDecoration: "none", cursor: "pointer" }}
                        onClick={() =>
                          navigate("/admin/users/" + selectedValue.userId)
                        }
                      >
                        {selectedValue.userName}
                      </Link>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "start",
                        margin: "10px 10px 2rem 0",
                        cursor: "pointer",
                      }}
                    >
                      <Typography sx={{ fontWeight: 700 }}>
                        Payment Type:
                      </Typography>

                      <Typography>{selectedValue.paymentType}</Typography>
                    </Box>
                  </>
                )}
                <Grid container sx={{ marginBottom: { xs: 3, md: 0 } }}>
                  {selectedValue &&
                    selectedValue.Items.map((item) => (
                      <Grid
                        item
                        key={item.id}
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: "15px" }}>
                          <Box>
                            <Box
                              component="img"
                              loading="lazy"
                              sx={{
                                width: { xs: "6rem", md: "6rem" },
                                height: "auto",
                                objectFit: "scale-down",
                                margin: { xs: "auto", md: "initial" },
                              }}
                              height="30px"
                              width="50px"
                              alt="The house from the offer."
                              src={
                                item.photo
                                  ? item.photo
                                  : `https://flagsapi.com/${getCountryCode(
                                      item.iso.toUpperCase()
                                    )}/flat/64.png`
                              }
                              srcSet={
                                item.photo
                                  ? item.photo
                                  : `https://flagsapi.com/${getCountryCode(
                                      item.iso.toUpperCase()
                                    )}/flat/64.png`
                              }
                            />
                          </Box>
                          <Typography
                            sx={{
                              textAlign: "center",
                              margin: "auto",
                              fontSize: { xs: "12px", md: "initial" },
                            }}
                          >
                            {item.exchangeFrom
                              ? item.exchangeFrom
                              : item.currencyName}{" "}
                            {item.exchangeFrom && item.iso}
                          </Typography>

                          {item.denominations && (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "2rem",
                              }}
                            >
                              <Typography>{item.denominations}</Typography>
                              <Typography>{item.description}</Typography>
                            </Box>
                          )}
                        </Box>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              margin: "auto",
                              fontSize: { xs: "12px", md: "initial" },
                            }}
                          >
                            {item.quantity &&
                              item.euro / item.quantity +
                                " * " +
                                item.quantity +
                                " = "}{" "}
                            {item.euro} Euro
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
                <Grid container mt={2} pb={5}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="body1"
                        align="left"
                        sx={{ fontSize: { xs: "12px", md: "initial" } }}
                      >
                        Frais de port
                      </Typography>
                      <Typography
                        variant="body1"
                        align="right"
                        sx={{ fontSize: { xs: "12px", md: "initial" } }}
                      >
                        {selectedValue.deliveryCost}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="body1"
                        align="left"
                        sx={{ fontSize: { xs: "12px", md: "initial" } }}
                      >
                        total
                      </Typography>
                      <Typography
                        variant="body1"
                        align="right"
                        sx={{ fontSize: { xs: "12px", md: "initial" } }}
                      >
                        {selectedValue.amount} Euro
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Box>
        )}
      </Layout>
    </>
  );
});
