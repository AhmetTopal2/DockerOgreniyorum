import React, { useState } from 'react';
import { notify } from '../../utils/notifications';

const SellerForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || formData.name.length < 3 || formData.name.length > 50) {
      notify.validation.minLength('İsim', 3);
      return;
    }

    if (!formData.surname.trim() || formData.surname.length < 2 || formData.surname.length > 50) {
      notify.validation.minLength('Soyisim', 2);
      return;
    }

    if (!formData.email || !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      notify.validation.invalid('E-posta');
      return;
    }

    if (!formData.phone || formData.phone.length < 10 || formData.phone.length > 15) {
      notify.validation.minLength('Telefon', 10);
      return;
    }

    if (formData.bio && formData.bio.length > 1000) {
      notify.validation.maxLength('Biyografi', 1000);
      return;
    }

    if (!formData.address || formData.address.length > 500) {
      notify.validation.required('Adres');
      return;
    }

    try {
      await onSubmit(formData);
      notify.sellerSuccess.create();
      
      setFormData({
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: '',
        bio: '',
        isActive: true
      });
    } catch (error) {
      notify.sellerError.create(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Yeni Satıcı Ekle</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Ad
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Soyad
        </label>
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          minLength={2}
          maxLength={50}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          E-posta
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Telefon
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          minLength={10}
          maxLength={15}
          pattern="[0-9]+"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Adres
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="2"
          required
          maxLength={500}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Biyografi
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="3"
          maxLength={1000}
        />
      </div>

      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-purple-600"
          />
          <span className="ml-2 text-gray-700">Aktif</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Satıcı Ekle
      </button>
    </form>
  );
};

export default SellerForm; 