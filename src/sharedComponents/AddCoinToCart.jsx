import { Button } from "@mui/material";
import * as React from "react";
import CartContext from "./CartContext";
import ShoppingCartModal from "./ShoppingCartModal";

export default function AddCoinToCart(props) {
  const { id, totalPrice, quantity, name, photo } = props;
  const { cartItems, setCartItems } = React.useContext(CartContext);
  const [open, setOpen] = React.useState(false);
  const addToCart = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      var filteredOldItem = cartItems.filter((x) => x.id !== product.id);
      setCartItems([...filteredOldItem, product]);
    } else {
      setCartItems([...cartItems, { ...product }]);
    }
    setOpen(true);
  };

  return (
    <>
      <Button
        color="gold"
        disabled={quantity == 0}
        onClick={() =>
          addToCart({
            currencyName: name,
            id: id,
            euro: totalPrice,
            quantity: quantity,
            photo: photo,
          })
        }
        variant="contained"
      >
        AJOUTER AU PANIER
      </Button>
      <ShoppingCartModal open={open} setOpen={setOpen} />
    </>
  );
}
