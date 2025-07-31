import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box, DialogTitle, Switch, Typography } from "@mui/material";
import { getCookie, setCookie } from "../../helpers";
import { useEffect } from "react";

export default function CookiesAlert(props) {
  const { open, setOpen, navigateToHome, setConsentValue } = props;

  useEffect(() => {
    var consentGaGCL = getCookie("gaGclConsent");
    var consent = getCookie("consent");
    if (consent === undefined) {
      setCheckedGcl(true);
      setCheckedAnalytics(true);
    } else if (consent === "false") {
      setCheckedGcl(false);
      setCheckedAnalytics(false);
    } else if (consent === "true") {
      if (consentGaGCL === "GaGcl") {
        setCheckedGcl(true);
        setCheckedAnalytics(true);
      } else if (consentGaGCL === "Ga") {
        setCheckedAnalytics(true);
        setCheckedGcl(false);
      } else {
        setCheckedAnalytics(false);
        setCheckedGcl(true);
      }
    }
    return () => {};
  }, []);

  const [checkedGcl, setCheckedGcl] = React.useState(true);
  const [checkedAnalytics, setCheckedAnalytics] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  const save = () => {
    setConsentValue(checkedGcl && checkedAnalytics);
    if (checkedGcl && checkedAnalytics) {
      setCookie("consent", "true", 150);
      setCookie("gaGclConsent", "GaGcl", 150);
    } else if (!checkedGcl && !checkedAnalytics)
      setCookie("consent", "false", 150);
    else if (!checkedGcl) {
      setCookie("consent", "true", 150);
      setCookie("gaGclConsent", "Ga", 150);
    } else if (!checkedAnalytics) {
      setCookie("consent", "true", 150);
      setCookie("gaGclConsent", "Gcl", 150);
    }
    setOpen(false);
  };
  const handleChange = (event) => {
    setCheckedGcl(event.target.checked);
  };
  const handleChangeGa = (event) => {
    setCheckedAnalytics(event.target.checked);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ zIndex: "9999999 !important" }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogTitle sx={{ padding: "0px !important" }}>
            <Typography>
              Chez Change et Or Bastille, nous respectons votre vie privée et
              nous nous engageons à être transparents sur l’utilisation des
              cookies sur notre site web. Voici les options pour personnaliser
              vos préférences de cookies:
            </Typography>
          </DialogTitle>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              margin: "1rem 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                border: "1px solid rgb(0,0,0,0.3)",
              }}
            >
              <Typography
                variant={"body2"}
                sx={{
                  fontWeight: "700",
                  fontSize: "1rem",
                  padding: "1rem 1rem 0 1rem",
                }}
              >
                Cookies essentiels
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "2rem",
                  fontWeight: "400",
                  padding: "0rem 1rem 1rem 1rem",
                }}
              >
                Ces cookies sont nécessaires au fonctionnement de base de notre
                site web. Ils garantissent la sécurité et la fonctionnalité
                optimale de notre site.
                <Switch
                  checked={true}
                  disabled
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                border: "1px solid rgb(0,0,0,0.3)",
              }}
            >
              <Typography
                variant={"body2"}
                sx={{
                  fontWeight: "700",
                  fontSize: "1rem",
                  padding: "1rem 1rem 0 1rem",
                }}
              >
                Cookies de suivi publicitaire
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "2rem",
                  fontWeight: "400",
                  padding: "0rem 1rem 1rem 1rem",
                }}
              >
                Ces cookies sont utilisés pour vous présenter des publicités
                plus pertinentes en fonction de vos intérêts. Ils nous aident
                également à mesurer l’efficacité de nos campagnes publicitaires.
                <Switch
                  checked={checkedGcl}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                border: "1px solid rgb(0,0,0,0.3)",
              }}
            >
              <Typography
                variant={"body2"}
                sx={{
                  fontWeight: "700",
                  fontSize: "1rem",
                  padding: "1rem 1rem 0 1rem",
                }}
              >
                Cookies de Performance
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "2rem",
                  fontWeight: "400",
                  padding: "0rem 1rem 1rem 1rem",
                }}
              >
                Pour optimiser continuellement notre site web, nous utilisons
                des cookies de performance. Ces cookies statistiques sont
                essentiels pour mesurer l’efficacité et améliorer l’utilisation
                de notre site. Ils nous aident à comprendre comment les
                visiteurs interagissent avec notre site web, nous permettant
                ainsi d’ajuster et d’affiner nos services pour une meilleure
                expérience utilisateur.
                <Switch
                  checked={checkedAnalytics}
                  onChange={handleChangeGa}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="gold" variant="contained" onClick={save} autoFocus>
            Sauvegarder les préférences
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
