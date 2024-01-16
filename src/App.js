import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, Suspense, lazy } from "react";
import { fetchProducts } from "./store/features/products/productsSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setCurrentUser, logOutUser } from "./store/features/auth/authSlice";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import CategoryProducts from "./pages/CategoryProducts";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import SubCategories from "./pages/SubCategories";
import Login from "./pages/Login";
import NewAccount from "./pages/NewAccount";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";
import { shuffleBestSellers } from "./store/features/products/productsSlice";
const ConfirmOrder = lazy(() => import("./pages/ConfirmOrder"));
const User = lazy(() => import("./pages/User"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));

function App() {
  const dispatch = useDispatch();
  const productStatus = useSelector((state) => state.products.status);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setCurrentUser({
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
          })
        );
      } else {
        dispatch(logOutUser());
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (productStatus === "succeeded") {
      dispatch(shuffleBestSellers());
    }
  }, [dispatch, productStatus]);

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
            <Route
              path="/confirmOrder"
              element={
                <Suspense fallback={<Loading />}>
                  <ConfirmOrder />
                </Suspense>
              }
            />
            <Route
              path="/user"
              element={
                <Suspense fallback={<Loading />}>
                  <User />
                </Suspense>
              }
            />
            <Route
              path="/orderConfirmation"
              element={
                <Suspense fallback={<Loading />}>
                  <OrderConfirmation />
                </Suspense>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
