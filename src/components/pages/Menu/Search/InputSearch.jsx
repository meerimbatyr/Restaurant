import React from "react";

export default function InputSearch({ getInputValue}) {
  return (
    <form className="form">
      <input
        type="text"
        placeholder="Search..."
        className="search-dish"
        onChange={(event) => getInputValue(event.target.value)}
      />
    </form>
  );
}
