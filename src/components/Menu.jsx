import axios from "axios";
import React, { Component } from "react";
import Categories from "./Categories";
import InputSearch from "./InputSearch";
import InputMessage from "./InputMessage";
import MenuItem from "./MenuItem";
import PriceFilter from "./PriceFilter";
import SetInputLoading from "./SetInputLoading";

export default class Menu extends Component {
  state = {
    menu: [],
    allCategories: [],
    menuToShow: [],
    clicked: false,
    active: "",
    selected: false,
    searching: false,
    errInputMessage: false,
    inputLoading: false
 
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

  inputValue  = (inputValue) => {
    const {menu, menuToShow} = this.state

    this.setState({inputLoading:true})
    setTimeout(()=>{
      this.setState({inputLoading:false})
    },300)
    const menuSearch = menu.filter((item) => {
      return item.title.toLowerCase().includes(inputValue.toLowerCase());
    });
      this.setState({ searching: true, menuToShow: menuSearch });
      if(menuToShow.length === 0){
        this.setState({errInputMessage: true})
      }else{
        this.setState({errInputMessage: false})
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
  render() {
    const {
      menu,
      allCategories,
      clicked,
      menuToShow,
      active,
      searching,
      errInputMessage,
      inputLoading
    } = this.state;

    return (
      <div className="menu">
        <h2 className="title">Our Menu</h2>
        <hr className="underline" />
        <InputSearch
          getInputValue={this.inputValue}
        />
        <div className="filter">
          <Categories
            categories={allCategories}
            filter={this.filterByCategories}
            active={active}
          />
          <PriceFilter priceRanges={this.onChange} />
        </div>
          {(inputLoading && <SetInputLoading/>)}
          {(!errInputMessage? 
          <article className="section-center">
          {(clicked || searching ? menuToShow : menu).map((menuItem) => {
        
            return <MenuItem menuItem={menuItem} key={menuItem.id} />;       
          })}
        </article> 
           : 
           <InputMessage/>)}

    

        

        
      </div>
    );
  }
}
