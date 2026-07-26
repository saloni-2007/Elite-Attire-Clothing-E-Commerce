import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cartCount, setCartCount] = useState(0);

    async function getCartCount() {

        try {

            const response = await api.get("/cart");

            const res = response.data;

            if (res.success) {

                const items = res.data?.items || [];

                let total = 0;

                items.forEach((item) => {
                    total += item.quantity;
                });

                setCartCount(total);

            }

        } catch (error) {

            setCartCount(0);

        }

    }

    useEffect(() => {

        getCartCount();

    }, []);

    return (

        <CartContext.Provider
            value={{
                cartCount,
                getCartCount,
            }}
        >

            {children}

        </CartContext.Provider>

    );

}

export function useCart() {

    return useContext(CartContext);

}