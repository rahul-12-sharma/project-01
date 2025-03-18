import React, { useContext } from 'react'
import { ProductContext } from '../utils/Context'
import { Link } from 'react-router-dom'


function Nav() {
    const [products] = useContext(ProductContext)

    const distinct_category =
        products?.length ? [...new Set(products.map(p => p.category))] : [];

    // Function to generate a random color
    const color = () => {
        return `rgba(${(Math.random() * 255).toFixed()}, ${(Math.random() * 255).toFixed()}, ${(Math.random() * 255).toFixed()}, 0.4)`
    }

    return (
        <nav className='w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5'>
            {/* <a
                className='py-2 px-5 border rounded border-blue-200 text-blue-400'
                href="/create">
                Add New Product
            </a> */}

            <Link to="/create" className="py-2 px-5 border rounded border-blue-200 text-blue-400">
                Add New Product
            </Link>

            <hr className='w-[90%] m-2' />
            <h1 className='text-2xl mb-3 w-[80%]'>Category Filter</h1>

            <div className=' w-[80%]'>
                {distinct_category.map((c, i) => (
                    <Link
                        key={i}
                        to={`/?category=${c}`}
                        className='mb-3 flex items-center'
                    >
                        <span
                            className='rounded-full mr-3 w-[15px] h-[15px]'
                            style={{ backgroundColor: color() }}
                        ></span>
                        {c}
                    </Link>
                ))}
            </div>
        </nav>
    )
}

export default Nav
