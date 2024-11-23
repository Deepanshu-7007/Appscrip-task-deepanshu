import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage';
import { CartProvider } from './components/CartContext'; // Import CartProvider
import { WishlistProvider } from './components/WishlistContext'; // Import WishlistProvider
import { LanguageProvider } from './components/LanguageContext'; // Import LanguageProvider

function App() {
  return (
    <CartProvider> {/* Wrap the app in CartProvider */}
      <WishlistProvider> {/* Wrap the app in WishlistProvider */}
        <LanguageProvider> {/* Wrap the app in LanguageProvider */}
          <div>
            <Header />
            <HeroSection />
            <ProductsPage />
            <Footer />
          </div>
        </LanguageProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
