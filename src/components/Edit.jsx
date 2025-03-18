import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../utils/Context';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
    const [products, setProducts] = useContext(ProductContext);
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [product, setProduct] = useState({
        title: '',
        description: '',
        image: '',
        price: '',
        category: ''
    });

    const changeHandler = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // Set product on load or change of ID
    useEffect(() => {
        const foundProduct = products.find((p) => p.id == id);
        if (foundProduct) {
            setProduct(foundProduct);
        }
    }, [id, products]);

    const addProductHandler = (e) => {
        e.preventDefault();

        // Validate input fields
        if (
            product.title.trim().length < 5 ||
            product.image.trim().length < 5 ||
            product.category.trim().length < 5 ||
            product.price.trim().length < 1 ||
            product.description.trim().length < 5
        ) {
            alert('Each input must have at least 5 characters.');
            return;
        }

        // Find product index and update it
        const productIndex = products.findIndex((p) => p.id === id);
        if (productIndex !== -1) {
            const updatedProducts = [...products];
            updatedProducts[productIndex] = { ...updatedProducts[productIndex], ...product };

            setProducts(updatedProducts);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            navigate(-1); // Go back to the previous page
        }
    };

    return (
        <form onSubmit={addProductHandler} className="flex flex-col items-center p-[5%] w-screen h-screen">
            <h1 className="mb-5 text-3xl w-1/2">Edit Product</h1>

            <input
                type="url"
                placeholder="Image Link"
                className="text-xl bg-zinc-200 rounded p-2 w-1/2 mb-3"
                name="image"
                onChange={changeHandler}
                value={product.image}
            />

            <input
                type="text"
                placeholder="Title"
                className="text-xl bg-zinc-200 rounded p-2 w-1/2 mb-3"
                name="title"
                onChange={changeHandler}
                value={product.title}
            />

            <div className="w-1/2 flex justify-between">
                <input
                    type="text"
                    placeholder="Category"
                    className="text-xl bg-zinc-200 rounded p-2 w-[48%] mb-3"
                    name="category"
                    onChange={changeHandler}
                    value={product.category}
                />

                <input
                    type="number"
                    placeholder="Price"
                    className="text-xl bg-zinc-200 rounded p-2 w-[48%] mb-3"
                    name="price"
                    onChange={changeHandler}
                    value={product.price}
                />
            </div>

            <textarea
                rows="7"
                name="description"
                onChange={changeHandler}
                placeholder="Enter product description here"
                value={product.description}
                className="text-xl bg-zinc-200 rounded p-2 w-[48%] mb-3"
            ></textarea>

            <div className="w-1/2">
                <button className="py-2 px-5 border rounded border-blue-200 text-blue-400">
                    Edit Product
                </button>
            </div>
        </form>
    );
}

export default Edit;
