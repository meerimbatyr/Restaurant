import React from "react";

export default function Categories(props) {
  const { categories, filter, active } = props;
  const activeStyle = { backgroundColor: "#c59d5f", color: "white" };

  return (
    <div className="btn-container">
      {categories.map((category, index) => (
        <button
          onClick={() => filter(category)}
          className="filter-btn"
          key={index}
          style={active === category ? activeStyle : null}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
