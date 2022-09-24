import React from "react";
import { FaArrowDown, FaArrowUp, FaTimes } from "react-icons/fa";
import "./Cart.css";

function Cart(props) {
  const {
    openCart,
    toggleCartFn,
    addToCart,
    cartItems,
    decreaseFromCart,
    removeItem,
    clearCart,
  } = props;

  const totalAmount = cartItems.reduce((prev, curr) => {
    return (prev += curr.qty * curr.price);
  }, 0);

  return (
    <div className={openCart ? "cart-overlay show" : "cart-overlay"}>
      <aside className="cart show">
        <div className="cart-top">
          <button onClick={toggleCartFn} className="cart-close">
            <FaTimes />
          </button>
          <button onClick={clearCart} className="clear-cart">
            Clear All
          </button>
        </div>
        <header>
          <h3 className="text-slanted">Your bag</h3>
        </header>
        {!cartItems.length ? (
          <div className="cart-empty">Cart is Empty</div>
        ) : (
          cartItems.map((cartItem) => {
            return (
              <div className="cart-item" key={cartItem.id}>
                <img className="cart-item-img" src={cartItem.img} alt="" />
                <div>
                  <h5 className="cart-item-name">{cartItem.title}</h5>
                  <p>$ {cartItem.price}</p>
                  <button
                    onClick={() => removeItem(cartItem)}
                    className="cart-item-remove-btn"
                  >
                    Remove Item
                  </button>
                  <p className="cart-item-amount">
                    {" "}
                    Amount: ${(cartItem.price * cartItem.qty).toFixed(2)}
                  </p>
                </div>
                <div className="amount-items">
                  <button
                    onClick={() => addToCart(cartItem)}
                    className="cart-item-increase-btn"
                  >
                    <FaArrowUp />
                  </button>
                  <p>{cartItem.qty}</p>
                  <button
                    onClick={() => decreaseFromCart(cartItem)}
                    className="cart-item-decrease-btn"
                  >
                    <FaArrowDown />
                  </button>
                </div>
              </div>
            );
          })
        )}

        <footer>
          <h3 className="cart-total text-slanted">
            total amount: $ {totalAmount.toFixed(2)}
          </h3>
          <button className="cart-checkout">Checkout</button>
        </footer>
      </aside>
    </div>
  );
}

export default Cart;
