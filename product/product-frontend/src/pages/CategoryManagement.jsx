import React, { useState, useEffect } from 'react';
import { categoryApi } from '../services/api';
import { notify } from '../utils/notifications';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      setCategories(response);
      setLoading(false);
    } catch (error) {
      notify.categoryError.load(error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleStatusChange = async (category, newStatus) => {
    try {
      const updatedCategory = {
        ...category,
        isActive: newStatus
      };
      
      await categoryApi.updateCategory(category.id, updatedCategory);
      await fetchCategories();
      notify.categorySuccess.statusChange(newStatus);
    } catch (error) {
      notify.categoryError.update(error.message);
    }
  };

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
      <h1 className="text-3xl font-bold text-center mb-8">Kategori Yönetimi</h1>
      
      <div className="grid grid-cols-1 gap-4">
        {categories.map(category => (
          <div 
            key={category.id}
            className={`p-4 rounded-lg shadow-md ${
              category.isActive ? 'bg-white' : 'bg-gray-100'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <p className="text-gray-600">{category.description}</p>
                <span className={`inline-block px-2 py-1 rounded text-sm font-semibold ${
                  category.isActive 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {category.isActive ? 'Aktif' : 'Pasif'}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleStatusChange(category, !category.isActive)}
                  className={`px-4 py-2 rounded font-semibold ${
                    category.isActive
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {category.isActive ? 'Pasife Al' : 'Aktif Et'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement; 