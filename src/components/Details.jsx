import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import { ProductContext } from '../utils/Context';

function Details() {
    const navigate = useNavigate();
    const [products, setProducts] = useContext(ProductContext);
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    // useEffect(() => {
    //     const foundProduct = products.find((p) => p.id === id);
    //     if (foundProduct) {
    //         setProduct(foundProduct);
    //     }
    // }, [id, products]);

    useEffect(() => {
        const foundProduct = products.find((p) => p.id === id);
        setProduct(foundProduct || null);
    }, [id, products]);
    

    const productDeleteHandler = (id) => {
        const filteredProducts = products.filter((p) => p.id !== id);
        setProducts(filteredProducts);
        localStorage.setItem('products', JSON.stringify(filteredProducts));
        navigate('/');
    };

    return product ? (
        <div className="w-[70%] flex justify-between items-center h-full m-auto p-[10%]">
            <img className="object-contain h-[80%] w-[40%]" src={product.image} alt={product.title} />
            <div className="content w-[50%]">
                <h1 className="text-4xl">{product.title}</h1>
                <h3 className="text-gray-500 my-5">{product.category}</h3>
                <h2 className="text-red-500 mb-3">${product.price}</h2>
                <p className="mb-[5%]">{product.description}</p>
                <Link to={`/edit/${product.id}`} className="mr-5 py-2 px-5 border rounded border-blue-200 text-blue-400">
                    Edit
                </Link>
                <button
                    onClick={() => productDeleteHandler(product.id)}
                    className="py-2 px-5 border rounded border-red-200 text-red-400"
                >
                    Delete
                </button>
            </div>
        </div>
    ) : (
        <Loading />
    );
}

export default Details;
