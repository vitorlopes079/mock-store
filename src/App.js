import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import CategoryProducts from "./pages/CategoryProducts";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import SubCategories from "./pages/SubCategories";

function App() {
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
          <Route path="/contact" element={<Contact />}/>
          <Route path="/subcategories/:subcategories" element={<SubCategories />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
