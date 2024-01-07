import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import CategoryProducts from "./pages/CategoryProducts";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import SubCategories from "./pages/SubCategories";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "./store/features/products/productsSlice";
import Login from "./pages/Login";
import NewAccount from "./pages/NewAccount";
import User from "./pages/User";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import ConfirmOrder from "./pages/ConfirmOrder";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; 
import { setCurrentUser, logOutUser} from "./store/features/auth/authSlice";
import OrderConfirmation from "./pages/OrderConfirmation";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
  
        dispatch(setCurrentUser({
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
         
        }));
      } else {
        dispatch(logOutUser())
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryProducts />}
          />
          <Route
            path="category/:categoryName/product/:id"
            element={<Product />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/subcategories/:subCategory"
            element={<SubCategories />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/login/newAccount" element={<NewAccount />} />
          
          <Route path="/confirmOrder" element={<ConfirmOrder />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<User />} />
            <Route path="orderConfirmation" element={<OrderConfirmation />}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
