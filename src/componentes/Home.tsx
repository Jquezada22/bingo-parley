// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './shared/Button';

const Home: React.FC = () => {
    return (
        <div className='mt-10 mx-auto max-w-md min-h-screen'>
            <div className='bg-gray-300 py-8 px-4 shadow-xl rounded-md'>
                <h1 className='text-2xl sm:text-2xl md:text-3xl lg:text-3xl text-center font-semibold'>Bienvenido a Bingo-Parley</h1>
                <div className='my-5 mx-auto text-2xl'>
                    <Link to={'/bingo'} target='_blank'>Ir al bingo</Link><br />
                    <Link to={'/ventas'} target='_blank'>Ir a las ventas</Link>
                </div>
                <Button />
            </div>
        </div>
    );
};

export default Home;
