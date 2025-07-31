import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

export default function ShoppingCartModal(props) {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
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
            <CheckCircleIcon sx={{ color: "rgb(157, 204, 0)" }} />
            Un nouvel article a été ajouté à votre panier.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="gold"
            variant="contained"
            onClick={() => navigate("/panier")}
            autoFocus
          >
            Voir mon panier
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
