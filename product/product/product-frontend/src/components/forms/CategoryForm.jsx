import React, { useState } from 'react';
import { notify } from '../../utils/notifications';
import { motion } from 'framer-motion';

const CategoryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || formData.name.length < 3 || formData.name.length > 50) {
      notify.validation.minLength('Kategori adı', 3);
      return;
    }

    if (formData.description && formData.description.length > 500) {
      notify.validation.maxLength('Açıklama', 500);
      return;
    }

    try {
      onSubmit(formData);
    } catch (error) {
      notify.categoryError.create(error.message);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Yeni Kategori Ekle</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Kategori Adı
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Açıklama
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="3"
          required
        />
      </div>

      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Aktif</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Kategori Ekle
      </button>
    </motion.form>
  );
};

export default CategoryForm; 