import React from "react";
import banner from "../images/banner.jpg";
import "./Home.css";

export default function Home() {
  return (
    <div className="banner">
      <img src={banner} alt="banner" />
      <div className="banner-header">
        <h1>Dinner with Us</h1>
        <h3>Accidental Appearances</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem,
          minima!
        </p>
        <a href="/reservations">
          <button className="book-table">Book My Table</button>
        </a>
      </div>
    </div>
  );
}
