import React from "react";
import { FaTimes } from "react-icons/fa";
import "./Cart.css";

function Cart(props) {
  const { openCart, closeCartFn, closeCart, onAdd, cartItems } = props;
  return (
    <div
      className={openCart && !closeCart ? "cart-overlay show" : "cart-overlay"}
    >
      <aside className="cart">
        <button onClick={closeCartFn} className="cart-close">
          <FaTimes />
        </button>
        <header>
          <h3 className="text-slanted">your bag</h3>
        </header>
        {!cartItems.length ? (
          <div className="cart-item">Cart is Empty</div>
        ) : (
          cartItems.map((cartItem) => {
            <div className="cart-items" key={cartItem.id}>
              <h5 className="cart-item-name">{cartItem.title}</h5>
            </div>;
          })
        )}

        <footer>
          <h3 className="cart-total text-slanted">total : $12.99</h3>
          <button className="cart-checkout btn">Checkout</button>
        </footer>
      </aside>
    </div>
  );
}

export default Cart;
