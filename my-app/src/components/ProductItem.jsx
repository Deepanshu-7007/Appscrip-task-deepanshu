import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p>${product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductItem;