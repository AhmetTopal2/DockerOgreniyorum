import React, { useState, useEffect } from 'react';
import { categoryApi, sellerApi } from '../../services/api';
import { notify } from '../../utils/notifications';
import { motion } from 'framer-motion';

const ProductForm = ({ onSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    color: '',
    brand: '',
    model: '',
    inventory: '',
    discountPrice: 0,
    discountPercentage: 0,
    hasDiscount: false,
    productionDate: '',
    category: null,
    seller: null
  });

  useEffect(() => {
    fetchCategories();
    fetchSellers();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      setCategories(response);
    } catch (error) {
      notify.categoryError.load(error.message);
    }
  };

  const fetchSellers = async () => {
    try {
      const response = await sellerApi.getAllSellers();
      setSellers(response);
    } catch (error) {
      notify.sellerError.load(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'discountPercentage' && type === 'number') {
      const percentage = parseFloat(value);
      const originalPrice = parseFloat(formData.price);
      const calculatedDiscountPrice = originalPrice - (originalPrice * percentage / 100);
      
      setFormData(prev => ({
        ...prev,
        discountPercentage: percentage,
        discountPrice: Math.round(calculatedDiscountPrice * 100) / 100
      }));
    } else if (name === 'hasDiscount' && type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        hasDiscount: checked,
        discountPercentage: checked ? prev.discountPercentage : 0,
        discountPrice: checked ? prev.discountPrice : 0
      }));
    } else if (name === 'price') {
      const newPrice = parseFloat(value);
      setFormData(prev => {
        const newDiscountPrice = prev.hasDiscount ? 
          newPrice - (newPrice * prev.discountPercentage / 100) : 0;
        return {
          ...prev,
          price: newPrice,
          discountPrice: Math.round(newDiscountPrice * 100) / 100
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || formData.name.length < 3 || formData.name.length > 50) {
      notify.validation.minLength('Ürün adı', 3);
      return;
    }

    if (formData.description && formData.description.length > 500) {
      notify.validation.maxLength('Açıklama', 500);
      return;
    }

    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      notify.validation.invalid('Fiyat');
      return;
    }

    if (formData.imageUrl && formData.imageUrl.length > 500) {
      notify.validation.maxLength('Resim URL', 500);
      return;
    }

    if (!formData.color) {
      notify.validation.required('Renk');
      return;
    }

    if (!formData.brand) {
      notify.validation.required('Marka');
      return;
    }

    if (!formData.model) {
      notify.validation.required('Model');
      return;
    }

    if (!formData.inventory || isNaN(formData.inventory) || Number(formData.inventory) < 0) {
      notify.validation.invalid('Stok');
      return;
    }

    if (!formData.productionDate) {
      notify.validation.required('Üretim tarihi');
      return;
    }

    if (!formData.category) {
      notify.validation.required('Kategori');
      return;
    }

    if (!formData.seller) {
      notify.validation.required('Satıcı');
      return;
    }

    try {
      onSubmit(formData);
      notify.productSuccess.create();
    } catch (error) {
      notify.productError.create(error.message);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Yeni Ürün Ekle</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Ürün Adı</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Fiyat</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Marka</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Renk</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Stok Miktarı</label>
          <input
            type="number"
            name="inventory"
            value={formData.inventory}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Kategori</label>
          <select
            name="category"
            value={formData.category ? formData.category.id : ''}
            onChange={(e) => {
              const category = categories.find(c => c.id === Number(e.target.value));
              setFormData(prev => ({ ...prev, category }));
            }}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Kategori Seçin</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Satıcı</label>
          <select
            name="seller"
            value={formData.seller ? formData.seller.id : ''}
            onChange={(e) => {
              const seller = sellers.find(s => s.id === Number(e.target.value));
              setFormData(prev => ({ ...prev, seller }));
            }}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Satıcı Seçin</option>
            {sellers.map(seller => (
              <option key={seller.id} value={seller.id}>
                {seller.name} {seller.surname}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Üretim Tarihi</label>
          <input
            type="date"
            name="productionDate"
            value={formData.productionDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 font-bold mb-2">Açıklama</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows="3"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 font-bold mb-2">Fotoğraf URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="col-span-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasDiscount"
              checked={formData.hasDiscount}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700 font-bold">İndirim Var</span>
          </label>
        </div>

        {formData.hasDiscount && (
          <>
            <div>
              <label className="block text-gray-700 font-bold mb-2">İndirim Yüzdesi (%)</label>
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                min="0"
                max="100"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Hesaplanan İndirimli Fiyat</label>
              <input
                type="number"
                value={formData.discountPrice}
                className="w-full px-3 py-2 border rounded bg-gray-100"
                disabled
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ürün Ekle
        </button>
      </div>
    </motion.form>
  );
};

export default ProductForm; 