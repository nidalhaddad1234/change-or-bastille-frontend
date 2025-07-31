import Layout from "../../layout/admin/Layout";
import * as Yup from "yup";
import { Box, Grid } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import agent from "../../agent";
import { observer } from "mobx-react";
import CustomTable from "../../sharedComponents/tableFiltering/customTable/CustomTable";
export default observer(function NewsLetter() {
  const [data, setData] = useState();

  useEffect(() => {
    async function getNews() {
      var result = await agent.news.getAllNewsLetterMembers();
      setData(result.data);
    }
    getNews();
  }, []);

  const SendNewsLetter = async () => {
    try {
      var result = await agent.news.sendNewsLetter();
    } catch (er) {}
  };
  return (
    <Layout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 6,
          px: 8,
        }}
      >
        <Card
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
          }}
        >
          <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
            <CardHeader title="News Letter"></CardHeader>
          </Box>

          <Divider
            sx={{
              borderColor: "rgb(242, 244, 247)",
            }}
          />
          <CardContent>
            <Box>
              {!data || data.length == 0 ? (
                <div>There are no data to display</div>
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CustomTable tempArray={data} Csv={true} />
                </div>
              )}
            </Box>
          </CardContent>
          <Divider
            sx={{
              borderColor: "rgb(242, 244, 247)",
            }}
          />
          <CardActions sx={{ justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color={"primaryAdmin"}
              onClick={SendNewsLetter}
            >
              Send Latest News Letter
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Layout>
  );
});
