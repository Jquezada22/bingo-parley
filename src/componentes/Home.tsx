import React from 'react';

const Home: React.FC = () => {
    return (
        <div className='mt-10 mx-auto max-w-md min-h-screen'>
            <div className='bg-gray-300 py-8 px-4 shadow-xl rounded-md'>
                <h1 className='text-2xl sm:text-2xl md:text-3xl lg:text-3xl text-center font-semibold'>Bienvenido a Bingo-Parley</h1>
                <div className='my-5 mx-auto text-2xl'>
<<<<<<< Updated upstream
                    <Link to={'/bingo'} target='_blank' rel='noopener noreferrer'>Ir al bingo</Link><br />
                    <Link to={'/ventas'} target='_blank' rel='noopener noreferrer'>Ir a las ventas</Link>
=======
                    <a href="/bingo" target="_blank" rel="noopener noreferrer">Ir al bingo</a><br />
                    <a href="/ventas" target="_blank" rel="noopener noreferrer">Ir a las ventas</a>
>>>>>>> Stashed changes
                </div>
            </div>
        </div>
    );
};

export default Home;
