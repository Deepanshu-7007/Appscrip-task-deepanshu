import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { useLanguage } from "./LanguageContext";
import './Header.css';

const translations = {
  EN: {
    shop: "SHOP",
    skills: "SKILLS",
    stories: "STORIES",
    about: "ABOUT",
    contactUs: "CONTACT US",
    yourCartIsEmpty: "Your cart is empty.",
    goToCheckout: "Go to Checkout",
    searchPlaceholder: "Search for products...",
  },
  HI: {
    shop: "खरीदारी",
    skills: "कौशल",
    stories: "कहानियां",
    about: "हमारे बारे में",
    contactUs: "संपर्क करें",
    yourCartIsEmpty: "आपकी गाड़ी खाली है।",
    goToCheckout: "चेकआउट पर जाएं",
    searchPlaceholder: "उत्पाद खोजें...",
  },
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const { cartItems } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { language, setLanguage } = useLanguage(); // Use global language state

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        const results = products.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(results);
      } else {
        setFilteredProducts(products);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, products]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleCart = () => setCartOpen(!cartOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const toggleWishlist = (product) => {
    if (wishlistItems.some(item => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const t = translations[language]; // Translation helper based on selected language

  return (
    <header className="header">
      <div className="mobile-menu-icon" onClick={toggleMenu}>
        <i className={`fa ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>
      <div className="logo">LOGO</div>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          <li><a href="#">{t.shop}</a></li>
          <li><a href="#">{t.skills}</a></li>
          <li><a href="#">{t.stories}</a></li>
          <li><a href="#">{t.about}</a></li>
          <li><a href="#">{t.contactUs}</a></li>
        </ul>
      </nav>

      <div className="icons">
        <a href="#" className="icon search" onClick={toggleSearch}>
          <i className="fa fa-search"></i>
        </a>
        <a href="#" className="icon wishlist">
          <i className="fa fa-heart"></i>
          {wishlistItems.length > 0 && <span className="wishlist-badge">{wishlistItems.length}</span>}
        </a>
        <div className="icon cart" onClick={toggleCart}>
          <i className="fa fa-shopping-cart"></i>
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
        </div>

        {/* Language Selector */}
        <select
          className="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)} // Update global language state
        >
          <option value="EN">English</option>
          <option value="HI">हिन्दी</option>
        </select>

        <a href="#" className="icon user">
          <i className="fa fa-user"></i>
        </a>
      </div>

      {cartOpen && (
        <div className="cart-dropdown">
          {cartItems.length === 0 ? (
            <p>{t.yourCartIsEmpty}</p>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>{item.title} - ${item.price}</li>
              ))}
            </ul>
          )}
          <button className="checkout-button">{t.goToCheckout}</button>
        </div>
      )}

      {searchOpen && (
        <div className="search-modal">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={toggleSearch}>Close</button>
          <ul>
            {filteredProducts.length === 0 ? (
              <li>No products found</li>
            ) : (
              filteredProducts.map((product) => (
                <li key={product.id}>
                  <a href={`/product/${product.id}`}>{product.title}</a>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
