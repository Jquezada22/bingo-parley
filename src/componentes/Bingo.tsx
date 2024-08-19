import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const Bingo: React.FC = () => {
    const [numbers, setNumbers] = useState<number[]>([]);
    const [currentNumber, setCurrentNumber] = useState<number | null>(null);
    const [lastThreeNumbers, setLastThreeNumbers] = useState<number[]>([]);

    const generateRandomNumber = () => {
        if (numbers.length >= 75) return;
        let randomNumber: number;
        do {
            randomNumber = Math.floor(Math.random() * 75) + 1;
        } while (numbers.includes(randomNumber));
        setNumbers(prev => [...prev, randomNumber]);
        setCurrentNumber(randomNumber);
    };

    const resetGame = () => {
        setNumbers([]);
        setCurrentNumber(null);
        setLastThreeNumbers([]);
    };

    useEffect(() => {
        if (currentNumber !== null) {
            setLastThreeNumbers(prev => [currentNumber, ...prev].slice(0, 3));
        }
    }, [currentNumber]);

    return (
        <div className="flex flex-col items-center justify-around min-h-screen bg-gray-100 p-5">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl my-5 font-semibold text-center text-slate-900">
                BINGO PARLEY
            </h1>
            <div className="flex flex-col sm:flex-row items-start justify-between w-full max-w-7xl">
                {/* Tabla de números */}
                <div className="flex flex-wrap gap-2 w-full sm:w-3/4">
                    {Array.from({ length: 75 }, (_, index) => {
                        const num = index + 1;
                        return (
                            <div
                                key={num}
                                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 flex items-center justify-center rounded-full text-white font-semibold ${numbers.includes(num) ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}
                            >
                                {num}
                            </div>
                        );
                    })}
                </div>
                {/* Botón de generar número y reiniciar juego */}
                <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col items-center sm:items-start gap-4 mx-10">
                    <button
                        onClick={generateRandomNumber}
                        className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Generar<br />Número
                    </button>
                    <button
                        onClick={resetGame}
                        className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Reiniciar<br />Juego
                    </button>
                </div>
            </div>
            {/* Últimos 3 números marcados */}
            <div className="mt-8 w-full max-w-7xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 text-center">Últimos 3 Números Marcados</h2>
                <div className="flex justify-center gap-4">
                    {lastThreeNumbers.map(num => (
                        <div
                            key={num}
                            className={classNames(
                                'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 flex items-center justify-center rounded-full text-white text-2xl font-semibold bg-green-500 transform transition-transform duration-300',
                                'scale-110'
                            )}
                        >
                            {num}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bingo;
