import React, { useState, useEffect } from 'react';
import ProductCard from '../components/cards/ProductCard';
import { productApi, categoryApi } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      const activeCategories = response.filter(category => category.isActive);
      setCategories(activeCategories);
    } catch (error) {
      console.error('Kategoriler yüklenirken hata oluştu:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await productApi.getAllProducts();
      const productsWithActiveCategories = response.filter(product => 
        product.category?.isActive
      );
      setProducts(productsWithActiveCategories);
      setLoading(false);
    } catch (error) {
      console.error('Ürünler yüklenirken hata oluştu:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category?.id === selectedCategory)
    : products;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Kategoriler</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors duration-200`}
          >
            Tümü
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors duration-200`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">
        {selectedCategory 
          ? `${categories.find(c => c.id === selectedCategory)?.name} Ürünleri`
          : 'Tüm Ürünler'}
      </h1>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          {selectedCategory 
            ? 'Bu kategoride ürün bulunmamaktadır.'
            : 'Henüz ürün bulunmamaktadır.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home; 