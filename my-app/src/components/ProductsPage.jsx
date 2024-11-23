import React, { useState, useEffect, useMemo } from "react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { useLanguage } from "./LanguageContext";  // Importing useLanguage
import Footer from "./Footer";  // Footer component
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Importing icons for cart and wishlist
import "./ProductsPage.css";

// Translation object
const translations = {
  EN: {
    filters: "Filters",
    hideFilters: "Hide Filters",
    showFilters: "Show Filters",
    itemsAvailable: "items available",
    sortBy: "Sort By",
    recommended: "Recommended",
    popular: "Popular",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    newestFirst: "Newest First",
    noProductsFound: "No products found with the selected filters.",
    addToCart: "Add to Cart",
    addToWishlist: "Add to Wishlist",
    removeFromWishlist: "Remove from Wishlist",
  },
  HI: {
    filters: "फ़िल्टर",
    hideFilters: "फ़िल्टर छुपाएं",
    showFilters: "फ़िल्टर दिखाएं",
    itemsAvailable: "उत्पाद उपलब्ध हैं",
    sortBy: "क्रमबद्ध करें",
    recommended: "सिफ़ारिश की गई",
    popular: "लोकप्रिय",
    priceLowToHigh: "कीमत: कम से अधिक",
    priceHighToLow: "कीमत: अधिक से कम",
    newestFirst: "नवीनतम पहले",
    noProductsFound: "चयनित फ़िल्टर के साथ कोई उत्पाद नहीं मिला।",
    addToCart: "कार्ट में जोड़ें",
    addToWishlist: "विशलिस्ट में जोड़ें",
    removeFromWishlist: "विशलिस्ट से हटाएं",
  }
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    idealFor: ["Men", "Women", "Baby & Kids"],
    occasion: ["Casual", "Formal", "Party", "Sportswear"],
    work: ["Office", "Casual", "Business", "Formal"],
    fabric: ["Cotton", "Silk", "Wool", "Polyester"],
    segment: ["Luxury", "Budget", "Mid-range"],
    suitableFor: ["Adults", "Kids"],
    rawMaterial: ["Organic", "Synthetic"],
    pattern: ["Solid", "Striped", "Checked", "Printed"],
  });
  const [selectedFilters, setSelectedFilters] = useState({
    idealFor: [],
    occasion: [],
    work: [],
    fabric: [],
    segment: [],
    suitableFor: [],
    rawMaterial: [],
    pattern: [],
  });
  const [isRecommended, setIsRecommended] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState(null);
  const [quantities, setQuantities] = useState({}); // Store quantities for each product

  const { addToCart, cartItems } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { language } = useLanguage(); // Get language from context

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Updated filter application logic
  const applyFilters = useMemo(() => {
    return products.filter((product) => {
      return Object.keys(selectedFilters).every((filterType) => {
        const filterValues = selectedFilters[filterType];
        if (filterValues.length === 0) {
          return true;
        }
        const productValue = product[filterType]?.toString().toLowerCase();
        if (!productValue) {
          return false;
        }
        return filterValues.some((filterValue) => 
          productValue.includes(filterValue.toLowerCase())
        );
      });
    });
  }, [products, selectedFilters]);

  useEffect(() => {
    setFilteredProducts(applyFilters);
  }, [applyFilters]);

  const handleFilterChange = (filterType, value) => {
    const updatedSelectedFilters = { ...selectedFilters };
    const filterValues = updatedSelectedFilters[filterType];
    if (filterValues.includes(value)) {
      updatedSelectedFilters[filterType] = filterValues.filter((item) => item !== value);
    } else {
      updatedSelectedFilters[filterType] = [...filterValues, value];
    }
    setSelectedFilters(updatedSelectedFilters);
  };

  const handleRecommendedClick = () => {
    setIsRecommended(!isRecommended);
    const recommended = isRecommended
      ? products
      : products.filter((product) => product.rating?.rate >= 4);
    setFilteredProducts(recommended);
  };

  const sortProducts = (option) => {
    let sortedProducts = [...filteredProducts];
    switch (option) {
      case "priceLowToHigh":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "newestFirst":
        sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "popular":
        sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setPopupProduct(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleAddToWishlist = (product) => {
    if (wishlistItems.some((item) => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuantityChange = (product, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [product.id]: Math.max((prev[product.id] || 1) + delta, 1),
    }));
  };

  const t = translations[language]; // Access the translations based on the selected language

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="products-page">
      <div className="filters-section">
        <button className="toggle-filters" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? t.hideFilters : t.showFilters}
        </button>
        <div className={`filters ${showFilters ? "" : "hidden"}`}>
          <h3>{t.filters}</h3>
          {Object.keys(filters).map((filterType) => (
            <div key={filterType} className="filter-item">
              <div className="filter-header">{filterType}</div>
              <div className="filter-options">
                {filters[filterType].map((value, idx) => (
                  <label key={idx}>
                    <input
                      type="checkbox"
                      checked={selectedFilters[filterType].includes(value)}
                      onChange={() => handleFilterChange(filterType, value)}
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="products-content">
        <div className="products-header">
          <span>{filteredProducts.length} {t.itemsAvailable}</span>
          <div className="sort-dropdown">
            <button className="sort-button">
              {t.sortBy}
              <ul className="sort-options">
                <li onClick={() => sortProducts("popular")}>{t.popular}</li>
                <li onClick={() => sortProducts("priceLowToHigh")}>{t.priceLowToHigh}</li>
                <li onClick={() => sortProducts("priceHighToLow")}>{t.priceHighToLow}</li>
                <li onClick={() => sortProducts("newestFirst")}>{t.newestFirst}</li>
              </ul>
            </button>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-list">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.title} className="product-image" />
                <div className="product-name">{product.title}</div>
                <div className="product-price">${product.price.toFixed(2)}</div>
                <div className="product-rating">
                  {product.rating && `Rating: ${product.rating.rate} / 5`}
                </div>

                {/* Quantity control */}
                <div className="product-quantity">
                  <button onClick={() => handleQuantityChange(product, -1)}>-</button>
                  <span>{quantities[product.id] || 1}</span>
                  <button onClick={() => handleQuantityChange(product, 1)}>+</button>
                </div>

                {/* Add to Cart Button */}
                <button
                  className={`add-to-cart-button ${cartItems.some(item => item.id === product.id) ? 'in-cart' : ''}`}
                  onClick={() => handleAddToCart(product)}
                  disabled={cartItems.some(item => item.id === product.id)}
                >
                  <FaShoppingCart className="cart-icon" />
                  {cartItems.some(item => item.id === product.id) ? "Added to Cart" : t.addToCart}
                </button>

                {/* Add to Wishlist Button */}
                <button
                  className={`wishlist-button ${wishlistItems.some(item => item.id === product.id) ? 'added' : ''}`}
                  onClick={() => handleAddToWishlist(product)}
                >
                  <FaHeart className="wishlist-icon" />
                  {wishlistItems.some(item => item.id === product.id) ? t.removeFromWishlist : t.addToWishlist}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products">{t.noProductsFound}</div>
        )}
      </div>

      {/* Popup message */}
      {showPopup && popupProduct && (
        <div className="popup-message">
          <span>Added {popupProduct.title} to cart</span>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductsPage;
