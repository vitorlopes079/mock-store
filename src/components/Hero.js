import React, { useState, useEffect } from "react";
import logo from "../images/logo.webp";
import model from "../images/model.webp";

const Hero = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="bg-white h-44  border-b border-t border-black relative sm:h-32 md:h-32">
        <p className="font-poppins text-gray-900 p-4 md:p-6 md:text-lg md:leading-relaxed">
          Discover elegance and savings at Haute Couture. Enjoy free shipping on
          orders over $100. Shop your favorites now — a world of style awaits.
          Limited time offer.
        </p>
        <img
          src={logo}
          alt="Haute Couture logo"
          className="absolute right-5 -bottom-14  w-28 h-28 "
        />
      </div>
      <div className="flex justify-center items-center md:bg-gray-400 border-b border-black w-full">
        <img
          className="md:rounded w-full"
          src={windowWidth > 768 ? model : "/model2.jpg"}
          alt="Woman holding a sheer fabric aloft, with a cloudy sky in the background"
        />
      </div>
    </div>
  );
};

export default Hero;
