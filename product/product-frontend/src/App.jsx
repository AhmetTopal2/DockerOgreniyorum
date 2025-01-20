import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductForm from './components/forms/ProductForm';
import CategoryForm from './components/forms/CategoryForm';
import SellerForm from './components/forms/SellerForm';
import { productApi, categoryApi, sellerApi } from './services/api';
import ProductDetail from './pages/ProductDetail';
import CategoryManagement from './pages/CategoryManagement';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from './utils/notifications';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link to="/" className="text-xl font-bold text-blue-600">
                Ürün Yönetimi
              </Link>
              <div className="space-x-4">
                <Link to="/" className="text-gray-700 hover:text-blue-600">
                  Ana Sayfa
                </Link>
                <Link to="/add-product" className="text-gray-700 hover:text-blue-600">
                  Ürün Ekle
                </Link>
                <Link to="/add-category" className="text-gray-700 hover:text-blue-600">
                  Kategori Ekle
                </Link>
                <Link to="/categories" className="text-gray-700 hover:text-blue-600">
                  Kategori Yönetimi
                </Link>
                <Link to="/add-seller" className="text-gray-700 hover:text-blue-600">
                  Satıcı Ekle
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route 
              path="/add-product" 
              render={() => (
                <ProductForm 
                  onSubmit={async (data) => {
                    try {
                      await productApi.createProduct(data);
                      notify.productSuccess.create();
                      window.location.href = '/';
                    } catch (error) {
                      console.error('Ürün eklenirken hata oluştu:', error);
                      notify.productError.create(error.message);
                    }
                  }}
                />
              )} 
            />
            <Route 
              path="/add-category" 
              render={() => (
                <CategoryForm 
                  onSubmit={async (data) => {
                    try {
                      await categoryApi.createCategory(data);
                      notify.categorySuccess.create();
                      window.location.href = '/';
                    } catch (error) {
                      console.error('Kategori eklenirken hata oluştu:', error);
                      notify.categoryError.create(error.message);
                    }
                  }}
                />
              )} 
            />
            <Route path="/categories" component={CategoryManagement} />
            <Route 
              path="/add-seller" 
              render={() => (
                <SellerForm 
                  onSubmit={async (data) => {
                    try {
                      await sellerApi.createSeller(data);
                      notify.sellerSuccess.create();
                      window.location.href = '/';
                    } catch (error) {
                      console.error('Satıcı eklenirken hata oluştu:', error);
                      notify.sellerError.create(error.message);
                    }
                  }}
                />
              )} 
            />
          </Switch>
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
