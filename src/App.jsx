import { Routes, Route } from "react-router-dom"
import Home from "./pages/HomePage"
import ProductDetail from "./pages/ProductDetailPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:barcode" element={<ProductDetail />} />
      <Route path="/product" element={<ProductDetail />} />
    </Routes>
  )
}
