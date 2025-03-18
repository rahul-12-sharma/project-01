import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
import Create from './components/Create';
import Edit from './components/Edit';
import { Link } from 'react-router-dom';

function App() {
    const { search, pathname } = useLocation();

    return (
        <div className="h-screen w-screen flex">
            {(pathname !== '/' || search.length > 0) && (
                <Link to="/"
                    className="text-cyan-300 absolute left-[18%] top-[3%] text-2xl">
                    Home
                </Link>
            )
            }

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/edit/:id" element={<Edit />} />
            </Routes>
        </div >
    );
}

export default App;
