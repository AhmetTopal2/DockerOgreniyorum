import React, { useState, useEffect } from 'react';
import { sellerApi } from '../services/api';
import { notify } from '../utils/notifications';
import { motion, AnimatePresence } from 'framer-motion';

const SellerManagement = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSeller, setEditingSeller] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    isActive: true
  });

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await sellerApi.getAllSellers();
      setSellers(response);
      setLoading(false);
    } catch (error) {
      notify.sellerError.load(error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEdit = (seller) => {
    setEditingSeller(seller);
    setEditForm({
      name: seller.name,
      surname: seller.surname,
      email: seller.email,
      phone: seller.phone,
      address: seller.address,
      bio: seller.bio || '',
      isActive: seller.isActive
    });
  };

  const handleCancelEdit = () => {
    setEditingSeller(null);
    setEditForm({
      name: '',
      surname: '',
      email: '',
      phone: '',
      address: '',
      bio: '',
      isActive: true
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      await sellerApi.updateSeller(editingSeller.id, editForm);
      notify.sellerSuccess.update();
      setEditingSeller(null);
      fetchSellers();
    } catch (error) {
      notify.sellerError.update(error.message);
    }
  };

  const handleStatusChange = async (seller, newStatus) => {
    try {
      const updatedSeller = {
        ...seller,
        isActive: newStatus
      };
      
      await sellerApi.updateSeller(seller.id, updatedSeller);
      await fetchSellers();
      notify.success(`Satıcı durumu başarıyla ${newStatus ? 'aktif' : 'pasif'} olarak güncellendi`);
    } catch (error) {
      notify.sellerError.update(error.message);
    }
  };

  const handleDelete = async (seller) => {
    if (window.confirm('Bu satıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      try {
        await sellerApi.deleteSeller(seller.id);
        notify.sellerSuccess.delete();
        fetchSellers();
      } catch (error) {
        notify.sellerError.delete(error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
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
      <h1 className="text-3xl font-bold text-center mb-8">Satıcı Yönetimi</h1>
      
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {sellers.map(seller => (
            <motion.div 
              key={seller.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-lg shadow-md ${
                seller.isActive ? 'bg-white' : 'bg-gray-100'
              }`}
            >
              {editingSeller?.id === seller.id ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ad</label>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Soyad</label>
                      <input
                        type="text"
                        name="surname"
                        value={editForm.surname}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">E-posta</label>
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Telefon</label>
                      <input
                        type="tel"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Adres</label>
                      <textarea
                        name="address"
                        value={editForm.address}
                        onChange={handleChange}
                        rows="2"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Biyografi</label>
                      <textarea
                        name="bio"
                        value={editForm.bio}
                        onChange={handleChange}
                        rows="3"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                      Güncelle
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold">{seller.name} {seller.surname}</h2>
                      <p className="text-gray-600">{seller.email}</p>
                      <p className="text-gray-600">{seller.phone}</p>
                      <p className="text-gray-600 mt-2">{seller.address}</p>
                      {seller.bio && <p className="text-gray-600 mt-2">{seller.bio}</p>}
                      <span className={`inline-block mt-2 px-2 py-1 rounded text-sm font-semibold ${
                        seller.isActive 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {seller.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 md:flex-nowrap">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleEdit(seller)}
                        className="flex-1 md:flex-none px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 min-w-[100px] text-center"
                      >
                        Düzenle
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleStatusChange(seller, !seller.isActive)}
                        className={`flex-1 md:flex-none px-4 py-2 rounded font-semibold min-w-[100px] text-center ${
                          seller.isActive
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {seller.isActive ? 'Pasife Al' : 'Aktif Et'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDelete(seller)}
                        className="flex-1 md:flex-none px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 min-w-[100px] text-center"
                      >
                        Sil
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SellerManagement; 