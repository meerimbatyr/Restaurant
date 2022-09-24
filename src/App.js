import "./App.css";
import React, { Component } from "react";
import axios from "axios";
import Navbar from "./components/pages/Home/Navbar/Navbar";
import bg from "./images/full-bg.png";
import Home from "./components/pages/Home/Home";
import InputSearch from "./components/pages/Menu/Search/InputSearch";
import Categories from "./components/pages/Menu/Search/Categories/Categories";
import PriceFilter from "./components/pages/Menu/Search/Categories/PriceFilter";
import MenuItem from "./components/pages/Menu/MenuItem";
import Loading from "./components/pages/Menu/Search/SetInputLoading";
import InputMessage from "./components/pages/Menu/Search/InputMessage";
import Cart from "./components/pages/Home/Navbar/Cart/Cart";

class App extends Component {
  state = {
    menu: [],
    allCategories: [],
    menuToShow: [],
    cartItems: JSON.parse(localStorage.getItem("cartitems")) || [],
    active: "",
    errInputMessage: false,
    loading: false,
    openCart: false,
    closeCart: false,
  };

  ///Fetching API
  componentDidMount() {
    const { cartItems } = this.state;
    this.setState({ loading: true });
    this.loading();
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

        this.setState({
          menu: res.data,
          allCategories,
          menuToShow: [...res.data],
        });
      })
      .catch((err) => console.log("Something went wrong", err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartItems !== this.state.cartItems) {
      localStorage.setItem("cartitems", JSON.stringify(this.state.cartItems));
    }
  }

  //Loading
  loading = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  };

  //Searching dishes by name
  getInputValue = (inputValue) => {
    const { menu, menuToShow } = this.state;

    this.loading();

    const menuSearch = menu.filter((item) => {
      return item.title.toLowerCase().includes(inputValue.toLowerCase().trim());
    });

    this.setState({ menuToShow: menuSearch });
    if (menuToShow.length === 0) {
      this.setState({ errInputMessage: true });
    } else {
      this.setState({ errInputMessage: false });
    }
  };

  //Filter by categories
  filterByCategories = (category) => {
    const { menu } = this.state;
    const filteredMenu = menu.filter((item) => item.category === category);
    if (category === "all") {
      this.setState({
        menuToShow: menu,
        active: "all",
      });
    } else {
      this.setState({
        menuToShow: filteredMenu,
        active: category,
      });
    }
  };

  //Filter by price
  onChange = (e) => {
    const { menu } = this.state;
    const selectedPrice = e.target.value;

    const filterByPrice = (num1, num2) => {
      const filteredMenuByPrice = menu.filter(
        (menuItem) => (menuItem.price <= num1) & (menuItem.price > num2)
      );
      this.setState({
        menuToShow: filteredMenuByPrice,
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

  //Cart Open Sidebar
  toggleCartFn = () => {
    this.setState({ openCart: !this.state.openCart });
  };

  closeCartFn = () => {
    this.setState({ openCart: false });
  };

  //Adding items to Cart
  addToCart = (menuItem) => {
    const { cartItems } = this.state;

    const exist = cartItems.find((cartItem) => cartItem.id === menuItem.id);

    if (!exist) {
      this.setState({ cartItems: [...cartItems, { ...menuItem, qty: 1 }] });
    } else {
      const increase = cartItems.map((cartItem) => {
        if (cartItem.id === menuItem.id) {
          // console.log(cartItem, menuItem, exist);
          return { ...exist, qty: exist.qty + 1 };
        } else {
          return cartItem;
        }
      });
      this.setState({ cartItems: [...increase] });
    }
  };

  //Removing item from cart by decreasing it
  decreaseFromCart = (menuItem) => {
    const { cartItems } = this.state;

    const exist = cartItems.find((cartItem) => cartItem.id === menuItem.id);
    if (exist.qty === 1) {
      const filter = cartItems.filter(
        (cartItem) => cartItem.id !== menuItem.id
      );
      this.setState({ cartItems: [...filter] });
    } else {
      const decrease = cartItems.map((cartItem) => {
        if (cartItem.id === menuItem.id) {
          return { ...exist, qty: exist.qty - 1 };
        } else {
          return cartItem;
        }
      });
      this.setState({ cartItems: [...decrease] });
    }
  };

  //remove item
  removeItem = (menuItem) => {
    const { cartItems } = this.state;

    const exist = cartItems.find((cartItem) => cartItem.id === menuItem.id);
    if (exist) {
      const filter = cartItems.filter(
        (cartItem) => cartItem.id !== menuItem.id
      );
      this.setState({ cartItems: [...filter] });
    }
  };

  //clearCart
  clearCart = () => {
    const { cartItems } = this.state;
    this.setState({ cartItems: [] });
  };

  render() {
    const {
      allCategories,
      menuToShow,
      active,
      errInputMessage,
      loading,
      openCart,
      closeCart,
      cartItems,
    } = this.state;

    return (
      <>
        <Navbar toggleCart={this.toggleCartFn} cartItems={cartItems} />
        <Home />

        <div className="menu">
          {openCart && (
            <Cart
              openCart={openCart}
              toggleCartFn={this.toggleCartFn}
              addToCart={this.addToCart}
              decreaseFromCart={this.decreaseFromCart}
              removeItem={this.removeItem}
              clearCart={this.clearCart}
              cartItems={cartItems}
            />
          )}

          <h2 className="title">Our Menu</h2>
          <hr className="underline" />
          <InputSearch getInputValue={this.getInputValue} />

          <div className="filter">
            <Categories
              categories={allCategories}
              filter={this.filterByCategories}
              active={active}
            />

            <PriceFilter priceRanges={this.onChange} />
          </div>

          {loading ? (
            <Loading />
          ) : !errInputMessage ? (
            <article className="section-center">
              {menuToShow.map((menuItem) => {
                return (
                  <MenuItem
                    menuItem={menuItem}
                    key={menuItem.id}
                    addToCart={this.addToCart}
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
