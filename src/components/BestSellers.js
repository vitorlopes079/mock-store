import ItemContainer from "./ItemContainer";
import { useSelector } from "react-redux";
import { selectBestSellers } from "../store/features/products/productsSlice";

const BestSellers = () => {
  const ourBestSellers = useSelector(selectBestSellers);

  return (
    <div>
      <div className="mt-20">
        <h2 className="h1-style-1 mt-8 ">Our Best Sellers</h2>
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
    </div>
  );
};

export default BestSellers;
