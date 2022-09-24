import React from "react";

export default function Categories(props) {
  const { categories, filter, active } = props;
  const activeStyle = { backgroundColor: "hsl(209, 61%, 16%)", color: "white" };

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
