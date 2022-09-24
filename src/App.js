import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import bg from "./images/full-bg.png";
import Home from "./pages/Home";
import axios from "axios";
import InputSearch from "./components/InputSearch";
import Categories from "./components/Categories";
import PriceFilter from "./components/PriceFilter";
import MenuItem from "./components/MenuItem";
import SetInputLoading from "./components/SetInputLoading";
import InputMessage from "./components/InputMessage";
import Cart from "./components/Cart/Cart";

class App extends Component {
  state = {
    menu: [],
    allCategories: [],
    menuToShow: [],
    clicked: false,
    active: "",
    selected: false,
    searching: false,
    errInputMessage: false,
    inputLoading: false,
    cartItems: [],
    openCart: false,
    closeCart: false,
  };
  componentDidMount() {
    axios
      .get(
        "https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json"
      )
      .then((res) => {
        //getting unique categories
        const allCategories = [
          "all",
          ...new Set(res.data.map((item) => item.category)),
        ];

        this.setState({ menu: res.data, allCategories });
      })
      .catch((err) => console.log("Something went wrong", err));
  }

  inputValue = (inputValue) => {
    const { menu, menuToShow } = this.state;

    this.setState({ inputLoading: true });
    setTimeout(() => {
      this.setState({ inputLoading: false });
    }, 300);
    const menuSearch = menu.filter((item) => {
      return item.title.toLowerCase().includes(inputValue.toLowerCase());
    });
    this.setState({ searching: true, menuToShow: menuSearch });
    if (menuToShow.length === 0) {
      this.setState({ errInputMessage: true });
    } else {
      this.setState({ errInputMessage: false });
    }
  };

  filterByCategories = (category) => {
    const { menu } = this.state;
    const filteredMenu = menu.filter((item) => item.category === category);
    if (category === "all") {
      this.setState({
        clicked: true,
        menuToShow: menu,
        selected: false,
        active: "all",
      });
    } else {
      this.setState({
        clicked: true,
        menuToShow: filteredMenu,
        selected: false,
        active: category,
      });
    }
  };

  onChange = (e) => {
    const { menu } = this.state;
    const selectedPrice = e.target.value;

    const filterByPrice = (num1, num2) => {
      const filteredMenuByPrice = menu.filter(
        (menuItem) => (menuItem.price <= num1) & (menuItem.price > num2)
      );
      this.setState({
        menuToShow: filteredMenuByPrice,
        selected: true,
        clicked: true,
        active: "all",
      });
    };
    if (selectedPrice === "prices") {
      filterByPrice(40, 0);
    } else if (selectedPrice === "0-10") {
      filterByPrice(10, 0);
    } else if (selectedPrice === "10-20") {
      filterByPrice(20, 10);
    } else if (selectedPrice === "20-30") {
      filterByPrice(30, 20);
    } else {
      filterByPrice(40, 30);
    }
  };

  openCartFn = () => {
    console.log("clicked");
    this.setState({ openCart: true, closeCart: false });
  };

  closeCartFn = () => {
    this.setState({ closeCart: true, openCart: false });
  };

  //Adding items to Cart
  onAdd = (product) => {
    const { cartItems } = this.state;
    const exist = cartItems.find((cartItem) => cartItem.id === product.id);
    if (exist) {
      const cartItems = cartItems.map((cartItem) =>
        cartItem.id === product.id ? { ...exist, qty: exist.qty + 1 } : cartItem
      );
      this.setState({ cartItems });
    } else {
      this.setState({ cartItems: [...cartItems, { ...product, qty: 1 }] });
    }
  };
  render() {
    const {
      menu,
      allCategories,
      clicked,
      menuToShow,
      active,
      searching,
      errInputMessage,
      inputLoading,
      openCart,
      closeCart,
      cartItems,
    } = this.state;

    return (
      <>
        <Navbar openCart={this.openCartFn} />
        <Home />
        <div className="menu">
          {openCart && (
            <Cart
              openCart={openCart}
              closeCartFn={this.closeCartFn}
              closeCart={closeCart}
              onAdd={this.onAdd}
              cartItems={cartItems}
            />
          )}

          <h2 className="title">Our Menu</h2>
          <hr className="underline" />
          <InputSearch getInputValue={this.inputValue} />
          <div className="filter">
            <Categories
              categories={allCategories}
              filter={this.filterByCategories}
              active={active}
            />
            <PriceFilter priceRanges={this.onChange} />
          </div>
          {inputLoading && <SetInputLoading />}
          {!errInputMessage ? (
            <article className="section-center">
              {(clicked || searching ? menuToShow : menu).map((menuItem) => {
                return (
                  <MenuItem
                    menuItem={menuItem}
                    key={menuItem.id}
                    openCart={this.openCartFn}
                    onAdd={this.onAdd}
                  />
                );
              })}
            </article>
          ) : (
            <InputMessage />
          )}
        </div>
      </>
    );
  }
}

export default App;
