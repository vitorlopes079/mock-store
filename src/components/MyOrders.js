import { useEffect } from "react";
import { auth } from "../firebase";
import { fetchOrders } from "../store/features/orders/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import ConfirmedOrderLine from "./ConfirmedOrderLine";

const MyOrders = () => {
  const dispatch = useDispatch();
  const userId = auth.currentUser?.uid;
  const orders = useSelector((state) => state.orders.orders);
  console.log("orders", orders)

  useEffect(() => {
    dispatch(fetchOrders(userId));
  }, [dispatch, userId]);

  const ordersContent = orders.map((item, index) => (
    <ConfirmedOrderLine 
      key={index} 
      date={item.date}
      products={item.products}
      totalPrice={item.totalPrice}
    />
  ));

  return (
    <div className="mt-6">
      {orders.length > 0 ? (
        ordersContent
      ) : (
        <p className="text-lg text-red-400 p-1 mt-2">
          you have no orders at the moment
        </p>
      )}
    </div>
  );
};
export default MyOrders;
