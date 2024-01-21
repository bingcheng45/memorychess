import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../assets/css/NavBar.css";

const Nav = () => {
  const [navOpen, setNavOpen] = useState(false);
  useEffect(() => {
    const handleScroll = (e) => {
      if (navOpen) {
        e.preventDefault();
      }
    };
    const handleTouchMove = (e) => {
      if (navOpen) {
        e.preventDefault();
      }
    };
    document.addEventListener("wheel", handleScroll, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleScroll, { passive: false });
      document.removeEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    };
  }, [navOpen]);
  return (
    <div className="nav">
      <div className="nav-container">
        <div
          className={`navbar bg-black transition-color duration-500 ${
            navOpen ? "bg-inherit" : ""
          }`}
        >
          <div className="logo text-xs sm:text-lg">MemoryChess.co</div>
          <div className="signup text-xs sm:text-lg">Signup/Login</div>
          <div className="flex items-center">
            <div className="menu-toggle" onClick={() => setNavOpen(!navOpen)}>
              <div
                className={`${
                  navOpen ? "hamBox hamBoxOpen" : "hamBox"
                } md:text-xl`}
              >
                <span className={navOpen ? "hidden" : "lineTopTop"}></span>
                <span className={navOpen ? "lineTop spin" : "lineTop"}></span>
                <span
                  className={navOpen ? "lineBottom spin" : "lineBottom"}
                ></span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="nav-overlay"
          style={{
            top: navOpen ? "0" : "-100%",
            transitionDelay: navOpen ? "0s" : "0s",
          }}
        >
          <ul className="nav-links">
            <li className="nav-item">
              <Link
                to="/"
                onClick={() => setNavOpen(!navOpen)}
                style={{
                  top: navOpen ? "0" : "120px",
                  transitionDelay: navOpen ? "0.8s" : "0s",
                }}
              >
                Home
              </Link>
              <div className="nav-item-wrapper"></div>
            </li>
            <li className="nav-item">
              <Link
                to="/projects"
                onClick={() => setNavOpen(!navOpen)}
                style={{
                  top: navOpen ? "0" : "120px",
                  transitionDelay: navOpen ? "0.9s" : "0s",
                }}
              >
                Projects
              </Link>
              <div className="nav-item-wrapper"></div>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                onClick={() => setNavOpen(!navOpen)}
                style={{
                  top: navOpen ? "0" : "120px",
                  transitionDelay: navOpen ? "1s" : "0s",
                }}
              >
                About
              </Link>
              <div className="nav-item-wrapper"></div>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                onClick={() => setNavOpen(!navOpen)}
                style={{
                  top: navOpen ? "0" : "120px",
                  transitionDelay: navOpen ? "1.1s" : "0s",
                }}
              >
                Contact
              </Link>
              <div className="nav-item-wrapper"></div>
            </li>
          </ul>
          <div className="nav-footer">
            <div
              className="location"
              style={{
                bottom: navOpen ? "0" : "-20px",
                opacity: navOpen ? "1" : "0",
                transitionDelay: navOpen ? "1.2s" : "0s",
              }}
            >
              {/* <span>Japan, TKY</span> */}
            </div>
            <div className="nav-social-media">
              <ul>
                <li>
                  <a
                    href="#"
                    style={{
                      bottom: navOpen ? "0" : "-20px",
                      opacity: navOpen ? "1" : "0",
                      transitionDelay: navOpen ? "1.3s" : "0s",
                    }}
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      bottom: navOpen ? "0" : "-20px",
                      opacity: navOpen ? "1" : "0",
                      transitionDelay: navOpen ? "1.4s" : "0s",
                    }}
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
