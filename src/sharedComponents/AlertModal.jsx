import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

export default function AlertModal(props) {
  const { open, setOpen, navigateToHome, justText } = props;
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    if (navigateToHome) navigate("/");
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ display: "flex", margin: "auto", gap: "10px" }}
          >
            {!justText && (
              <CheckCircleIcon sx={{ color: "rgb(157, 204, 0)" }} />
            )}
            {props.text
              ? props.text
              : "Un nouvel article a été ajouté à votre panier."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="gold"
            variant="contained"
            onClick={handleClose}
            autoFocus
          >
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
