import React from "react";
import "./Cart/Cart.css";

export default function MenuItem(props) {
  const { menuItem, openCart, onAdd } = props;
  const handleClick = () => {
    openCart();
    onAdd();
  };
  return (
    <div className="menu-item">
      <div>
        <img src={menuItem.img} alt={menuItem.title} className="photo" />
      </div>
      <div className="item-info">
        <header>
          <h4>{menuItem.title}</h4>
          <h5 className="price"> $ {menuItem.price}</h5>
        </header>
        <p className="item-text">{menuItem.desc.slice(1, -1)}</p>
        <button className="cart-btn" onClick={() => handleClick()}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}
