import React, { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import userProgessContext from "../store/UserProgessContext";

const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(userProgessContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart()
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A Resturant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
