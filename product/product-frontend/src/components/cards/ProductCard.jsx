import React from 'react';
import { useHistory } from 'react-router-dom';

const DEFAULT_IMAGE_URL = import.meta.env.VITE_DEFAULT_IMAGE_URL;
const CURRENCY = import.meta.env.VITE_CURRENCY;

const ProductCard = ({ product }) => {
  const history = useHistory();

  if (!product) {
    return null; // veya bir loading/error komponenti
  }

  const handleClick = () => {
    history.push(`/product/${product.id}`);
  };

  return (
    <div 
      className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer relative"
      onClick={handleClick}
    >
      {/* İndirim Rozeti */}
      {product.hasDiscount && (
        <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg font-bold">
          %{product.discountPercentage} İndirim
        </div>
      )}
      
      <img 
        className="w-full h-48 object-cover" 
        src={product.imageUrl || DEFAULT_IMAGE_URL} 
        alt={product.name} 
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base mb-2">{product.description}</p>
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col">
            {product.hasDiscount ? (
              <>
                <span className="line-through text-red-500 text-sm">
                  {product.price} {CURRENCY}
                </span>
                <span className="text-xl font-bold text-green-600">
                  {product.discountPrice} {CURRENCY}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-blue-600">
                {product.price} {CURRENCY}
              </span>
            )}
          </div>
          {product.hasDiscount && (
            <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
              %{product.discountPercentage} İndirim
            </span>
          )}
        </div>
        <div className="text-sm text-gray-600">
          <p>Marka: {product.brand}</p>
          <p>Model: {product.model}</p>
          <p>Renk: {product.color}</p>
          <p>Stok: {product.inventory} adet</p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        {product.category && (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {product.category.name}
          </span>
        )}
        {product.seller && (
          <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700">
            {product.seller.name}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 