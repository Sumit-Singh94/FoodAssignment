import React from "react";
import ProductCard from "../components/ProductCard";

function ProductList({ products, isLoading, onProductClick }) {
  if (isLoading && products.length === 0) {
    return (
      <div className="loader-center">
        Loading products...
      </div>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <div className="empty-state">
        No products to display. Try adjusting your filters or search query.
      </div>
    );
  }

  return (
    <section className="product-list">
      {products.map(product => (
        <ProductCard
          key={product.code}
          product={product}
          onClick={() => onProductClick(product)}
        />
      ))}
    </section>
  );
}

export default ProductList;


