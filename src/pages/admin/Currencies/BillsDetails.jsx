import { Box, Breadcrumbs, Grid, Link } from "@mui/material";
import Layout from "../../../layout/admin/Layout";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContextStore } from "../../../stores/RootStoreContext";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import BillDescritionField from "./BillDescriptionField";
export default function BillsDetails() {
  const store = useContextStore();
  const navigate = useNavigate();
  useEffect(() => {
    async function getCurrency() {
      var result = await store.currenciesStore.getbyId(id);
      if (result === undefined) navigate("/admin/currencies");
      setData(result);
    }
    getCurrency();
  }, []);
  function handleClick(event) {
    event.preventDefault();
    navigate("/admin/currencies");
  }
  const [data, setData] = useState();
  const { id } = useParams();
  return (
    <Layout>
      {data && (
        <Box sx={{ px: 8, py: 6 }}>
          <div role="presentation" style={{ margin: "20px 0" }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                onClick={handleClick}
                href="/admin/currencies"
              >
                Currencies
              </Link>
              <Typography color="text.primary">{data.currencyName}</Typography>
            </Breadcrumbs>
          </div>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {data.currencyName}
          </Typography>
          <Grid container sx={{ display: "flex" }} rowSpacing={2}>
            {data.bills.map((el) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                key={el.name}
                sx={{ padding: "0 .5rem" }}
              >
                <BillDescritionField id={id} el={el} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Layout>
  );
}
