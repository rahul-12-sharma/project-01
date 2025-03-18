import React, { useContext, useEffect, useState } from 'react'
import Nav from './Nav'
import { Link, useLocation } from 'react-router-dom'
import { ProductContext } from '../utils/Context'
import Loading from './Loading'
import axios from '../utils/axios'


function Home() {
    const [products] = useContext(ProductContext)
    const { search } = useLocation()
    const category = search ? decodeURIComponent(search.split('=')[1] || '') : '';



    const [filterProducts, setFilterProducts] = useState([])

    const getProductsCategory = async () => {
        try {
            const { data } = await axios.get(`/products/category/${category}`)
            setFilterProducts(data)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (!category || category === 'undefined') {
            setFilterProducts(products);
        } else {
            setFilterProducts(products.filter((p) => p.category == category))
        }
    }, [category, products])


    return products ? (
        <>
            <Nav />

            <div className='w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto'>

                {filterProducts.map((p, i) => (

                    <Link key={i}
                        to={`/details/${p.id}`}
                        className='card p-3 shadow rounded w-[18%] h-[30vh] flex 
                               justify-center items-center flex-col mr-3 mb-3'>
                        <div
                            className='mb-5 w-full h-[80%] bg-contain bg-no-repeat bg-center hover:scale-110'
                            style={{
                                backgroundImage:
                                    `url(${p.image})`,
                            }}
                        ></div>

                        <h1
                            className='font-medium hover:text-blue-400'>
                            {p.title}
                        </h1>
                    </Link>
                ))}

            </div>
        </>
    ) : <Loading />

}

export default Home