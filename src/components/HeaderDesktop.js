import React from "react";
import { useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import Bag from "../store/features/bag/Bag";
import Logo from "./Logo";
import Icons from "./Icons";
import DesktopNavLinks from "./DesktopNavLinks"

function HeaderDesktop({ toggleBag }) {
  const navigate = useNavigate();
  const bagItems = useSelector((state) => state.bag.items);

  const totalQuantity = bagItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="relative h-16 w-full px-5 bg-black flex justify-between mr-4 items-center sticky top-0 z-10 ">
        <Logo handleLogoClick={handleLogoClick} />
        <DesktopNavLinks />
        <Icons toggleBag={toggleBag} totalQuantity={totalQuantity} />
      </nav>

      <Bag toggleBag={toggleBag} />
    </>
  );
}

export default HeaderDesktop;
