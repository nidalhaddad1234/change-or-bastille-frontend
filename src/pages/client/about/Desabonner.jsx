import Layout from "../../../layout/client/Layout";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingMain from "../../../sharedComponents/utilities/LoadingMain";
import { useContextStore } from "../../../stores/RootStoreContext";
import { observer } from "mobx-react-lite";
import agent from "../../../agent";
import AlertModal from "../../../sharedComponents/AlertModal";
export default observer(function Desabonner() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [openDone, setOpenDone] = React.useState(false);
  const store = useContextStore();
  useEffect(() => {
    if (token && token.length > 0) {
      try {
        var result = async () =>
          await agent.news.unsubscribeFromNewsLetter(token);
        result().then((response) => {
          if (response.message == "Success") setOpenDone(true);
          else navigate("/");
        });
      } catch (er) {
        navigate("/");
      }
    }
    return () => {};
  }, [token]);

  return (
    <>
      {store.globalStoreClient.isLoadedBanner ? (
        <Layout>
          <AlertModal
            open={openDone}
            navigateToHome={true}
            text={"Désabonnement réussi"}
            setOpen={setOpenDone}
          />
        </Layout>
      ) : (
        <LoadingMain fullHeight />
      )}
    </>
  );
});
