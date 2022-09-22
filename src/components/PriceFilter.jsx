import React from "react";

export default function PriceFilter(props) {
  const { priceRanges } = props;
  return (
    <div className="select-price">
      <label htmlFor="price-range">Filter by price</label>
      <select id="price-range" onChange={(e) => priceRanges(e)}>
        <option value="prices" default>
          --Select price range--
        </option>
        <option value="0-10">$ 0-10</option>
        <option value="10-20">$ 10-20</option>
        <option value="20-30">$ 20-30</option>
        <option value="30-40">$ 30-40</option>
      </select>
    </div>
  );
}
