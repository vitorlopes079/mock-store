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

function App() {
  const dispatch = useDispatch();

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
          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<User />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
