import Layout from "../../../layout/admin/Layout";
import {
  Button,
  Box,
  Typography,
  CardHeader,
  CardMedia,
  Card,
  Grid,
  CardActions,
  Breadcrumbs,
  Link,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useContextStore } from "../../../stores/RootStoreContext";
import Loading from "../../../sharedComponents/utilities/Loading";
import { Helmet } from "react-helmet";
import agent from "../../../agent";

export default observer(function Identity() {
  const store = useContextStore();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(null);
  const [type, setType] = useState(2);

  const { id } = useParams();
  useEffect(() => {
    async function getUser() {
      var result = await store.userStore.getbyId(id);
      if (result === undefined) navigate("/admin/users");
      setSelectedValue(result);
      setValue(result.identityStatus);
      setType(
        result.identityStatus === "not verified"
          ? 1
          : result.identityStatus === "pending"
          ? 2
          : result.identityStatus === "verified"
          ? 3
          : 4
      );
    }
    getUser();
  }, []);
  function handleClick(event) {
    event.preventDefault();
    navigate("/admin/users");
  }
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setType(event.target.value);
    setValue(
      event.target.value === 1
        ? "not verified"
        : event.target.value === 2
        ? "pending"
        : event.target.value === 3
        ? "verified"
        : "rejected"
    );
  };
  const handleSubmit = async (e) => {
    try {
      var result = await agent.account.updateIdentityStatus(value, id);
      if (result.message === "Success") {
        store.userStore.updateUser(result.data, id);
        navigate("/admin/users");
      }
    } catch (er) {}
  };
  return (
    <>
      <Layout>
        <Helmet>
          <title>Users | admin panel</title>
        </Helmet>
        {!selectedValue ? (
          <Loading />
        ) : (
          <Box sx={{ px: { xs: 0, lg: 8 }, py: { xs: 0, lg: 6 } }}>
            <div role="presentation" style={{ margin: "20px 0" }}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={handleClick}
                  href="/admin/currencies"
                >
                  Users
                </Link>
                <Typography color="text.primary">
                  {selectedValue.firstName + " " + selectedValue.lastName}
                </Typography>
              </Breadcrumbs>
            </div>
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
                  subheader={"User identity"}
                  title="Users"
                ></CardHeader>
                <Box sx={{ display: "flex", gap: "10px", margin: "1rem" }}>
                  <Typography sx={{ margin: "auto" }}>Status:</Typography>
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
                    <MenuItem value={1}>Not Verified</MenuItem>
                    <MenuItem value={2}>Pending</MenuItem>
                    <MenuItem value={3}>Verified</MenuItem>
                    <MenuItem value={4}>Rejected</MenuItem>
                  </Select>
                  <Button
                    sx={{ height: "2rem", margin: "auto" }}
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
              <Grid container>
                {(selectedValue.identityPhotos || []).map((url) => (
                  <Grid
                    item
                    key={url}
                    xs={12}
                    md={6}
                    lg={3}
                    sx={{ padding: ".5rem", position: "relative" }}
                  >
                    <Card sx={{ maxWidth: 300 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        loading="lazy"
                        image={url}
                        alt="..."
                      />
                      <CardActions
                        sx={{ display: "flex", justifyContent: "end" }}
                      >
                        <Button
                          onClick={() => window.open(url, "_blank")}
                          size="small"
                          variant="contained"
                          color="primary"
                        >
                          Download
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Box>
        )}
      </Layout>
    </>
  );
});
