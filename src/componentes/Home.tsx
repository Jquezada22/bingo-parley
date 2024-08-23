// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className='mt-10 mx-auto max-w-md min-h-screen'>
            <div className='bg-gray-200 py-8 px-4 shadow-xl rounded-md'>
                <form className='space-y-2'>
                    <div>
                        <h1 className='text-2xl md:text-3xl lg:text-3xl text-center font-semibold mb-6'>Bienvenido a Bingo-Parley</h1>
                    </div>
                    <div>
                        <Link to={'/bingo'} className='text-2xl'>Ir al bingo</Link>
                    </div>
                    <div>
                        <Link to={'/ventas'} className='text-2xl'>Ir a las ventas</Link>
                    </div>
                    <div>
                        <Link to={'/reportes'} className='text-2xl'>Ir a los reportes</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Home;
