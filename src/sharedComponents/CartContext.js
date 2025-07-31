import React from "react";

const CartContext = React.createContext({
  cartItems: [],
  setCartItem: (carItem) => {},
});

export default CartContext;
