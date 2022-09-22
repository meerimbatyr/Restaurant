import React from "react";
import { useState } from "react";

export default function Navbar() {
  function handleClick() {
    const links = document.querySelector("ul");
    links.setAttribute("className", "links");
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light text-light">
      <div className="container-fluid">
        <a href="#" className="navbar-brand">
          <img src="" alt="" />
          Brand
        </a>
        <button
          onClick={() => handleClick()}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-restaurant"
          aria-controls="navbar-restaurant"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="
               navbar-toggler-icon"
          ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-restaurant">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a href="#" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
