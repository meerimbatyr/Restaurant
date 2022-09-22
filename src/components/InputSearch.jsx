import React from "react";

export default function InputSearch({ getInputValue, submit, searchDish }) {
  return (
    <form className="form" onSubmit={(e) => submit(e)}>
      <input
        type="text"
        placeholder="Name of the dish..."
        value={searchDish}
        onChange={(e) => getInputValue(e)}
        className="search-dish"
      />
      <input type="submit" value="Search" className="submit" />
    </form>
  );
}
