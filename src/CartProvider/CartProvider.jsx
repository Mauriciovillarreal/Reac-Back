import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!user || !user.cart) return;

            try {
                const response = await fetch(`http://localhost:8080/api/carts/${user.cart}`);
                if (!response.ok) {
                    throw new Error('Error fetching cart items');
                }
                const cart = await response.json();
                setCartItems(cart.products);
            } catch (error) {
                setError(error.message);
                console.error('Error:', error);
            }
        };

        fetchCartItems();
    }, [user]);

    const addToCart = async (productId) => {
        if (!user || !user.cart) {
            console.error('No cart ID found for the user.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/carts/${user.cart}/product/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error adding product to cart');
            }
            const updatedCart = await response.json();
            setCartItems(updatedCart.products);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, error, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
