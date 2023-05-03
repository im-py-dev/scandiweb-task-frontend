import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from './pages/ProductsPage';
import AddProduct from './pages/AddProductPage';
import Footer from "./components/footer";
import Header from "./components/header";
import "./styles/App.css";

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
