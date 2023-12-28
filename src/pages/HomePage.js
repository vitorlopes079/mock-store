import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import model from "../images/model.jpg";
import model2 from "../images/model2.jpg";
import ItemContainer from "../components/ItemContainer";
import { useSelector } from "react-redux";
import {
  menTopSelectors,
  menBottomSelectors,
  womenTopSelectors,
  womenBottomSelectors,
  accessoriesSelectors,
} from "../store/features/products/productsSlice";
import AboutUs from "../components/AboutUs";

function HomePage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const menTop = useSelector(menTopSelectors.selectAll);
  const menBottom = useSelector(menBottomSelectors.selectAll);
  const womenTop = useSelector(womenTopSelectors.selectAll);
  const womenBottom = useSelector(womenBottomSelectors.selectAll);
  const accessories = useSelector(accessoriesSelectors.selectAll);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const combinedProducts = [
    ...menTop,
    ...menBottom,
    ...womenTop,
    ...womenBottom,
    ...accessories,
  ];

  function shuffleArray(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const ourBestSellers = shuffleArray(combinedProducts).slice(0, 6);


  return (
    <div>
      <div className="bg-white h-44 sm:h-32 md:h-32 border-b border-t border-black relative ">
        <p className="font-josefin text-gray-900  p-4 md:p-6 md:text-lg md:p-6 md:leading-relaxed md:text-center">
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
          src={windowWidth > 768 ? model : model2}
          alt="Woman holding a sheer fabric aloft, with a cloudy sky in the background"
        />
      </div>
      <div className="mt-20">
        <h2 className="font-pacifico text-4xl text-center text-gray-900 font-bold mt-8 ">
          Our Best Sellers
        </h2>
        <div className="flex justify-center">
          <div
            className="flex justify-around flex-wrap my-6 "
            style={{ maxWidth: "694px" }}
          >
            {ourBestSellers.map((item) => (
              <ItemContainer
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                category={item.category}
                description={item.description}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
      <div id="aboutUs">
        <AboutUs />
      </div>
    </div>
  );
}

export default HomePage;
