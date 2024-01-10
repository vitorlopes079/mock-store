import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authState = useSelector((state) => state.auth);

  const { orderData } = location.state || {
    orderData: null,
  };

  useEffect(() => {
    if (authState.user) {
      if (orderData) {
        navigate("/confirmOrder", { state: { orderData } });
      } else {
        navigate("/user");
      }
    }
  }, [authState.user, navigate, orderData]);

  return (
    <div className="mx-auto my-4  sm:w-2/4 lg:w-1/4 ">
      <h1 className="h1-style-2 py-4 text-center text-3xlmd:py-5 md:text-4xl ">
        Login
      </h1>
      <p className="font-nunito text-gray-900 mb-4 text-center">
        Please enter your e-mail and password:
      </p>
      <LoginForm />
      <p className="font-nunito text-gray-800 mt-2 mb-4 italic text-center">
        Don't have an account?{" "}
        <Link to="/login/newAccount" state={{ orderData }}>
          <span className="font-bold text-red-400 ml-1">Create one</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
