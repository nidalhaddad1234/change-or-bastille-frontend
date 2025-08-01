import Layout from "../../../layout/admin/Layout";
import { Button, Box, Typography } from "@mui/material";
import CustomTable from "../../../sharedComponents/tableFiltering/customTable/CustomTable";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { observer } from "mobx-react";
import { useContextStore } from "../../../stores/RootStoreContext";
import Loading from "../../../sharedComponents/utilities/Loading";
import { Helmet } from "react-helmet";

export default observer(function AdminNews() {

    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const store = useContextStore();

    const { isLoading } = store.newsStore;
    useEffect(() => {
        const fetchData = async () => {
            store.newsStore
                .loadNews(false)
                .then((result) => {
                    if (Array.isArray(result)) {
                        const keysToDelete = [
                            "_id",
                            "newsId",
                            "createdAt",
                            "updatedAt",
                            "__v",
                            "photo",
                        ];
                        const transformedData = result.map((obj) => {
                            const objCopy = { ...obj };
                            const id = objCopy._id;
                            objCopy.isVisible = objCopy.isVisible ? "true" : "false";
                            keysToDelete.forEach((key) => delete objCopy[key]);
                            return {
                                ...objCopy,
                                button: (
                                    <Button size="small" onClick={() => navigate("update/" + id)}>
                                        <EditIcon sx={{ fontSize: "20px" }} />
                                    </Button>
                                ),
                            };
                        });
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
                <title>News | admin panel</title>
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
                        <Typography variant="h5">News</Typography>
                        <Button
                            variant="contained"
                            color="primaryAdmin"
                            sx={{ borderRadius: 2 }}
                            size="small"
                            onClick={() => navigate("create")}
                        >
                            {" "}
                            <AddIcon sx={{ marginRight: 1 }} />
                            Add
                        </Button>
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