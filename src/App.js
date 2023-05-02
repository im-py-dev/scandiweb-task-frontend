import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from './ProductsPage';
import AddProduct from './AddProductPage';
import Footer from "./components/footer";
import Header from "./components/header";

function App() {
  return (
 <BrowserRouter>
 <Header/>
  <Routes>
    <Route index element={<ProductsPage />} />
    <Route path="/add-product" element={<AddProduct />} />
  </Routes>
  <Footer/>
</BrowserRouter>
  );
}

export default App;
