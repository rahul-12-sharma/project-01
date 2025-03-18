import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

function Context({ children }) {
    const [products, setProducts] = useState(
        JSON.parse(localStorage.getItem('products')) || []
    );

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    return (
        <ProductContext.Provider value={[products, setProducts]}>
            {children}
        </ProductContext.Provider>
    );
}

export default Context;
