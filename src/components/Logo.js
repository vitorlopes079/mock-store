import React from "react";

const Logo = ({handleLogoClick}) => {
  return (
    <div className="whitespace-nowrap">
      <h2
        onClick={handleLogoClick}
        className="font-pacifico text-2xl text-red-400 shadow-xs cursor-pointer ml-4 md:text-3xl"
      >
        Haute Couture
      </h2>
    </div>
  );
};

export default Logo;
