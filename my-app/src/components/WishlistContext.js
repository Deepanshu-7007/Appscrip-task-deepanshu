import React, { createContext, useState, useContext } from "react";

// Create WishlistContext
const WishlistContext = createContext();

// Custom hook to use WishlistContext
export const useWishlist = () => {
  return useContext(WishlistContext);
};

// WishlistProvider to wrap the app and provide the context
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => [...prevItems, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
