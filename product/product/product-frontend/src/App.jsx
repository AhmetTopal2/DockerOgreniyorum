import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useLocation } from 'react-router-dom';
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
import SellerManagement from './pages/SellerManagement';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative px-3 py-2 rounded-lg transition-all duration-300 group ${isActive
          ? 'text-blue-600 bg-blue-50'
          : 'text-gray-600 hover:text-blue-600'
        }`}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
        initial={false}
        animate={{
          scaleX: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0
        }}
        whileHover={{
          scaleX: 1,
          opacity: 1
        }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <motion.div
        className="min-h-screen bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link
                to="/"
                className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Ürün Yönetimi
              </Link>

              {/* Hamburger Menu Button */}
              <motion.button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
                onClick={toggleMenu}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={isMenuOpen ? "open" : "closed"}
                  className="w-6 h-6 flex flex-col justify-around"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 8 }
                    }}
                    className="w-full h-0.5 bg-blue-600 block transform origin-center transition-all duration-300"
                  ></motion.span>
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    }}
                    className="w-full h-0.5 bg-blue-600 block transition-all duration-300"
                  ></motion.span>
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -8 }
                    }}
                    className="w-full h-0.5 bg-blue-600 block transform origin-center transition-all duration-300"
                  ></motion.span>
                </motion.div>
              </motion.button>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-1">
                <NavLink to="/">Ana Sayfa</NavLink>
                <div className="relative group">
                  <NavLink to="/add-product">
                    Ürün Ekle
                  </NavLink>
                </div>
                <div className="h-6 w-px bg-gray-200 mx-2"></div>
                <div className="flex items-center space-x-1">
                  <NavLink to="/add-category">Kategori Ekle</NavLink>
                  <NavLink to="/categories">Kategori Yönetimi</NavLink>
                </div>
                <div className="h-6 w-px bg-gray-200 mx-2"></div>
                <div className="flex items-center space-x-1">
                  <NavLink to="/add-seller">Satıcı Ekle</NavLink>
                  <NavLink to="/sellers">Satıcı Yönetimi</NavLink>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden py-4 bg-white rounded-lg shadow-lg mt-2"
                >
                  <div className="flex flex-col space-y-1 px-2">
                    <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                      Ana Sayfa
                    </NavLink>
                    <div className="h-px bg-gray-100 my-2"></div>
                    <NavLink to="/add-product" onClick={() => setIsMenuOpen(false)}>
                      Ürün Ekle
                    </NavLink>
                    <div className="h-px bg-gray-100 my-2"></div>
                    <NavLink to="/add-category" onClick={() => setIsMenuOpen(false)}>
                      Kategori Ekle
                    </NavLink>
                    <NavLink to="/categories" onClick={() => setIsMenuOpen(false)}>
                      Kategori Yönetimi
                    </NavLink>
                    <div className="h-px bg-gray-100 my-2"></div>
                    <NavLink to="/add-seller" onClick={() => setIsMenuOpen(false)}>
                      Satıcı Ekle
                    </NavLink>
                    <NavLink to="/sellers" onClick={() => setIsMenuOpen(false)}>
                      Satıcı Yönetimi
                    </NavLink>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
            <Route path="/sellers" component={SellerManagement} />
          </Switch>
        </main>
      </motion.div>
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
