import React from "react";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="w-[220px] h-[400px] flex flex-col gap-2 p-4 border rounded-lg">
      <img className="hover:scale-110 " src={product.imageUrl} alt="" />
      <div className="description">
        <p className="text-lg font-semibold">{product.name}</p>
        <p className="price">{product.price}</p>
        <p className="para">{product.description}</p>
        <button className="btn">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
