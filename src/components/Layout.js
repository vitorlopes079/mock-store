import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import HeaderDesktop from "./HeaderDesktop";
import Footer from "./Footer";
import Bag from "../pages/bag/Bag";

function Layout() {
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1000);

  const toggleBag = () => {
    setIsBagOpen(!isBagOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 40, 
    display: isBagOpen || isMenuOpen ? "block" : "none",
  };

  return (
    <div className="flex flex-col min-h-screen">
      {isDesktop ? (
        <HeaderDesktop toggleBag={toggleBag} />
      ) : (
        <Header
          toggleBag={toggleBag}
          toggleMenu={toggleMenu}
          isMenuOpen={isMenuOpen}
        />
      )}
      <main className="flex flex-col flex-grow justify-center items-center">
        <Outlet context={{ toggleBag }} />
      </main>
      <Footer />
      {(isBagOpen || isMenuOpen) && (
        <div
          style={overlayStyle}
          onClick={() => {
            setIsBagOpen(false);
            setIsMenuOpen(false);
          }}
        ></div>
      )}
      <Bag isBagOpen={isBagOpen} toggleBag={toggleBag} />
    </div>
  );
}

export default Layout;
