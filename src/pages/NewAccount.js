import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import NewAccountForm from "../components/NewAccountForm";

const NewAccount = () => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (authState.user) {
      const { orderData } = location.state || {
        orderData: null,
      };

      if (orderData) {
        navigate("/confirmOrder", { state: { orderData } });
      } else {
        navigate("/user");
      }
    }
  }, [authState.user, navigate, location.state]);

  return (
    <div className="mx-auto my-4 px-6 md:px-0 sm:w-2/4 lg:w-1/3 ">
      <h1 className=" h1-style-2 text-3xl py-4 text-center md:py-5 md:text-4xl">
        Create new account
      </h1>{" "}
      <NewAccountForm />
    </div>
  );
};

export default NewAccount;
