import React from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

const DEFAULT_IMAGE_URL = import.meta.env.VITE_DEFAULT_IMAGE_URL;
const CURRENCY = import.meta.env.VITE_CURRENCY;

const ProductCard = ({ product }) => {
  const history = useHistory();

  if (!product) {
    return null;
  }

  const handleClick = () => {
    history.push(`/product/${product.id}`);
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
    >
      {/* İndirim Rozeti */}
      {product.hasDiscount && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg z-10">
          %{product.discountPercentage}
        </div>
      )}
      
      {/* Ürün Resmi */}
      <div className="relative group">
        <img 
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" 
          src={product.imageUrl || DEFAULT_IMAGE_URL} 
          alt={product.name}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>

      {/* Kategori ve Satıcı Etiketleri */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {product.category && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-700 shadow-md backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
            {product.category.name}
          </span>
        )}
        {product.seller && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-700 shadow-md backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
            {product.seller.name}
          </span>
        )}
      </div>

      {/* Ürün Bilgileri */}
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-800 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        {/* Fiyat Bilgisi */}
        <div className="flex justify-between items-end mb-4">
          <div className="flex flex-col">
            {product.hasDiscount ? (
              <>
                <span className="line-through text-gray-400 text-sm">
                  {product.price.toLocaleString('tr-TR')} {CURRENCY}
                </span>
                <span className="text-2xl font-bold text-green-600">
                  {product.discountPrice.toLocaleString('tr-TR')} {CURRENCY}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-blue-600">
                {product.price.toLocaleString('tr-TR')} {CURRENCY}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Stok:</span>
            <span className={`px-2 py-1 rounded-full text-sm font-medium ${
              product.inventory > 10 
                ? 'bg-green-100 text-green-800' 
                : product.inventory > 0 
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
            }`}>
              {product.inventory} adet
            </span>
          </div>
        </div>

        {/* Ürün Detayları */}
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            <span className="font-medium">Marka:</span> {product.brand}
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            <span className="font-medium">Model:</span> {product.model}
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            <span className="font-medium">Renk:</span> {product.color}
          </div>
        </div>
      </div>

      {/* Hover Efekti için Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default ProductCard; 