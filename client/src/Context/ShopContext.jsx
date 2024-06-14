import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/Assets/all_product";
import axios from "axios";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/product');
            setProducts(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const itemQuantity = prev[itemId] ? prev[itemId] : 0;
            return { ...prev, [itemId]: itemQuantity + 1 };
        });
        console.log(cartItems);
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const product = all_product.find(product => product._id === parseInt(itemId));
            if (product && product.priceAfterDiscount) {
                total += product.priceAfterDiscount * cartItems[itemId];
            } else if (product && product.price) {
                total += product.price * cartItems[itemId];
            }
        }
        for (const itemId in cartItems) {
            const product = products.find(product => product._id === itemId);
            if (product && product.priceAfterDiscount) {
                total += product.priceAfterDiscount * cartItems[itemId];
            } else if (product && product.price) {
                total += product.price * cartItems[itemId];
            }
        }
        return total;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;