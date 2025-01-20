import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { productApi, categoryApi, sellerApi } from '../services/api';
import { notify } from '../utils/notifications';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: 0,
    brand: '',
    model: '',
    color: '',
    inventory: 0,
    categoryId: '',
    sellerId: '',
    hasDiscount: false,
    discountPrice: 0,
    discountPercentage: 0,
    productionDate: ''
  });

  useEffect(() => {
    fetchProduct();
    fetchCategories();
    fetchSellers();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      setCategories(response);
    } catch (error) {
      console.error('Kategoriler yüklenirken hata oluştu:', error);
    }
  };

  const fetchSellers = async () => {
    try {
      const response = await sellerApi.getAllSellers();
      setSellers(response);
    } catch (error) {
      console.error('Satıcılar yüklenirken hata oluştu:', error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await productApi.getProductById(id);
      setProduct(response);
      setEditForm({
        name: response.name,
        description: response.description,
        price: response.price,
        brand: response.brand,
        model: response.model,
        color: response.color,
        inventory: response.inventory,
        categoryId: response.category?.id,
        sellerId: response.seller?.id,
        hasDiscount: response.hasDiscount || false,
        discountPrice: response.discountPrice || 0,
        discountPercentage: response.discountPercentage || 0,
        productionDate: response.productionDate?.split('T')[0] || ''
      });
      setLoading(false);
    } catch (error) {
      console.error('Ürün yüklenirken hata oluştu:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...editForm,
        id: product.id,
        category: { id: parseInt(editForm.categoryId) },
        seller: { id: parseInt(editForm.sellerId) }
      };
      await productApi.updateProduct(id, updatedProduct);
      setIsEditing(false);
      fetchProduct(); // Ürünü yeniden yükle
      notify.productSuccess.update();
    } catch (error) {
      console.error('Ürün güncellenirken hata oluştu:', error);
      notify.productError.update(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'discountPercentage' && type === 'number') {
      const percentage = parseFloat(value);
      const originalPrice = editForm.price;
      const calculatedDiscountPrice = originalPrice - (originalPrice * percentage / 100);
      
      setEditForm(prev => ({
        ...prev,
        discountPercentage: percentage,
        discountPrice: Math.round(calculatedDiscountPrice * 100) / 100 // 2 decimal places
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : 
                type === 'number' ? parseFloat(value) : value
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      await productApi.updateProduct(id, editForm);
      setIsEditing(false);
      fetchProduct();
      notify.productSuccess.update();
    } catch (error) {
      notify.productError.update(error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        await productApi.deleteProduct(id);
        notify.productSuccess.delete();
        history.push('/');
      } catch (error) {
        notify.productError.delete(error.message);
      }
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

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-xl">Ürün bulunamadı</div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => setIsEditing(false)}
          className="mb-6 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          ← Geri
        </button>

        <form onSubmit={handleEditSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Ürün Düzenle</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Ürün Adı</label>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Marka</label>
              <input
                type="text"
                name="brand"
                value={editForm.brand}
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
                value={editForm.model}
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
                value={editForm.color}
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
                value={editForm.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Stok</label>
              <input
                type="number"
                name="inventory"
                value={editForm.inventory}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Kategori</label>
              <select
                name="categoryId"
                value={editForm.categoryId}
                onChange={handleChange}
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
                name="sellerId"
                value={editForm.sellerId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Satıcı Seçin</option>
                {sellers.map(seller => (
                  <option key={seller.id} value={seller.id}>
                    {seller.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Üretim Tarihi</label>
              <input
                type="date"
                name="productionDate"
                value={editForm.productionDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 font-bold mb-2">Açıklama</label>
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                rows="3"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="hasDiscount"
                  checked={editForm.hasDiscount}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700 font-bold">İndirim Var</span>
              </label>
            </div>

            {editForm.hasDiscount && (
              <>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">İndirim Yüzdesi (%)</label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={editForm.discountPercentage}
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
                    value={editForm.discountPrice}
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Güncelle
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => history.goBack()}
        className="mb-6 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        ← Geri
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-96 w-full object-cover md:w-96"
              src={product.imageUrl || 'https://via.placeholder.com/400'}
              alt={product.name}
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {product.brand} / {product.model}
                </div>
                <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.name}</h1>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Düzenle
              </button>
            </div>
            
            <div className="mt-4 flex items-center">
              {product.hasDiscount ? (
                <div className="space-x-2">
                  <span className="line-through text-gray-500 text-xl">{product.price} TL</span>
                  <span className="text-2xl font-bold text-red-500">{product.discountPrice} TL</span>
                  <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                    %{product.discountPercentage} İndirim
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-blue-600">{product.price} TL</span>
              )}
            </div>

            <p className="mt-4 text-gray-600">{product.description}</p>

            <div className="mt-6 border-t pt-4">
              <h2 className="text-xl font-semibold mb-2">Ürün Detayları</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600"><span className="font-semibold">Renk:</span> {product.color}</p>
                  <p className="text-gray-600"><span className="font-semibold">Stok:</span> {product.inventory} adet</p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Üretim Tarihi:</span>{' '}
                    {new Date(product.productionDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Kategori:</span> {product.category?.name}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Satıcı:</span> {product.seller?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 