const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Bir hata oluştu');
  }
  const data = await response.json();
  return data.data;
};

const productApi = {
  getAllProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return handleResponse(response);
  },

  getProductById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse(response);
  },

  createProduct: async (product) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return handleResponse(response);
  },

  updateProduct: async (id, product) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return handleResponse(response);
  },

  deleteProduct: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Ürün silinirken hata oluştu');
    }
  },

  searchByCategory: async (categoryName) => {
    const response = await fetch(`${API_BASE_URL}/products/search/category?categoryName=${encodeURIComponent(categoryName)}`);
    return handleResponse(response);
  },

  searchBySeller: async (sellerName) => {
    const response = await fetch(`${API_BASE_URL}/products/search/seller?sellerName=${encodeURIComponent(sellerName)}`);
    return handleResponse(response);
  },

  search: async (categoryName, sellerName) => {
    const params = new URLSearchParams();
    if (categoryName) params.append('categoryName', categoryName);
    if (sellerName) params.append('sellerName', sellerName);
    
    const response = await fetch(`${API_BASE_URL}/products/search?${params}`);
    return handleResponse(response);
  },
};

const categoryApi = {
  getAllCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return handleResponse(response);
  },

  getCategoryById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    if (!response.ok) {
      throw new Error('Kategori bulunamadı');
    }
    const data = await response.json();
    return data.data;
  },

  createCategory: async (category) => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    return handleResponse(response);
  },

  updateCategory: async (id, category) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    return handleResponse(response);
  },

  deleteCategory: async (id) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Kategori silinirken hata oluştu');
    }
  },
};

const sellerApi = {
  getAllSellers: async () => {
    const response = await fetch(`${API_BASE_URL}/sellers`);
    return handleResponse(response);
  },

  getSellerById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/sellers/${id}`);
    if (!response.ok) {
      throw new Error('Satıcı bulunamadı');
    }
    const data = await response.json();
    return data.data;
  },

  createSeller: async (seller) => {
    const response = await fetch(`${API_BASE_URL}/sellers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seller),
    });
    return handleResponse(response);
  },

  updateSeller: async (id, seller) => {
    const response = await fetch(`${API_BASE_URL}/sellers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seller),
    });
    if (!response.ok) {
      throw new Error('Satıcı güncellenirken hata oluştu');
    }
    const data = await response.json();
    return data.data;
  },

  deleteSeller: async (id) => {
    const response = await fetch(`${API_BASE_URL}/sellers/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Satıcı silinirken hata oluştu');
    }
  },
};

export { productApi, categoryApi, sellerApi }; 