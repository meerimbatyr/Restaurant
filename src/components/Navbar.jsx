import React from "react";
import { useState, useRef, useEffect } from "react";
import { links } from "./data";
import { FaBars, FaCartPlus } from "react-icons/fa";
import logo from "../logo.png";

export default function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);

  const changeNavbarColor = () => {
    if (window.scrollY >= 20) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };

  window.addEventListener("scroll", changeNavbarColor);

  return (
    <nav className={colorChange ? "color-changed" : "transparent"}>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} className="logo" alt="logo" />
          <button className="nav-toggle" onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
            <li className="cart" style={{ color: "white" }}>
              <a href="#">
                <FaCartPlus className="cart-icon" />
              </a>
              1
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
